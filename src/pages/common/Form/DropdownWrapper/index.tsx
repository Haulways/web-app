import React, { Fragment, useEffect, useRef } from "react";
import DropDownWithSearch from "./DropDownWithSearch";

type Props = {
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
  className?: string;
};

const DropdownWrapper = ({ setDropdown, children, className }: Props) => {
  let dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && setDropdown(false),
    );

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);

  return (
    <Fragment>
      <div
        ref={dropdownContainerRef}
        className={`${
          className
            ? className
            : `absolute z-10 ${
                "isVisible" ? "left-0 mt-2" : "bottom-0"
              } p-2 w-72 max-h-56 overflow-y-auto generic-scrollbar flex flex-col space-y-1 bg-white rounded-md border border-shade-light shadow-xl`
        }`}
      >
        {children}
      </div>
    </Fragment>
  );
};

export default DropdownWrapper;

export { DropDownWithSearch, DropdownWrapper };
