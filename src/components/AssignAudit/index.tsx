"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const FormElements = () => {
  const initialFormData = {
    websiteName: '',
    organizationName: '',
    workOrder: '',
    preparedBy: '',
    reviewedBy: '',
    documentid: '',
    workOrderdate: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [employees, setEmployees] = useState<{ employeeCode: string; employeeName: string }[]>([]);
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/api/employees');
      const result = await response.json();
      setEmployees(result.employees);
    };
    fetchEmployees();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Task created successfully!');
    } else {
      alert('Failed to create task');
    }
  };
  console.log("role",role);
  return (
    <>
      {role != 'Admin' ? (
        <div>You don't have Access</div> // This renders for Admin role, replace with actual Admin content if needed
      ) : (
        <>
          <Breadcrumb pageName="Assign Task" />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">Assign Task</h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  {[
                    { label: 'Website Name', name: 'websiteName', placeholder: 'Name' },
                    { label: 'Organization Name', name: 'organizationName', placeholder: 'Organization' },
                    { label: 'Work Order', name: 'workOrder', placeholder: 'Work Order' },
                    { label: 'Document ID', name: 'documentid', placeholder: 'Document ID' },
                    { label: 'Date of WorkOrder received', name: 'workOrderdate', placeholder: 'Enter work order received' },
                  ].map(({ label, name, placeholder }) => (
                    <div key={name}>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">{label}</label>
                      <input
                        type="text"
                        name={name}
                        placeholder={placeholder}
                        value={formData[name as keyof typeof formData]}
                        onChange={handleChange}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  ))}

                  {/* Dropdowns for preparedBy and reviewedBy */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Prepared By</label>
                    <select
                      name="preparedBy"
                      value={formData.preparedBy}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) => (
                        <option key={emp.employeeCode} value={emp.employeeCode}>
                          {emp.employeeName} ({emp.employeeCode})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Reviewed By</label>
                    <select
                      name="reviewedBy"
                      value={formData.reviewedBy}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) => (
                        <option key={emp.employeeCode} value={emp.employeeCode}>
                          {emp.employeeName} ({emp.employeeCode})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between p-5">
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
                  >
                    Submit Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(initialFormData)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300"
                  >
                    Clear Form
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default FormElements;
