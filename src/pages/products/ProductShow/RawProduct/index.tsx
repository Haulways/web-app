import { Product } from "@medusajs/medusa";
import React from "react";

const RawProduct = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col space-y-9 border rounded-lg bg-white p-6">
      <section className="flex justify-between items-center">
        <p className="text-xl md:text-3xl font-semibold">Raw product</p>
      </section>
    </div>
  );
};

export default RawProduct;
