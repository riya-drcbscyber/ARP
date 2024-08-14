import { BRAND } from "@/types/brand";
//  import Image from "next/image";

const brandData: BRAND[] = [
  {
    // logo: "/images/brand/brand-01.svg",
    name: "Aman",
    number: 1,
    pending: 8,
    total: 4,
    final: 8,
  },
  {
    // logo: "/images/brand/brand-02.svg",
     name: "Hemant",
     number: 3,
    pending: 6,
    total: 1,
    final: 3,
  },
  {
    //  logo: "/images/brand/brand-03.svg",
    name: "Riya",
    number: 5,
    pending: 3,
    total: 4,
    final: 7,
  },
  {
    // logo: "/images/brand/brand-04.svg",
   name: "Harsh",
   number: 2,
   pending: 2,
    total: 5,
   final: 5,
  },
  {
    // logo: "/images/brand/brand-05.svg",
   name: "Amritanshu",
   number: 4,
   pending: 8,
    total: 6,
    final: 2,
  },
];
const TableOne = () => {
  return (
    <div className="rounded-lg border border-gray-300 bg-gray-100 px-6 pb-4 pt-6 shadow-lg dark:border-gray-600 dark:bg-gray-900 sm:px-8 xl:pb-2">
      <h4 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Auditor Stats
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-lg bg-gray-200 dark:bg-gray-700 sm:grid-cols-5">
          <div className="p-3 xl:p-4">
            <h5 className="text-sm font-medium uppercase text-gray-600 dark:text-gray-300">
              Auditor Name
            </h5>
          </div>
          <div className="p-3 text-center xl:p-4">
            <h5 className="text-sm font-medium uppercase text-gray-600 dark:text-gray-300">
              Total Audit Assign
            </h5>
          </div>
          <div className="p-3 text-center xl:p-4">
            <h5 className="text-sm font-medium uppercase text-gray-600 dark:text-gray-300">
              Total Audit Pending
            </h5>
          </div>
          <div className="hidden p-3 text-center sm:block xl:p-4">
            <h5 className="text-sm font-medium uppercase text-gray-600 dark:text-gray-300">
              Level 1 Sent
            </h5>
          </div>
          <div className="hidden p-3 text-center sm:block xl:p-4">
            <h5 className="text-sm font-medium uppercase text-gray-600 dark:text-gray-300">
              Final Sent
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-gray-300 dark:border-gray-600"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-3 xl:p-4">
              {/* <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div> */}
              <p className="text-gray-700 dark:text-gray-200">{brand.name}</p>
            </div>

            <div className="flex items-center justify-center p-3 xl:p-4">
              <p className="text-blue-600 dark:text-blue-400">{brand.number}</p>
            </div>

            <div className="flex items-center justify-center p-3 xl:p-4">
              <p className="text-yellow-600 dark:text-yellow-400">{brand.pending}</p>
            </div>

            <div className="hidden items-center justify-center p-3 sm:flex xl:p-4">
              <p className="text-green-600 dark:text-green-400">{brand.total}</p>
            </div>

            <div className="hidden items-center justify-center p-3 sm:flex xl:p-4">
              <p className="text-purple-600 dark:text-purple-400">{brand.final}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
