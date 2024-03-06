import { Order } from "@medusajs/medusa";
import { Fragment, useState } from "react";
import { BsBoxSeam, BsThreeDots } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import Status, { Status_Variant } from "../../../common/Status";
import { Button } from "../../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import MarkShipped from "./MarkShipped";

const Fulfillment = ({ order }: { order: Order }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Fragment>
      <div className="flex flex-col space-y-9 border rounded-lg bg-white p-6">
        <section className="flex justify-between items-center">
          <p className="text-xl md:text-3xl font-semibold">Fulfillment</p>

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
        </section>

        <section className="flex flex-col space-y-2">
          <p className="text-gray-500">Shipping Method</p>
          <p>{order.fulfillments[0]?.provider_id}</p>
        </section>

        <section className="flex justify-between">
          <div className="flex flex-col space-y-2">
            <p>
              Fulfillment #{order.fulfillments.length + 1} Fulfilled by Manual
            </p>
            <p className="text-gray-500">
              {order.fulfillments[0]?.shipped_at === null
                ? "Not shipped"
                : "Shipped"}
            </p>
          </div>

          <aside>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="border-none" variant="outline">
                  <BsThreeDots className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white border w-52 p-3 space-y-2 text-sm">
                <button
                  className="w-full px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                  onClick={() => setToggle(true)}
                  // onClick={() => console.log('clicked')}
                >
                  <BsBoxSeam className="w-5 h-5" />
                  <p>Mark Shipped</p>
                </button>
                <button
                  className="w-full px-2 py-1 text-red-500 hover:bg-gray-100 transition-ease flex space-x-2"
                  onClick={() => {}}
                >
                  <FcCancel className="w-5 h-5" />
                  <p>Cancel Fulfillment</p>
                </button>
              </PopoverContent>
            </Popover>
          </aside>
        </section>
      </div>

      {toggle && (
        <MarkShipped
          open={toggle}
          close={() => setToggle(false)}
          order={order}
        />
      )}
    </Fragment>
  );
};

export default Fulfillment;
