// import React, { useEffect, useState } from "react";
// // import axios from "axios";

// const CreateTask = () => {
//   const [tasks, setTasks] = useState([]);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("");
//   const [page, setPage] = useState(1);
//   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     axios
// //       .get(`http://localhost:5000/api/tasks?search=${search}&status=${status}&page=${page}`, {
// //         headers: { Authorization: token },
// //       })
// //       .then((res) => setTasks(res.data.tasks))
// //       .catch((err) => console.error(err));
// //   }, [search, status, page]);

//   return (
//     <div className="p-6">
//       <input
//         type="text"
//         placeholder="Search Tasks..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="border p-2 rounded"
//       />
//       <select value={status} onChange={(e) => setStatus(e.target.value)} className="ml-2 border p-2 rounded">
//         <option value="">All</option>
//         <option value="PENDING">Pending</option>
//         <option value="DONE">Done</option>
//       </select>

//       {tasks.map((task) => (
//         <div key={task._id} className="border p-4 mt-4 flex justify-between">
//           <div>
//             <h3 className="font-bold">{task.name}</h3>
//             <p>{task.description}</p>
//             <p className="text-sm text-gray-500">{task.status}</p>
//           </div>
//           <button
//             onClick={() => axios.put(`http://localhost:5000/api/tasks/${task._id}`, { status: "DONE" })}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Mark Done
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CreateTask;


// import { useState, useEffect } from "react";
// // import axios from "axios";

// const CreateTask = () => {
//   const [tasks, setTasks] = useState([]);
//   const [form, setForm] = useState({ name: "", description: "" });
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     fetchTasks();
// //   }, [search, status]);

// //   const fetchTasks = async () => {
// //     setLoading(true);
// //     try {
// //       const { data } = await axios.get(`/api/tasks?search=${search}&status=${status}`);
// //       setTasks(data.tasks);
// //     } catch (error) {
// //       console.error("Error fetching tasks", error);
// //     }
// //     setLoading(false);
// //   };

//   const handleCreate = async () => {
//     // try {
//     //   const { data } = await axios.post("/api/tasks/create", form);
//     //   setTasks([...tasks, data]);
//     //   setForm({ name: "", description: "" });
//     // } catch (error) {
//     //   console.error("Error creating task", error);
//     // }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/tasks/delete/${id}`);
//       setTasks(tasks.filter((task) => task._id !== id));
//     } catch (error) {
//       console.error("Error deleting task", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
//       <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-2xl">
//         <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             className="w-full p-2 border rounded"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <div className="mb-4 grid grid-cols-2 gap-2">
//           <input
//             type="text"
//             placeholder="Task Name"
//             className="p-2 border rounded"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             className="p-2 border rounded"
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//           />
//         </div>
//         <button
//           onClick={handleCreate}
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Create Task
//         </button>
//       </div>
//       <div className="mt-6 w-full max-w-2xl">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading tasks...</p>
//         ) : (
//           tasks.map((task) => (
//             <div
//               key={task._id}
//               className="bg-white shadow p-4 rounded-lg flex justify-between items-center mt-2"
//             >
//               <div>
//                 <h3 className="text-lg font-bold">{task.name}</h3>
//                 <p className="text-gray-600">{task.description}</p>
//               </div>
//               <button
//                 onClick={() => handleDelete(task._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateTask;

import { useEffect, useState } from "react";
// import { createTask } from "../api";
import { useNavigate } from "react-router-dom";
import { useCreateTaskTodoMutation } from "../features/api/taskApi";

const CreateTask = () => {
  const [task, setTask] = useState({ name: "", description: "" });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [createTaskTodo, {data , isLoading, error, isSuccess}] = useCreateTaskTodoMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await createTask(task, token);
    await createTaskTodo(task);

  };

  useEffect(()=> {
    if(isSuccess) {
        alert("Task created successfully");
        navigate("/task");
    }
  },[isSuccess,error])

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task Name"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Task Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-600 text-white p-2 rounded w-full">Create</button>
      </form>
    </div>
  );
};

export default CreateTask;

