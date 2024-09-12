"use client";
import React, { useEffect, useState } from "react";

const ECommerce_new: React.FC = () => {
  const [stats, setStats] = useState<any>({
    totalProject: 0,
    totalEmployees: 0,
    inprogressTasks: 0,
    completedTasks: 0,
  });
  const [showProjects, setShowProjects] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [showEmp, setShowEmp] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeeStatus, setEmployeeStatus] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    // Fetch dashboard stats
    fetch("http://localhost:3000/admin-dashboard-stats")
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Error fetching dashboard stats:", error));
  }, []);

  const handleShowProjects = () => {
    setShowProjects(!showProjects);

    if (!showProjects) {
      fetch("http://localhost:3000/projects")
        .then((response) => response.json())
        .then((data) => setProjects(data))
        .catch((error) => console.error("Error fetching projects:", error));
    }
  };

  const handleTotalEmployee = () => {
    const newShowEmp = !showEmp;
    setShowEmp(newShowEmp);
    if (newShowEmp) {
      fetch("http://localhost:3000/employeesA")
        .then((response) => response.json())
        .then((data) => setEmployees(data))
        .catch((error) => console.error("Error fetching employees:", error));
    }
  };

  const toggleEmployeeStatus = async (employeeId: string) => {
    if (!employeeStatus[employeeId]) {
      try {
        const response = await fetch(`http://localhost:3000/employee-stats/${employeeId}`);
        const data = await response.json();
        setEmployeeStatus((prevStatus) => ({
          ...prevStatus,
          [employeeId]: data,
        }));
      } catch (error) {
        console.error("Error fetching employee task status:", error);
      }
    } else {
      setEmployeeStatus((prevStatus) => ({
        ...prevStatus,
        [employeeId]: null,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-800 p-4 flex justify-between items-center text-white shadow-lg">
        <h1 className="text-2xl font-bold">EMPLOYEE TASK MANAGEMENT SYSTEM</h1>
      </header>

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={handleShowProjects}
            className="cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-6 rounded-lg shadow-xl text-white transform transition-transform duration-300 hover:scale-105"
          >
            <div className="text-5xl font-extrabold">{stats.totalProject}</div>
            <div className="text-lg mt-2">Total Projects</div>
          </div>
          <div
            onClick={handleTotalEmployee}
            className="cursor-pointer bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 p-6 rounded-lg shadow-xl text-white transform transition-transform duration-300 hover:scale-105"
          >
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

        {/* Projects Table */}
        {showProjects && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-xl">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Total Projects</h3>
            <table className="min-w-full bg-white border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-600">Task ID</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-600">Project Name</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition duration-300">
                    <td className="py-4 px-6 border-b text-sm text-gray-700">{project.id}</td>
                    <td className="py-4 px-6 border-b text-sm text-gray-700">{project.websiteName}</td>
                    <td className="py-4 px-6 border-b text-sm text-gray-700">{project.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Employees Table */}
        {showEmp && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-xl">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Total Employees</h3>
            <table className="min-w-full bg-white border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-600">Employee ID</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-600">Employee Name</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-600">Role</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-600">Task Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.employeeId} className="hover:bg-gray-100 transition duration-300">
                    <td className="py-4 px-6 border-b text-sm text-gray-700">{employee.employeeId}</td>
                    <td className="py-4 px-6 border-b text-sm text-gray-700">{employee.name}</td>
                    <td className="py-4 px-6 border-b text-sm text-gray-700">{employee.designation}</td>
                    <td className="py-4 px-6 border-b text-sm text-gray-700">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => toggleEmployeeStatus(employee.employeeId)}
                      >
                        {employeeStatus[employee.employeeId] ? "Hide Status" : "Show Status"}
                      </button>
                      {employeeStatus[employee.employeeId] && (
                        <div className="mt-2">
                          {employeeStatus[employee.employeeId].length > 0 ? (
                            <table className="table-auto border-collapse border border-gray-300">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="border px-4 py-2">Task ID</th>
                                  <th className="border px-4 py-2">Website</th>
                                  <th className="border px-4 py-2">Status</th>
                                  <th className="border px-4 py-2">Work Order Date</th>
                                  <th className="border px-4 py-2">Last Submitted Report</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeStatus[employee.employeeId].map((task: any, index: number) => (
                                  <tr key={index} className="bg-white">
                                    <td className="border px-4 py-2">{task.id}</td>
                                    <td className="border px-4 py-2">{task.websiteName}</td>
                                    <td className="border px-4 py-2">{task.status}</td>
                                    <td className="border px-4 py-2">{task.workOrderDate}</td>
                                    <td className="border px-4 py-2">{task.LastSubmitedReport}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p>No tasks available</p>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 p-4 text-center text-white shadow-inner">
        Employee Task Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default ECommerce_new;
