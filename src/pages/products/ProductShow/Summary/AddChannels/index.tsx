import { MoveLeft, MoveRight, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { IoCheckbox } from "react-icons/io5";
import { medusaClient } from "../../../../../lib/services/medusa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../ui/table";
import { SalesChannel } from "@medusajs/medusa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

type Props = {
  close: () => void;
  salesChannels: SalesChannel[];
};

const AddChannels = ({ close, salesChannels }: Props) => {
  const [add, setAdd] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [data, setData] = useState<SalesChannel[]>([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(Math.ceil(data.length / 10));

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPage) setPage((prev) => prev + 1);
  };

  const handleRemoveAll = () => {};
  const handleSelectAll = () => {};

  const fetchChannels = async () => {
    const data = await medusaClient.admin.salesChannels.list({
      offset,
    });
    console.log(data.offset, data.offset + pageSize);
    setData(data.sales_channels);
    setOffset(data.sales_channels.length + offset);
    setCount(data.count);
    setTotalPage(Math.ceil(data.count / 10));
  };

  useEffect(() => {
    fetchChannels();
  }, [page]);

  useEffect(() => {
    setAdd(false);
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);

  return (
    <section className="flex flex-col max-h-[65vh] overflow-y-auto px-8 py-4">
      <Table className="shadow-none w-full overflow-auto pt-5">
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-10">
              {!selectedAll ? (
                <IoCheckbox
                  onClick={handleRemoveAll}
                  className="text-purple-600 w-5 h-5"
                />
              ) : (
                <MdCheckBoxOutlineBlank
                  onClick={handleSelectAll}
                  className="w-5 h-5"
                />
              )}
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((channel, i) => (
            <TableRow key={i} className="hover:cursor-pointer">
              <TableCell className="truncate">
                {!selectedAll ? (
                  <IoCheckbox
                    onClick={handleRemoveAll}
                    className="text-purple-600 w-5 h-5"
                  />
                ) : (
                  <MdCheckBoxOutlineBlank
                    onClick={handleSelectAll}
                    className="w-5 h-5"
                  />
                )}
              </TableCell>
              <TableCell className="truncate">{channel?.name ?? ""}</TableCell>
              <TableCell className="truncate">
                {channel?.description ?? ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <section className="w-full px-3 pt-5 text-gray-500 flex flex-grow items-center justify-between text-xs md:text-sm">
        <aside className="flex items-center space-x-2 flex-grow">
          {page} - {offset + data.length} of {count} channels
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
    </section>
  );
};

export default AddChannels;
