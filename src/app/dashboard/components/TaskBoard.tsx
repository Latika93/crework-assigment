"use client"
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useStrictDroppable } from "./StrictDisabled";
import axios from "axios";

export default function TaskBoard({ tasks, setTaskList }: any) {
  const columns = ["To Do", "In Progress", "Under Review", "Done"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState("");

  const openModal: any = (column: string) => {
    setCurrentColumn(column);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const [enabled] = useStrictDroppable(false);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceColumn = columns[Number(source.droppableId)];
    const destinationColumn = columns[Number(destination.droppableId)];

    // Update task's status locally
    const updatedTasks = tasks.map((task: any) => {
      if (task._id === draggableId.replace('draggable', '')) {
        return { ...task, status: destinationColumn };
      }
      return task;
    });
    console.log("Upaging tasks for destination at 39 : ", updatedTasks);


    // Update task status in the backend
    try {
      await axios.patch(`/api/tasks/${draggableId.replace('draggable', '')}`, {
        status: destinationColumn
      });

      const response = await axios.get('/api/tasks');
      const values = response.data;

      console.log('Task status updated successfully', values.tasks);

      // Update state with new tasks
      setTaskList(values.tasks);

    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  useEffect(() => {
    console.log("Task stsjhfhka ehfiwufj ", tasks);
  }, [tasks])


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4">
        {columns.map((column, ind) => (
          enabled && <Droppable droppableId={`${ind}`} key={ind}>
            {(provided) => (
              <div {...provided.droppableProps}
                ref={provided.innerRef} className="flex-1 bg-gray-100 p-4 rounded">
                <h2 className="text-m mb-4">{column}</h2>
                {tasks && tasks
                  .filter((task: any) => task.status === column)
                  .map((task: any, index: any) => (
                    <Draggable draggableId={`draggable${task._id}`} index={index} key={task._id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard {...task} setTaskList={setTaskList} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                <div onClick={() => openModal(column)} className="mt-4 px-2 py-1 bg-gray-800 text-white rounded w-full flex justify-between">
                  <button className="">Add new</button>
                  <p className="" >+</p>
                </div>

                {provided.placeholder}
                <TaskModal key={column} isOpen={isModalOpen} onClose={closeModal} statusCol={currentColumn} setTaskList={setTaskList} />
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
