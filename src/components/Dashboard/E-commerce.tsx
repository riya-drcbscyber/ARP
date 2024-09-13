"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const ECommerce: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [reportType, setReportType] = useState<string>("L1");
  const [auditStartDate, setAuditStartDate] = useState<string>("");
  const router = useRouter();

  const employeeCode = sessionStorage.getItem('employeeId') || ''; 

  // Fetch completed tasks from backend
  useEffect(() => {
    if (!employeeCode) return;

    fetch(`http://localhost:3000/tasks/${employeeCode}/completed`)
      .then(response => response.json())
      .then(data => setCompletedTasks(data.completedTasks || []))
      .catch(error => console.error('Error fetching completed tasks:', error));
  }, [employeeCode]);

  useEffect(() => {
    if (!employeeCode) {
      router.push('/');
      return;
    }

    fetch(`http://localhost:3000/dashboard-stats/${employeeCode}`)
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error('Error fetching dashboard stats:', error));

    fetch(`http://localhost:3000/tasks/${employeeCode}`)
      .then((response) => response.json())
      .then((data) => setAssignedTasks(data.tasks))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, [employeeCode, router]);

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(prevTaskId => (prevTaskId === taskId ? null : taskId));
  };

  const handleSubmit = (taskId: string) => {
  console.log(`Submitting report for task ${taskId}:`, reportType);

  fetch('http://localhost:3000/submit-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId, reportType, auditStartDate })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Report submitted:', data);
    setSelectedTaskId(null); 

    // If the report type is "Final", update completed tasks
    if (reportType === "Final") {
      fetch(`http://localhost:3000/tasks/${employeeCode}/completed`)
        .then(response => response.json())
        .then(data => {
          // Remove the task from assignedTasks
          const updatedAssignedTasks = assignedTasks.filter(task => task.id !== taskId);
          setAssignedTasks(updatedAssignedTasks);

          // Update the completedTasks state with the newly fetched data
          setCompletedTasks(data.completedTasks || []);
        })
        .catch(error => console.error('Error fetching completed tasks:', error));
    }
  })
  .catch(error => {
    console.error('Error submitting report:', error);
  });
};

  if (!employeeCode) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back to your Daily Task Manager</h1>
        <p className="text-lg">Manage your tasks efficiently and stay productive!</p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <h2 className="text-xl font-bold">Total Tasks</h2>
          <div className="mt-2 bg-green-100 text-green-800 rounded-lg p-2 shadow-md">
            <p className="text-2xl font-semibold">
              {stats.find(stat => stat.stat_type === 'total_tasks')?.stat_value || 'Loading...'}
            </p>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Tasks in Process</h2>
          <div className="mt-2 bg-yellow-100 text-yellow-800 rounded-lg p-2 shadow-md">
            <p className="text-2xl font-semibold">
              {stats.find(stat => stat.stat_type === 'tasks_in_process')?.stat_value || 'Loading...'}
            </p>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Finished Tasks</h2>
          <div className="mt-2 bg-blue-100 text-blue-800 rounded-lg p-2 shadow-md">
            <p className="text-2xl font-semibold">
              {stats.find(stat => stat.stat_type === 'finished_tasks')?.stat_value || 'Loading...'}
            </p>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Assigned Tasks</h2>
        {assignedTasks.length === 0 ? (
          <p className="text-lg text-gray-500">No tasks assigned yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignedTasks.map(task => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-lg p-6 dark:bg-boxdark dark:border dark:border-strokedark"
              >
                <h2
                  className="text-xl font-medium text-black mb-2 dark:text-white cursor-pointer"
                  onClick={() => handleTaskClick(task.id)}
                >
                  {task.websiteName}
                </h2>
                <p className="text-sm text-gray-600 mb-1 dark:text-gray-300">
                  <strong>Organization:</strong> {task.organizationName}
                </p>
                <p className="text-sm text-gray-600 mb-1 dark:text-gray-300">
                  <strong>Work Order:</strong> {task.workOrder}
                </p>
                <p className="text-sm text-gray-600 mb-1 dark:text-gray-300">
                  <strong>Document ID:</strong> {task.documentid}
                </p>
                <p className="text-sm text-green-600 mb-1 dark:text-red-500">
                  <strong>Comment:</strong> {task.comment}
                </p>
                <p className="text-sm text-gray-600 mb-1 dark:text-gray-300">
                  <strong>Assigned Role:</strong> {task.preparedBy === employeeCode ? "Prepared By You" : "Reviewed By You"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Work Order Date:</strong> {new Date(task.workOrderDate).toLocaleDateString()}
                </p>

                {selectedTaskId === task.id && (
                  <div className="mt-4 p-4 border-t border-gray-300">
                    <h3 className="text-lg font-bold mb-2">Submit Report</h3>
                    <div className="flex items-center mb-2">
                      <label htmlFor="auditStartDate" className="mr-4">Audit Start Date:</label>
                      <input
                        type="date"
                        id="auditStartDate"
                        value={auditStartDate}
                        onChange={(e) => setAuditStartDate(e.target.value)}
                        className="border p-2 rounded"
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 ml-4 rounded"
                        onClick={() => handleDateSubmit(task.id)}
                      >
                        Submit Date
                      </button>
                    </div>
                    <div className="flex items-center mb-4">
                      <label className="mr-4">Report Type:</label>
                      <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="border p-2 rounded"
                      >
                        <option value="L1">L1</option>
                        <option value="L2">L2</option>
                        <option value="Final">Final</option>
                      </select>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleSubmit(task.id)}
                    >
                      Submit Report
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Completed Tasks Section */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Completed Tasks</h2>
        {completedTasks.length === 0 ? (
          <p className="text-lg text-gray-500">No completed tasks yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {completedTasks.map(task => (
              <li key={task.id} className="text-lg text-gray-700 dark:text-gray-300">
                {task.websiteName} - {task.organizationName} (Completed on: {new Date(task.completionDate).toLocaleDateString()})
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ECommerce;
