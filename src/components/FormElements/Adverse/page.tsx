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
import Link from 'next/link';

const Adverse = () => {
  return (
    <>
      <Breadcrumb pageName="Enter Your Report Type" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-8 py-8 dark:border-strokedark">
            <div className="flex flex-col items-center mt-16 space-y-4">
              <div className="flex justify-center w-full">
                <Link href="/forms/Report">
                  <div className="bg-blue-500 text-white px-8 py-8 rounded-lg text-lg w-55 transition-transform transform hover:scale-105 hover:bg-red cursor-pointer">
                    Web Application
                  </div>
                </Link>
                <br />
              </div>
              <div className="flex justify-center w-full">
                <button className="bg-green-500 text-white px-11 py-7 rounded-lg text-lg w-55 transition-transform transform hover:scale-105 hover:bg-red">
                  AUA-KUA
                </button>
                <br />
              </div>
              <div className="flex justify-center w-full">
                <button className="bg-blue-500 text-white px-8 py-9 rounded-lg text-lg w-55 transition-transform transform hover:scale-105 hover:bg-red">
                  Mobile Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adverse;
