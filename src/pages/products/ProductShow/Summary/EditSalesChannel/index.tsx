import { SalesChannel } from "@medusajs/medusa";
import { Plus, Undo2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Button } from "../../../../ui/button";
import { Dialog, DialogTrigger } from "../../../../ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../../../../ui/table";
import AddChannels from "../AddChannels";
import { CiSearch } from "react-icons/ci";

type Props = {
  open: boolean;
  close: () => void;
  salesChannels: SalesChannel[];
};

const EditSalesChannel = ({ open, close, salesChannels }: Props) => {
  const [add, setAdd] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedAll, setSelectedAll] = useState(false);

  const handleRemoveAll = () => {};
  const handleSelectAll = () => {};

  useEffect(() => {
    setAdd(false);
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={(prev: any) => close()}>
      <DialogTrigger asChild></DialogTrigger>
      <div
        className={`${
          open ? "fixed" : "hidden"
        } z-50 -top-3 bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm flex items-center justify-center`}
      >
        <div className="bg-white h-fit w-[90%] md:w-[50%] rounded-lg flex flex-col">
          <section className="flex items-center justify-between p-5 md:p-8 border-b border-b-gray-300">
            <div className="flex items-center space-x-3 w-fit">
              {add && (
                <Button
                  onClick={() => setAdd(false)}
                  variant={"outline"}
                  className="py-1 px-2 h-9"
                >
                  <Undo2 className="w-5 h-5" />
                </Button>
              )}

              <p className="text-xl md:text-3xl font-medium text-black">
                {!add ? "Current Sales Channels" : "Add Sales Channels"}
              </p>
            </div>
            <Button onClick={() => close()} variant={"outline"}>
              <X className="w-5 h-5" />
            </Button>
          </section>

          {!add ? (
            <section className="flex flex-col max-h-[65vh] overflow-y-auto px-8 py-4">
              <div className="flex items-center space-x-2 py-2 place-self-end">
                <Button
                  onClick={() => setAdd(true)}
                  variant={"outline"}
                  className="w-fit text-xs px-2 place-self-end py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <p>Add Channels</p>
                </Button>
                <div className="flex items-center p-2 mb-3 md:mb-0 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 space-x-3 w-full md:w-60">
                  <CiSearch className="h-5 w-5" />
                  <input
                    className="input h-5 text-sm placeholder:text-sm"
                    placeholder="Search"
                  />
                </div>
              </div>

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
                  {salesChannels.map((channel, i) => (
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
                      <TableCell className="truncate">
                        {channel?.name ?? ""}
                      </TableCell>
                      <TableCell className="truncate">
                        {channel?.description ?? ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* <section className="w-full px-3 pt-5 text-gray-500 flex flex-grow items-center justify-between text-sm">
        <aside className="flex items-center space-x-2 flex-grow">
          {page} - {data.length} of {count} Products
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
      </section> */}
            </section>
          ) : (
            <AddChannels
              close={() => setAdd(false)}
              salesChannels={salesChannels}
            />
          )}

          {!add && (
            <section className="flex justify-end items-center space-x-3 border-t border-t-gray-300 px-8 py-5">
              <Button onClick={close} variant={"secondary"}>
                Close
              </Button>
            </section>
          )}

          {add && (
            <section className="flex justify-end items-center space-x-3 border-t border-t-gray-300 px-8 py-5">
              <Button onClick={close} variant={"outline"}>
                Cancel
              </Button>
              <Button variant={"secondary"}>Submit and Close</Button>
            </section>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default EditSalesChannel;
