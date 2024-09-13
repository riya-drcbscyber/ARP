"use client";
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EmployeeDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(null); // State to track the selected month

  const employeeData = {
    name: 'Govind Pareek',
    email: 'Govind [at] drcbscyber [dot] com',
    completions: 2, 
    badges: 102,
    certificates: 72,
    reportsSent: [
      { month: 'January', weeks: [4, 3, 2, 3] },
      { month: 'Feb', weeks: [2, 2, 3, 1] },
      { month: 'March', weeks: [5, 3, 4, 2] },
      { month: 'April', weeks: [3, 2, 2, 3] },
      { month: 'May', weeks: [5, 4, 3, 4] },
      { month: 'June', weeks: [3, 2, 2, 2] },
      { month: 'July', weeks: [4, 3, 3, 2] },
      { month: 'August', weeks: [2, 4, 2, 3] },
      { month: 'Sept', weeks: [3, 2, 4, 1] },
      { month: 'October', weeks: [5, 3, 3, 4] },
      { month: 'Nov', weeks: [2, 4, 3, 2] },
      { month: 'Decm', weeks: [4, 3, 2, 5] },
    ],
  };

  const reportTotals = employeeData.reportsSent.map((monthData) => {
    const total = monthData.weeks.reduce((sum, week) => sum + week, 0);
    return { month: monthData.month, total };
  });

  const handleBarClick = (data) => {
    setSelectedMonth(data.month); 
  };

  const weeklyData = selectedMonth
    ? employeeData.reportsSent.find((monthData) => monthData.month === selectedMonth).weeks.map((weekReports, index) => ({
        week: `Week ${index + 1}`,
        reports: weekReports,
      }))
    : [];

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
                  <h3 className="text-2xl font-semibold">{employeeData.name}</h3>
                  <p className="text-sm opacity-75">{employeeData.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-900">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white shadow rounded-lg p-4 text-center">
                <h4 className="text-lg font-semibold">Total Task</h4>
                <p className="text-4xl font-bold">{employeeData.completions}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow rounded-lg p-4 text-center">
                <h4 className="text-lg font-semibold">Completed</h4>
                <p className="text-4xl font-bold">{employeeData.badges}</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow rounded-lg p-4 text-center">
                <h4 className="text-lg font-semibold">Pending</h4>
                <p className="text-4xl font-bold">{employeeData.certificates}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graph Section */}
        <div className="mt-8">
          {!selectedMonth ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Reports Sent (Monthly)</h2>
              <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reportTotals} onClick={(e) => handleBarClick(e.activePayload[0].payload)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Weekly Reports for {selectedMonth}
              </h2>
              <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reports" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <button
                onClick={() => setSelectedMonth(null)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Back to Monthly
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;