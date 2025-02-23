import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTaskTodoMutation } from "../features/api/taskApi";

const CreateTask = () => {
  const [task, setTask] = useState({ name: "", description: "" });
  const navigate = useNavigate();
  
  const [createTaskTodo, { isLoading, error, isSuccess }] = useCreateTaskTodoMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTaskTodo(task).unwrap();
      navigate("/tasks");
    } catch (err) {
      alert("Failed to create task: " + (err.data?.message || "Unknown error"));
    }
  };

  // useEffect(()=> {
  //   if(isSuccess) {
  //       alert("Task created successfully");
  //       navigate("/task");
  //   }
  // },[isSuccess,error])

  return (
    // <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded">
    //   <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <input
    //       type="text"
    //       placeholder="Task Name"
    //       value={task.name}
    //       onChange={(e) => setTask({ ...task, name: e.target.value })}
    //       className="w-full p-2 border rounded"
    //       required
    //     />
    //     <textarea
    //       placeholder="Task Description"
    //       value={task.description}
    //       onChange={(e) => setTask({ ...task, description: e.target.value })}
    //       className="w-full p-2 border rounded"
    //       required
    //     />
    //     <button 
    //       type="submit" 
    //       className="bg-blue-600 text-white p-2 rounded w-full disabled:bg-blue-300"
    //       disabled={isLoading}
    //     >
    //       {isLoading ? 'Creating...' : 'Create'}
    //     </button>
    //   </form>
    // </div>
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create Task</h5>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Setup AWS S3 for our project"
            required
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Create a separate folder and add all configuration there"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateTask;

