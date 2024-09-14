"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ReportData {
  month: string;
  totalReports: number;
}

interface WeeklyData {
  week: string;
  reports: number;
}

interface BarClickData {
  month: string;
}

const EmployeeDashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [monthlyData, setMonthlyData] = useState<ReportData[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state

  // Fetch Monthly Reports
  const fetchMonthlyReports = async () => {
    try {
      const response = await axios.get('http://localhost:3000/m-reports');
      setMonthlyData(response.data);
    } catch (error) {
      console.error('Error fetching monthly reports:', error);
    }
  };

  // Fetch monthly reports on component mount
  useEffect(() => {
    fetchMonthlyReports();
  }, []);
console.log("haredsjfjdsfjsdlkfjdslkjfdfalsjd");
  // Handle bar click to fetch weekly data
  const handleBarClick = async (data: BarClickData) => {
    if (!data || !data.month) {
      console.error('Invalid month in bar click:', data);
      return;
    }
  
    setSelectedMonth(data.month);
    setLoading(true);
  
    try {
      const response = await axios.get('http://localhost:3000/weekly-reports', { params: { month: data.month } });
      setWeeklyData(response.data);
    } catch (error) {
      console.error('Error fetching weekly reports:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to assign colors based on the number of reports
  const getBarColor = (totalReports: number) => {
    if (totalReports === 0) return '#d3d3d3'; // Gray for months with no data
    const colors = ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0', '#f7786b', '#32cd32'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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
                <p className="text-4xl font-bold">8</p>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow rounded-lg p-4 text-center">
                <h4 className="text-lg font-semibold">Completed</h4>
                <p className="text-4xl font-bold">6</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow rounded-lg p-4 text-center">
                <h4 className="text-lg font-semibold">Pending</h4>
                <p className="text-4xl font-bold">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graph Section */}
        <div className="mt-8">
          {loading ? (
            <p>Loading weekly reports...</p> // Display loading message
          ) : !selectedMonth ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Reports Sent (Monthly)</h2>
              <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={monthlyData}
                    onClick={(e) => {
                      if (e && e.activePayload && e.activePayload[0]) {
                        handleBarClick(e.activePayload[0].payload);
                      }
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalReports" fill="#8884d8" isAnimationActive={false}>
                      {monthlyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry.totalReports)} />
                      ))}
                    </Bar>
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
