"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Define interfaces for type safety
interface ReportData {
  month: string;
  totalReports: number;
}

const EmployeeDashboard = () => {
  const [monthlyReports, setMonthlyReports] = useState<ReportData[]>([]); // State for monthly reports

  // Fetch monthly reports on component mount
  useEffect(() => {
    const fetchMonthlyReports = async () => {
      try {
        const response = await fetch("http://localhost:3001/m-reports");
        const data: ReportData[] = await response.json();
        setMonthlyReports(data);
      } catch (err) {
        console.error("Error fetching monthly report data:", err);
      }
    };
    fetchMonthlyReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center text-2xl font-bold">
                  GP
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold">Govind Pareek</h3>
                  <p className="text-sm opacity-75">Govind [at] drcbscyber [dot] com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-900">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white shadow rounded-lg p-4 text-center">
                <h4 className="text-lg font-semibold">Total Task</h4>
                <p className="text-4xl font-bold">2</p>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow rounded-lg p-4 text-center">
                <h4 className="text-lg font-semibold">Completed</h4>
                <p className="text-4xl font-bold">102</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow rounded-lg p-4 text-center">
                <h4 className="text-lg font-semibold">Pending</h4>
                <p className="text-4xl font-bold">72</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graph Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Reports Sent (Monthly)</h2>
          <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyReports}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalReports" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
