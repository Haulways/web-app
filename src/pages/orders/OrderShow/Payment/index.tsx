import { Order } from "@medusajs/medusa";
import { Button } from "../../../ui/button";
import Status, { Status_Variant } from "../../../common/Status";
import { actualAmountValue } from "../../../../lib/utils/format";
import { Fragment, useState } from "react";
import RefundModal from "./RefundModal";

const Payment = ({ order }: { order: Order }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Fragment>
      <div className="flex flex-col space-y-9 border rounded-lg bg-white p-6">
        <section className="flex justify-between items-center">
          <p className="text-xl md:text-3xl font-semibold">Payment</p>

          <div className="flex space-x-2 items-center">
            <Status
              active={true}
              className="flex h-1.5 w-1.5 rounded-full"
              background={false}
              border={false}
              title={order.payment_status ?? "_"}
              variant={
                (order.payment_status as string).toLowerCase() as Status_Variant
              }
            />
            <Button
              onClick={() => setToggle(true)}
              variant={"outline"}
              className="py-2 px-4"
            >
              Refund
            </Button>
          </div>
        </section>

        <section className="flex flex-col space-y-2 text-sm">
          {order?.payments.map((payment, i) => (
            <div key={i} className="flex items-center justify-between">
              <aside className="flex flex-col space-y-1 w-[60%] truncate">
                <p className="w-full truncate">{payment.id}</p>
                <p className="text-sm text-gray-400 truncate">
                  {new Date(payment.created_at ?? "").toDateString()}{" "}
                  {new Date(payment.created_at ?? "").toLocaleTimeString()}
                </p>
              </aside>
              <aside className="flex space-x-2 w-[50%] justify-end">
                <p>
                  {payment?.currency_code.toUpperCase()}{" "}
                  {actualAmountValue(payment.amount ?? 0)}
                </p>
                <p className="text-gray-400">
                  {payment?.currency_code.toUpperCase()}
                </p>
              </aside>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <p className="text-black font-medium">Total Paid</p>
            <aside className="flex space-x-2 w-[50%] justify-end">
              <p>
                {order?.currency_code.toUpperCase()}{" "}
                {actualAmountValue(order.payments[0].amount ?? 0)}
              </p>
              <p className="text-gray-400">
                {order?.currency_code.toUpperCase()}
              </p>
            </aside>
          </div>
        </section>
      </div>

      {toggle && (
        <RefundModal
          open={toggle}
          close={() => setToggle(false)}
          order={order}
        />
      )}
    </Fragment>
  );
};

export default Payment;
