"use client"; // Add this line

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [reportTotals, setReportTotals] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  const employeeData = {
    name: 'Govind Pareek',
    email: 'Govind [at] drcbscyber [dot] com',
    completions: 200, // Placeholder
    badges: 102, // Placeholder
    certificates: 72, // Placeholder
  };

  interface ReportItem {
    month: number;
    totalReports: number;
  }

  useEffect(() => {
    // Fetch monthly reports data from API
    axios
      .get('http://localhost:3000/m-reports', { params: { auditor: 'Govind Pareek' } })
      .then((response) => {
        const formattedData = response.data.map((item: ReportItem) => ({
          month: new Date(0, item.month - 1).toLocaleString('en', { month: 'long' }),
          total: item.totalReports,
        }));
        setReportTotals(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching report data:', error);
      });
  }, []);

  interface ReportData {
    totalReports: number;
  }

  useEffect(() => {
    if (selectedMonth) {
      const monthNumber = new Date(`${selectedMonth} 1, 2023`);

      axios
        .get('http://localhost:3000/weekly-reports')
        .then((response) => {
          const formattedWeeklyData = response.data.map((item: ReportData, index: number) => ({
            week: `Week ${index + 1}`,
            reports: item.totalReports,
          }));
          setWeeklyData(formattedWeeklyData);
        })
        .catch((error) => {
          console.error('Error fetching weekly report data:', error);
        });
    }
  }, [selectedMonth]);

  interface BarClickData {
    month: string;  // Adjust the type as necessary (e.g., string, number, etc.)
  }

  const handleBarClick = (data: BarClickData) => {
    setSelectedMonth(data.month);
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
                  <BarChart
                    data={reportTotals}
                    onClick={(e) => {
                      if (e && e.activePayload && e.activePayload.length) {
                        handleBarClick(e.activePayload[0].payload);
                      }
                    }}
                  >
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
