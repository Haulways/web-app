import { Customer as CustomerMedusa, Order } from "@medusajs/medusa";
import Avatar from "@mui/material/Avatar";
import { DollarSign, LucideContact2 } from "lucide-react";
import { useRedirect } from "react-admin";
import { AiOutlineMail } from "react-icons/ai";
import { BsThreeDots, BsTruck } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { stringToColor } from "../../../../lib/utils/string_to_color";
import { Button } from "../../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Fragment, useState } from "react";
import TransferOwnership from "./TransferOwnership";
import ShippingAddress from "./ShippingAddress";
import BillingAddress from "./BillingAddress";
import EditEmailAddress from "./EditEmailAddress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

const CustomerComp = ({ customer }: { customer: CustomerMedusa }) => {
  return (
    <>
      {`${customer.first_name?.charAt(0).toUpperCase()}` !== "undefined" ? (
        <div className="truncate flex space-x-3 items-center">
          <Avatar
            sx={{
              width: "40px",
              height: "40px",
              padding: "3px",
              fontSize: "18px",
              bgcolor: stringToColor(
                `${customer.first_name} ${customer.last_name}`,
              ),
            }}
          >
            {customer.first_name?.charAt(0).toUpperCase()}
          </Avatar>
          <div className="flex flex-col justify-center">
            <p className="text-lg text-black">
              {customer.first_name} {customer.last_name}
            </p>
            <aside className="text-gray-400 text-sm">
              {customer.billing_address?.city ?? ""},{" "}
              {customer.billing_address?.country?.display_name ?? ""}
            </aside>
          </div>
        </div>
      ) : (
        <div className="">_</div>
      )}
    </>
  );
};

const Customer = ({ order }: { order: Order }) => {
  const redirect = useRedirect();
  const [toggle, setToggle] = useState(false);
  const [toggleShippingAddress, setToggleShippingAddress] = useState(false);
  const [toggleBillingAddress, setToggleBillingAddress] = useState(false);
  const [toggleEmailAddress, setToggleEmailAddress] = useState(false);

  return (
    <Fragment>
      <div className="flex flex-col space-y-6 border rounded-lg bg-white p-6">
        <section className="flex justify-between items-center">
          <p className="text-xl md:text-3xl font-semibold">Customer</p>

          <aside>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="border-none" variant="outline">
                  <BsThreeDots className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <button
                    className="w-full px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                    onClick={() =>
                      redirect(
                        "show",
                        "customer",
                        order.customer_id,
                        {},
                        {
                          customer: order.customer,
                        },
                      )
                    }
                  >
                    <LucideContact2 className="w-5 h-5" />
                    <p>Go to Customer</p>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="w-full px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                    onClick={() => setToggle(true)}
                  >
                    <FiRefreshCcw className="w-5 h-5" />
                    <p>Transfer Ownership</p>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="w-full px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                    onClick={() => setToggleShippingAddress(true)}
                  >
                    <BsTruck className="w-5 h-5" />
                    <p>Edit Shipping Address</p>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="w-full px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                    onClick={() => setToggleBillingAddress(true)}
                  >
                    <DollarSign className="w-5 h-5" />
                    <p>Edit Billing Address</p>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="w-full px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                    onClick={() => setToggleEmailAddress(true)}
                  >
                    <AiOutlineMail className="w-5 h-5" />
                    <p>Edit Email Address</p>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </aside>
        </section>

        <CustomerComp customer={order.customer} />

        <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <aside className="flex flex-col col-span-1">
            <p className="text-gray-400">Contact</p>
            <p className="text-gray-500 truncate w-[85%]">
              {order?.customer.email}
            </p>
            <p className="text-gray-500 truncate w-[85%]">
              {order?.customer?.phone ?? ""}
            </p>
          </aside>

          <aside className="flex flex-col col-span-1 md:pl-4 md:border-l-2 border-l-gray-300">
            <p className="text-gray-400">Billing</p>
            <p className="text-gray-500 truncate">
              {order.billing_address?.address_1 ?? ""}
            </p>
            <p className="text-gray-500 truncate">
              {order.billing_address?.city ?? ""},{" "}
              {order.billing_address?.province ?? ""}{" "}
              {order.billing_address?.country_code?.toUpperCase() ?? ""}
            </p>
          </aside>

          {
            <aside className="flex flex-col col-span-1 md:pl-4 md:border-l-2 border-l-gray-300">
              <p className="text-gray-400">Shipping</p>
              <p className="text-gray-500 truncate">
                {order?.shipping_address.address_1 ??
                  order?.shipping_address.address_2 ??
                  ""}
              </p>
              <p className="text-gray-500 truncate">
                {order?.shipping_address.city ?? ""},{" "}
                {order?.shipping_address.province ?? ""}{" "}
                {order?.shipping_address.country_code?.toUpperCase() ?? ""}
              </p>
            </aside>
          }
        </section>
      </div>

      {toggle && (
        <TransferOwnership
          open={toggle}
          close={() => setToggle(false)}
          order={order}
        />
      )}

      {toggleShippingAddress && (
        <ShippingAddress
          open={toggleShippingAddress}
          close={() => setToggleShippingAddress(false)}
          order={order}
        />
      )}

      {toggleBillingAddress && (
        <BillingAddress
          open={toggleBillingAddress}
          close={() => setToggleBillingAddress(false)}
          order={order}
        />
      )}

      {toggleEmailAddress && (
        <EditEmailAddress
          open={toggleEmailAddress}
          close={() => setToggleEmailAddress(false)}
          order={order}
        />
      )}
    </Fragment>
  );
};

export default Customer;
