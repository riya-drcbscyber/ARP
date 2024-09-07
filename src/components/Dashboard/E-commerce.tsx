"use client";
import React, { useEffect, useState } from "react";
import CompletedTasks from "../CompletedTasks/page";
import CardDataStats from "../CardDataStats";
import { useRouter } from 'next/navigation';

const ECommerce: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<any[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null); // Track selected task
  const [reportType, setReportType] = useState<string>("L1"); // Default report type
  const router = useRouter();

  // Retrieve employeeCode from session storage
  const employeeCode = sessionStorage.getItem('employeeId') || ''; 

  useEffect(() => {
    // Redirect to login if employeeCode is not available
    if (!employeeCode) {
      router.push('/');
      return;
    }

    // Fetch dashboard stats
    fetch(`http://localhost:3000/dashboard-stats/${employeeCode}`)
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error('Error fetching dashboard stats:', error));

    // Fetch tasks assigned to specific employee
    fetch(`http://localhost:3000/tasks/${employeeCode}`)
      .then((response) => response.json())
      .then((data) => setAssignedTasks(data.tasks))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, [employeeCode, router]);

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(prevTaskId => (prevTaskId === taskId ? null : taskId)); // Toggle task selection
  };

  const handleSubmit = (taskId: string) => {
    console.log(`Submitting report for task ${taskId}:`, reportType);

    fetch('http://localhost:3000/submit-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, reportType })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Report submitted:', data);
      setSelectedTaskId(null); // Clear selected task after submission
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
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back to your Daily Task Manager</h1>
        <p className="text-lg">Manage your tasks efficiently and stay productive!</p>
      </div>

      {/* Task Stats */}
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

      {/* Audit Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
        <CardDataStats
          title="Total Number Of Audits"
          total={stats.find(stat => stat.stat_type === "total_audits")?.stat_value || "Loading..."}
        />
        <CardDataStats
          title="Total Audit Pending"
          total={stats.find(stat => stat.stat_type === "total_pending_audits")?.stat_value || "Loading..."}
        />
      </div>

      {/* Assigned Tasks Section */}
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
                <p className="text-sm text-gray-600 mb-1 dark:text-gray-300">
                  <strong>Assigned Role:</strong> {task.preparedBy === employeeCode ? "Prepared By You" : "Reviewed By You"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Work Order Date:</strong> {new Date(task.workOrderDate).toLocaleDateString()}
                </p>

                {/* Report Submission Form */}
                {selectedTaskId === task.id && (
                  <div className="mt-4 p-4 border-t border-gray-300">
                    <h3 className="text-lg font-bold mb-2">Submit Report</h3>
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="L1"
                        name="reportType"
                        value="L1"
                        checked={reportType === "L1"}
                        onChange={(e) => setReportType(e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor="L1" className="mr-4">L1</label>

                      <input
                        type="radio"
                        id="L2"
                        name="reportType"
                        value="L2"
                        checked={reportType === "L2"}
                        onChange={(e) => setReportType(e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor="L2" className="mr-4">L2</label>

                      <input
                        type="radio"
                        id="L3"
                        name="reportType"
                        value="L3"
                        checked={reportType === "L3"}
                        onChange={(e) => setReportType(e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor="L3">Final</label>
                    </div>

                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleSubmit(task.id)}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Tasks Section */}
      <CompletedTasks />
    </>
  );
};

export default ECommerce;
