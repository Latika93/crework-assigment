import Head from "next/head";
import Header from "./components/Header";
import TaskBoard from "./components/TaskBoard";


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

export default function Home() {
  return (
    <div >
      <Head>
        <title>Task Management</title>
      </Head>
      <Header />
      <TaskBoard tasks={tasks} />
    </div>
  );
}
