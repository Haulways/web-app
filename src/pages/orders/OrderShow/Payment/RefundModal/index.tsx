"use client";

import { Order } from "@medusajs/medusa";
import { AlertCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input, TextArea } from "../../../../common/Form/Input";
import { Button } from "../../../../ui/button";
import { Dialog, DialogTrigger } from "../../../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../../../../ui/select";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import {
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
  Tooltip,
} from "../../../../ui/tooltip";

type Props = {
  open: boolean;
  close: () => void;
  order: Order;
};

const RefundModal = ({ open, close, order }: Props) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
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
          <section className="flex items-center justify-between p-5 border-b border-b-gray-300">
            <p className="text-xl md:text-3xl font-medium text-black">
              Create a refund
            </p>
            <Button onClick={() => close()} variant={"outline"}>
              <X className="w-5 h-5" />
            </Button>
          </section>

          <section className="flex flex-col max-h-[65vh] overflow-y-auto px-8 py-4">
            <p className="font-medium text-black text-lg">Details</p>

            <section className="flex flex-col space-y-3 text-sm text-gray-400 mt-4 w-full">
              <section className="grid grid-cols-10 grid-flow-row gap-3 w-full">
                <div className="flex flex-col col-span-2 space-y-3">
                  <p className="font-medium">Currency</p>
                  <span className="bg-gray-100 overflow-hidden rounded">
                    <Input
                      defaultValue={order.currency_code.toUpperCase()}
                      disabled
                    />
                  </span>
                </div>
                <div className="flex flex-col space-y-3 col-span-8">
                  <p className="font-medium">Refund Amount</p>
                  <div className="flex flex-col space-y-2">
                    <span className="bg-gray-100 overflow-hidden rounded-md flex items-center px-3 border border-gray-300">
                      <p className="text-gray-400">
                        {order.currency?.symbol_native}
                      </p>
                      <Input
                        id="currency"
                        placeholder="0.00"
                        className="border-none -ml-4"
                        min={0}
                        type="number"
                      />
                    </span>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex flex-col space-y-3">
                  <p className="font-medium">Reason</p>
                  <Select>
                    <SelectTrigger className="bg-gray-100 h-10 overflow-hidden rounded">
                      <SelectValue placeholder="Choose currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"Discount"}>{"Discount"}</SelectItem>
                      <SelectItem value={"Other"}>{"Other"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </section>

              <section>
                <div className="flex flex-col space-y-3">
                  <p className="font-medium">Note</p>
                  <span className="bg-gray-100 overflow-hidden rounded">
                    <TextArea placeholder="Discount for loyal customer" />
                  </span>
                </div>
              </section>
            </section>
          </section>

          <section className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:justify-between md:items-center space-x-3 border-t border-t-gray-300 px-8 py-5">
            <aside className="flex items-center space-x-2 text-gray-500 w-fit">
              {selected ? (
                <IoCheckbox
                  onClick={() => setSelected(false)}
                  className="text-purple-600 w-4 h-4 hover:cursor-pointer"
                />
              ) : (
                <MdCheckBoxOutlineBlank
                  onClick={() => setSelected(true)}
                  className="w-4 h-4 hover:cursor-pointer"
                />
              )}

              <div className="flex items-center space-x-1">
                <p className="text-sm">Send notifications</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button>
                        <AlertCircle className="w-3 h-3" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="z-10">
                        Notify customer of created returnNotify customer of
                        created return
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </aside>
            <aside className="flex md:justify-end items-center space-x-3 w-fit">
              <Button onClick={close} variant={"outline"}>
                Cancel
              </Button>
              <Button onClick={close} variant={"secondary"}>
                Save and Close
              </Button>
            </aside>
          </section>
        </div>
      </div>
    </Dialog>
  );
};

export default RefundModal;
