import React from "react";
import { Pencil, Trash2, Loader } from "lucide-react";

const TaskCard = ({ task, onUpdate, onDelete, isDeleting = false }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      PENDING: "bg-amber-500",
      DONE: "bg-emerald-500",
    };
    return statusColors[status] || "bg-gray-500";
  };

  return (
    <div className="h-full">
      <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700 space-y-4">
        {/* Task Name and Status */}
        <div className="flex justify-between items-start flex-wrap gap-2">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {task.name}
          </h3>
          <span
            className={`${getStatusColor(
              task.status
            )} text-white px-3 py-1 rounded-full text-sm font-medium inline-block`}
          >
            {task.status}
          </span>
        </div>

        {/* Task Description */}
        {/* <p className="text-gray-600 dark:text-gray-300 leading-relaxed w-full border rounded-md p-2 h-30 overflow-y-auto"> */}
        <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white h-30 overflow-y-auto">
          {task.description}
        </p>

        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => onUpdate(task)}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <Pencil className="w-4 h-4 inline-block mr-2" />
            Update
          </button>
          <button
            onClick={() => onDelete(task._id)}
            disabled={isDeleting}
            className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:bg-red-300"
          >
            {isDeleting ? (
              <Loader className="w-4 h-4 animate-spin inline-block mr-2" />
            ) : (
              <Trash2 className="w-4 h-4 inline-block mr-2" />
            )}
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default TaskCard;
