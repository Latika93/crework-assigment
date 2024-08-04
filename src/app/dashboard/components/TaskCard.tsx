import { useState } from 'react';
import TaskUpdate from './TaskUpdate';
import axios from "axios";

export default function TaskCard({ _id, title, description, status, priority, date, setTaskList }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdate = () => {
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/tasks/${_id}`);
            if (response.data.success) {
                alert('Task deleted successfully');
                // Optionally refresh the list of tasks or handle the UI update accordingly
            }

            const getData = await axios.get('/api/tasks');
            const values = getData.data;
            setTaskList(values.tasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (

        <div className="p-4 bg-white shadow rounded mb-4">
            <h2 className="text-m font-semibold">{title}</h2>
            <p className="text-xs ">{description}</p>
            <div className="flex justify-between items-center mt-4">
                <span className={`text-xs text-white py-1 px-2 rounded-lg ${priority === 'Urgent' ? 'bg-red-600' : priority === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'}`}>{priority}</span>
                <span className="text-sm text-gray-600">{date}</span>
            </div>
            <div className="flex justify-between mt-4 space-x-2">
                <button
                    onClick={handleUpdate}
                    className="text-blue-500 text-sm hover:text-blue-700"
                >
                    Update
                </button>
                <button
                    className="px-4 py-2 text-sm font-medium text-red-600 rounded-md shadow-sm hover:bg-red-100 focus:outline-none"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>

            {isModalOpen && (
                <TaskUpdate
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    task={{ _id, title, description, status, priority, date }}
                    setTaskList={setTaskList}
                />
            )}
        </div>
    );
}
