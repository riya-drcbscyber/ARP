"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const FormElements = () => {
  const [formData, setFormData] = useState({
    reportStartDate: '',
    reportEndDate: '',
    reportType: '',
    reportSend: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key as keyof typeof formData]);
    });

    const response = await fetch('http://localhost:3000/submit-status', {
      method: 'POST',
      body: data,
    });

    const result = await response.json();
    if (response.ok) {
      alert('Form submitted successfully!');
    } else {
      alert(`Failed to submit form: ${result.message}`);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Report" />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          {/* Section for Report Type and Radio Buttons */}
          <div className="rounded-sm border border-stroke bg-gray-50 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Report Status</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Report Status On</label>
                <input
                  type="date"
                  name="reportStartDate"
                  value={formData.reportStartDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Report Till Date</label>
                <input
                  type="date"
                  name="reportEndDate"
                  value={formData.reportEndDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Type of Report</label>
                <input
                  type="text"
                  name="reportType"
                  placeholder="Enter Type of Report"
                  value={formData.reportType}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Report Sent</label>
                <div className="flex gap-5">
                  {['L1 Sent', 'L2 Sent', 'Final Sent'].map((label, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={label}
                        name="reportSend"
                        value={label}
                        onChange={handleChange}
                        className="focus:ring-primary text-primary"
                      />
                      <label htmlFor={label} className="text-sm text-black dark:text-white">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {formData.reportSend && (
            <div className="mt-4">
              <h3 className="font-medium text-black dark:text-white">Auditor Details</h3>
              <table className="min-w-full table-auto mt-2 border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
                    <th className="border border-gray-300 px-4 py-2 dark:border-gray-600">Auditor 1</th>
                    <th className="border border-gray-300 px-4 py-2 dark:border-gray-600">Auditor 2</th>
                    <th className="border border-gray-300 px-4 py-2 dark:border-gray-600">Name of Portal</th>
                    <th className="border border-gray-300 px-4 py-2 dark:border-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white">
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">Hemant</td>
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">Harshita</td>
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">Portal A</td>
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">2024-09-05</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white">
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">Hemant</td>
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">Harshita</td>
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">Portal B</td>
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">2024-09-05</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white">
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">Harsh</td>
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">Yash</td>
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">Portal C</td>
                    <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">2024-09-06</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-between p-5">
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormElements;
