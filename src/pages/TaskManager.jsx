import TaskList from "../components/TaskList";

const TaskManager = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Tasks</h2>
      <TaskList />
    </div>
  );
};

export default TaskManager;
