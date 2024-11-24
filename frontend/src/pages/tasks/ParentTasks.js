// src/pages/tasks/ParentTasks.js
import React, { useState } from "react";

function ParentTasks() {
  // Example tasks data
  const [tasks] = useState([
    { id: 1, title: "Fold the quilt", status: "Complete", category: "Custom", finishTime: "Oct 24, 2024", postTime: "Oct 24, 2024", points: 1 },
    { id: 2, title: "Complete homework", status: "Incomplete", category: "CTE Pre-Set", postTime: "Oct 24, 2024", points: 5 },
    { id: 3, title: "Do the dishes", status: "Complete", category: "Custom", finishTime: "Oct 24, 2024", postTime: "Oct 24, 2024", points: 2 },
  ]);

  const [statusFilter, setStatusFilter] = useState("all"); // Default: show all tasks
  const [categoryFilter, setCategoryFilter] = useState("all"); // Default: show all categories

  // Filter tasks based on selected status and category
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === "all" || task.status.toLowerCase() === statusFilter;
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-50 shadow-md flex flex-col p-4">
        <div className="flex items-center space-x-3 mb-8">
          {/* Logo */}
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span>Logo</span>
          </div>
          <span className="font-semibold text-lg">Tasks</span>
        </div>
        <nav className="space-y-4">
          <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            Tasks
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            Rewards
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            Community
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            Setting
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            Notifications
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-sky-50 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add Task
          </button>
        </header>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
            <div className="flex flex-col items-start">
                <label htmlFor="statusFilter" className="text-sm text-gray-600 mb-1">Filter by Status</label>
                <select
                id="statusFilter"
                className="px-3 py-2 border rounded-lg bg-white shadow-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                >
                <option value="all">All</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
                </select>
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="categoryFilter" className="text-sm text-gray-600 mb-1">Filter by Category</label>
                <select
                id="categoryFilter"
                className="px-3 py-2 border rounded-lg bg-white shadow-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                >
                <option value="all">All</option>
                <option value="Custom">Custom</option>
                <option value="CTE Pre-Set">CTE Pre-Set</option>
                </select>
            </div>
            <div className="flex flex-col items-start">
                <label htmlFor="timeFilter" className="text-sm text-gray-600 mb-1">Filter by Time</label>
                <select
                id="timeFilter"
                className="px-3 py-2 border rounded-lg bg-white shadow-sm"
                >
                <option>Today's Tasks</option>
                </select>
            </div>
            </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between">
              <div>
                <h2 className="font-medium text-lg">{task.title}</h2>
                <p className="text-sm text-gray-500">
                  {task.finishTime && `Finish Time: ${task.finishTime}`}
                  <br />
                  Post Time: {task.postTime}
                </p>
                <p className="text-sm text-gray-400">Category: {task.category}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full ${
                    task.status === "Complete" ? "bg-green-200 text-green-800" : "bg-purple-200 text-purple-800"
                  }`}
                >
                  {task.status}
                </span>
                <span className="flex items-center text-yellow-500">
                  <span>{task.points}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3.75l7.438 7.347M12 3.75v16.5M12 3.75L4.562 11.097m0 0l7.438 7.347M12 20.25l7.438-7.347"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ParentTasks;
