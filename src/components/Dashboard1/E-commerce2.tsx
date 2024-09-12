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
      <header className="bg-blue-800 p-4 flex justify-between items-center text-white shadow-lg">
        <h1 className="text-2xl font-bold">EMPLOYEE TASK MANAGEMENT SYSTEM</h1>
        <div className="flex items-center">
          <span className="mr-2 text-lg">Admin</span>
          {/* <div className="rounded-full bg-gray-300 p-2 shadow-inner">
            <img
              src="/path-to-profile-pic.png"
              alt="Profile"
              className="rounded-full w-8 h-8 object-cover"
            />
          </div> */}
        </div>
      </header>

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-6 rounded-lg shadow-xl text-white transform transition-transform duration-300 hover:scale-105">
            <div className="text-5xl font-extrabold">{stats.totalProject}</div>
            <div className="text-lg mt-2">Total Projects</div>
          </div>
          <div className="bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 p-6 rounded-lg shadow-xl text-white transform transition-transform duration-300 hover:scale-105">
            <div className="text-5xl font-extrabold">{stats.totalEmployees}</div>
            <div className="text-lg mt-2">Total Employees</div>
          </div>
          <div className="bg-gradient-to-r from-lime-300 via-emerald-400 to-teal-600 p-6 rounded-lg shadow-xl text-white transform transition-transform duration-300 hover:scale-105">
            <div className="text-5xl font-extrabold">{stats.inprogressTasks}</div>
            <div className="text-lg mt-2">Inprogress Tasks</div>
          </div>
          <div className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 p-6 rounded-lg shadow-xl text-white transform transition-transform duration-300 hover:scale-105">
            <div className="text-5xl font-extrabold">{stats.completedTasks}</div>
            <div className="text-lg mt-2">Completed Tasks</div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 p-4 text-center text-white shadow-inner">
        Employee Task Management System. All rights reserved.
      </footer>
    </div>
    
  );
};

export default ECommerce_new;
