// import { useEffect, useState } from "react";
// import { useDeleteTaskTodoMutation, useGetTaskTodoQuery, useUpdateTaskTodoMutation } from "../features/api/taskApi";
// import TaskCard from "./TaskCard";

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const [editingTask, setEditingTask] = useState(null);
//   const [modalData, setModalData] = useState({ name: "", description: "", status: "" });
//   const [updateTaskTodo,{data: updateData, isSuccess: updateSuccess}] = useUpdateTaskTodoMutation();
//   const [deleteTaskTodo, {data: deleteData,isSuccess: deleteSuccess}]  = useDeleteTaskTodoMutation();

//   // Open Modal
//   const openModal = (task) => {
//     setEditingTask(task._id);
//     setModalData({ name: task.name, description: task.description, status: task.status });
//   };

//   // Close Modal
//   const closeModal = () => {
//     setEditingTask(null);
//     setModalData({ name: "", description: "", status: "" });
//   };

//   // Handle Input Change
//   const handleChange = (e) => {
//     setModalData({ ...modalData, [e.target.name]: e.target.value });
//   };

//   // Handle Update
//   const handleUpdate = async () => {
//     try {
//       await updateTaskTodo({ _id: editingTask, ...modalData });
//       setTasks((prevTasks) =>
//         prevTasks.map((task) => (task._id === editingTask ? { ...task, ...modalData } : task))
//       );
//       closeModal();
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };


//   const { data, isLoading, isError } = useGetTaskTodoQuery({
//     search,
//     status,
//     startDate,
//     endDate,
//     page,
//     limit,
//   });


//   const handleDelete = async (_id) => {
//     try {
//       await deleteTaskTodo({_id});
//       setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   useEffect(()=>{
//     if(deleteSuccess){
//       alert("Task deleted successfully");
//     }
//     if(updateSuccess){
//       alert("Task updated successfully");
//     }
//   },[deleteData,deleteSuccess,updateData,updateSuccess])

//   useEffect(() => {
//     if (data?.tasks) {
//       setTasks(data.tasks);
//     }
//   }, [data]);
//   console.log(data)
//   return (
//     // <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg border">
//     //   <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Management</h2>
//     <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg border">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Management</h2>

//       {/* Filters */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search tasks..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">All Status</option>
//           <option value="PENDING">Pending</option>
//           <option value="DONE">Done</option>
//         </select>
//       </div>

//       {/* Date Filters */}
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* <ul className="space-y-3">
//         {tasks.length > 0 ? (
//           tasks.map((task) => (
//             <li
//               key={task._id}
//               className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
//             >
//               <div>
//                 <h3 className="font-semibold text-lg text-gray-800">{task.name}</h3>
//                 <p className="text-sm text-gray-600">{task.description}</p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <span
//                   className={`px-3 py-1 text-sm font-semibold rounded-lg ${
//                     task.status === "PENDING" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"
//                   }`}
//                 >
//                   {task.status}
//                 </span>
//                 <button
//                   onClick={() => openModal(task)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
//                 >
//                   Update
//                 </button>

//                 <button
//                   onClick={() => handleDelete(task._id)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center py-4">No tasks found.</p>
//         )}
//       </ul> */}
//       <div className="space-y-4">
//   {tasks.length > 0 ? (
//     tasks.map((task) => (
//       <TaskCard
//         key={task._id}
//         task={task}
//         onUpdate={openModal}
//         onDelete={handleDelete}
//       />
//     ))
//   ) : (
//     <p className="text-gray-500 text-center py-4">No tasks found.</p>
//   )}
// </div>

//       {/* Update Modal */}
//       {editingTask && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-lg font-semibold mb-4">Update Task</h2>

//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={modalData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
//             />

//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea
//               name="description"
//               value={modalData.description}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
//             />

//             <label className="block text-sm font-medium text-gray-700">Status</label>
//             <select
//               name="status"
//               value={modalData.status}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
//             >
//               <option value="PENDING">PENDING</option>
//               <option value="DONE">DONE</option>
//             </select>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-6">
//         <button
//           onClick={() => setPage(page - 1)}
//           disabled={page === 1}
//           className={`px-4 py-2 rounded-lg text-white transition ${
//             page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           Prev
//         </button>
//         <span className="font-semibold text-gray-700">Page {page}</span>
//         <button
//           onClick={() => setPage(page + 1)}
//           disabled={data?.totalPages === page}
//           className={`px-4 py-2 rounded-lg text-white transition ${
//             data?.totalPages === page ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskList;

// TaskList.jsx
import { useEffect, useState } from "react";
import { useDeleteTaskTodoMutation, useGetTaskTodoQuery, useUpdateTaskTodoMutation } from "../features/api/taskApi";
import TaskCard from "./TaskCard";
import { Loader, X } from "lucide-react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const limit = 12;

  const [editingTask, setEditingTask] = useState(null);
  const [modalData, setModalData] = useState({ name: "", description: "", status: "" });

const formatDateForAPI = (date) => {
  return date ? new Date(date).toISOString().split('T')[0] : '';
};

const { data, isLoading, refetch } = useGetTaskTodoQuery({
  search,
  status,
  startDate: formatDateForAPI(startDate),
  endDate: formatDateForAPI(endDate),
  page,
  limit,
});

  const [updateTaskTodo, { isLoading: isUpdating }] = useUpdateTaskTodoMutation();
  const [deleteTaskTodo] = useDeleteTaskTodoMutation();

  // Open Modal with animation
  const openModal = (task) => {
    setEditingTask(task._id);
    setModalData({ name: task.name, description: task.description, status: task.status });
    document.body.style.overflow = 'hidden';
  };

  // Close Modal with animation
  const closeModal = () => {
    setEditingTask(null);
    setModalData({ name: "", description: "", status: "" });
    document.body.style.overflow = 'auto';
  };

  // Handle Update with immediate UI update and refetch
  const handleUpdate = async () => {
    try {
      await updateTaskTodo({ _id: editingTask, ...modalData }).unwrap();
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === editingTask ? { ...task, ...modalData } : task
        )
      );
      closeModal();
      refetch();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  // Handle Delete with optimistic update
  const handleDelete = async (_id) => {
    try {
      setDeletingTaskId(_id);
      await deleteTaskTodo({ _id }).unwrap();
      setTasks(prevTasks => prevTasks.filter(task => task._id !== _id));
      refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    } finally {
      setDeletingTaskId(null);
    }
  };

  // Update tasks when data changes
  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks);
    }
  }, [data]);

  useEffect(()=> {
    window.scrollTo(0, 0);
  },[])

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Task Management</h2>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="DONE">Done</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Tasks Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdate={openModal}
                  onDelete={handleDelete}
                  isDeleting={deletingTaskId === task._id}
                />
              ))
            ) : (
              <div className="col-span-full">
                <p className="text-gray-500 text-center py-4">No tasks found.</p>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {editingTask && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Update Task</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Task Name</label>
                  <input
                    type="text"
                    name="name"
                    value={modalData.name}
                    onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter task name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={modalData.description}
                    onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
                    placeholder="Enter task description"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={modalData.status}
                    onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="cursor-pointer flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 min-w-[100px] disabled:bg-blue-300"
                >
                  {isUpdating ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {tasks.length > 0 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`
                flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200 
                ${page === 1 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm"
                }
              `}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {[...Array(data?.totalPages || 0)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`
                    w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${page === idx + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(page + 1)}
              disabled={data?.totalPages === page}
              className={`
                flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${data?.totalPages === page
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm"
                }
              `}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;