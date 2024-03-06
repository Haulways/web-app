import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const OrderListFilter = () => {
  return (
    <div className="flex md:justify-between md:items-center mt-6 flex-col-reverse md:flex-row">
      <div className="flex space-x-1 h-7">
        <button className="bg-gray-50 text-gray-600 text-xs flex space-x-1 items-center justify-center border border-gray-300 hover:scale-105 transition-ease rounded-md px-1.5 py-0.5 shadow-sm">
          <p className="font-medium text-black">Filter</p>
          <p className="">0</p>
        </button>
        <button className="bg-gray-50 text-xs flex space-x-1 items-center justify-center border border-gray-300 hover:scale-105 transition-ease rounded-md px-1.5 py-0.5 shadow-sm">
          <IoMdAdd className="w-3 h-3" />
        </button>
        <button className="bg-gray-50 text-xs flex space-x-1 items-center justify-center border border-gray-300 hover:scale-105 transition-ease rounded-md px-1.5 py-0.5 shadow-sm">
          Complete
        </button>
        <button className="bg-gray-50 text-xs flex space-x-1 items-center justify-center border border-gray-300 hover:scale-105 transition-ease rounded-md px-1.5 py-0.5 shadow-sm">
          Incomplete
        </button>
      </div>

      <div className="flex items-center p-2 mb-3 md:mb-0 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 space-x-3 w-full md:w-60">
        <CiSearch className="h-5 w-5" />
        <input
          className="input h-5 text-sm placeholder:text-sm"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default OrderListFilter;
