import { Product } from "@medusajs/medusa";
import Status, { Status_Variant } from "../../../common/Status";
import { Button } from "../../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrGateway } from "react-icons/gr";
import { DollarSign, Edit, Plus, Settings } from "lucide-react";
import { Fragment, useState } from "react";
import EditAttribute from "./EditAttribute";

const Attributes = ({ product }: { product: Product }) => {
  const [edit, setEdit] = useState(false);

  return (
    <Fragment>
      <div className="flex flex-col space-y-6 border rounded-lg bg-white p-6">
        <section className="flex justify-between items-center">
          <p className="text-xl md:text-3xl font-semibold">Attributes</p>

          <aside>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="border-none" variant="outline">
                  <BsThreeDots className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white border w-58 p-3 space-y-2 text-sm">
                <button
                  className="w-full text-left px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                  onClick={() => setEdit(true)}
                >
                  <Edit className="w-5 h-5" />
                  <p>Edit Attributes</p>
                </button>
              </PopoverContent>
            </Popover>
          </aside>
        </section>

        <section className="flex flex-col space-y-3 w-full">
          <p className="font-bold text-lg">Dimensions</p>

          <div className="flex justify-between items-center">
            <aside>Height</aside>
            <aside>{product?.height ?? "_"}</aside>
          </div>
          <div className="flex justify-between items-center">
            <aside>Length</aside>
            <aside>{product?.length ?? "_"}</aside>
          </div>
          <div className="flex justify-between items-center">
            <aside>Weight</aside>
            <aside>{product?.weight ?? "_"}</aside>
          </div>

          <p className="font-bold text-lg">Customs</p>

          <div className="flex justify-between items-center">
            <aside>MID Code</aside>
            <aside>{product?.mid_code ?? "_"}</aside>
          </div>
          <div className="flex justify-between items-center">
            <aside>HS Code</aside>
            <aside>{product?.hs_code ?? "_"}</aside>
          </div>
          <div className="flex justify-between items-center">
            <aside>Country of origin</aside>
            <aside>{product?.origin_country ?? "_"}</aside>
          </div>
        </section>
      </div>
      {edit && (
        <EditAttribute
          open={edit}
          close={() => setEdit(false)}
          product={product}
        />
      )}
    </Fragment>
  );
};

export default Attributes;
