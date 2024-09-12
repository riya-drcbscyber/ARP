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
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-blue-800 p-4 flex justify-between items-center text-white shadow-lg">
        <h1 className="text-2xl font-bold">EMPLOYEE TASK MANAGEMENT SYSTEM</h1>
      </header>

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-300">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={handleShowProjects}
            className="cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 p-6 rounded-lg shadow-xl text-white transform transition-transform duration-300 hover:scale-105"
          >
            <div className="text-5xl font-extrabold">{stats.totalProject}</div>
            <div className="text-lg mt-2">Total Projects</div>
          </div>
          <div
            onClick={handleTotalEmployee}
            className="cursor-pointer bg-gradient-to-r from-green-500 via-blue-600 to-indigo-700 p-6 rounded-lg shadow-xl text-white transform transition-transform duration-300 hover:scale-105"
          >
            <div className="text-5xl font-extrabold">{stats.totalEmployees}</div>
            <div className="text-lg mt-2">Total Employees</div>
          </div>
          <div className="bg-gradient-to-r from-lime-400 via-emerald-500 to-teal-700 p-6 rounded-lg shadow-xl text-white transform transition-transform duration-300 hover:scale-105">
            <div className="text-5xl font-extrabold">{stats.inprogressTasks}</div>
            <div className="text-lg mt-2">Inprogress Tasks</div>
          </div>
          <div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-700 p-6 rounded-lg shadow-xl text-white transform transition-transform duration-300 hover:scale-105">
            <div className="text-5xl font-extrabold">{stats.completedTasks}</div>
            <div className="text-lg mt-2">Completed Tasks</div>
          </div>
        </div>

        {/* Projects Table */}
        {showProjects && (
          <div className="mt-8 p-6 bg-gray-800 rounded-xl shadow-xl">
            <h3 className="text-3xl font-bold mb-6 text-gray-200">Total Projects</h3>
            <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-300">Task ID</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-300">Project Name</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition duration-300">
                    <td className="py-4 px-6 border-b text-sm text-gray-400">{project.id}</td>
                    <td className="py-4 px-6 border-b text-sm text-gray-400">{project.websiteName}</td>
                    <td className="py-4 px-6 border-b text-sm text-gray-400">{project.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showEmp && (
          <div className="mt-8 p-6 bg-gray-800 rounded-xl shadow-xl">
            <h3 className="text-3xl font-bold mb-6 text-gray-200">Total Employees</h3>
            <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-300">Employee ID</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-300">Employee Name</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-300">Role</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-300">Task Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.employeeId} className="hover:bg-gray-700 transition duration-300">
                    <td className="py-4 px-6 border-b text-sm text-gray-400">{employee.employeeId}</td>
                    <td className="py-4 px-6 border-b text-sm text-gray-400">{employee.name}</td>
                    <td className="py-4 px-6 border-b text-sm text-gray-400">{employee.designation}</td>
                    <td className="py-4 px-6 border-b text-sm text-gray-400">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => toggleEmployeeStatus(employee.employeeId)}
                      >
                        {employeeStatus[employee.employeeId] ? "Hide Status" : "Show Status"}
                      </button>
                      {employeeStatus[employee.employeeId] && (
                        <div className="mt-2">
                          {employeeStatus[employee.employeeId].length > 0 ? (
                            <table className="table-auto border-collapse border border-gray-700">
                              <thead>
                                <tr className="bg-gray-700">
                                  <th className="border px-4 py-2 text-gray-300">Task ID</th>
                                  <th className="border px-4 py-2 text-gray-300">Website</th>
                                  <th className="border px-4 py-2 text-gray-300">Status</th>
                                  <th className="border px-4 py-2 text-gray-300">Work Order Date</th>
                                  <th className="border px-4 py-2 text-gray-300">Last Submitted Report</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employeeStatus[employee.employeeId].map((task: any, index: number) => (
                                  <tr key={index} className="bg-gray-800 hover:bg-gray-700 transition duration-300">
                                    <td className="border px-4 py-2 text-gray-400">{task.taskId}</td>
                                    <td className="border px-4 py-2 text-gray-400">{task.website}</td>
                                    <td className="border px-4 py-2 text-gray-400">{task.status}</td>
                                    <td className="border px-4 py-2 text-gray-400">{task.workOrderDate}</td>
                                    <td className="border px-4 py-2 text-gray-400">{task.lastSubmittedReport}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-gray-400">No tasks available for this employee.</p>
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
    </div>
  );
};

export default ECommerce_new;
