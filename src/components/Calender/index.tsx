import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const Calendar = () => {
  return (
    <div className="flex flex-col items-center h-screen mx-auto max-w-7xl">
      <div className="text-center mt-8 animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-gray-900 transition-transform transform hover:scale-105">
          Automated Report Tracking System
        </h1>
      </div>
      
      <div className="flex justify-center mt-16 space-x-4">
        <button className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg w-40 transition-transform transform hover:scale-105 hover:bg-blue-600">
          Create Report
        </button>
        <button className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg w-40 transition-transform transform hover:scale-105 hover:bg-green-600">
          Edit Report
        </button>
      </div>
    </div>
  );
};

export default Calendar;
