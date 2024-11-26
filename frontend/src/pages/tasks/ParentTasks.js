// src/pages/tasks/ParentTasks.js
import React, { useState } from "react";
import logo from '../../assets/ZAP_QUEST.png';
import coin from '../../assets/coin.png';
import { Link } from "react-router-dom";

function ParentTasks() {
  // Example tasks data
  const [tasks, setTasks] = useState([
    { id: 1, title: "Fold the quilt", status: "Complete", category: "Custom", finishTime: "Oct 24, 2024", postTime: "Oct 24, 2024", points: 1 },
    { id: 2, title: "Complete homework", status: "Incomplete", category: "CTE Pre-Set", postTime: "Oct 24, 2024", points: 5 },
    { id: 3, title: "Do the dishes", status: "Complete", category: "Custom", finishTime: "Oct 24, 2024", postTime: "Oct 24, 2024", points: 2 },
  ]);

  // Dynamic Status for current page
  const [currentPage, setCurrentPage] = useState("tasks");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [newTask, setNewTask] = useState({ title: "", category: "", points: 0 });
  const [statusFilter, setStatusFilter] = useState("all"); // Default: show all tasks
  const [categoryFilter, setCategoryFilter] = useState("all"); // Default: show all categories

  // Filter tasks based on selected status and category
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === "all" || task.status.toLowerCase() === statusFilter;
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const handleAddTask = () => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1, status: "Incomplete", postTime: new Date().toLocaleDateString() }]);
    setIsModalOpen(false); // Close modal after adding the task
    setNewTask({ title: "", category: "", points: 0 }); // Reset new task
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col p-4">
        <div className="flex flex-col items-center mb-8 mt-6">
          <img src={logo} alt="Logo" className="h-20 w-auto mb-2" />
        </div>
        {/*Sidebar Navigation*/}
        <nav className="space-y-4 mt-6">
          <Link
            to="/tasks"
            className={`w-full text-left px-4 py-2 rounded-lg ${
              currentPage === "tasks" ? "text-white bg-gray-800" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage("parent-task")}
          >
            Tasks
          </Link>
          <Link
            to="/rewards"
            className={`w-full text-left px-4 py-2 rounded-lg ${
              currentPage === "rewards" ? "text-white bg-gray-800" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage("rewards")}
          >
            Rewards
          </Link>
          <Link
            to="/community"
            className={`w-full text-left px-4 py-2 rounded-lg ${
              currentPage === "community" ? "text-white bg-gray-800" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage("community")}
          >
            Community
          </Link>
          <Link
            to="/settings"
            className={`w-full text-left px-4 py-2 rounded-lg ${
              currentPage === "setting" ? "text-white bg-gray-800" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage("setting")}
          >
            Setting
          </Link>
          <Link
            to="/notifications"
            className={`w-full text-left px-4 py-2 rounded-lg ${
              currentPage === "notifications" ? "text-white bg-gray-800" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage("notifications")}
          >
            Notifications
          </Link>
        </nav>
      </aside>


      {/* Main Content */}
      <main className="flex-1 bg-sky-80">
        {/* Top Section with White Background */}
        <div className="bg-white">
          <div className="p-6">
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Tasks</h1>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-600"
                onClick={() => setIsModalOpen(true)}
              >
                Add Task
              </button>
            </header>

            {/* Filters */}
            <div className="flex space-x-4">
              <div className="flex flex-col items-start">
                <label htmlFor="statusFilter" className="text-sm text-gray-600 mb-1 pl-1">Status</label>
                <select
                  id="statusFilter"
                  className="px-3 py-2 border rounded-lg bg-gray-200 shadow-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="complete">Complete</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="categoryFilter" className="text-sm text-gray-600 mb-1 pl-1">Category</label>
                <select
                  id="categoryFilter"
                  className="px-3 py-2 border rounded-lg bg-gray-200 shadow-sm"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Custom">Custom</option>
                  <option value="CTE Pre-Set">CTE Pre-Set</option>
                </select>
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="timeFilter" className="text-sm text-gray-600 mb-1 pl-1">Time</label>
                <select
                  id="timeFilter"
                  className="px-3 py-2 border rounded-lg bg-gray-200 shadow-sm"
                >
                  <option>Today's Tasks</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="p-6">
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="font-medium text-lg">{task.title}</h2>
                  <p className="text-sm text-gray-500">
                    {task.finishTime && `Finish Time: ${task.finishTime}`}
                    <br />
                    Post Time: {task.postTime}
                  </p>
                  <p className="text-sm text-gray-400">Category: {task.category}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      task.status === "Complete" ? "bg-green-200 text-green-800" : "bg-purple-200 text-purple-800"
                    }`}
                  >
                    {task.status}
                  </span>
                  <div className="flex items-center space-x-2 text-yellow-500">
                    <span>{task.points}</span>
                    <img src={coin} alt="Coin Icon" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Adding Task */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Category"
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                />
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Points"
                  value={newTask.points}
                  onChange={(e) => setNewTask({ ...newTask, points: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={handleAddTask}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        
      </main>
    </div>
  );
}

export default ParentTasks;
