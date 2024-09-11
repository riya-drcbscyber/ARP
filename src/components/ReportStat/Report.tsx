"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// Define the type for a single row of report data
interface ReportRow {
  preparedBy: string;
  reviewedBy: string;
  wname: string;
  CurrentReportStatus: string;
}

const FormElements = () => {
  const [formData, setFormData] = useState({
    reportStartDate: '',
    reportEndDate: '',
    reportSend: '',
  });

  // Use the ReportRow type for reportData
  const [reportData, setReportData] = useState<ReportRow[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/get-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setReportData(result); // Update the state with the fetched report data
        alert('Report fetched successfully!');
      } else {
        alert(`Failed to fetch report: ${result.message}`);
      }
    } catch (error) {
      console.error('Error fetching the report:', error);
      alert('An error occurred while fetching the report.');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Report" />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="rounded-sm border border-stroke bg-gray-50 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Report Status</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Report Start Date
                </label>
                <input
                  type="date"
                  name="reportStartDate"
                  value={formData.reportStartDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Report End Date
                </label>
                <input
                  type="date"
                  name="reportEndDate"
                  value={formData.reportEndDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

            </div>
          </div>

          {/* Conditional rendering of the report table */}
          {reportData.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-black dark:text-white">Auditor Details</h3>
              <table className="min-w-full table-auto mt-2 border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
                    <th className="border border-gray-300 px-4 py-2 dark:border-gray-600">Prepared By</th>
                    <th className="border border-gray-300 px-4 py-2 dark:border-gray-600">Reviewed By</th>
                    <th className="border border-gray-300 px-4 py-2 dark:border-gray-600">Portal Name </th>
                    <th className="border border-gray-300 px-4 py-2 dark:border-gray-600">Type of Report send</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row, index) => (
                    <tr key={index} className="border border-gray-300 dark:border-gray-600">
                      <td className="px-4 py-2">{row.preparedBy}</td>
                      <td className="px-4 py-2">{row.reviewedBy}</td>
                      <td className="px-4 py-2">{row.wname}</td>
                      <td className="px-4 py-2">{row.CurrentReportStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          )}

          <div className="flex justify-between p-5">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormElements;
