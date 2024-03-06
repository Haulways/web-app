import { Product } from "@medusajs/medusa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "../../../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../ui/table";
import { Fragment, useState } from "react";
import EditVariant from "../AddVariant";

const VariantTable = ({ product }: { product: Product }) => {
  const [edit, setEdit] = useState(false);

  return (
    <Table className="shadow-none w-full overflow-auto">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader className="">
        <TableRow>
          <TableHead className="">Title</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>EAN</TableHead>
          <TableHead>Inventory</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {product.variants.map((variant, i) => (
          <Fragment>
            <TableRow key={i} className="hover:cursor-pointer">
              <TableCell className="truncate">
                <p>{variant?.title ?? "_"}</p>
              </TableCell>
              <TableCell className="truncate">
                <p>{variant?.sku ?? "_"}</p>
              </TableCell>
              <TableCell className="truncate">
                <p>{variant?.ean ?? "_"}</p>
              </TableCell>
              <TableCell className="truncate">
                <p>{variant?.inventory_quantity ?? "_"}</p>
              </TableCell>
              <TableCell className="z-10 flex justify-end items-center pr-5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="border-none" variant="outline">
                      <BsThreeDots />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white border w-44 p-3 space-y-1">
                    <button
                      className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                      onClick={() => setEdit(true)}
                    >
                      <FiEdit className="w-5 h-5" />
                      <p>Edit Variant</p>
                    </button>
                    <button
                      className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                      onClick={() => {}}
                    >
                      <HiOutlineDuplicate className="w-5 h-5" />
                      <p>Duplicate Variant</p>
                    </button>
                    <button
                      className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease text-red-500 flex space-x-2"
                      onClick={() => {}}
                    >
                      <RiDeleteBin6Line className="w-5 h-5" />
                      <p>Delete Variant</p>
                    </button>
                  </PopoverContent>
                </Popover>
              </TableCell>
              {edit && (
                <EditVariant
                  open={edit}
                  close={() => setEdit(false)}
                  productVariant={variant}
                />
              )}
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default VariantTable;
