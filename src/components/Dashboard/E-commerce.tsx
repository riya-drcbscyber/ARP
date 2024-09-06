"use client";
import React, { useEffect, useState } from "react";
import CompletedTasks from "../CompletedTasks/page";
import CardDataStats from "../CardDataStats";

const ECommerce: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<any[]>([]);

  // Assuming you have an employeeCode (you might fetch or pass this based on login session)
  const employeeCode = 'DRCBS-17-005'; // Example employee code, dynamically replace it based on user session

  useEffect(() => {
    // Fetch dashboard stats
    fetch("/api/dashboard-stats")
      .then((response) => response.json())
      .then((data) => setStats(data));

    // Fetch tasks assigned to specific employee
    fetch(`/api/tasks/${employeeCode}`)
      .then((response) => response.json())
      .then((data) => setAssignedTasks(data.tasks));
  }, [employeeCode]);

  return (
    <>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6 relative overflow-hidden">
        <h1 className="text-3xl font-bold mb-2">Welcome back to your Daily Task Manager</h1>
        <p className="text-lg">Manage your tasks efficiently and stay productive!</p>
      </div>

      {/* Project Time Tracker & Task Stats */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <h2 className="text-xl font-bold">Project Time Tracker</h2>
          <div className="mt-2 bg-green-100 text-green-800 rounded-lg p-2 shadow-md">
            <p className="text-2xl font-semibold">
              {stats.find((stat) => stat.stat_type === 'total_hours')?.stat_value || 'Loading...'}
            </p>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Tasks in Process</h2>
          <div className="mt-2 bg-yellow-100 text-yellow-800 rounded-lg p-2 shadow-md">
            <p className="text-2xl font-semibold">
              {stats.find((stat) => stat.stat_type === 'tasks_in_process')?.stat_value || 'Loading...'}
            </p>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">Finished Tasks</h2>
          <div className="mt-2 bg-blue-100 text-blue-800 rounded-lg p-2 shadow-md">
            <p className="text-2xl font-semibold">
              {stats.find((stat) => stat.stat_type === 'finished_tasks')?.stat_value || 'Loading...'}
            </p>
          </div>
        </div>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2 2xl:gap-8">
        <CardDataStats
          title="Total Number Of Audits"
          total={stats.find((stat) => stat.stat_type === "total_audits")?.stat_value || "Loading..."}
          levelUp
        />
        <div className="md:ml-3">
          <CardDataStats
            title="Total Audit Pending"
            total={stats.find((stat) => stat.stat_type === "total_pending_audits")?.stat_value || "Loading..."}
            levelUp
          />
        </div>
      </div>

      {/* Assigned Tasks for Specific Employee */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Assigned Tasks</h2>
        {assignedTasks.length === 0 ? (
          <p className="text-lg text-gray-500">No tasks assigned yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-lg p-6 dark:bg-boxdark dark:border dark:border-strokedark"
              >
                <h2 className="text-xl font-medium text-black mb-2 dark:text-white">{task.websiteName}</h2>
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
                  <strong>Assigned Role:</strong>{" "}
                  {task.preparedBy === employeeCode ? "Prepared By You" : "Reviewed By You"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Work Order Date:</strong>{" "}
                  {new Date(task.workOrderDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Tasks */}
      <CompletedTasks /> {/* Include the CompletedTasks component */}
    </>
  );
};

export default ECommerce;
