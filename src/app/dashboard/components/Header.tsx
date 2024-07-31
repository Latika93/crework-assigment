"use client"
import Image from 'next/image';
import image from '../../assets/image.png';
import img from '../../assets/image2.png';
import image2 from '../../assets/image3.png';
import { useState } from 'react';
import TaskModal from './TaskModal';
import { CiShare2, CiFilter,CiCalendar } from "react-icons/ci";

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
                <div className="bg-white py-4 px-2 rounded-lg flex">
                    <Image
                        src={image}
                        alt="Description"
                        width={96}
                        height={96}
                        className="object-cover rounded-lg mr-4"
                    />
                    <div>
                        <h2 className="text-lg font-bold mb-2 text-gray-600">Introducing tags</h2>
                        <p className="text-gray-400 text-xs">Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.

                        </p>
                    </div>
                </div>
                <div className="bg-white py-4 px-2 rounded-lg flex">
                    <Image
                        src={img}
                        alt="Description"
                        width={96}
                        height={96}
                        className="object-cover rounded-lg mr-4"
                    />
                    <div>
                        <h2 className="text-lg font-bold mb-2 text-gray-600">Share Notes Instantly</h2>
                        <p className="text-gray-400 text-xs">Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options</p>
                    </div>
                </div>
                <div className="bg-white py-4 px-2 rounded-lg flex">
                    <Image
                        src={image2}
                        alt="Description"
                        width={96}
                        height={96}
                        className="object-cover rounded-lg mr-4"
                    />
                    <div>
                        <h2 className="text-lg font-bold mb-2 text-gray-600">Access Anywhere</h2>
                        <p className="text-gray-400 text-xs">Sync your notes across all devices. Stay productive whether you are on your phone, tablet, or computer</p>
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
                        <CiCalendar /><span className='mr-3'></span>
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
                        <CiFilter /><span className='mr-3'></span>
                        Filter
                    </button>
                    <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
                        <CiShare2 /><span className='mr-3'></span>
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