import { Product } from "@medusajs/medusa";
import { useRedirect } from "react-admin";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import SubDetails from "./SubDetails";
import Summary from "./Summary";
import Variants from "./Variants";
import Attributes from "./Attributes";
import RawProduct from "./RawProduct";

const ProductShow = (props) => {
  const {product} = props;
  const redirect = useRedirect();
  const { state } = useLocation();
  // const product = state?.product as Product | undefined;

  if (!product) return null;

  return (
    <div className="flex flex-col space-y-4">
      {/* <div
        onClick={() => redirect("list", "product")}
        className="flex space-x-2 items-center text-gray-500 font-medium hover:cursor-pointer px-3 pt-1.5"
      >
        <BsArrowLeft className="w-5 h-5" />
        <p className="text-sm">Back to Products</p>
      </div> */}

      <div className="flex flex-col md:flex-row-reverse md:justify-end gap-3 p-3">
        <SubDetails product={product} />
        <section className="flex-grow md:max-w-[60%] flex flex-col space-y-3">
          <Summary product={product} />
          <Variants product={product} />
          <Attributes product={product} />
          <RawProduct product={product} />
        </section>
      </div>
    </div>
  );
};

export default ProductShow;
