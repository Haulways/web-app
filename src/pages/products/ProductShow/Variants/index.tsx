import { Product } from "@medusajs/medusa";
import { DollarSign, Plus, Settings } from "lucide-react";
import { Fragment, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { GrGateway } from "react-icons/gr";
import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import AddVariant from "./AddVariant";
import VariantTable from "./VariantTable";

const Variants = ({ product }: { product: Product }) => {
  const [edit, setEdit] = useState(false);

  const variantSize = new Set(
    product.variants.map((variant) => variant.title.split(" / ")[0]),
  );

  const variantColor = new Set(
    product.variants.map((variant) => variant.title.split(" / ")[1]),
  );

  return (
    <Fragment>
      <div className="flex flex-col space-y-6 border rounded-lg bg-white p-6">
        <section className="flex justify-between items-center">
          <p className="text-xl md:text-3xl font-semibold">Variants</p>

          <aside>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="border-none" variant="outline">
                  <BsThreeDots className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border w-58 p-3 space-y-2 text-sm">
                <DropdownMenuItem>
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                    onClick={() => setEdit(true)}
                  >
                    <Plus className="w-5 h-5" />
                    <p>Add Variant</p>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                    onClick={() => {}}
                  >
                    <DollarSign className="w-5 h-5" />
                    <p>Edit Prices</p>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                    onClick={() => setEdit(true)}
                  >
                    <GrGateway className="w-5 h-5" />
                    <p>Edit Variants</p>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                    onClick={() => {}}
                  >
                    <Settings className="w-5 h-5" />
                    <p>Edit Options</p>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </aside>
        </section>

        <section className="flex space-x-9 items-center">
          <div>
            <p className="text-black font-medium pb-1">Size</p>
            <aside className="flex space-x-2 items-center flex-wrap">
              {Array.from(variantSize).map((size, i) => (
                <div
                  key={i}
                  className="bg-gray-200 text-sm font-medium px-2 py-1.5 rounded-lg"
                >
                  {size}
                </div>
              ))}
            </aside>
          </div>

          {variantColor.size !== 0 && (
            <div>
              <p className="text-black font-medium pb-1">Color</p>
              <aside className="flex space-x-2 items-center flex-wrap">
                {Array.from(variantColor).map((color, i) => (
                  <>
                    {color ? (
                      <div
                        key={i}
                        className="bg-gray-200 font-medium px-4 py-3 rounded-lg"
                      >
                        {color}
                      </div>
                    ) : null}
                  </>
                ))}
              </aside>
            </div>
          )}
        </section>

        <section>
          <p className="text-lg font-bold">
            Product variants{" "}
            <span className="text-gray-500 font-normal">
              ({product?.variants.length})
            </span>
          </p>
          <VariantTable product={product} />
        </section>
      </div>

      {edit && <AddVariant open={edit} close={() => setEdit(false)} />}
    </Fragment>
  );
};

export default Variants;
