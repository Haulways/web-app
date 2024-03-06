import { Currency } from "@medusajs/medusa";
import { AlertCircle, Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
import useToggleState from "../../../../lib/hooks/use-toggle-state";
import { medusaClient } from "../../../../lib/services/medusa";
import { Input, TextArea } from "../../../common/Form/Input";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "../../../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../ui/tooltip";
import React from "react";

type CreateProductProps = {
  show: boolean;
  close: () => void;
};

const CreateProduct = ({ show, close }: CreateProductProps) => {
  const [showModal1, openModal1, closeModal1, toggleModal1] = useToggleState();
  const [showModal2, openModal2, closeModal2, toggleModal2] = useToggleState();
  const [showModal3, openModal3, closeModal3, toggleModal3] = useToggleState();
  const [showModal4, openModal4, closeModal4, toggleModal4] = useToggleState();
  const [showModal5, openModal5, closeModal5, toggleModal5] = useToggleState();
  const [showModal6, openModal6, closeModal6, toggleModal6] = useToggleState();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [countries, setCountries] = useState<Currency[]>([]);
  const [discountableToggle, setDiscountableToggle] = useState(false);
  const [salesToggle, setSalesToggle] = useState(false);

  const fetchCurrencies = async () => {
    const data = await medusaClient.admin.currencies.list();
    setCurrencies(data.currencies);
  };
  const fetchCountries = async () => {
    const data = await medusaClient.admin.currencies.list();
    setCurrencies(data.currencies);
  };

  const ProductOption = () => (
    <section className="grid grid-cols-7 pt-2 gap-3 place-self-end">
      <div className="flex flex-col col-span-2 space-y-1">
        <p className="font-medium text-sm">Option title</p>
        <span className="bg-gray-100 overflow-hidden rounded">
          <Input className="w-full" id="color" placeholder="Color..." />
        </span>
      </div>
      <div className="flex flex-col col-span-4 space-y-1">
        <p className="font-medium text-sm">Variations (comma separated)</p>
        <span className="bg-gray-100 overflow-hidden rounded">
          <Input
            className="w-full"
            id="variation"
            placeholder="Blue, Red, Black..."
          />
        </span>
      </div>
      <Button
        variant={"outline"}
        className="px-2 py-1 flex items-center space-x-2 col-span-1 flex-grow text-xs self-end"
      >
        <RiDeleteBinLine className="h-5 w-5" />
      </Button>
    </section>
  );

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } z-50 top-0 bottom-0 left-0 right-0 bg-white`}
    >
      <section className="w-full px-3 border-b mt-9 border-b-gray-300 py-3">
        <div className="w-full md:w-[60%] mx-auto flex items-center justify-between">
          <X className="h-6 w-6 text-black" onClick={close} />

          <div className="flex space-x-2 items-center">
            <Button variant={"outline"} disabled={true}>
              Save as draft
            </Button>
            <Button variant={"secondary"} disabled={true}>
              Publish product
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto px-3 max-h-[85vh] overflow-y-auto pt-16 text-gray-400">
        <Collapsible
          open={showModal1}
          onOpenChange={() => toggleModal1()}
          className="w-full md:w-[55%] mx-auto border-b border-gray-300 pb-6"
        >
          <section className="justify-between flex items-center">
            <p className="font-medium text-xl text-black">
              General information<span className="text-red-500">*</span>
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
              To start selling, all you need is a name and a price.
            </p>
          </CollapsibleContent>

          <CollapsibleContent className="space-y-2">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">
                  Title<span className="text-red-500">*</span>
                </p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input
                    className="w-full"
                    id="title"
                    placeholder="Winter Jacket"
                  />
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">
                  Subtitle<span className="text-red-500">*</span>
                </p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input className="w-full" placeholder="Tracking number..." />
                </span>
              </div>
            </section>
          </CollapsibleContent>

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
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={showModal2}
          onOpenChange={() => toggleModal2()}
          className="w-full md:w-[55%] mx-auto border-b border-gray-300 py-6"
        >
          <section className="justify-between flex items-center">
            <p className="font-medium text-xl text-black">Organize</p>

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
            <p className="pt-2 ">
              To start selling, all you need is a name and a price.
            </p>
          </CollapsibleContent>

          <CollapsibleContent className="space-y-2">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">Type</p>
                <Select>
                  <SelectTrigger className="bg-gray-100 h-10 overflow-hidden rounded">
                    <SelectValue placeholder="Choose a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem key={i} value={currency.name}>
                          {currency.name}
                        </SelectItem> */}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">Collection</p>
                <Select>
                  <SelectTrigger className="bg-gray-100 h-10 overflow-hidden rounded">
                    <SelectValue placeholder="Choose a collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem key={i} value={currency.name}>
                          {currency.name}
                        </SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </section>

            <div className="flex flex-col space-y-1 pt-2">
              <p className="font-medium text-sm">Tags (comma separated)</p>
              <span className="bg-gray-100 overflow-hidden rounded">
                <Input className="w-full" id="title" placeholder="" />
              </span>
            </div>
          </CollapsibleContent>

          <CollapsibleContent>
            <section className="flex justify-between space-x-3 pt-5">
              <div className="flex flex-col">
                <p className="text-black font-medium">Sales channels</p>
                <p>
                  This product will only be available in the default sales
                  channel if left untouched
                </p>
              </div>

              {salesToggle ? (
                <BiSolidToggleRight
                  onClick={() => setSalesToggle(false)}
                  className="text-purple-600 w-8 h-8"
                />
              ) : (
                <BiSolidToggleLeft
                  onClick={() => setSalesToggle(true)}
                  className="w-8 h-8"
                />
              )}
            </section>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={showModal3}
          onOpenChange={() => toggleModal3()}
          className="w-full md:w-[55%] mx-auto border-b border-gray-300 py-6"
        >
          <section className="justify-between flex items-center">
            <p className="font-medium text-xl text-black">Variants</p>

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

          <CollapsibleContent className="text-sm">
            <p className="pt-2 ">Add variations of this product.</p>
            <p className="">
              Offer your customers different options for color, format, size,
              shape, etc.
            </p>
          </CollapsibleContent>

          <CollapsibleContent className="w-full space-y-2 flex flex-col">
            <div className="pt-4 flex items-center space-x-2">
              <p className="font-medium text-black">Product options</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-44 text-sm font-medium text-gray-500">
                      Options are used to define the color, size, etc. of the
                      product.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <ProductOption />

            <Button
              variant={"outline"}
              className="px-2 py-1 w-full flex items-center space-x-2 text-xs"
            >
              <Plus className="h-5 w-5" />
              <p>Add an option</p>
            </Button>
          </CollapsibleContent>

          <CollapsibleContent className="w-full space-y-2 flex flex-col">
            <div className="pt-4 flex items-center space-x-2">
              <p className="font-medium text-black">
                Product variants <span className="text-gray-400">(0)</span>
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-44 text-sm font-medium text-gray-500">
                      You must add at least one product option before you can
                      begin adding product variants.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Button
              variant={"outline"}
              className="px-2 py-1 w-full flex items-center space-x-2 text-xs"
            >
              <Plus className="h-5 w-5" />
              <p>Add a variant</p>
            </Button>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={showModal4}
          onOpenChange={() => toggleModal4()}
          className="w-full md:w-[55%] mx-auto border-b border-gray-300 py-6"
        >
          <section className="justify-between flex items-center">
            <p className="font-medium text-xl text-black">Attributes</p>

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
            <p className="pt-2 ">Used for shipping and customs purposes.</p>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={showModal5}
          onOpenChange={() => toggleModal5()}
          className="w-full md:w-[55%] mx-auto border-b border-gray-300 py-6"
        >
          <section className="justify-between flex items-center">
            <p className="font-medium text-xl text-black">Thumbnail</p>

            <CollapsibleTrigger asChild>
              <Button variant="ghost">
                {showModal5 ? (
                  <Minus className=" hover:cursor-pointer" />
                ) : (
                  <Plus className=" hover:cursor-pointer" />
                )}
              </Button>
            </CollapsibleTrigger>
          </section>

          <CollapsibleContent>
            <p className="pt-2 ">
              Used to represent your product during checkout, social sharing and
              more.
            </p>
          </CollapsibleContent>

          <CollapsibleContent className="space-y-2 pt-3">
            <div className="p-5 md:p-8 flex flex-col items-center justify-center border border-dashed rounded-lg text-sm border-gray-500 hover:border-purple-600">
              <p className="text-center">
                Drop your images here, or{" "}
                <span className="text-purple-600">click to browse</span>
              </p>
              <p className="text-center">
                1200 x 1600 (3:4) recommended, up to 10MB each
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={showModal6}
          onOpenChange={() => toggleModal6()}
          className="w-full md:w-[55%] mx-auto border-b border-gray-300 py-6"
        >
          <section className="justify-between flex items-center">
            <p className="font-medium text-xl text-black">Media</p>

            <CollapsibleTrigger asChild>
              <Button variant="ghost">
                {showModal6 ? (
                  <Minus className=" hover:cursor-pointer" />
                ) : (
                  <Plus className=" hover:cursor-pointer" />
                )}
              </Button>
            </CollapsibleTrigger>
          </section>

          <CollapsibleContent>
            <p className="pt-2 ">Add images to your product.</p>
          </CollapsibleContent>

          <CollapsibleContent className="space-y-2 pt-3">
            <div className="p-5 md:p-8 flex flex-col items-center justify-center border border-dashed rounded-lg text-sm border-gray-500 hover:border-purple-600">
              <p className="text-center">
                Drop your images here, or{" "}
                <span className="text-purple-600">click to browse</span>
              </p>
              <p className="text-center">
                1200 x 1600 (3:4) recommended, up to 10MB each
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default CreateProduct;
