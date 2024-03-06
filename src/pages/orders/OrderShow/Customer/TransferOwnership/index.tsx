"use client";

import { Order } from "@medusajs/medusa";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { actualAmountValue } from "../../../../../lib/utils/format";
import Status, { Status_Variant } from "../../../../common/Status";
import { Button } from "../../../../ui/button";
import { Dialog, DialogTrigger } from "../../../../ui/dialog";
import { Select, SelectTrigger, SelectValue } from "../../../../ui/select";
import { Table, TableBody, TableCell, TableRow } from "../../../../ui/table";

type Props = {
  open: boolean;
  close: () => void;
  order: Order;
};

const TransferOwnership = ({ open, close, order }: Props) => {
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
              Transfer order
            </p>
            <Button onClick={() => close()} variant={"outline"}>
              <X className="w-5 h-5" />
            </Button>
          </section>

          <section className="flex flex-col max-h-[65vh] overflow-y-auto px-8 py-4">
            <p className="font-medium text-black text-lg">Order</p>

            <section className="flex flex-col space-y-3 text-sm text-gray-400 w-full">
              <Table className="shadow-none w-full overflow-auto">
                {/* <div className="border rounded-xl p-0.5"> */}
                <TableBody className="">
                  <TableRow className="hover:cursor-pointer border text-xs w-full">
                    <TableCell className="truncate w-10">
                      <div className="flex rounded-md p-1 items-center justify-center bg-gray-100">
                        <p>#{order?.display_id ?? ""}</p>
                      </div>
                    </TableCell>
                    <TableCell className="truncate">
                      {new Date(order?.created_at ?? "").toDateString()}
                    </TableCell>
                    <TableCell className="truncate">
                      <Status
                        active={true}
                        className="flex h-1.5 w-1.5 rounded-full"
                        background={false}
                        border={false}
                        title={order.status ?? "_"}
                        variant={
                          (
                            order.status as string
                          ).toLowerCase() as Status_Variant
                        }
                      />
                    </TableCell>
                    <TableCell className="truncate">
                      <Status
                        active={true}
                        className="flex h-1.5 w-1.5 rounded-full"
                        background={false}
                        border={false}
                        title={order.fulfillment_status ?? "_"}
                        variant={
                          (
                            order.fulfillment_status as string
                          ).toLowerCase() as Status_Variant
                        }
                      />
                    </TableCell>
                    <TableCell className="truncate">
                      <div className="flex space-x-2">
                        <p>
                          {order?.currency_code.toUpperCase()}{" "}
                          {actualAmountValue(order?.cart?.total ?? 0)}
                        </p>
                        <p className="text-gray-400">
                          {order?.currency_code.toUpperCase()}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
                {/* </div> */}
              </Table>
            </section>

            <section className="flex flex-col md:flex-row space-y-3 md:space-x-3 md:items-center md:justify-between text-sm mt-3">
              <aside className="text-gray-600 flex flex-col">
                <p className="black font-medium text-base">Current Owner</p>
                <p className="pt-1">
                  The customer currently related to this order
                </p>
              </aside>
              <aside>
                <Select>
                  <SelectTrigger className="bg-gray-100 text-gray-400 h-10 overflow-hidden rounded">
                    <SelectValue
                      placeholder={`${order.customer.first_name} ${order.customer.last_name} - ${order.customer.email}`}
                    />
                  </SelectTrigger>
                </Select>
              </aside>
            </section>

            <section className="flex flex-col md:flex-row space-y-3 md:space-x-3 md:items-center md:justify-between text-sm mt-3">
              <aside className="text-gray-600 flex flex-col">
                <p className="black font-medium text-base">New Owner</p>
                <p className="pt-1">The customer to transfer this order to</p>
              </aside>
              <aside>
                <Select>
                  <SelectTrigger className="bg-gray-100 text-gray-400 h-10 min-w-[16rem] overflow-hidden rounded">
                    <SelectValue placeholder={`Select...`} />
                  </SelectTrigger>
                </Select>
              </aside>
            </section>
          </section>

          <aside className="flex justify-end items-center space-x-3 w-full border-t border-t-gray-300 px-8 py-5">
            <Button onClick={close} variant={"outline"}>
              Cancel
            </Button>
            <Button onClick={close} variant={"secondary"}>
              Confirm
            </Button>
          </aside>
        </div>
      </div>
    </Dialog>
  );
};

export default TransferOwnership;
