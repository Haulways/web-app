import { Order } from "@medusajs/medusa";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import Status, { Status_Variant } from "../../../common/Status";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../../../ui/button";
import { FcCancel } from "react-icons/fc";

const TopDetail = ({ order }: { order: Order }) => {
  return (
    <div className="flex flex-col space-y-6 border rounded-lg bg-white p-6">
      <section className="flex justify-between items-center">
        <div>
          <div className="flex space-x-1 items-center">
            <p className="text-xl md:text-3xl font-semibold">
              #{order?.display_id}
            </p>
            <HiOutlineClipboardCopy className="w-4 h-4" />
          </div>
          <p className="text-sm text-gray-400 mt-3">
            {new Date(order?.created_at ?? "").toDateString()}{" "}
            {new Date(order?.created_at ?? "").toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Status
            active={true}
            className="flex h-1.5 w-1.5 rounded-full"
            background={false}
            border={false}
            title={order?.payment_status ?? "_"}
            variant={
              (order?.payment_status as string).toLowerCase() as Status_Variant
            }
          />

          <aside>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="border-none" variant="outline">
                  <BsThreeDots className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white border w-52 p-3 space-y-2 text-sm">
                <button
                  className="w-full text-left text-red-500 px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                  onClick={() => {}}
                >
                  <FcCancel className="w-5 h-5" />
                  <p>Cancel</p>
                </button>
              </PopoverContent>
            </Popover>
          </aside>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-7">
        <aside className="flex flex-col col-span-1 md:col-span-3">
          <p className="text-gray-400">Email</p>
          <div className="flex space-x-1 items-center">
            <p className="text-gray-500 truncate w-[85%]">
              {order?.customer.email}
            </p>
            <HiOutlineClipboardCopy className="w-3 h-3" />
          </div>
        </aside>
        <aside className="flex flex-col col-span-1 md:col-span-2 md:pl-4 md:border-l-2 border-l-gray-300">
          <p className="text-gray-400">Phone</p>
          <p className="text-gray-500 truncate">{order?.customer.phone}</p>
        </aside>
        <aside className="flex flex-col col-span-1 md:col-span-2 md:pl-4 md:border-l-2 border-l-gray-300">
          <p className="text-gray-400">Payment</p>
          <p className="text-gray-500 truncate">
            {order?.payments[0].provider_id}
          </p>
        </aside>
      </section>
    </div>
  );
};

export default TopDetail;
