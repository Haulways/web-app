import { Order } from "@medusajs/medusa";
import React from "react";

const RawOrder = ({ order }: { order: Order }) => {
  return (
    <div className="flex flex-col space-y-9 border rounded-lg bg-white p-6">
      <section className="flex justify-between items-center">
        <p className="text-xl md:text-3xl font-semibold">Raw order</p>
      </section>
    </div>
  );
};

export default RawOrder;
