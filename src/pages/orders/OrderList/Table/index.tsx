import { Customer, Order } from "@medusajs/medusa";
import { useCallback, useEffect, useState } from "react";
import { useListContext, useRedirect } from "react-admin";
import { medusaClient } from "../../../../lib/services/medusa";
import Status, { Status_Variant } from "../../../common/Status";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as _Table,
} from "../../../ui/table";
import ReactCountryFlag from "react-country-flag";
import { actualAmountValue } from "../../../../lib/utils/format";
import { Avatar } from "@mui/material";
import { stringToColor } from "../../../../lib/utils/string_to_color";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../ui/tooltip";

const CustomerComp = ({ customer }: { customer: Customer }) => {
  return (
    <>
      {`${customer.first_name?.charAt(0).toUpperCase()}` !== "undefined" ? (
        <div className="truncate flex space-x-2">
          <Avatar
            sx={{
              width: "20px",
              height: "20px",
              padding: "3px",
              fontSize: "14px",
              bgcolor: stringToColor(
                `${customer.first_name} ${customer.last_name}`,
              ),
            }}
          >
            {customer.first_name?.charAt(0).toUpperCase()}
          </Avatar>
          <p>
            {customer.first_name} {customer.last_name}
          </p>
        </div>
      ) : (
        <div className="">_</div>
      )}
    </>
  );
};

const Table = () => {
  const redirect = useRedirect();
  const { data, page, isLoading, perPage } = useListContext();
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = useCallback(async () => {
    const { orders, limit, offset, count } =
      await medusaClient.admin.orders.list(
        {
          limit: perPage,
          offset: page - 1,
          // expand: 'carts'
        },
        {
          "x-no-compression": true,
        },
      );
    setOrders(orders);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [page, perPage]);

  return (
    <_Table className="shadow-none w-full overflow-auto">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader className="">
        <TableRow>
          <TableHead className="">Order</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Fulfillment</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Sales Channel</TableHead>
          <TableHead className="text-center">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, i) => (
          <TableRow
            key={i}
            className="hover:cursor-pointer"
            onClick={() =>
              redirect(
                "show",
                "order",
                order.id,
                {},
                {
                  order,
                },
              )
            }
          >
            <TableCell className="truncate">
              <p>#{order.display_id}</p>
            </TableCell>
            <TableCell className="truncate">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {new Date(order.created_at)
                      .toDateString()
                      .split(" ")
                      .slice(1)
                      .join(" ")}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell className="truncate">
              <CustomerComp customer={order.customer} />
            </TableCell>
            <TableCell className="truncate">
              {order.fulfillment_status}
            </TableCell>
            <TableCell className="truncate">
              <Status
                active={true}
                className="flex h-1.5 w-1.5 rounded-full"
                background={false}
                border={false}
                title={order.payment_status ?? "_"}
                variant={
                  (
                    order.payment_status as string
                  ).toLowerCase() as Status_Variant
                }
              />
            </TableCell>
            <TableCell className="truncate">
              {order?.sales_channel ? order.sales_channel.name : ""}
            </TableCell>
            <TableCell className="truncate">
              <div className="truncate flex space-x-1">
                <div className="flex space-x-1">
                  {order.currency_code?.toUpperCase()}{" "}
                  {actualAmountValue(order.payments[0].amount || 0)}
                </div>
                <div className="flex space-x-1 items-center w-fit">
                  <p>{order.currency_code?.toUpperCase()}</p>
                  {order.currency_code && (
                    <ReactCountryFlag
                      countryCode={
                        order.currency_code[0] + order.currency_code[1]
                      }
                      svg
                      style={{
                        width: "1rem",
                        height: "1rem",
                      }}
                      title={order.currency_code[0] + order.currency_code[1]}
                    />
                  )}
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </_Table>
  );
};

export default Table;
