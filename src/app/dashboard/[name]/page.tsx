"use client"
import Head from "next/head";
import Header from "../components/Header";
import TaskBoard from "../components/TaskBoard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import { CiMenuBurger } from "react-icons/ci";

export default function Dashboard({ params }: any) {

  const [taskList, setTaskList] = useState([]);
  const [siderbarOpen, setSiderbarOpen] = useState(true);

  const [session, setSession] = useState<any>(null);

  const router = useRouter()
  const [data, setData] = useState('')
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  const getTaskList = async () => {
    const response = await axios.get('/api/tasks')
    const values = response.data;
    setTaskList(values.tasks)
    console.log(values.tasks);
  }

  const toggleSidebar = () => {
    setSiderbarOpen(() => !siderbarOpen)
  }

  useEffect(() => {
    getTaskList()
    console.log(taskList);

  }, [])

  useEffect(() => {
    console.log('Updated taskList:', taskList);
  }, [taskList]);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  const openSidebar = () => setSiderbarOpen(true);
  const closeSidebar = () => setSiderbarOpen(false);


  return (
    <div>
      <Head>
        <title>Task Management</title>
      </Head>
      <span onClick={()=>openSidebar } ><CiMenuBurger /></span>
      {siderbarOpen && <Sidebar isOpen={siderbarOpen} onClose={closeSidebar} />}
      <Header name={params.name} />
      {taskList && <TaskBoard tasks={taskList} />}
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Logout</button>
    </div>
  );
}