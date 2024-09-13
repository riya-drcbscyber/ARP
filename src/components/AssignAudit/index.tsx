"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const FormElements = () => {
  const initialFormData = {
    websiteName: '',
    workOrder: '',
    documentid: '',
    workOrderDate: '', // Changed this field name
    Auditor1: '',
    Auditor2: '',
    reviewedBy: '',
    organizationCategory: '',
    organizationSector: '',
    auditType: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [employees, setEmployees] = useState<{ employeeCode: string; employeeName: string }[]>([]);
  const [webLinks, setWebLinks] = useState<string[]>(['']);
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const result = await response.json();
        setEmployees(result.employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
        alert('Failed to load employee data. Please try again later.');
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWebLinkChange = (index: number, value: string) => {
    const updatedLinks = [...webLinks];
    updatedLinks[index] = value;
    setWebLinks(updatedLinks);
  };

  const addWebLink = () => {
    setWebLinks([...webLinks, '']);
  };

  const deleteWebLink = (index: number) => {
    const updatedLinks = webLinks.filter((_, i) => i !== index);
    setWebLinks(updatedLinks);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key as keyof typeof formData]);
      });
      webLinks.forEach((link, index) => {
        data.append(`webLinks[${index}]`, link);
      });
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        alert('Task created successfully!');
        setFormData(initialFormData);
        setWebLinks(['']);
      } else {
        throw new Error('Failed to create task');
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  return (
    <>
      {role !== 'Admin' ? (
        <div>You don't have Access</div>
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
                  {[{ label: 'Website Name', name: 'websiteName', placeholder: 'Name' },
                  
                    { label: 'Work Order', name: 'workOrder', placeholder: 'Work Order' },
                    { label: 'Document ID', name: 'documentid', placeholder: 'Document ID' },
                    { label: 'Date of Work Order received', name: 'workOrderDate', placeholder: 'Enter work order received' }].map(({ label, name, placeholder }) => (
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

                  {/* New Dropdown for Category Of Organization */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Category Of Organization</label>
                    <select
                      name="organizationCategory"
                      value={formData.organizationCategory}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black dark:text-white outline-none transition focus:border-primary dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary"
                    >
                      <option value="" disabled>Select Category</option>
                      <option value="Center">Center Ministry /Department organization</option>
                      <option value="Ministry Org.">Pvt. Sector</option>
                      <option value="Public Sector">Public Sector Organization</option>
                      <option value="State Govt.">State Govt.</option>
                    </select>
                  </div>

                  {/* New Dropdown for Sector Of Organization */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Sector Of Organization</label>
                    <select
                      name="organizationSector"
                      value={formData.organizationSector}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black dark:text-white outline-none transition focus:border-primary dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary"
                    >
                      <option value="" disabled>Select Category</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Defence">Defence</option>
                      <option value="Education">Education</option>
                      <option value="Energy">Energy</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Info & Broadcasting">Info & Broadcasting</option>
                      <option value="Info & Communication Technology">Info & Communication Technology</option>
                      <option value="Law Enforcement & Security">Law Enforcement & Security</option>
                      <option value="Public Essential Services and Utilities">Public Essential Services and Utilities</option>
                      <option value="Transportation">Transportation</option>
                    </select>
                  </div>

                  {/* New Dropdown for Type Of Audit */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Type Of Audit</label>
                    <select
                      name="auditType"
                      value={formData.auditType}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black dark:text-white outline-none transition focus:border-primary dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary"
                    >
                      <option value="" disabled>Select Audit Type</option>
                      <option value="API Sec Audit">API Security Audit</option>
                      <option value="Cloud Security Audit">Cloud Security Audit</option>
                      <option value="Compliance Audit">Compliance to Standard /Framework/Policies</option>
                      <option value="Digital Forensics">Digital Forensics</option>
                      <option value="ICS/SCADA Audit">ICS/SCADA Audit</option>
                      <option value="IOT Sec Assessment">IOT Sec Assessment</option>
                      <option value="Mobile Application Sec Audit">Mobile Application Sec. Audit</option>
                      <option value="Network Infra Audit">Network Infra Audit</option>
                      <option value="Process Audit">Process Audit</option>
                      <option value="Red Team Assessment">Red Team Assessment</option>
                      <option value="Source Code Review">Source Code Review</option>
                      <option value="Web Application Sec Audit">Web Application Sec Audit</option>
                      <option value="Wireless Security Audit">Wireless Security Audit</option>
                      <option value="Comprehensive Audit">Comprehensive Audit</option>
                      <option value="Endpoint Security Audit">Endpoint Security Audit</option>
                    </select>
                  </div>

                  {/* Dropdowns for preparedBy and reviewedBy */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Auditor 1</label>
                    <select
                      name="Auditor1"
                      value={formData.Auditor1}
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
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">Auditor 2</label>
                    <select
                      name="Auditor2"
                      value={formData.Auditor2}
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
