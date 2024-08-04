"use client"
import Head from "next/head";
import Header from "../app/dashboard/components/Header"
import TaskBoard from "../app/dashboard/components/TaskBoard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../app/dashboard/components/Sidebar";
import { CiMenuBurger } from "react-icons/ci";

export default function Dashboard({ params }: any) {
  const [taskList, setTaskList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState('')

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
  }

  const userLogin = async () => {
    const login = await axios.get('/api/users/login');
    console.log("Login user :: ", login.data.user[0].username);
    setUsername(login.data.user[0].username);
  }

  useEffect(() => {
    getTaskList();
    userLogin()
  }, []);

  useEffect(() => {
    console.log('Updated taskList:', taskList);
  }, [taskList]);

  useEffect(() => {
    console.log('Sidebar open:', sidebarOpen);
  }, [sidebarOpen]);

  const handleSidebarOpen = () => {

    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div className="flex">
      {/* <div className=""> */}
      {/* {!sidebarOpen && } */}
      {/* </div> */}
      {/* {sidebarOpen ? */}
      <div className={`block fixed inset-y-0 left-0 z-50`}>
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarOpen} />
      </div>
      {/* : <button onClick={handleSidebarOpen} className="cursor-pointer left-0 top-0"> */}
      {/* <CiMenuBurger />
        </button>} */}

      <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} flex-grow p-4 transition-all duration-300`}>

        <Header name={username} />

        {taskList && <TaskBoard tasks={taskList} setTaskList={setTaskList} />}
      </div>

    </div>
  );
}
