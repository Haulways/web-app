"use client";

import { Order } from "@medusajs/medusa";
import { AlertCircle, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Input } from "../../../../common/Form/Input";
import { Button } from "../../../../ui/button";
import { Dialog, DialogTrigger } from "../../../../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../ui/tooltip";

type Props = {
  open: boolean;
  close: () => void;
  order: Order;
};

const MarkShipped = ({ open, close, order }: Props) => {
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
              Mark Fulfillment Shipped
            </p>
            <Button onClick={() => close()} variant={"outline"}>
              <X className="w-5 h-5" />
            </Button>
          </section>

          <section className="flex flex-col max-h-[65vh] overflow-y-auto px-8 py-4">
            <p className="font-medium text-black text-lg">Tracking</p>

            <section className="flex flex-col space-y-3 text-sm text-gray-400 mt-4 w-full">
              <div className="flex flex-col col-span-2 space-y-3">
                <p className="font-medium">Tracking number</p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input placeholder="Tracking number..." />
                </span>
              </div>
            </section>

            <Button
              onClick={close}
              variant={"outline"}
              className="place-self-end mt-4"
              disabled
            >
              <Plus className="w-4 h-4" />
              <p>Add Additional Tracking Number</p>
            </Button>
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
                Complete
              </Button>
            </aside>
          </section>
        </div>
      </div>
    </Dialog>
  );
};

export default MarkShipped;
