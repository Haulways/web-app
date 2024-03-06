import { PublishableApiKey } from "@medusajs/medusa";
import { useCallback, useEffect, useState } from "react";
import { useRedirect } from "react-admin";
import { BsThreeDots } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";

import { Ban, ClipboardCopy, Edit, MoveLeft, MoveRight } from "lucide-react";
import { medusaClient } from "../../../lib/services/medusa";
import Status, { Status_Variant } from "../../common/Status";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as _Table,
} from "../../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { RiDeleteBin6Line } from "react-icons/ri";

const Table = () => {
  const redirect = useRedirect();
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [count, setCount] = useState(0);
  const [data, setData] = useState<PublishableApiKey[]>([]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPage) setPage((prev) => prev + 1);
  };

  const fetchCustomers = useCallback(async () => {
    const data = await medusaClient.admin.publishableApiKeys.list({
      limit: 10,
      offset,
    });
    setData(data.publishable_api_keys);
    setOffset(data.offset);
    setCount(data.count);
    setTotalPage(Math.ceil(data.count / 10));
  }, [page]);

  useEffect(() => {
    fetchCustomers();
  }, [page, offset]);

  return (
    <div>
      <_Table className="shadow-none w-full overflow-auto">
        <TableHeader className="">
          <TableRow className="border-y border-y-gray-300">
            <TableHead>Name</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b border-b-gray-300">
          {data &&
            data.map((publishedKey, i) => (
              <TableRow
                key={i}
                className="border-b-4 border-b-gray-300 hover:cursor-pointer"
                // onClick={() =>
                //   redirect(
                //     "show",
                //     "order",
                //     order.id,
                //     {},
                //     {
                //       order,
                //     },
                //   )
                // }
              >
                <TableCell className="truncate">
                  {publishedKey?.title ?? ""}
                </TableCell>
                <TableCell className="truncate">
                  {publishedKey?.id ?? ""}
                </TableCell>
                <TableCell className="truncate">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {new Date(publishedKey.created_at)
                          .toDateString()
                          .split(" ")
                          .slice(1)
                          .join(" ")}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="">
                          {new Date(publishedKey.created_at).toLocaleString()}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="truncate">
                  <Status
                    active={true}
                    className="flex h-1.5 w-1.5 rounded-full"
                    background={false}
                    border={false}
                    title={"Live" ?? "_"}
                    variant={("live" as string).toLowerCase() as Status_Variant}
                  />
                </TableCell>
                <TableCell className="z-10 flex justify-end items-center pr-5">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        onClick={(e: any) => {
                          e.preventDefault(), e.stopPropagation();
                        }}
                        className="border-none"
                        variant="outline"
                      >
                        <BsThreeDots />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white border w-40 p-3 space-y-1">
                      <button
                        className="w-full px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                        onClick={() => {}}
                      >
                        <Edit className="w-5 h-5" />
                        <p>Edit API key details</p>
                      </button>
                      <button
                        className="w-full px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                        onClick={() => {}}
                      >
                        <Edit className="w-5 h-5" />
                        <p>Edit sales channels</p>
                      </button>
                      <button
                        className="w-full px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                        onClick={() => {}}
                      >
                        <ClipboardCopy className="w-5 h-5" />
                        <p>Copy token</p>
                      </button>
                      <button
                        className="w-full px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                        onClick={() => {}}
                      >
                        <Ban className="w-5 h-5" />
                        <p>Revoke token</p>
                      </button>
                      <button
                        className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease text-red-500 flex space-x-2"
                        onClick={() => {}}
                      >
                        <RiDeleteBin6Line className="w-5 h-5" />
                        <p>Delete</p>
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </_Table>

      <section className="w-full px-3 pt-5 text-gray-500 flex flex-grow items-center justify-between text-sm">
        <aside className="flex items-center space-x-2 flex-grow">
          {page} - {data.length} of {count} API Keys
        </aside>
        <aside className="flex items-center space-x-2 w-fit">
          <p>
            {page} of {totalPage}
          </p>
          <span className="flex space-x-2 text-gray-500 hover:cursor-pointer">
            <MoveLeft className="text-gray-400 w-4" onClick={handlePrev} />
            <MoveRight className="text-gray-400 w-4" onClick={handleNext} />
          </span>
        </aside>
      </section>
    </div>
  );
};

export default Table;
