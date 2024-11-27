// src/pages/tasks/ParentTasks.js
import React, { useState } from "react";
import logo from '../../assets/ZAP_QUEST.png';
import coin from '../../assets/coin.png';
import { Link } from "react-router-dom";

function ParentTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Fold the quilt", status: "Complete", category: "Custom", finishTime: "Oct 24, 2024", postTime: "Oct 24, 2024", points: 1 },
    { id: 2, title: "Complete homework", status: "Incomplete", category: "CTE Pre-Set", postTime: "Oct 24, 2024", points: 5 },
    { id: 3, title: "Do the dishes", status: "Complete", category: "Custom", finishTime: "Oct 24, 2024", postTime: "Oct 24, 2024", points: 2 },
  ]);

  const [taskState, setTaskState] = useState({
    currentPage: "tasks",
    isModalOpen: false,
    editingTask: null,
    newTask: { title: "", category: "", points: 0 },
    statusFilter: "all",
    categoryFilter: "all",
    expandedTaskId: null,
    taskType: 'custom', // 'custom' or 'CET'
    selectedPresetTask: null, // Stores selected CET task details
  });

  const [presetTasks] = useState([
    { id: 1, name: 'Complete Homework', reward: 5, label: 'Education', description: 'Complete math homework.' },
    { id: 2, name: 'Do the Dishes', reward: 2, label: 'Household', description: 'Wash the dishes after dinner.' },
  ]);

  const filteredTasks = tasks.filter(task => {
    const { statusFilter, categoryFilter } = taskState;
    const matchesStatus = statusFilter === "all" || task.status.toLowerCase() === statusFilter;
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const handlePageChange = (page) => setTaskState(prev => ({ ...prev, currentPage: page }));

  const toggleExpandedTask = (taskId) => {
    setTaskState(prev => ({ ...prev, expandedTaskId: prev.expandedTaskId === taskId ? null : taskId }));
  };

  const handleAddOrEditTask = () => {
    const { newTask, editingTask, taskType, selectedPresetTask } = taskState;
    if (editingTask) {
      // Edit Task
      setTasks(tasks.map(task => task.id === editingTask.id ? { ...editingTask, ...newTask } : task));
    } else {
      if (taskType === 'custom') {
        // Add Custom Task
        setTasks([...tasks, { ...newTask, id: tasks.length + 1, status: "Incomplete", postTime: new Date().toLocaleDateString() }]);
      } else if (taskType === 'CET' && selectedPresetTask) {
        // Add Preset Task
        setTasks([...tasks, { ...selectedPresetTask, description: newTask.description, id: tasks.length + 1, status: "Incomplete", postTime: new Date().toLocaleDateString() }]);
      }
    }
    setTaskState(prev => ({ ...prev, isModalOpen: false, newTask: { title: "", category: "", points: 0, description: "" }, editingTask: null, selectedPresetTask: null }));
  };

  const handleEditClick = (task) => {
    setTaskState(prev => ({ ...prev, editingTask: task, newTask: { title: task.title, category: task.category, points: task.points }, isModalOpen: true }));
  };

  const handleDeleteClick = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const renderSidebarLink = (to, page, label) => (
    <Link
      to={to}
      className={`w-full text-left px-4 py-2 rounded-lg ${taskState.currentPage === page ? "text-white bg-gray-800" : "text-gray-700 hover:bg-gray-100"}`}
      onClick={() => handlePageChange(page)}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col p-4">
        <div className="flex flex-col items-center mb-8 mt-6">
          <img src={logo} alt="Logo" className="h-20 w-auto mb-2" />
        </div>
        <nav className="space-y-4 mt-6">
          {renderSidebarLink("/tasks", "tasks", "Tasks")}
          {renderSidebarLink("/rewards", "rewards", "Rewards")}
          {renderSidebarLink("/community", "community", "Community")}
          {renderSidebarLink("/settings", "setting", "Settings")}
          {renderSidebarLink("/notifications", "notifications", "Notifications")}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-sky-80">
        {/* Header */}
        <div className="bg-white p-6">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Tasks</h1>
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-600" onClick={() => setTaskState(prev => ({ ...prev, isModalOpen: true }))}>Add Task</button>
          </header>

          {/* Filters */}
          <div className="flex space-x-4">
            {["Status", "Category"].map((label, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <label className="text-sm text-gray-600 mb-1 pl-1">{label}</label>
                <select
                  className="px-3 py-2 border rounded-lg bg-gray-200 shadow-sm"
                  value={taskState[`${label.toLowerCase()}Filter`]}
                  onChange={(e) => setTaskState(prev => ({ ...prev, [`${label.toLowerCase()}Filter`]: e.target.value }))}>
                  <option value="all">All</option>
                  <option value="complete">Complete</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="p-6 space-y-4">
          {filteredTasks.map(task => (
            <div key={task.id} className={`bg-white shadow-md p-4 rounded-lg ${taskState.expandedTaskId === task.id ? "border-2 border-blue-500" : ""}`}>
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpandedTask(task.id)}>
                <div>
                  <h2 className="font-medium text-lg">{task.title}</h2>
                  <p className="text-sm text-gray-500">Post Time: {task.postTime}</p>
                </div>
                <div className="flex items-center space-x-2 text-yellow-500">
                  <span>{task.points}</span>
                  <img src={coin} alt="Coin Icon" className="w-5 h-5" />
                </div>
              </div>

              {taskState.expandedTaskId === task.id && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-400">Category: {task.category}</p>
                  <p className="text-sm text-gray-500">Status: {task.status}</p>
                  <p className="text-sm text-gray-500">Description: {task.description}</p> {/* Add this line */}
                  <div className="flex justify-end space-x-4">
                    <button className="text-blue-600 hover:underline" onClick={() => handleEditClick(task)}>Edit</button>
                    <button className="text-red-600 hover:underline" onClick={() => handleDeleteClick(task.id)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal for Task */}
        {taskState.isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h2 className="text-xl font-semibold mb-4">{taskState.editingTask ? "Edit Task" : "Create New Task"}</h2>
              <div className="space-y-4">
                {/* Task Type Toggle */}
                <div className="flex justify-between space-x-4">
                  <button
                    className={`w-1/2 py-2 rounded-lg ${taskState.taskType === 'custom' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setTaskState(prev => ({ ...prev, taskType: 'custom' }))}>
                    Custom
                  </button>
                  <button
                    className={`w-1/2 py-2 rounded-lg ${taskState.taskType === 'CET' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setTaskState(prev => ({ ...prev, taskType: 'CET' }))}>
                    Preset
                  </button>
                </div>
                

                {/* Task Form */}
                {taskState.taskType === 'CET' ? (
                  <>
                    <label htmlFor="presetTask" className="text-sm">Select Preset Task</label>
                    <select
                      id="presetTask"
                      className="w-full px-3 py-2 border rounded-lg"
                      onChange={(e) => {
                        const selectedTask = presetTasks.find(task => task.id === parseInt(e.target.value));
                        setTaskState(prev => ({ ...prev, selectedPresetTask: selectedTask }));
                      }}
                    >
                      <option value="">Select a Task</option>
                      {presetTasks.map(preset => (
                        <option key={preset.id} value={preset.id}>{preset.name}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <label className="text-sm">Task Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={taskState.newTask.title}
                      onChange={(e) => setTaskState(prev => ({ ...prev, newTask: { ...prev.newTask, title: e.target.value } }))} />
                  </>
                )}

                <label className="text-sm">Description</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  value={taskState.newTask.description}
                  onChange={(e) => setTaskState(prev => ({ ...prev, newTask: { ...prev.newTask, description: e.target.value } }))}
                />

                {/* Points Input */}
                <label className="text-sm">Points</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={taskState.newTask.points}
                  onChange={(e) => setTaskState(prev => ({ ...prev, newTask: { ...prev.newTask, points: parseInt(e.target.value) } }))} />

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                    onClick={() => setTaskState(prev => ({ ...prev, isModalOpen: false }))}>Cancel</button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={handleAddOrEditTask}>{taskState.editingTask ? 'Save Changes' : 'Add Task'}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ParentTasks;
