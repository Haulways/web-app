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

const BillingAddress = ({ open, close, order }: Props) => {
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
            <section className="flex flex-col">
              <p className="font-medium text-black">Contact</p>

              <section className="flex flex-col space-y-3 text-sm text-gray-400 w-full pt-2">
                <section className="grid grid-cols-2 grid-flow-row gap-3 w-full">
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="font-medium">First Name</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input defaultValue={order?.customer?.first_name ?? ""} />
                    </span>
                  </div>
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="font-medium">Last Name</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input defaultValue={order?.customer?.last_name ?? ""} />
                    </span>
                  </div>
                </section>
                <section className="grid grid-cols-2 grid-flow-row gap-3 w-full">
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="font-medium">Company</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        placeholder="Company"
                        defaultValue={order?.billing_address?.company ?? ""}
                      />
                    </span>
                  </div>
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="font-medium">Phone</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input defaultValue={order?.customer?.phone ?? ""} />
                    </span>
                  </div>
                </section>
              </section>
            </section>

            <section className="flex flex-col">
              <p className="font-medium text-black">Location</p>

              <section className="flex flex-col space-y-3 text-sm text-gray-400 w-full pt-2">
                <section className="grid grid-cols-2 grid-flow-row gap-3 w-full">
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="font-medium">Address 1</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        placeholder="Address 1"
                        defaultValue={order?.billing_address?.address_1 ?? ""}
                      />
                    </span>
                  </div>
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="font-medium">Address 2</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        placeholder="Address 2"
                        defaultValue={order?.billing_address?.address_2 ?? ""}
                      />
                    </span>
                  </div>
                </section>

                <section className="grid grid-cols-2 grid-flow-row gap-3 w-full">
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="font-medium">Postal code</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        placeholder="0000"
                        defaultValue={order?.billing_address?.postal_code ?? ""}
                      />
                    </span>
                  </div>
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="font-medium">City</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        defaultValue={order?.billing_address?.city ?? ""}
                      />
                    </span>
                  </div>
                </section>

                <section className="grid grid-cols-2 grid-flow-row gap-3 w-full">
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="font-medium">Province</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        placeholder="0000"
                        defaultValue={order?.billing_address?.province ?? ""}
                      />
                    </span>
                  </div>
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="font-medium">Country</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        placeholder="Country"
                        defaultValue={order?.billing_address?.company ?? ""}
                      />
                    </span>
                  </div>
                </section>
              </section>
            </section>
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

export default BillingAddress;
