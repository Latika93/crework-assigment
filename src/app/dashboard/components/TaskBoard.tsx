"use client"
import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useStrictDroppable } from "./StrictDisabled";
import axios from "axios";

export default function TaskBoard({ tasks: initialTasks }: any) {
  const columns = ["To Do", "In Progress", "Under Review", "Done"];
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentColumn, setCurrentColumn] = useState("");
  // const [tasks, setTasks] = useState(initialTasks);
  console.log("Yes found : ",initialTasks);
  
  const openModal: any = (column: string) => {
    setCurrentColumn(column);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const [enabled] = useStrictDroppable(false)

  const onDragEnd = async (result: any) => {
    // if (!result.destination) return;

    // const { source, destination } = result;

    // // Clone the tasks array
    // const newTasks = Array.from(tasks);

    // // Get the dragged task
    // const [movedTask]: any = newTasks.splice(source.index, 1);

    // // Update the task's status to the new column
    // const newStatus = columns[destination.droppableId];
    // movedTask.status = newStatus;

    // // Insert the task at the new position
    // newTasks.splice(destination.index, 0, movedTask);

    // // Update the state
    // setTasks(newTasks);

    // // Make an API call to update the status of the dragged task in the database
    // try {
    //   const response = await axios.patch(`/api/tasks/${movedTask._id}`, {
    //     status: newStatus,
    //   });

    //   if (response.status !== 200) {
    //     throw new Error('Failed to update task status');
    //   }

    //   console.log('Task status updated:', response.data);
    // } catch (error) {
    //   console.error('Error updating task status:', error);
    // }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4">
        {columns.map((column, ind) => (
          enabled && <Droppable droppableId={`${ind}`} key={ind}>
            {(provided) => (
              <div {...provided.droppableProps}
                ref={provided.innerRef} className="flex-1 bg-gray-100 p-4 rounded">
                <h2 className="text-m mb-4">{column}</h2>
                {initialTasks
                  .filter((task: any) => task.status === column)
                  .map((task: any, index: any) => (
                    // <TaskCard key={task.title} {...task} />
                    <Draggable draggableId={`draggable${task._id}`} index={index} key={task._id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard {...task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                <div onClick={openModal} className="mt-4 px-2 py-1 bg-gray-800 text-white rounded w-full flex justify-between">
                  <button className="">Add new</button>
                  <p className="" >+</p>
                </div>

                {provided.placeholder}
                <TaskModal key={column} isOpen={isModalOpen} onClose={closeModal} statusCol={currentColumn} />
              </div>
            )}

          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};