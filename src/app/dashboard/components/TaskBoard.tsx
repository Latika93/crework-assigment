"use client"
import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

export default function TaskBoard({ tasks }: any) {
  const columns = ["To Do", "In Progress", "Under Review", "Done"];
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex gap-4 p-4">
      {columns.map((column) => (
        <div key={column} className="flex-1 bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">{column}</h2>
          {tasks
            .filter((task: any) => task.status === column)
            .map((task: any) => (
              <TaskCard key={task.title} {...task} />
            ))}
          <div className="mt-4 px-4 py-2 bg-gray-800 text-white rounded w-full flex justify-between">
            <button onClick={openModal} className="">Add new</button>
            <p className="" >+</p>
          </div>

          <TaskModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      ))}
    </div>
  );
};