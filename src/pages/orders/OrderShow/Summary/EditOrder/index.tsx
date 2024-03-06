import { Order } from "@medusajs/medusa";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { actualAmountValue } from "../../../../../lib/utils/format";
import { Button } from "../../../../ui/button";
import { Dialog, DialogTrigger } from "../../../../ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../ui/popover";
import AddOrder from "../AddOrder";

type Props = {
  open: boolean;
  close: () => void;
  order: Order;
};

const EditOrder = ({ open, close, order }: Props) => {
  const [add, setAdd] = useState(false);

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
              Edit Order
            </p>
            <Button onClick={() => close()} variant={"outline"}>
              <X className="w-5 h-5" />
            </Button>
          </section>

          {!add ? (
            <section className="flex flex-col max-h-[65vh] overflow-y-auto px-3 md:px-8 py-4">
              <section className="flex justify-between items-center">
                <p className="font-medium text-black text-lg">Items</p>

                <div className="flex items-center space-x-2 text-gray-500">
                  <Button onClick={() => setAdd(true)} variant={"outline"}>
                    Add items
                  </Button>
                  <Button onClick={() => close()} variant={"outline"}>
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </section>

              <section className="flex flex-col space-y-2 text-xs md:text-sm text-gray-400 mt-4">
                {order?.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded p-1 md:p-2 text-xs hover:bg-gray-50 transition-ease"
                  >
                    <div className="flex space-x-2 items-center">
                      <img
                        alt={item?.title ?? ""}
                        src={item?.thumbnail ?? ""}
                        className="w-10 h-10"
                      />
                      <div>
                        <p className="flex text-sm items-center justify-center rounded-full">
                          {item?.title ?? ""}
                        </p>
                        <p>{item.variant.length}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <p className="">
                        {order?.currency_code.toUpperCase()}{" "}
                        {actualAmountValue(item?.unit_price ?? 0)}
                      </p>
                      <p>x {item?.quantity ?? 0}</p>
                      <div className="flex space-x-2">
                        <p>
                          {order?.currency_code.toUpperCase()}{" "}
                          {actualAmountValue(
                            item?.unit_price * item?.quantity || 0,
                          )}
                        </p>
                        <p className="hidden md:flex text-gray-400">
                          {order?.currency_code.toUpperCase()}
                        </p>
                      </div>

                      <aside>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button className="border-none " variant="outline">
                              <BsThreeDots className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="bg-white border w-52 p-3 space-y-2 text-sm">
                            <button
                              className="w-full text-left px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                              onClick={() => {}}
                            >
                              <FiCopy className="w-5 h-5" />
                              <p>Duplicate item</p>
                            </button>
                          </PopoverContent>
                        </Popover>
                      </aside>
                    </div>
                  </div>
                ))}
              </section>
            </section>
          ) : (
            <AddOrder close={() => setAdd(false)} order={order} />
          )}

          {!add && (
            <section className="flex justify-end items-center space-x-3 border-t border-t-gray-300 px-8 py-5">
              <Button onClick={close} variant={"outline"}>
                Cancel
              </Button>
              <Button onClick={close} variant={"secondary"}>
                Save and Close
              </Button>
            </section>
          )}

          {add && (
            <section className="flex justify-end items-center space-x-3 border-t border-t-gray-300 px-8 py-5">
              <Button onClick={() => setAdd(false)} variant={"outline"}>
                back
              </Button>
              <Button onClick={() => setAdd(false)} variant={"secondary"}>
                Save and go back
              </Button>
            </section>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default EditOrder;
