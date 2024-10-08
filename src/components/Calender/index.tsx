"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import Link from 'next/link';

const Report = () => {
  const slideIn = {
    animation: 'slideIn 1s ease-out forwards',
  };

  const keyframes = `
    @keyframes slideIn {
      0% {
        transform: translateX(-100%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;

  return (
    <div className="flex flex-col items-center h-screen mx-auto max-w-7xl">
      <style>{keyframes}</style>
      <div className="text-center mt-8" style={slideIn}>
        <h1 className="text-4xl font-extrabold text-gray-900 transition-transform transform hover:scale-105">
          Automated Report Tracking System
        </h1>
      </div>
      
      <div className="flex justify-center mt-16 space-x-4">
        <Link href="/forms/Checkbox"> 
          <div className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg w-40 transition-transform transform hover:scale-105 hover:bg-blue-600 cursor-pointer">
            Create Report
          </div>
        </Link>
        <button className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg w-40 transition-transform transform hover:scale-105 hover:bg-green-600">
          Edit Report
        </button>
      </div>
    </div>
  );
};

export default Report;
