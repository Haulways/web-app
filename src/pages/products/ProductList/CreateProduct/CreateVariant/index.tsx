"use client";

import { ProductVariant } from "@medusajs/medusa";
import { AlertCircle, Minus, Plus, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
import useAlert from "../../../../../lib/hooks/use-alert";
import useToggleState from "../../../../../lib/hooks/use-toggle-state";
import { Input } from "../../../../common/Form/Input";
import { Button } from "../../../../ui/button";
import { useCountries } from "use-react-countries";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../ui/collapsible";
import { Dialog, DialogTrigger } from "../../../../ui/dialog";
import { ScrollArea } from "../../../../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../ui/tooltip";
import { ProductOption } from "..";
import { capitalizeWord } from "../../../../../lib/utils/format";

type Props = {
  open: boolean;
  close: () => void;
  index: number;
  productOptions: ProductOption[];
  productVariants: ProductVariant[];
  setProductVariants: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
};

enum FieldsName {
  CUSTOM_TITLE = "custom_title",
  MATERIAL = "material",
  SKU = "sku",
  QUANTITY_STOCK = "quality_stock",
  EAN = "ean",
  UPC = "upc",
  BARCODE = "barcode",
  WEIGHT = "weight",
  LENGTH = "length",
  HEIGHT = "height",
  WIDTH = "width",
  HS_CODE = "hs_code",
  MID_CODE = "mid_code",
  ORIGIN_COUNTRY = "origin_country",
}

interface InputFields {
  custom_title: string;
  material: string;
  sku: string;
  quality_stock: number;
  ean: string;
  upc: string;
  barcode: string;
  weight: number;
  length: number;
  height: number;
  width: number;
  hs_code: string;
  mid_code: string;
  origin_country: string;
}

const CreateVariant = ({
  open,
  close,
  index,
  productOptions,
  productVariants,
  setProductVariants,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inventoryToggle, setInventoryToggle] = useState(
    productVariants[index]?.manage_inventory ?? false,
  );
  const [backOrderToggle, setBackOrderToggle] = useState(
    productVariants[index]?.allow_backorder ?? false,
  );
  const { state, open: openAlert, close: closeAlert, Alert } = useAlert();
  const [showModal1, openModal1, closeModal1, toggleModal1] = useToggleState();
  const [showModal2, openModal2, closeModal2, toggleModal2] = useToggleState();
  const [showModal3, openModal3, closeModal3, toggleModal3] = useToggleState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const { countries } = useCountries();
  const [productOptionValues, setProductOptionValues] = useState<
    {
      value: string;
    }[]
  >([]);
  const formMethods = useForm<InputFields>();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors: formErrors },
  } = formMethods;

  const submit = handleSubmit(async (data: InputFields) => {
    const productVariant = {
      title: data.custom_title,
      sku: data.sku,
      barcode: data.barcode,
      ean: data.ean,
      upc: data.upc,
      inventory_quantity: data.quality_stock,
      allow_backorder: backOrderToggle,
      manage_inventory: inventoryToggle,
      hs_code: data.hs_code,
      origin_country: selectedCountry,
      mid_code: data.mid_code,
      material: data.material,
      weight: +data.weight,
      length: +data.length,
      height: +data.height,
      width: +data.width,
      options: productOptionValues,
    };
    const newProductVariant = [...productVariants];
    newProductVariant.splice(index, 1, productVariant as any);
    setProductVariants(newProductVariant);
    close();
    // setIsSubmitting(true);
  });

  useEffect(() => {
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);
  console.log("productOptions", productOptions);

  return (
    <Dialog open={open} onOpenChange={(prev: any) => close()}>
      <DialogTrigger asChild></DialogTrigger>
      <Fragment>
        <div
          className={`${
            open ? "fixed" : "hidden"
          } z-50 -top-3 bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm flex items-center justify-center`}
        >
          <div className="bg-white h-fit w-[90%] md:w-[50%] rounded-lg flex flex-col">
            <section className="flex items-center justify-between p-5 border-b border-b-gray-300">
              <p className="text-xl md:text-3xl font-medium text-black">
                Create Variant
              </p>
              <Button onClick={() => close()} variant={"outline"}>
                <X className="w-5 h-5" />
              </Button>
            </section>

            <section className="max-h-[65vh] w-full overflow-y-auto px-8 py-4 text-gray-500 flex flex-col space-y-5">
              <Collapsible
                open={showModal1}
                onOpenChange={() => toggleModal1()}
                className="w-full mx-auto border-b border-gray-300 pb-6"
              >
                <CollapsibleTrigger asChild>
                  <section className="justify-between flex items-center">
                    <p className="font-medium text-xl text-black">
                      General <span className="text-red-500">*</span>
                    </p>

                    <Button variant="ghost">
                      {showModal1 ? (
                        <Minus className="hover:cursor-pointer" />
                      ) : (
                        <Plus className="hover:cursor-pointer" />
                      )}
                    </Button>
                  </section>
                </CollapsibleTrigger>

                <CollapsibleContent className="flex flex-col space-y-2">
                  <p className="font-medium text-black">
                    Configure the general information for this variant.
                  </p>

                  <section className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-3 w-full">
                    <div className="flex flex-col col-span-1 space-y-1">
                      <p className="font-medium">Custom title</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          id={FieldsName.CUSTOM_TITLE}
                          {...register(FieldsName.CUSTOM_TITLE, {
                            // required: "First name is required",
                          })}
                          placeholder="Green / XL..."
                          defaultValue={productVariants[index]?.title ?? ""}
                        />
                      </span>
                    </div>

                    <div className="flex flex-col col-span-1 space-y-1">
                      <p className="font-medium">Material</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          id={FieldsName.MATERIAL}
                          {...register(FieldsName.MATERIAL, {
                            // required: "Last name is required",
                          })}
                          placeholder="80% wool, 20% cotton..."
                          defaultValue={productVariants[index]?.material ?? ""}
                        />
                      </span>
                    </div>
                  </section>

                  <section className="flex flex-col space-y-2 pb-3">
                    <div className="pt-4 flex items-center space-x-2">
                      <p className="font-medium text-black">Options</p>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertCircle className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-44 text-sm font-medium text-gray-500">
                              Options are used to define the color, size, etc.
                              of the product.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <section className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-3 w-full">
                      {productOptions.map((productOption, i) => {
                        if (!productOption?.title) return null;

                        return (
                          <div className="flex flex-col col-span-1 space-y-1">
                            <p className="font-medium text-sm">
                              {capitalizeWord(productOption?.title ?? "")}
                            </p>

                            <Select
                              onValueChange={(value) => {
                                const newOptionValue = [...productOptionValues];
                                newOptionValue.splice(index, 1, { value });
                                setProductOptionValues(newOptionValue);
                              }}
                            >
                              <SelectTrigger className="bg-gray-100 h-10 overflow-hidden rounded">
                                <SelectValue placeholder="Choose a type" />
                              </SelectTrigger>
                              <SelectContent>
                                {(productOption?.value ?? "")
                                  .split(",")
                                  .filter((each) => each !== "")
                                  .map((each, i) => (
                                    <SelectItem key={i} value={each.trim()}>
                                      {each.trim()}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        );
                      })}
                    </section>
                  </section>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={showModal2}
                onOpenChange={() => toggleModal2()}
                className="w-full mx-auto border-b border-gray-300 pb-6"
              >
                <CollapsibleTrigger asChild>
                  <section className="justify-between flex items-center">
                    <p className="font-medium text-xl text-black">
                      Stock & Inventory
                    </p>

                    <Button variant="ghost">
                      {showModal2 ? (
                        <Minus className="hover:cursor-pointer" />
                      ) : (
                        <Plus className="hover:cursor-pointer" />
                      )}
                    </Button>
                  </section>
                </CollapsibleTrigger>

                <CollapsibleContent className="flex flex-col space-y-2">
                  <p className="font-medium text-black">
                    Configure the inventory and stock for this variant.
                  </p>

                  <section className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-3 w-full">
                    <div className="flex flex-col col-span-1 space-y-1">
                      <p className="font-medium">Stock keeping unit (SKU)</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          id={FieldsName.SKU}
                          {...register(FieldsName.SKU, {
                            // required: "First name is required",
                          })}
                          placeholder="SUN-G, JK1234..."
                          defaultValue={productVariants[index]?.sku ?? ""}
                        />
                      </span>
                    </div>

                    <div className="flex flex-col col-span-1 space-y-1">
                      <p className="font-medium">Quantity in stock</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          id={FieldsName.QUANTITY_STOCK}
                          {...register(FieldsName.QUANTITY_STOCK, {
                            // required: "First name is required",
                          })}
                          placeholder="100..."
                          defaultValue={
                            productVariants[index]?.inventory_quantity ?? ""
                          }
                        />
                      </span>
                    </div>

                    <div className="flex flex-col col-span-1 space-y-1">
                      <p className="font-medium">EAN (Barcode)</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          id={FieldsName.EAN}
                          {...register(FieldsName.EAN, {
                            // required: "First name is required",
                          })}
                          placeholder="123456789102..."
                          defaultValue={productVariants[index]?.ean ?? ""}
                        />
                      </span>
                    </div>

                    <div className="flex flex-col col-span-1 space-y-1">
                      <p className="font-medium">UPC (Barcode)</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          id={FieldsName.UPC}
                          {...register(FieldsName.UPC, {
                            // required: "First name is required",
                          })}
                          placeholder="023456789104..."
                          defaultValue={productVariants[index]?.upc ?? ""}
                        />
                      </span>
                    </div>

                    <div className="flex flex-col col-span-1 space-y-1">
                      <p className="font-medium">Barcode</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          id={FieldsName.BARCODE}
                          {...register(FieldsName.BARCODE, {
                            // required: "First name is required",
                          })}
                          placeholder="123456789104..."
                          defaultValue={productVariants[index]?.barcode ?? ""}
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

                    {inventoryToggle ? (
                      <BiSolidToggleRight
                        onClick={() => setInventoryToggle(false)}
                        className="text-purple-600 w-8 h-8"
                      />
                    ) : (
                      <BiSolidToggleLeft
                        onClick={() => setInventoryToggle(true)}
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
                open={showModal3}
                onOpenChange={() => toggleModal3()}
                className="w-full mx-auto"
              >
                <CollapsibleTrigger asChild>
                  <section className="justify-between flex items-center">
                    <p className="font-medium text-xl text-black">Shipping</p>

                    <Button variant="ghost">
                      {showModal3 ? (
                        <Minus className="hover:cursor-pointer" />
                      ) : (
                        <Plus className="hover:cursor-pointer" />
                      )}
                    </Button>
                  </section>
                </CollapsibleTrigger>

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
                          type="number"
                          id={FieldsName.WIDTH}
                          placeholder="100..."
                          {...register(FieldsName.WIDTH, {})}
                          defaultValue={productVariants[index]?.width ?? ""}
                        />
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-sm">Length</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          className="w-full"
                          type="number"
                          placeholder="100..."
                          id={FieldsName.LENGTH}
                          {...register(FieldsName.LENGTH, {})}
                          defaultValue={productVariants[index]?.length ?? ""}
                        />
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-sm">Weight</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          className="w-full"
                          type="number"
                          placeholder="100..."
                          id={FieldsName.WEIGHT}
                          {...register(FieldsName.WEIGHT, {})}
                          defaultValue={productVariants[index]?.weight ?? ""}
                        />
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-sm">Height</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          className="w-full"
                          type="number"
                          placeholder="100..."
                          id={FieldsName.HEIGHT}
                          {...register(FieldsName.HEIGHT, {})}
                          defaultValue={productVariants[index]?.height ?? ""}
                        />
                      </span>
                    </div>
                  </section>

                  <p className="font-medium text-xl text-black">Dimensions</p>

                  <p className="font-medium text-black">
                    Configure to calculate the most accurate shipping rates.
                  </p>

                  <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-sm">MID Code</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          className="w-full"
                          placeholder="XDSKLAD9999..."
                          id={FieldsName.MID_CODE}
                          {...register(FieldsName.MID_CODE, {})}
                          defaultValue={productVariants[index]?.mid_code ?? ""}
                        />
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-sm">HS Code</p>
                      <span className="bg-gray-100 overflow-hidden rounded">
                        <Input
                          className="w-full"
                          placeholder="BDJSK39277W..."
                          id={FieldsName.HS_CODE}
                          {...register(FieldsName.HS_CODE, {})}
                          defaultValue={productVariants[index]?.hs_code ?? ""}
                        />
                      </span>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-sm">Country of origin</p>

                      <Select
                        onValueChange={(value) => {
                          setSelectedCountry(value);
                        }}
                        defaultValue={
                          productVariants[index]?.origin_country ?? ""
                        }
                      >
                        <SelectTrigger className="bg-gray-100 h-10 overflow-hidden rounded">
                          <SelectValue
                            placeholder={
                              productVariants[index]?.origin_country ??
                              "Choose a country"
                            }
                            className="text-gray-600"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <ScrollArea className="h-52 rounded-md">
                            {countries.map(
                              (country: { name: string }, i: number) => (
                                <SelectItem key={i} value={country.name}>
                                  {country.name}
                                </SelectItem>
                              ),
                            )}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </div>
                  </section>
                </CollapsibleContent>
              </Collapsible>
            </section>

            <aside className="flex justify-end items-center space-x-3 w-full border-t border-t-gray-300 px-8 py-5">
              <Button onClick={close} variant={"outline"}>
                Cancel
              </Button>
              <Button onClick={submit} variant={"secondary"}>
                Save and close
              </Button>
            </aside>
          </div>
        </div>

        <span className="fixed right-3 top-3 z-30">
          <Alert />
        </span>
      </Fragment>
    </Dialog>
  );
};

export default CreateVariant;
