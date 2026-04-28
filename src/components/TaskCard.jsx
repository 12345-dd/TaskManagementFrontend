import React from 'react'

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-3 flex justify-between items-center">  
      <div>
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <p className="text-gray-600 text-sm">{task.description}</p>
        <p className="text-sm mt-1">Status: {task.status}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Update
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
