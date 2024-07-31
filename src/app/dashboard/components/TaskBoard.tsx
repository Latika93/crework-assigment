"use client"
import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useStrictDroppable } from "./StrictDisabled";
import { v4 as uuidv4 } from 'uuid';


export default function TaskBoard({ tasks }: any) {

  const columns = [
    { id: '1', content: 'To Do' },
    { id: '2', content: 'In Progress' },
    { id: '3', content: 'Under Review' },
    { id: '4', content: 'Done' },
  ];

  // const columns = ["To Do", "In Progress", "Under Review", "Done"];
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentColumn, setCurrentColumn] = useState("");

  const [column, setColumns] = useState(columns);


  const openModal: any = (column: string) => {
    setCurrentColumn(column);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const [enabled] = useStrictDroppable(false)
  const onDragEnd = (result: any) => {
  };



  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4">
        {columns.map((column) => (
          (
            <Droppable droppableId={`droppable${column.id}`} key={uuidv4()} type="group">
              {(provided) => (
                <div
                  key={uuidv4()}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 bg-gray-100 p-4 rounded"
                >
                  <h2 className="text-m mb-4">{column.content}</h2>
                  {tasks
                    .filter((task: any) => task.status === column.content)
                    .map((task: any, index: any) => (
                      <Draggable draggableId={`draggable${task.id}`} index={index} key={uuidv4()}>
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
                  <div
                    onClick={openModal}
                    className="mt-4 px-2 py-1 bg-gray-800 text-white rounded w-full flex justify-between"
                  >
                    <button className="">Add new</button>
                    <p className="">+</p>
                  </div>
                  {provided.placeholder}
                  <TaskModal key={column.id} isOpen={isModalOpen} onClose={closeModal} statusCol={currentColumn} />
                </div>
              )}
            </Droppable>
          )
        ))}
      </div>
    </DragDropContext>

  );
};