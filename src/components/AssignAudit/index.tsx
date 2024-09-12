"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const FormElements = () => {
  const [formData, setFormData] = useState({
    websiteName: '',
    organizationName: '',
    location: '',
    hashValue: '',
    designation: '',
    email: '',
    workOrder: '',
    errorLocation: '',
    preparedBy: '',
    reviewedBy: '',
    approvedBy: '',
    distributedTo: '',
    reportStartDate: '',
    reportEndDate: '',
    reportid: '',
    documentid: '',
    organizationCategory: '', 
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [webLinks, setWebLinks] = useState<string[]>(['']);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
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

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key as keyof typeof formData]);
    });

    if (files) {
      Array.from(files).forEach((file, index) => {
        data.append(`files`, file);
      });
    }

    // Append web links to the form data
    webLinks.forEach((link, index) => {
      data.append(`webLinks[${index}]`, link);
    });

    const response = await fetch('http://localhost:3000/submit', {
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
              <h3 className="font-medium text-black dark:text-white">Field Details</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {[
                { label: 'Name Of Organization', name: 'organizationName', placeholder: 'Name Of Organization' },
                // { label: 'Website Name', name: 'websiteName', placeholder: 'Website Name' },
                // { label: 'Work Order', name: 'workOrder', placeholder: 'Work Order' },
                // { label: 'Document Id', name: 'documentid', placeholder: 'Enter Document Id' },
                { label: 'Enter Work Order Received on', name: 'wr', placeholder: 'Enter Work Order Received' },
                
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
                  <option value="Private Sector">Public Sector Organization</option>
                  <option value="Private Sector">State Go</option>
                </select>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Sector Of Organization</label>
                <select
                  name="organizationCategory"
                  value={formData.organizationCategory}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black dark:text-white outline-none transition focus:border-primary dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary"
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Agriculture<">Agriculture</option>
                  <option value="Defence">Defence</option>
                  <option value="Education">Education</option>
                  <option value="Energy">Energy</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Info & Broadcasting">Info & Broadcasting</option>
                  <option value="Info & Communication Technology">Info & Communication Technology</option>
                  <option value="Law Enforcement & Security">Law Enforcement & Security</option>
                  <option value="Public Essential Services and utilities space">Public Essential Services and utilities Space </option>
                  <option value="Transportation">Transportation</option>

                </select>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Type Of Audit</label>
                <select
                  name="organizationCategory"
                  value={formData.organizationCategory}
                  onChange={handleChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black dark:text-white outline-none transition focus:border-primary dark:bg-form-input dark:border-form-strokedark dark:focus:border-primary"
                >
                  <option value="" disabled>Select Category</option>
                  <option value="API Sec Audit">API Security Audit </option>
                  <option value="API Sec Audit">Cloud Security Audit </option>
                  <option value="Compliance to Standard /Framework/Policies related audit">Compliance to Standard /Framework/Policies related audit</option>
                  <option value="Digital Forensics">Digital Forensics</option>
                  <option value="Industrial Control System (ICS)/SCADA Audit">Industrial Control System (ICS)/SCADA Audit</option>
                  <option value="IOT Sec Assement">IOT Sec Assement</option>
                  <option value="Mobile Application Sec. Audit">Mobile Application Sec. Audit</option>
                  <option value="Network Infra Audit">Network Infra Audit</option>
                  <option value="Process Audit">Process Audit</option>
                  <option value="Red Team Assement">Red Team Assement</option>
                  <option value="Source Code Review">Source Code Review</option>
                  <option value="Web Application Sec. Audit">Web Application Sec. Audit</option>
                  <option value="Wireless Security Audit">Wireless Security Audit</option>
                  <option value="Comprehensive Audit">Comprehensive Audit</option>
                  <option value="Endpoint sec. Audit">Endpoint Security Audit</option>


                </select>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Details of Web Application / Links</label>
                {webLinks.map((link, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      placeholder={`Link ${index + 1}`}
                      value={link}
                      onChange={(e) => handleWebLinkChange(index, e.target.value)}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => deleteWebLink(index)}
                      className="ml-2 text-red-500 hover:text-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addWebLink}
                  className="mt-2 text-blue-500 underline"
                >
                  + Add another link
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Document Control</h3>
            </div>
            <div className="flex flex-col gap-3 p-6.5">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <label className="sm:w-22 text-sm font-medium text-black dark:text-white">
                  Auditor1
                </label>
                <select
                  name="preparedBy"
                  value={formData.preparedBy}
                  onChange={handleChange}
                  className="w-full sm:w-3/4 rounded-lg border-[2px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="" disabled>Select Auditor1</option>
                  <option value="Auditor A">Auditor A</option>
                  <option value="Auditor B">Auditor B</option>
                  <option value="Auditor C">Auditor C</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <label className="sm:w-22 text-sm font-medium text-black dark:text-white">
                  Auditor2
                </label>
                <select
                  name="reviewedBy"
                  value={formData.reviewedBy}
                  onChange={handleChange}
                  className="w-full sm:w-3/4 rounded-lg border-[2px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="" disabled>Select Auditor2</option>
                  <option value="Auditor X">Auditor X</option>
                  <option value="Auditor Y">Auditor Y</option>
                  <option value="Auditor Z">Auditor Z</option>
                </select>
              </div>

              {/* Reviewed by Dropdown */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <label className="sm:w-22 text-sm font-medium text-black dark:text-white">
                  Reviewed by
                </label>
                <select
                  name="approvedBy"
                  value={formData.approvedBy}
                  onChange={handleChange}
                  className="w-full sm:w-3/4 rounded-lg border-[2px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="" disabled>Select Reviewer</option>
                  <option value="XYZ">XYZ</option>
                  <option value="Reviewer 1">Reviewer 1</option>
                  <option value="Reviewer 2">Reviewer 2</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between p-5">
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormElements;
