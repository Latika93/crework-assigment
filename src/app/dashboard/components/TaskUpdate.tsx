"use client";
import React, { useState } from 'react';
import axios from "axios";
import { AiOutlineStar, AiOutlineCalendar, AiOutlineEdit } from "react-icons/ai";

const TaskUpdate = ({ isOpen, onClose, task, setTaskList }: any) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status || 'To Do');
    const [priority, setPriority] = useState(task.priority || 'Low');
    const [deadline, setDeadline] = useState(task.date);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(task, "here");

        const response = await axios.put(`/api/tasks/${task._id}`, { title, description, status, priority, deadline });
        console.log("Task updated successfully", response.data);

        const getData = await axios.get('/api/tasks');
        const values = getData.data;
        setTaskList(values.tasks);

        onClose();
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className={`bg-white w-full max-w-md p-6 rounded-l-lg shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
                <h2 className="mb-4 text-2xl font-bold">Update Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full mt-1 border-transparent focus:outline-none rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-3xl outline-none "
                            placeholder='Title'
                        />
                    </div>

                    <div className="py-4">
                        <div className='flex items-center mb-4'>
                            <div className="mr-4">{<AiOutlineStar />}</div>
                            <label className="mr-4 w-32">Status</label>
                            <select
                                required
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="flex-1 p-2 border-transparent focus:outline-none rounded text-sm text-gray-500"
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <div className='flex items-center mb-4'>
                            <div className="mr-4">{<AiOutlineStar />}</div>
                            <label className="mr-4 w-32">Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="flex-1 p-2 border-transparent focus:outline-none rounded text-sm text-gray-500"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>Urgent</option>
                            </select>
                        </div>
                        <div className='flex items-center mb-4'>
                            <div className="mr-4">{<AiOutlineCalendar />}</div>
                            <label className="mr-4 w-32">Deadline</label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="flex-1 p-2 border-transparent focus:outline-none rounded text-sm text-gray-500"
                            />
                        </div>
                        <div className='flex items-center mb-4'>
                            <div className="mr-4">{<AiOutlineEdit />}</div>
                            <label className="mr-4 w-32">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="flex-1 p-2 border-transparent focus:outline-none rounded text-sm text-gray-500"
                            ></textarea>
                        </div>
                        <button className="flex items-center mt-4 text-blue-500">
                            <span className="mr-2">+</span>
                            Add custom property
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskUpdate;
