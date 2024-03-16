import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ScrollArea } from "../../../ui/scroll-area";
import { Button } from "../../../ui/button";
import { ArrowDownWideNarrow, Edit, Square } from "lucide-react";
import { Input } from "../../Form/Input";
import { IoCheckbox } from "react-icons/io5";
import { useIntersectionObserver } from "usehooks-ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

interface Props<Type> {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  data: Type[];
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const DropDownWithCheckbox = <
  T extends { id: string; value: string; icon?: string | JSX.Element },
>({
  selected,
  setSelected,
  data,
  setDropdown,
  className,
}: Props<T>) => {
  console.log("country", data);
  const handleAllSelection = () => {
    if (selected.length === data.length) {
      setSelected([]);
      return;
    }

    for (const each of data) {
      if (!selected.includes(each.id)) {
        setSelected((prev) => [...prev, each.id]);
      }
    }
  };

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
      <DropdownMenu open={true} onOpenChange={(open) => setDropdown(open)}>
        <DropdownMenuTrigger asChild></DropdownMenuTrigger>
        <DropdownMenuContent className="w-53 space-y-2 text-sm bg-white">
          <Button
            onClick={handleAllSelection}
            variant={"outline"}
            className="h-8"
          >
            <ArrowDownWideNarrow className="w-5 h-5" />
            <p className="ml-2">Select All</p>
          </Button>
          <ScrollArea className="flex flex-col space-y-2">
            {data.map((each, i) => (
              <div
                key={i}
                className="flex space-x-2 items-center text-gray-500 transition-ease hover:cursor-pointer hover:bg-gray-100 px-2"
              >
                <Fragment>
                  {selected.includes(each.value) ? (
                    <IoCheckbox
                      onClick={() =>
                        setSelected(selected.filter((id) => id !== each.id))
                      }
                      className="w-5 h-5 text-purple-600"
                    />
                  ) : (
                    <Square
                      onClick={() =>
                        !selected.includes(each.id) &&
                        setSelected([...selected, each.id])
                      }
                      className="w-5 h-5 text-gray-300"
                    />
                  )}
                </Fragment>
                <p className="link rounded-xl">{each.value}</p>
              </div>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      <span
        onClick={() => setDropdown(false)}
        className="fixed top-0 bottom-0 left-0 right-0 overflow-auto"
      />
    </Fragment>

    // <Fragment>
    //   <div
    //     ref={dropdownContainerRef}
    //     className={`${
    //       className
    //         ? className
    //         : `absolute z-10 ${
    //             "isVisible" ? "left-0 mt-2" : "bottom-0"
    //           } p-2 w-72 max-h-56 overflow-y-auto generic-scrollbar flex flex-col space-y-1 bg-white rounded-md border border-shade-light shadow-xl`
    //     }`}
    //   >
    //     <Button
    //       onClick={handleAllSelection}
    //       variant={"outline"}
    //       className="h-8"
    //     >
    //       <ArrowDownWideNarrow className="w-5 h-5" />
    //       <p className="ml-2">Select All</p>
    //     </Button>

    //   </div>
    //   <span
    //     onClick={() => setDropdown(false)}
    //     className="fixed top-0 bottom-0 left-0 right-0 overflow-auto"
    //   />
    // </Fragment>
  );
};

export default DropDownWithCheckbox;
