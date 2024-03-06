import { Cart, Order } from "@medusajs/medusa";
import { Fragment, useCallback, useEffect, useState } from "react";
import { medusaClient } from "../../../../lib/services/medusa";
import { actualAmountValue } from "../../../../lib/utils/format";
import { Button } from "../../../ui/button";
import EditOrder from "./EditOrder";

const Summary = ({ order }: { order: Order }) => {
  const [cart, setCart] = useState<
    Omit<Cart, "refundable_amount" | "refunded_total"> | undefined
  >();
  const [edit, setEdit] = useState(false);

  const fetchCart = useCallback(async () => {
    const data = await medusaClient.carts.retrieve(order.cart_id);
    setCart(data.cart);
  }, []);

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart) return null;

  return (
    <Fragment>
      <div className="flex flex-col space-y-6 border rounded-lg bg-white p-6">
        <section className="flex justify-between items-center">
          <p className="text-xl md:text-3xl font-semibold">Summary</p>

          <Button
            onClick={() => setEdit(true)}
            variant={"outline"}
            className="p-3"
          >
            Edit Order
          </Button>
        </section>

        <section className="flex flex-col space-y-1 text-sm">
          {order?.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded p-2 hover:bg-gray-50 transition-ease text-xs md:sm"
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
                <p>
                  {order?.currency_code.toUpperCase()}{" "}
                  {actualAmountValue(item?.unit_price ?? 0)}
                </p>
                <p>x {item?.quantity ?? 0}</p>
                <div className="flex space-x-2">
                  <p>
                    {order?.currency_code.toUpperCase()}{" "}
                    {actualAmountValue(item?.unit_price * item?.quantity || 0)}
                  </p>
                  <p className="text-gray-400">
                    {order?.currency_code.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="flex flex-col space-y-2 text-xs md:text-sm">
          <div className="flex justify-between text-gray-600">
            <p>Subtotal</p>
            <div className="flex space-x-2">
              <p>
                {order?.currency_code.toUpperCase()}{" "}
                {actualAmountValue(cart?.subtotal ?? 0)}
              </p>
              <p className="text-gray-400">
                {order?.currency_code.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Shipping</p>
            <div className="flex space-x-2">
              <p>
                {order?.currency_code.toUpperCase()}{" "}
                {actualAmountValue(cart?.shipping_total ?? 0)}
              </p>
              <p className="text-gray-400">
                {order?.currency_code.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Tax</p>
            <div className="flex space-x-2">
              <p>
                {order?.currency_code.toUpperCase()}{" "}
                {actualAmountValue(cart?.tax_total ?? 0)}
              </p>
              <p className="text-gray-400">
                {order?.currency_code.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex justify-between text-gray-600 font-semibold items-center pt-3">
            <p className="text-black">Total</p>
            <div className="flex space-x-2 text-xl md:text-2xl">
              <p>
                {order?.currency_code.toUpperCase()}{" "}
                {actualAmountValue(cart?.total ?? 0)}
              </p>
            </div>
          </div>
        </section>
      </div>

      {edit && (
        <EditOrder open={edit} close={() => setEdit(false)} order={order} />
      )}
    </Fragment>
  );
};

export default Summary;
