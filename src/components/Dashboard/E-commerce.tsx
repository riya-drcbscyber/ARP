"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CompletedTasks from "../CompletedTasks/page";
// import ChartOne from "../Charts/ChartOne";
// import ChartTwo from "../Charts/ChartTwo";
// import ChatCard from "../Chat/ChatCard";
// import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
const ECommerce: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/dashboard-stats')
      .then((response) => response.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6 relative overflow-hidden">
        <h1 className="text-3xl font-bold mb-2">Welcome back to your Daily Task Manager</h1>
        <p className="text-lg">Manage your tasks efficiently and stay productive!</p>
      </div>
      <br />
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
      <br />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2 2xl:gap-8">
        <CardDataStats
          title="Total Number Of Audits"
          total={stats.find((stat) => stat.stat_type === 'total_audits')?.stat_value || 'Loading...'}
          levelUp
        />
        <div className="md:ml-3">
          <CardDataStats
            title="Total Audit Pending"
          total={stats.find((stat) => stat.stat_type === 'total_pending_audits')?.stat_value || 'Loading...'}
          levelUp
          />
        </div>
      </div>
      <CompletedTasks /> {/* Include the CompletedTasks component */}
      <div className="mt-6 grid grid-cols-12 gap-4 xl:mx-2">
        {/* <div className="col-span-12 xl:col-span-15">
          <TableOne />
        </div> */}
      </div>
    </>
  );
};

export default ECommerce;
