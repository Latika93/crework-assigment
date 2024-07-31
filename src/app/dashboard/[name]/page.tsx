"use client"
import Head from "next/head";
import Header from "../components/Header";
import TaskBoard from "../components/TaskBoard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";


const tasks = [
  {
    title: "Implement User Authentication",
    description: "Develop and integrate user authentication using email and password.",
    status: "To do",
    priority: "Urgent",
    date: "2024-08-15",
  },
  {
    title: "Design Home Page UI",
    description: "Develop and integrate user authentication using email and password.",
    status: "In progress",
    priority: "Medium",
    date: "2024-08-15",
  },
  {
    title: "Conduct User Feedback Survey",
    description: "Collect and analyze user feedback to improve app features.",
    status: "In progress",
    priority: "Low",
    date: "2024-08-05",
  },
  {
    title: "Integrate Cloud Storage",
    description: "Enable cloud storage for note backup and synchronization.",
    status: "Under review",
    priority: "Urgent",
    date: "2024-08-20",
  },
  {
    title: "Test Cross-browser Compatibility",
    description: "Ensure the app works seamlessly across different web browsers.",
    status: "Finished",
    priority: "Medium",
    date: "2024-07-30",
  },
];

export default function Dashboard({ params }: any) {

  const [taskList, setTaskList] = useState([]);

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

  const getTaskList = async ()=>{
    const response = await axios.get('/api/tasks')
    const values = response.data;
    setTaskList(values.tasks)
    console.log(values.tasks);    
  }

  useEffect(()=>{
    getTaskList()
      console.log(taskList);
      
  },[])

  useEffect(() => {
    console.log('Updated taskList:', taskList);
  }, [taskList]);

  

  return (
    <div>
      <Head>
        <title>Task Management</title>
      </Head>
      <Header name={params.name} />
      {taskList && <TaskBoard tasks={taskList} />}
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Logout</button>
    </div>
  );
}
