import { Order } from "@medusajs/medusa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsBoxSeam, BsEmojiSmile, BsSend, BsThreeDots } from "react-icons/bs";
import { IoAlertCircleOutline } from "react-icons/io5";
import { SlReload } from "react-icons/sl";
import { TfiReload } from "react-icons/tfi";
import { Button } from "../../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { actualAmountValue } from "../../../../lib/utils/format";

const Timeline = ({ order }: { order: Order }) => {
  return (
    <section className="h-fit bg-white rounded-lg border flex-grow md:max-w-[40%]">
      <div className="w-full border-b border-gray-200 space-y-3 flex flex-col p-6">
        <div className="flex justify-between items-center">
          <aside className="font-bold text-xl md:text-2xl">Timeline</aside>
          <aside>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="border-none" variant="outline">
                  <BsThreeDots className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white border w-52 p-3 space-y-2 text-sm">
                <button
                  className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                  onClick={() => {}}
                >
                  <SlReload className="w-5 h-5" />
                  <p>Request Return</p>
                </button>
                <button
                  className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                  onClick={() => {}}
                >
                  <TfiReload className="w-5 h-5" />
                  <p>Register Exchange</p>
                </button>
                <button
                  className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                  onClick={() => {}}
                >
                  <IoAlertCircleOutline className="w-5 h-5" />
                  <p>Register Claim</p>
                </button>
              </PopoverContent>
            </Popover>
          </aside>
        </div>

        <div className="flex items-center p-3 mb-3 md:mb-0 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 space-x-3 w-full">
          <BsEmojiSmile className="h-5 w-5 text-gray-300 hover:text-violet-800" />
          <input
            className="input h-5 text-sm placeholder:text-sm"
            placeholder="Search"
          />
          <BsSend className="h-5 w-5 text-gray-300 hover:text-violet-800" />
        </div>
      </div>

      <div className="w-full max-h-[56vh] overflow-y-auto hidden-scrollbar space-y-3 flex flex-col p-6">
        <section className="grid grid-cols-10 text-gray-500 text-sm gap-y-4 mb-9">
          <BsBoxSeam className="w-4 h-4 mt-2 col-span-1 mx-auto" />
          <div className="col-span-9">
            <p className="font-medium text-gray-600">Items Fulfilled</p>
            <p className="">12 days ago</p>

            <section className="flex justify-between items-center text-xs">
              <div className="w-full truncate flex flex-col space-x-2 items-center">
                {order?.items.map((item, i) => (
                  <div
                    key={i}
                    className="w-full flex items-center justify-between rounded p-2 hover:bg-gray-50 transition-ease"
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

                    <p className="font-medium text-violet-600">
                      x{item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <AiOutlineCheckCircle className="w-5 h-5 mt-2 col-span-1 mx-auto" />
          <div className="col-span-9">
            <p className="font-medium text-gray-600">Order Placed</p>
            <p className="">12 days ago • NGN 8,508.00</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Timeline;
