"use client"
import Image from 'next/image';
import image from '../../assets/image.png';
import { useState } from 'react';
import TaskModal from './TaskModal';

export default function Header({ name }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

    return (
        <header className="p-4 bg-gray-100 shadow">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Good morning, {name}!</h1>
                <p className="text-sm">Help & feedback ?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-1 my-4 ">
                <div className="bg-white p-1 rounded-lg flex">
                    <Image
                        src={image}
                        alt="Description"
                        width={96}
                        height={96}
                        className="object-cover rounded-lg mr-4"
                    />
                    <div>
                        <h2 className="text-xl font-bold mb-2 text-gray-600">Dome</h2>
                        <p className="text-gray-400">else</p>
                    </div>
                </div>
                <div className="bg-white p-1 rounded-lg flex">
                    <Image
                        src={image}
                        alt="Description"
                        width={96}
                        height={96}
                        className="object-cover rounded-lg mr-4"
                    />
                    <div>
                        <h2 className="text-xl font-bold mb-2 text-gray-600">Dome</h2>
                        <p className="text-gray-400">else</p>
                    </div>
                </div>
                <div className="bg-white p-1 rounded-lg flex">
                    <Image
                        src={image}
                        alt="Description"
                        width={96}
                        height={96}
                        className="object-cover rounded-lg mr-4"
                    />
                    <div>
                        <h2 className="text-xl font-bold mb-2 text-gray-600">Dome</h2>
                        <p className="text-gray-400">else</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7v6a4 4 0 004 4h4M16 3h5a2 2 0 012 2v5m0 10a2 2 0 01-2 2h-5m-4 0a4 4 0 01-4-4v-4m-4-4a2 2 0 012-2h5m0 0a4 4 0 004-4V3m4 0a2 2 0 00-2-2h-5m-4 0a4 4 0 01-4 4v5"
                            ></path>
                        </svg>
                        Calendar view
                    </button>
                    <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                        </svg>
                        Automation
                    </button>
                    <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 6h18M9 6v12M15 6v12m-6 0h6"
                            ></path>
                        </svg>
                        Filter
                    </button>
                    <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 10l4.72-4.72a2 2 0 000-2.82l-1.18-1.18a2 2 0 00-2.82 0L10 6.82M8 12H4v-4m0 8v4h4m8-4h4v-4m0 8v4h-4"
                            ></path>
                        </svg>
                        Share
                    </button>
                </div>
                <button className="px-4 py-2 text-white bg-[#4535a7] rounded-md hover:bg-[#4535a7]" onClick={openModal} >
                    Create new +
                </button>
                <TaskModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </header>
    );
};