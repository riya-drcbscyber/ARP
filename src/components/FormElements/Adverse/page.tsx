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

const Adverse = () => {
  return (
    <>
      {/* <Breadcrumb pageName="Vulnerability Detail" /> */}
      <Breadcrumb pageName="Enter Your Report Type" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <div className="flex justify-center mt-16 space-x-4">
        <button className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg w-55 transition-transform transform hover:scale-105 hover:bg-blue-600">
          Level 1 Report
        </button>
        <button className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg w-55 transition-transform transform hover:scale-105 hover:bg-green-600">
          Level 2 Report / Complience
        </button>
      </div>
    </div>
      </div>
      <button className="bg-red text-white px-8 py-4 rounded-lg text-lg w-55 transition-transform transform hover:scale-105 hover:bg-red">
          Finall Report
        </button>
      </div>
      </>
  );
};

export default Adverse;
