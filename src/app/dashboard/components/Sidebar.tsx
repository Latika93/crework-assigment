import Image from 'next/image';
import React, { useState } from 'react';
import userImage from '../../assets/user.png'

export default function Sidebar({ isOpen, onClose }: any) {

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
            <div className="flex flex-col h-full p-4">
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
                <div className="flex items-center space-x-4">
                    <Image
                        src={userImage}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                        <span className="text-gray-900 font-medium">Joe Gardner</span>
                    </div>
                </div>

                <div className="mt-4">
                    <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                        <span role="img" aria-label="notification">
                            🔔
                        </span>
                    </button>
                </div>

                <div className="mt-4">
                    <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                        <span role="img" aria-label="theme toggle">
                            🌞
                        </span>
                    </button>
                </div>

                <div className="mt-4">
                    <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                        <span role="img" aria-label="arrow">
                            ➡️
                        </span>
                    </button>
                </div>

                <div className="mt-4">
                    <button className="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                        Logout
                    </button>
                </div>

                <nav className="flex-1 mt-8 space-y-2">
                    <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md">
                        <span className="material-icons">home</span>
                        <span className="ml-3">Home</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md">
                        <span className="material-icons">dashboard</span>
                        <span className="ml-3">Boards</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md">
                        <span className="material-icons">settings</span>
                        <span className="ml-3">Settings</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md">
                        <span className="material-icons">group</span>
                        <span className="ml-3">Teams</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md">
                        <span className="material-icons">analytics</span>
                        <span className="ml-3">Analytics</span>
                    </a>
                </nav>

                <div className="mt-4">
                    <button className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700">
                        Create new task
                    </button>
                </div>

                <div className="mt-auto">
                    <div className="px-4 py-2 mt-4 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-md">
                        <a href="#" className="flex items-center justify-center">
                            <span className="material-icons">download</span>
                            <span className="ml-2">Download the app</span>
                        </a>
                        <p className="mt-1 text-xs text-gray-500">Get the full experience</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

