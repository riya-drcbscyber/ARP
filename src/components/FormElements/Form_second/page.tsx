"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
// import SwitcherFour from "@/components/Switchers/SwitcherFour";
// import SwitcherOne from "@/components/Switchers/SwitcherOne";
// import SwitcherThree from "@/components/Switchers/SwitcherThree";
// import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";

const Form_second = () => {
  return (
    <>
      <Breadcrumb pageName="Vulnerability Detail" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Vulnerable Point/Location
              </label>
              <input
                type="text"
                placeholder="Location"
                className="w-half rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                <MultiSelect id="multiSelect" />
              </div>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <h3 className="font-medium text-black dark:text-white">
                POC Upload
              </h3>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Attach POC
                </label>
                <input
                  type="file"
                  multiple
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-primary-dark hover:shadow-lg focus:bg-primary-dark focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-dark active:shadow-lg transition duration-150 ease-in-out"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form_second;
