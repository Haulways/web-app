import { Box, Theme, useMediaQuery } from "@mui/material";
import { useRedirect } from "react-admin";
import { CiSearch } from "react-icons/ci";
import { GiSettingsKnobs } from "react-icons/gi";

const PricingHeading = () => {
  const redirect = useRedirect();
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));

  return (
    <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
      <p className="font-medium text-lg">Price List</p>

      <div className="flex md:hidden items-center p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 space-x-3 w-full">
        <CiSearch className="h-5 w-5" />
        <input
          className="input h-5 text-sm placeholder:text-sm"
          placeholder="Search"
        />
      </div>

      <div className="flex space-x-1">
        <button
          onClick={() => redirect("")}
          className="flex space-x-1 items-center justify-center border border-gray-300 hover:scale-105 transition-ease rounded-md px-3 py-1 text-sm shadow"
        >
          <GiSettingsKnobs className="rotate-90" />
          <p>View</p>
        </button>
        {isDesktop && (
          <div className="flex items-center p-2 mb-3 md:mb-0 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 space-x-3 w-60">
            <CiSearch className="h-5 w-5" />
            <input
              className="input h-5 text-sm placeholder:text-sm"
              placeholder="Search"
            />
          </div>
        )}
        <button className="border border-gray-300 hover:scale-105 transition-ease rounded-md px-3 py-1 text-sm shadow">
          Create New
        </button>
      </div>
    </div>
  );
};

export default PricingHeading;
