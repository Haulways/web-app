import { ProductVariant } from "@medusajs/medusa";
import { AlertCircle, Minus, Plus, X } from "lucide-react";
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
import useToggleState from "../../../../../lib/hooks/use-toggle-state";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../ui/tooltip";

type Props = {
  open: boolean;
  close: () => void;
  productVariant?: ProductVariant;
};

const AddVariant = ({ open, close, productVariant }: Props) => {
  const [showModal1, openModal1, closeModal1, toggleModal1] = useToggleState();
  const [showModal2, openModal2, closeModal2, toggleModal2] = useToggleState();
  const [showModal3, openModal3, closeModal3, toggleModal3] = useToggleState();
  const [showModal4, openModal4, closeModal4, toggleModal4] = useToggleState();
  const [manageInventoryToggle, setManageInventoryToggle] = useState(false);
  const [backOrderToggle, setBackOrderToggle] = useState(false);

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
              Add Variant
            </p>
            <Button onClick={() => close()} variant={"outline"}>
              <X className="w-5 h-5" />
            </Button>
          </section>

          <section className="flex flex-col max-h-[65vh] overflow-y-auto space-y-2 px-8 py-2 text-sm text-gray-500">
            <Collapsible
              open={showModal1}
              onOpenChange={() => toggleModal1()}
              className="w-full mx-auto border-b border-gray-300 py-4"
            >
              <section className="justify-between flex items-center">
                <p className="font-medium text-lg text-black">
                  General<span className="text-red-500">*</span>
                </p>

                <CollapsibleTrigger asChild>
                  <Button variant="ghost">
                    {showModal1 ? (
                      <Minus className=" hover:cursor-pointer" />
                    ) : (
                      <Plus className=" hover:cursor-pointer" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </section>

              <CollapsibleContent>
                <p className="pt-2 ">
                  Configure the general information for this variant.
                </p>
              </CollapsibleContent>

              <CollapsibleContent className="flex flex-col space-y-2">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-5 py-3">
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">Custom title</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        className="w-full"
                        id="title"
                        defaultValue={productVariant?.title ?? ""}
                        placeholder="Green / XL..."
                      />
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">Material</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        className="w-full"
                        defaultValue={productVariant?.material ?? ""}
                        placeholder="80% wool, 20% cotton..."
                      />
                    </span>
                  </div>
                </section>

                <div className="flex items-center space-x-1">
                  <p className="font-medium text-lg text-black">Options</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <AlertCircle className="w-3 h-3" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="z-10">
                          Options are used to define the color, size, etc. of
                          the variant.Options are used to define the color,
                          size, etc. of the variant.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-5 py-3">
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">
                      Size<span className="text-red-500">*</span>
                    </p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        className="w-full"
                        id="title"
                        defaultValue={productVariant?.title ?? ""}
                        placeholder="Size..."
                      />
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">
                      Color<span className="text-red-500">*</span>
                    </p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        className="w-full"
                        defaultValue={productVariant?.material ?? ""}
                        placeholder="Color..."
                      />
                    </span>
                  </div>
                </section>
              </CollapsibleContent>

              {/* 
          <CollapsibleContent>
            <p className="pt-5">Give your product a short and clear title.</p>
            <p className="">
              50-60 characters is the recommended length for search engines.
            </p>
          </CollapsibleContent>

          <CollapsibleContent className="space-y-3">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm flex space-x-1">
                  <p>Handle </p>
                  <span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertCircle className="w-5 h-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-44 text-sm font-medium text-gray-500">
                            The handle is the part of the URL that identifies
                            the product. If not specified, it will be generated
                            from the title.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input
                    className="w-full"
                    id="title"
                    placeholder="/winter-jacket"
                  />
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">Material</p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input className="w-full" placeholder="100% Cotton" />
                </span>
              </div>
            </section>

            <div className="flex flex-col space-y-1">
              <p className="font-medium">Description</p>
              <span className="bg-gray-100 overflow-hidden rounded">
                <TextArea placeholder="A warm and cozy jacket..." />
              </span>
            </div>
          </CollapsibleContent>

          <CollapsibleContent>
            <p className="pt-5">
              Give your product a short and clear description.
            </p>
            <p className="">
              120-160 characters is the recommended length for search engines.
            </p>
          </CollapsibleContent>

          <CollapsibleContent>
            <section className="flex justify-between space-x-3 pt-5">
              <div className="flex flex-col">
                <p className="text-black font-medium">Discountable</p>
                <p>
                  When unchecked discounts will not be applied to this product.
                </p>
              </div>

              {discountableToggle ? (
                <BiSolidToggleRight
                  onClick={() => setDiscountableToggle(false)}
                  className="text-purple-600 w-8 h-8"
                />
              ) : (
                <BiSolidToggleLeft
                  onClick={() => setDiscountableToggle(true)}
                  className="w-8 h-8"
                />
              )}
            </section>
          </CollapsibleContent> */}
            </Collapsible>

            <Collapsible
              open={showModal2}
              onOpenChange={() => toggleModal2()}
              className="w-full mx-auto border-b border-gray-300 py-4"
            >
              <section className="justify-between flex items-center">
                <p className="font-medium text-lg text-black">Pricing</p>

                <CollapsibleTrigger asChild>
                  <Button variant="ghost">
                    {showModal2 ? (
                      <Minus className=" hover:cursor-pointer" />
                    ) : (
                      <Plus className=" hover:cursor-pointer" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </section>

              <CollapsibleContent>
                <p className="pt-2 ">Configure the pricing for this variant.</p>
              </CollapsibleContent>

              <CollapsibleContent className="flex flex-col space-y-2"></CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={showModal3}
              onOpenChange={() => toggleModal3()}
              className="w-full mx-auto border-b border-gray-300 py-4"
            >
              <section className="justify-between flex items-center">
                <p className="font-medium text-lg text-black">
                  Stock & Inventory
                </p>

                <CollapsibleTrigger asChild>
                  <Button variant="ghost">
                    {showModal3 ? (
                      <Minus className=" hover:cursor-pointer" />
                    ) : (
                      <Plus className=" hover:cursor-pointer" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </section>

              <CollapsibleContent>
                <p className="pt-2 ">
                  Configure the inventory and stock for this variant.
                </p>
              </CollapsibleContent>

              <CollapsibleContent className="flex flex-col space-y-2">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-5 py-3">
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">
                      Stock keeping unit (SKU)
                    </p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        className="w-full"
                        id="title"
                        defaultValue={productVariant?.sku ?? ""}
                        placeholder="SUN-G, JK1234..."
                      />
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">Quantity in stock</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        className="w-full"
                        defaultValue={productVariant?.inventory_quantity ?? ""}
                        placeholder="100..."
                        type="number"
                      />
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">EAN (Barcode)</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        className="w-full"
                        id="title"
                        defaultValue={productVariant?.ean ?? ""}
                        placeholder="123456789102..."
                      />
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">UPC (Barcode)</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        className="w-full"
                        defaultValue={productVariant?.upc ?? ""}
                        placeholder="023456789104..."
                      />
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">Barcode</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        className="w-full"
                        defaultValue={productVariant?.barcode ?? ""}
                        placeholder="023456789104..."
                      />
                    </span>
                  </div>
                </section>

                <div className="flex items-center space-x-1">
                  <p className="font-medium text-lg text-black">Options</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button>
                          <AlertCircle className="w-3 h-3" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="z-10">
                          Options are used to define the color, size, etc. of
                          the variant.Options are used to define the color,
                          size, etc. of the variant.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-5 py-3">
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">
                      Size<span className="text-red-500">*</span>
                    </p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        className="w-full"
                        id="title"
                        defaultValue={productVariant?.title ?? ""}
                        placeholder="Size..."
                      />
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <p className="font-medium text-sm">
                      Color<span className="text-red-500">*</span>
                    </p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        className="w-full"
                        defaultValue={productVariant?.material ?? ""}
                        placeholder="Color..."
                      />
                    </span>
                  </div>
                </section>

                <section className="flex justify-between space-x-3 pt-5">
                  <div className="flex flex-col">
                    <p className="text-black font-medium">Manage inventory</p>
                    <p>
                      When checked Medusa will regulate the inventory when
                      orders and returns are made.
                    </p>
                  </div>

                  {manageInventoryToggle ? (
                    <BiSolidToggleRight
                      onClick={() => setManageInventoryToggle(false)}
                      className="text-purple-600 w-8 h-8"
                    />
                  ) : (
                    <BiSolidToggleLeft
                      onClick={() => setManageInventoryToggle(true)}
                      className="w-8 h-8"
                    />
                  )}
                </section>

                <section className="flex justify-between space-x-3 pt-5">
                  <div className="flex flex-col">
                    <p className="text-black font-medium">Allow backorders</p>
                    <p>
                      When checked the product will be available for purchase
                      despite the product being sold out
                    </p>
                  </div>

                  {backOrderToggle ? (
                    <BiSolidToggleRight
                      onClick={() => setBackOrderToggle(false)}
                      className="text-purple-600 w-8 h-8"
                    />
                  ) : (
                    <BiSolidToggleLeft
                      onClick={() => setBackOrderToggle(true)}
                      className="w-8 h-8"
                    />
                  )}
                </section>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={showModal4}
              onOpenChange={() => toggleModal4()}
              className="w-full mx-auto border-b border-gray-300 py-4"
            >
              <section className="justify-between flex items-center">
                <p className="font-medium text-lg text-black">Shipping</p>

                <CollapsibleTrigger asChild>
                  <Button variant="ghost">
                    {showModal4 ? (
                      <Minus className=" hover:cursor-pointer" />
                    ) : (
                      <Plus className=" hover:cursor-pointer" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </section>

              <CollapsibleContent>
                <p className="pt-2 ">
                  Shipping information can be required depending on your
                  shipping provider, and whether or not you are shipping
                  internationally.
                </p>
              </CollapsibleContent>

              <CollapsibleContent className="flex flex-col space-y-2">
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
              </CollapsibleContent>
            </Collapsible>
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

export default AddVariant;
