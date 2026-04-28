import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get("https://taskmanagementbackend-o0bo.onrender.com/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onSubmit = async (data) => {
    await axios.post("https://taskmanagementbackend-o0bo.onrender.com/tasks", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    reset();
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);

    setValue("title", task.title);
    setValue("description", task.description);
    setValue("status", task.status);
  };

  const handleUpdate = async (data) => {
    await axios.put(
      `https://taskmanagementbackend-o0bo.onrender.com/tasks/${editingTask.id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setEditingTask(null);
    reset();
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://taskmanagementbackend-o0bo.onrender.com/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <Navbar />

      <div className="max-w-2xl mx-auto p-4">

        {!editingTask && (
          <div className="bg-white p-4 rounded-xl shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-3">Create Task</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("title")}
                placeholder="Title"
                className="border p-2 mb-2 w-full rounded"
              />

              <input
                {...register("description")}
                placeholder="Description"
                className="border p-2 mb-2 w-full rounded"
              />

              <select
                {...register("status")}
                defaultValue="pending"
                className="border p-2 mb-3 w-full rounded"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                Add Task
              </button>
            </form>
          </div>
        )}

        {editingTask && (
          <div className="bg-white p-4 rounded-xl shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-3">Edit Task</h2>

            <form onSubmit={handleSubmit(handleUpdate)}>
              <input
                {...register("title")}
                className="border p-2 mb-2 w-full rounded"
              />

              <input
                {...register("description")}
                className="border p-2 mb-2 w-full rounded"
              />

              <select
                {...register("status")}
                className="border p-2 mb-3 w-full rounded"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
                  Update Task
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingTask(null);
                    reset();
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded w-full"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <h2 className="text-lg font-semibold mb-3">My Tasks</h2>

        {tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onEdit={handleEdit}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}