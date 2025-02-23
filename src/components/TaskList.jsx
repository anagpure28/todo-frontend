import { useEffect, useState } from "react";
import { useDeleteTaskTodoMutation, useGetTaskTodoQuery, useUpdateTaskTodoMutation } from "../features/api/taskApi";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [editingTask, setEditingTask] = useState(null);
  const [modalData, setModalData] = useState({ name: "", description: "", status: "" });
  const [updateTaskTodo,{data: updateData, isSuccess: updateSuccess}] = useUpdateTaskTodoMutation();
  const [deleteTaskTodo, {data: deleteData,isSuccess: deleteSuccess}]  = useDeleteTaskTodoMutation();

  // Open Modal
  const openModal = (task) => {
    setEditingTask(task._id);
    setModalData({ name: task.name, description: task.description, status: task.status });
  };

  // Close Modal
  const closeModal = () => {
    setEditingTask(null);
    setModalData({ name: "", description: "", status: "" });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  // Handle Update
  const handleUpdate = async () => {
    try {
      await updateTaskTodo({ _id: editingTask, ...modalData });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === editingTask ? { ...task, ...modalData } : task))
      );
      closeModal();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  const { data, isLoading, isError } = useGetTaskTodoQuery({
    search,
    status,
    startDate,
    endDate,
    page,
    limit,
  });


  const handleDelete = async (_id) => {
    try {
      await deleteTaskTodo({_id});
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== _id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(()=>{
    if(deleteSuccess){
      alert("Task deleted successfully");
    }
    if(updateSuccess){
      alert("Task updated successfully");
    }
  },[deleteData,deleteSuccess,updateData,updateSuccess])

  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks);
    }
  }, [data]);
  console.log(data)
  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg border">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Management</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      {/* Date Filters */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Task List */}
      {/* <ul className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{task.name}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-lg ${task.status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                {task.status}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No tasks found.</p>
        )}
      </ul> */}

      {/* <ul className="space-y-3">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <li
            key={task._id}
            className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{task.name}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-sm font-semibold rounded-lg ${task.status === "PENDING" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
                {task.status}
              </span>

              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="text-gray-500 text-center py-4">No tasks found.</p>
      )}
    </ul> */}

<ul className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{task.name}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                    task.status === "PENDING" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"
                  }`}
                >
                  {task.status}
                </span>
                <button
                  onClick={() => openModal(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No tasks found.</p>
        )}
      </ul>

      {/* Update Modal */}
      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Update Task</h2>

            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={modalData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            />

            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={modalData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            />

            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={modalData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            >
              <option value="PENDING">PENDING</option>
              <option value="DONE">DONE</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg text-white transition ${
            page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Prev
        </button>
        <span className="font-semibold text-gray-700">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={data?.totalPages === page}
          className={`px-4 py-2 rounded-lg text-white transition ${
            data?.totalPages === page ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
