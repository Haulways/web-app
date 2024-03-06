import { Product } from "@medusajs/medusa";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "../../../../ui/button";
import { Dialog, DialogTrigger } from "../../../../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../ui/dropdown-menu";
import { Input, TextArea } from "../../../../common/Form/Input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../../../ui/select";
import { BiSolidToggleRight, BiSolidToggleLeft } from "react-icons/bi";

type Props = {
  open: boolean;
  close: () => void;
  product: Product;
};

const EditAttribute = ({ open, close, product }: Props) => {
  const [discountableToggle, setDiscountableToggle] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={(prev: any) => close()}>
      <DialogTrigger asChild></DialogTrigger>
      <div
        className={`${
          open ? "fixed" : "hidden"
        } z-50 -top-3 bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm flex items-center justify-center`}
      >
        <div className="bg-white h-fit w-[90%] md:w-[50%] rounded-lg flex flex-col">
          <section className="flex items-center justify-between p-5 border-b border-b-gray-300">
            <p className="text-xl md:text-3xl font-medium text-black">
              Edit Attributes
            </p>
            <Button onClick={() => close()} variant={"outline"}>
              <X className="w-5 h-5" />
            </Button>
          </section>

          <section className="flex flex-col max-h-[65vh] overflow-y-auto space-y-2 px-8 py-2 text-sm text-gray-500">
            <p className="font-medium text-black pt-6">Dimensions</p>
            <p className="text-gray-500">
              Configure to calculate the most accurate shipping rates
            </p>
            <section className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">Width</p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input
                    className="w-full"
                    id="width"
                    type="number"
                    placeholder="100..."
                  />
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">Length</p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input
                    className="w-full"
                    id="length"
                    type="number"
                    placeholder="100..."
                  />
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">Weight</p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input
                    className="w-full"
                    id="weight"
                    type="number"
                    placeholder="100..."
                  />
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">Height</p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input
                    className="w-full"
                    id="height"
                    type="number"
                    placeholder="100..."
                  />
                </span>
              </div>
            </section>

            <p className="font-medium text-black pt-6">Customs</p>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">MID Code</p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input
                    className="w-full"
                    id="mid_code"
                    placeholder="XDSKLAD9999..."
                  />
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">HS Code</p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input
                    className="w-full"
                    id="mid_code"
                    placeholder="BDJSK39277W..."
                  />
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">Country of origin</p>

                <Select>
                  <SelectTrigger className="bg-gray-100 h-10 overflow-hidden rounded">
                    <SelectValue placeholder="Choose a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <ScrollArea className="h-52 rounded-md">
                      {currencies.map((currency, i) => (
                        <SelectItem key={i} value={currency.name}>
                          {currency.name}
                        </SelectItem>
                      ))}
                    </ScrollArea> */}
                  </SelectContent>
                </Select>
              </div>
            </section>
          </section>

          <section className="flex justify-end items-center space-x-3 border-t border-t-gray-300 px-8 py-5">
            <Button onClick={() => {}} variant={"outline"}>
              back
            </Button>
            <Button onClick={() => {}} variant={"secondary"}>
              Save and close
            </Button>
          </section>
        </div>
      </div>
    </Dialog>
  );
};

export default EditAttribute;
