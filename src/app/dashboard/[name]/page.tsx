"use client"
import Head from "next/head";
import Header from "../components/Header";
import TaskBoard from "../components/TaskBoard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import { CiMenuBurger } from "react-icons/ci";

export default function Dashboard({ params }: any) {
  const [taskList, setTaskList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [session, setSession] = useState<any>(null);

  const router = useRouter();
  const [data, setData] = useState('');

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const getTaskList = async () => {
    const response = await axios.get('/api/tasks');
    const values = response.data;
    setTaskList(values.tasks);
    console.log(values.tasks);
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  useEffect(() => {
    getTaskList();
    console.log(taskList);
  }, []);

  useEffect(() => {
    console.log('Updated taskList:', taskList);
  }, [taskList]);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex">
      <Head>
        <title>Task Management</title>
      </Head>
      <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-y-0 left-0`}>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} flex-grow p-4 transition-all duration-300`}>
        <span onClick={toggleSidebar} className="cursor-pointer">
          <CiMenuBurger />
        </span>
        <Header name={params.name} />
        {taskList && <TaskBoard tasks={taskList} />}
      </div>
    </div>
  );
}
