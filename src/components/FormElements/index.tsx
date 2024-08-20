"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from 'next/link';

const FormElements = () => {
  const [formData, setFormData] = useState({
    websiteName: '',
    organizationName: '',
    testURL: '',
    location: '',
    hashValue: '',
    designation: '',
    email: '',
    workOrder: '',
    errorLocation: '',
    preparedBy: '',
    reviewedBy: '',
    distributedTo: '',
    reportStartDate: '',
    reportEndDate: '',
    reportid: '',
    documentid: '',
    wr: '',
    hr: '',
    UR: '',
    NameofContactPerson: '',
    EmailId: '',
    Designation: '',
  });
  
  const [files, setFiles] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user types
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key] = 'is required'; // Simplified error message
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key as keyof typeof formData]);
    });

    if (files) {
      Array.from(files).forEach((file) => {
        data.append(`files`, file);
      });
    }

    const response = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      body: data,
    });

    const result = await response.json();
    if (response.ok) {
      alert('Form submitted successfully!');
      console.error('Submit response:', result);
    } else {
      alert(`Failed to submit form: ${result.message}`);
      console.error('Error response:', result);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Report" />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Field Details</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {[
                { label: 'Website Name', name: 'websiteName', placeholder: 'Name' },
                { label: 'Name Of Organization', name: 'organizationName', placeholder: 'Name Of Organization' },
                { label: 'Test URL', name: 'testURL', placeholder: 'URL' },
                { label: 'Location', name: 'location', placeholder: 'Location' },
                { label: 'Hash Value', name: 'hashValue', placeholder: 'Hash Value' },
                { label: 'Work Order', name: 'workOrder', placeholder: 'Work Order' },
                { label: 'Report Id', name: 'reportid', placeholder: 'Enter Report Id' },
                { label: 'Document Id', name: 'documentid', placeholder: 'Enter Document Id' },
                { label: 'Enter work order Recieved on', name: 'wr', placeholder: 'Enter work order received' },
                { label: 'Hash Received on', name: 'hr', placeholder: 'Enter hash received on' },
                { label: 'Enter URL received on', name: 'UR', placeholder: 'Enter URL received on' },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">{label}</label>
                  <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className={`w-full rounded-lg border-[1.5px] ${errors[name] ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {errors[name] && <span className="text-red-500 text-sm">{errors[name]}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Enter Dates</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Report Start Date</label>
                <input
                  type="date"
                  name="reportStartDate"
                  value={formData.reportStartDate}
                  onChange={handleChange}
                  className={`w-full rounded-lg border-[1.5px] ${errors['reportStartDate'] ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                />
                {errors['reportStartDate'] && <span className="text-red-500 text-sm">{errors['reportStartDate']}</span>}
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Report End Date</label>
                <input
                  type="date"
                  name="reportEndDate"
                  value={formData.reportEndDate}
                  onChange={handleChange}
                  className={`w-full rounded-lg border-[1.5px] ${errors['reportEndDate'] ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                />
                {errors['reportEndDate'] && <span className="text-red-500 text-sm">{errors['reportEndDate']}</span>}
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Document Control</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {[
                { label: 'Prepared by', name: 'preparedBy', placeholder: 'Prepared by' },
                { label: 'Verify by', name: 'reviewedBy', placeholder: 'Reviewed by' },
              ].map(({ label, name, placeholder }) => (
                <div className="flex items-center" key={name}>
                  <label className="mr-6 whitespace-nowrap text-sm font-medium text-black dark:text-white">{label}</label>
                  <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className={`w-full rounded-lg border-[2px] ${errors[name] ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {errors[name] && <span className="text-red-500 text-sm">{errors[name]}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Document Distribution List</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {[
                { label: 'Name Of Contact Person', name: 'NameofContactPerson', placeholder: 'Name of Contact Person' },
                { label: 'Email ID OF Contact Person', name: 'EmailId', placeholder: 'Email ID' },
                { label: 'Designation Of Contact Person', name: 'Designation', placeholder: 'Designation' },
              ].map(({ label, name, placeholder }) => (
                <div className="flex items-center" key={name}>
                  <label className="mr-6 whitespace-nowrap text-sm font-medium text-black dark:text-white">{label}</label>
                  <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className={`w-full rounded-lg border-[2px] ${errors[name] ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {errors[name] && <span className="text-red-500 text-sm">{errors[name]}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between p-5">
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300">
              Submit
            </button>
            <Link href="/forms/form-element-new" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
              Detailed Observations
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormElements;
