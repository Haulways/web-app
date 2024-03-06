"use client";

import { Order } from "@medusajs/medusa";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../../../../common/Form/Input";
import { Button } from "../../../../ui/button";
import { Dialog, DialogTrigger } from "../../../../ui/dialog";

type Props = {
  open: boolean;
  close: () => void;
  order: Order;
};

const EditEmailAddress = ({ open, close, order }: Props) => {
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
              Billing Address
            </p>
            <Button onClick={() => close()} variant={"outline"}>
              <X className="w-5 h-5" />
            </Button>
          </section>

          <section className="max-h-[65vh] overflow-y-auto px-8 py-4">
            <div className="flex flex-col col-span-1 space-y-1">
              <p className="font-medium">Email</p>
              <span className="bg-gray-100 overflow-hidden rounded">
                <Input
                  defaultValue={order?.customer?.email ?? ""}
                  type="email"
                />
              </span>
            </div>
          </section>

          <aside className="flex justify-end items-center space-x-3 w-full border-t border-t-gray-300 px-8 py-5">
            <Button onClick={close} variant={"outline"}>
              Cancel
            </Button>
            <Button onClick={close} variant={"secondary"}>
              Save and close
            </Button>
          </aside>
        </div>
      </div>
    </Dialog>
  );
};

export default EditEmailAddress;
