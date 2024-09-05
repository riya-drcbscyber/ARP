"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const FormElements = () => {
  const initialFormData = {
    websiteName: '',
    organizationName: '',
    workOrder: '',
    preparedBy: '',
    reviewedBy: '',
    documentid: '',
    workOrderdate: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setFiles(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key as keyof typeof formData]);
    });

    if (files) {
      Array.from(files).forEach((file) => {
        data.append(`files`, file);
      });
    }

    const response = await fetch('http://localhost:3000/submitAssign', {
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
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Fill Details</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {[
                { label: 'Website Name', name: 'websiteName', placeholder: 'Name' },
                { label: 'Name Of Organization', name: 'organizationName', placeholder: 'Name Of Organization' },
                { label: 'Work Order', name: 'workOrder', placeholder: 'Work Order' },
                { label: 'Document Id', name: 'documentid', placeholder: 'Enter Document Id' },
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
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Document Control</h3>
            </div>
            <div></div>
            <div className="flex flex-col gap-3 p-6.5">
              {[
                { label: 'Prepared by', name: 'preparedBy', placeholder: 'Prepared by' },
                { label: 'Verify by', name: 'reviewedBy', placeholder: 'Reviewed by' },
              ].map(({ label, name, placeholder }) => (
                <div className="flex flex-col sm:flex-row items-center gap-2" key={name}>
                  <label className="sm:w-22 text-sm font-medium text-black dark:text-white">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full sm:w-3/4 rounded-lg border-[2px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between p-5">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300"
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormElements;
