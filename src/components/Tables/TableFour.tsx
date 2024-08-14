import { BRAND } from "@/types/brand";
import Image from "next/image";
import DropdownDefault from "../Dropdowns/DropdownDefault";

const brandData: BRAND[] = [
  {
    // logo: "/images/brand/brand-01.svg",
    name: "Aman",
    number: 1,
    pending: 1,
    total: 590,
    final: 4.8,
  },
  {
    // logo: "/images/brand/brand-02.svg",
    name: "Harsh",
    number: 3,
    pending: 1,
    total: 467,
    final: 4.3,
  },
  {
    // logo: "/images/brand/brand-06.svg",
    name: "Hemant",
    number: 5,
    pending: 1,
    total: 420,
    final: 3.7,
  },
  {
    // logo: "/images/brand/brand-04.svg",
    name: "Riya",
    number: 2,
    pending: 1,
    total: 389,
    final: 2.5,
  },
  {
    // logo: "/images/brand/brand-05.svg",
    name: "Amritanshu",
    number: 4,
    pending: 1,
    total: 390,
    final: 4.2,
  },
];

const TableFour: React.FC = () => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">
          <div>
            <h4 className="text-title-sm2 font-bold text-black dark:text-white ">
            Auditor Stats
            </h4>
          </div>
          <DropdownDefault />
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Number
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Pending
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Total
              </h5>
            </div>
          </div>

          {brandData.map((brand, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 ${
                key === brandData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                {/* <div className="h-9 w-full max-w-9 flex-shrink-0">
                  <Image src={brand.logo} width={60} height={50} alt="Brand" />
                </div> */}
                <p className="hidden font-medium text-black dark:text-white sm:block">
                  {brand.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {brand.number}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-meta-3">${brand.pending}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="font-medium text-meta-5">{brand.total}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableFour;
