"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MultiSelect from "@/components/FormElements/MultiSelect";

const Form_second = () => {
  const [location, setLocation] = useState<string>("");
  const [selectedVulnerabilities, setSelectedVulnerabilities] = useState<string[]>([]);
  const [screenshots, setScreenshots] = useState<FileList | null>(null);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleVulnerabilitiesChange = (selectedOptions: string[]) => {
    setSelectedVulnerabilities(selectedOptions);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setScreenshots(e.target.files);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("location", location);
    formData.append("vulnerabilities", JSON.stringify(selectedVulnerabilities));

    if (screenshots) {
      Array.from(screenshots).forEach((file, index) => {
        formData.append(`screenshot_${index}`, file);
      });
    }

    try {
      const response = await fetch("http://localhost:3000/vulnerabilities", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        alert("Form submitted successfully!");
        window.open("http://localhost:3000/report", "_blank");
      } else {
        // Handle errors, e.g., show an error message
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Vulnerability Detail" />
      <div className="flex flex-col gap-9">
        <form
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
          onSubmit={handleSubmit}
        >
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Vulnerable Point/Location
              </label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={handleLocationChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <br></br>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Select Vulnerability/Error
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <MultiSelect
                  id="multiSelect"
                  onChange={handleVulnerabilitiesChange}
                  value={selectedVulnerabilities}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <h3 className="font-medium text-black dark:text-white">
                Upload Screenshot
              </h3>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Attach Screenshot
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-primary-dark hover:shadow-lg focus:bg-primary-dark focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-dark active:shadow-lg transition duration-150 ease-in-out"
                >
                  Final Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form_second;
