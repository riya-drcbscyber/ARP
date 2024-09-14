"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ReportData {
  month: string;
  totalReports: number;
}

interface WeeklyData {
  week: string;
  reports: number;
}

interface Employee {
  employeeCode: string;
  employeeName: string;
}

const EmployeeDashboard: React.FC = () => {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<any[]>([]); // Employee-specific tasks
  const [employees, setEmployees] = useState<Employee[]>([]); // Employee dropdown data
  const [monthlyData, setMonthlyData] = useState<ReportData[]>([]); // Monthly report data
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]); // Weekly report data
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch employee data for dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees");
        setEmployees(response.data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch Employee Task Data
  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/employee-stats/${employeeId}`);
      setEmployeeData(response.data);
    } catch (error) {
      console.error("Error fetching employee stats:", error);
    }
  };

  // Fetch Monthly Reports
  const fetchMonthlyReports = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/m-reports`);
      setMonthlyData(response.data);
    } catch (error) {
      console.error("Error fetching monthly reports:", error);
    }
  };

  // Handle bar click to fetch weekly data
  const handleBarClick = async (month: string) => {
    setSelectedMonth(month);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/weekly-reports`, { params: { month } });
      setWeeklyData(response.data);
    } catch (error) {
      console.error("Error fetching weekly reports:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    await Promise.all([fetchEmployeeData(), fetchMonthlyReports()]);
    setLoading(false);
  };

  // Assign colors to bars in the chart
  const getBarColor = (totalReports: number) => {
    if (totalReports === 0) return "#d3d3d3";
    const colors = ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0", "#f7786b", "#32cd32"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto p-4">
        {/* Employee ID Form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="employeeId" className="block text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Select Employee:
          </label>
          <select
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="p-2 rounded border border-gray-300 dark:border-gray-700 w-full"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.employeeCode} value={emp.employeeCode}>
                {emp.employeeName} ({emp.employeeCode})
              </option>
            ))}
          </select>
          <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Submit
          </button>
        </form>

        {/* Dashboard Section */}
        {submitted && !loading && (
          <>
            {/* Task Stats */}
            <div className="mt-8 bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center text-2xl font-bold">
                      GP
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-semibold">Employee ID: {employeeId}</h3>
                      <p className="text-sm opacity-75">Employee task data</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-100 dark:bg-gray-900">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 text-white shadow rounded-lg p-4 text-center">
                    <h4 className="text-lg font-semibold">Total Tasks</h4>
                    <p className="text-4xl font-bold">{employeeData.length}</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow rounded-lg p-4 text-center">
                    <h4 className="text-lg font-semibold">Completed</h4>
                    <p className="text-4xl font-bold">{employeeData.filter(task => task.status === "Completed").length}</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow rounded-lg p-4 text-center">
                    <h4 className="text-lg font-semibold">Pending</h4>
                    <p className="text-4xl font-bold">{employeeData.filter(task => task.status !== "Completed").length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Reports Chart */}
            <div className="mt-8">
              {!selectedMonth ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Reports Sent (Monthly)</h2>
                  <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={monthlyData}
                        onClick={(e) => {
                          if (e && e.activePayload && e.activePayload[0]) {
                            handleBarClick(e.activePayload[0].payload.month);
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
          </>
        )}
        {loading && <p>Loading employee data...</p>}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
