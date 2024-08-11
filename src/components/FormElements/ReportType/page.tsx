"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from 'next/link';
const ReportType = () => {
  return (
    <>
      <Breadcrumb pageName="Choose Level" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-8 py-8 dark:border-strokedark">
            <div className="flex flex-col items-center mt-16 space-y-4">
              
              {/* Button 1 */}
              <div className="flex justify-center w-full">
                <Link href="/forms/form-elements">
                  <div className="bg-indigo-500 text-white px-8 py-8 rounded-lg text-lg w-55 transition-transform transform hover:scale-105 hover:bg-indigo-600 cursor-pointer">
                    Level 1 Report
                  </div>
                </Link>
              </div>
              
              {/* Button 2 */}
              <div className="flex justify-center w-full">
                <button className="bg-purple-500 text-white px-6 py-6 rounded-lg text-lg w-55 transition-transform transform hover:scale-105 hover:bg-purple-600">
                  Level 2 Report / Compliance
                </button>
              </div>
              
              {/* Button 3 */}
              <div className="flex justify-center w-full">
                <button className="bg-teal-500 text-white px-8 py-7 rounded-lg text-lg w-55 transition-transform transform hover:scale-105 hover:bg-teal-600">
                  Final Report
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportType;