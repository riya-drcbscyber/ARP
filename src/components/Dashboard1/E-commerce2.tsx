"use client";
import React, { useEffect, useState } from "react";

const ECommerce_new: React.FC = () => {
  const [stats, setStats] = useState<any>({
     totalProject: 0,
    totalEmployees: 0,
    inprogressTasks: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    fetch('/api/dashboard-stats')
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error('Error fetching dashboard stats:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-800 p-4 flex justify-between items-center text-white">
        <h1 className="text-xl font-bold">EMPLOYEE TASK MANAGEMENT SYSTEM</h1>
        <div className="flex items-center">
          <span className="mr-2">Admin</span>
          <div className="rounded-full bg-gray-200 p-2">
            <img
              src="/path-to-profile-pic.png"
              alt="Profile"
              className="rounded-full w-8 h-6"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-orange-500 p-4 rounded-lg shadow-lg text-white">
            <div className="text-4xl font-bold">{stats.totalProject}</div>
            <div className="text-lg">Total Project Till Date</div>
          </div>
          <div className="bg-blue-500 p-4 rounded-lg shadow-lg text-white">
            <div className="text-4xl font-bold">{stats.totalEmployees}</div>
            <div className="text-lg">Total Employees</div>
          </div>
          <div className="bg-pink-500 p-4 rounded-lg shadow-lg text-white">
            <div className="text-4xl font-bold">{stats.inprogressTasks}</div>
            <div className="text-lg">Inprogress Tasks</div>
          </div>
          <div className="bg-teal-500 p-4 rounded-lg shadow-lg text-white">
            <div className="text-4xl font-bold">{stats.completedTasks}</div>
            <div className="text-lg">Completed Tasks</div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 p-4 text-center text-white">
        Employee Task Management System. All rights reserved
      </footer>
    </div>
  );
};

export default ECommerce_new;
