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
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Auditor Stats
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             Auditor Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
             Total Audit Assign
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Audit Pending
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Level 1 Sent
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Finall Sent
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              {/* <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div> */}
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.number}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.pending}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.total}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.final}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
