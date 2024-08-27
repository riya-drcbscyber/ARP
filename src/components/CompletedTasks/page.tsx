import React, { useEffect, useState } from 'react';

const CompletedTasks: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/completed-tasks') // Update the API endpoint to match your backend
      .then((response) => response.json())
      .then((data) => setCompletedTasks(data));
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Previously Completed Tasks</h2>
      <ul>
        {completedTasks.length > 0 ? (
          completedTasks.map((task, index) => (
            <li key={index} className="mb-2">
              <div className="text-gray-700">
                {task.name} - <span className="text-green-500">Completed</span>
              </div>
            </li>
          ))
        ) : (
          <p>No tasks completed yet.</p>
        )}
      </ul>
    </div>
  );
};

export default CompletedTasks;
