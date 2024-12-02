import React, { useState, useEffect } from "react";
import { taskService } from '../../services';
import coin from '../../assets/coin.png';
import SideBar from "../../components/SideBar";

function ParentTasks() {
  const [tasks, setTasks] = useState([]);
  const [presetTasks, setPresetTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [taskState, setTaskState] = useState({
    isModalOpen: false,
    editingTask: null,
    newTask: { name: "", setup: "", procedure: "", bonus: 0, label: "" },
    statusFilter: "all",
    expandedTaskId: null,
    taskType: 'custom',
    selectedPresetTask: null,
  });
  // Fetch tasks and preset tasks on component mount
  useEffect(() => {
    fetchTasks();
    fetchPresetTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks('parent');
      setTasks(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPresetTasks = async () => {
    try {
      const response = await taskService.getPresetTasks('parent');
      setPresetTasks(response);
    } catch (err) {
      console.error('Error fetching preset tasks:', err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const { statusFilter } = taskState;
    return statusFilter === "all" || 
      (statusFilter === "complete" && task.finishedAt) || 
      (statusFilter === "incomplete" && !task.finishedAt);
  });

  const handlePresetTaskSelect = async (taskId) => {
    try {
      setLoading(true);
      const taskDetails = await taskService.getPresetTaskDetails('parent', taskId);
      // Automatically fill the form with preset task details
      setTaskState(prev => ({
        ...prev,
        newTask: {
          name: taskDetails.name,
          setup: taskDetails.setup,
          procedure: taskDetails.procedure,
          label: taskDetails.label,
          bonus: 0 // You might want to set a default bonus or get it from taskDetails
        }
      }));
    } catch (err) {
      setError('Error fetching preset task details: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpandedTask = (taskId) => {
    setTaskState(prev => ({ 
      ...prev, 
      expandedTaskId: prev.expandedTaskId === taskId ? null : taskId 
    }));
  };

  const handleAddOrEditTask = async () => {
    try {
      setLoading(true);
      const { newTask, editingTask } = taskState;
      
      const taskData = {
        name: newTask.name,
        setup: newTask.setup,
        procedure: newTask.procedure,
        bonus: parseInt(newTask.bonus) || 0,
        label: newTask.label,
        status: "incomplete"
      };

      if (editingTask) {
        await taskService.updateTask('parent', editingTask.id, taskData);
      } else {
        await taskService.createTask(taskData);
      }

      await fetchTasks();
      
      setTaskState(prev => ({
        ...prev,
        isModalOpen: false,
        newTask: { name: "", setup: "", procedure: "", bonus: 0, label: "" },
        editingTask: null,
        selectedPresetTask: null
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (task) => {
    setTaskState(prev => ({
      ...prev,
      editingTask: task,
      newTask: {
        name: task.name,
        setup: task.setup,
        procedure: task.procedure,
        bonus: task.bonus,
        label: task.label
      },
      isModalOpen: true
    }));
  };

  const handleDeleteClick = async (taskId) => {
    try {
      setLoading(true);
      await taskService.deleteTask(taskId);
      await fetchTasks(); // Refresh task list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex">
      <SideBar />

      <main className="flex-1 bg-sky-80 pl-72">
        <div className="bg-white p-6">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Tasks</h1>
            <button 
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-600" 
              onClick={() => setTaskState(prev => ({ ...prev, isModalOpen: true }))}
            >
              Add Task
            </button>
          </header>

          {/* Only Status Filter */}
          <div className="flex space-x-4">
            <div className="flex flex-col items-start">
              <label className="text-sm text-gray-600 mb-1 pl-1">Status</label>
              <select
                className="px-3 py-2 border rounded-lg bg-gray-200 shadow-sm"
                value={taskState.statusFilter}
                onChange={(e) => setTaskState(prev => ({ 
                  ...prev, 
                  statusFilter: e.target.value 
                }))}
              >
                <option value="all">All</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg m-6">
            {error}
          </div>
        )}

        {/* Task List */}

        {/* Task List */}
        <div className="p-6 space-y-4 pl-9">
          {loading ? (
            <div className="text-center py-4">Loading tasks...</div>
          ) : (
            filteredTasks.map(task => (
                          <div 
                key={task.id} 
                className={`bg-white shadow-md p-4 rounded-lg ${
                  taskState.expandedTaskId === task.id ? "border-2 border-blue-500" : ""
                }`}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleExpandedTask(task.id)}
                >
                  <div>
                    <h2 className="font-medium text-lg">{task.name}</h2>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Status Tag */}
                    <span 
                      className={`px-3 py-1 rounded-full text-sm ${
                        task.finishedAt 
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-violet-100 text-violet-600'
                      }`}
                    >
                      {task.finishedAt ? 'Complete' : 'Incomplete'}
                    </span>
                    {/* Points Display */}
                    <div className="flex items-center space-x-2 text-yellow-500">
                      <span>{task.bonus}</span>
                      <img src={coin} alt="Coin Icon" className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {taskState.expandedTaskId === task.id && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-400">Label: {task.label}</p>
                    <p className="text-sm text-gray-500">
                      Status: {task.finishedAt ? "Complete" : "Incomplete"}
                    </p>
                    <p className="text-sm text-gray-500">Setup: {task.setup}</p>
                    <p className="text-sm text-gray-500">Procedure: {task.procedure}</p>
                    <div className="flex justify-end space-x-4">
                      <button 
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEditClick(task)}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-600 hover:underline"
                        onClick={() => handleDeleteClick(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

       {/* Task Modal */}
       {taskState.isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h2 className="text-xl font-semibold mb-4">
                {taskState.editingTask ? "Edit Task" : "Create New Task"}
              </h2>
              
              <div className="space-y-4">
                {/* Task Type Toggle */}
                <div className="flex justify-between space-x-4">
                  <button
                    className={`w-1/2 py-2 rounded-lg ${
                      taskState.taskType === 'custom' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setTaskState(prev => ({ 
                      ...prev, 
                      taskType: 'custom',
                      newTask: { name: "", setup: "", procedure: "", bonus: 0, label: "" }
                    }))}
                  >
                    Custom
                  </button>
                  <button
                    className={`w-1/2 py-2 rounded-lg ${
                      taskState.taskType === 'CET' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setTaskState(prev => ({ ...prev, taskType: 'CET' }))}
                  >
                    Pre-set
                  </button>
                </div>

                {/* Pre-set Task Selection or Custom Task Input */}
                {taskState.taskType === 'CET' ? (
                  <div className="mb-4">
                    <label className="text-sm">Select Pre-set Task</label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg mt-1"
                      onChange={(e) => handlePresetTaskSelect(parseInt(e.target.value))}
                      disabled={loading}
                    >
                      <option value="">Select a task</option>
                      {presetTasks.map(preset => (
                        <option key={preset.id} value={preset.id}>
                          {preset.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="mb-4">
                    <label className="text-sm">Task Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg mt-1"
                      value={taskState.newTask.name}
                      onChange={(e) => setTaskState(prev => ({
                        ...prev,
                        newTask: { ...prev.newTask, name: e.target.value }
                      }))}
                      disabled={loading}
                    />
                  </div>
                )}

                {/* Common Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm">Setup</label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-lg mt-1"
                      value={taskState.newTask.setup}
                      onChange={(e) => setTaskState(prev => ({
                        ...prev,
                        newTask: { ...prev.newTask, setup: e.target.value }
                      }))}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="text-sm">Procedure</label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-lg mt-1"
                      value={taskState.newTask.procedure}
                      onChange={(e) => setTaskState(prev => ({
                        ...prev,
                        newTask: { ...prev.newTask, procedure: e.target.value }
                      }))}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="text-sm">Points</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-lg mt-1"
                      value={taskState.newTask.bonus}
                      onChange={(e) => setTaskState(prev => ({
                        ...prev,
                        newTask: { ...prev.newTask, bonus: parseInt(e.target.value) }
                      }))}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                    onClick={() => setTaskState(prev => ({ ...prev, isModalOpen: false }))}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={handleAddOrEditTask}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : taskState.editingTask ? 'Save Changes' : 'Add Task'}
                  </button>
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