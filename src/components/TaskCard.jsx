import { Trash2, Edit, CheckCircle, Clock } from "lucide-react";

const TaskCard = ({ task, onUpdate, onDelete, isDeleting }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between transition-transform duration-200 hover:scale-[1.02]">
      <div>
        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
            task.status === "DONE" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {task.status}
        </span>

        {/* Task Name */}
        <h3 className="text-lg font-semibold text-gray-800 mt-2">{task.name}</h3>

        {/* Task Description */}
        <p className="text-gray-500 text-sm mt-1 line-clamp-3">{task.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-xs text-gray-400 flex items-center">
          {task.status === "DONE" ? (
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <Clock className="w-4 h-4 text-yellow-500 mr-1" />
          )}
          {new Date(task.createdAt).toLocaleDateString()}
        </div>

        <div className="flex space-x-2">
          {/* Edit Button */}
          <button
            onClick={() => onUpdate(task)}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all"
            title="Edit Task"
          >
            <span className="flex items-center justify-center w-4 h-4">
              <Edit className="w-4 h-4" />
            </span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(task._id)}
            disabled={isDeleting}
            className={`p-2 rounded-full ${isDeleting ? "bg-red-300" : "bg-red-100 hover:bg-red-200"} text-red-600 transition-all`}
            title="Delete Task"
          >
            <span className="flex items-center justify-center w-4 h-4">
              {isDeleting ? "..." : <Trash2 className="w-4 h-4" />}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
