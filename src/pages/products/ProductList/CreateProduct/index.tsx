// import {
//   AdminPostProductsReq,
//   Currency,
//   ProductCollection,
//   ProductTag,
//   ProductType,
// } from "@medusajs/medusa";
// import { AlertCircle, ChevronDown, Minus, Plus, X } from "lucide-react";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
// import { useCountries } from "use-react-countries";
// import useAlert from "../../../../lib/hooks/use-alert";
// import useToggleState from "../../../../lib/hooks/use-toggle-state";
// import { medusaClient } from "../../../../lib/services/medusa";
// import { Input, TextArea } from "../../../common/Form/Input";
// import Spinner from "../../../common/assets/spinner";
// import { Button } from "../../../ui/button";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "../../../ui/collapsible";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../../../ui/dropdown-menu";
// import { ScrollArea } from "../../../ui/scroll-area";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../../ui/select";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../../../ui/tooltip";
// import ImageCard from "./ImageCard";
// import { RiDeleteBinLine } from "react-icons/ri";

import {
  AdminPostProductsReq,
  Currency,
  ProductCollection,
  ProductTag,
  ProductType,
  ProductVariant,
} from "@medusajs/medusa";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
import { useCountries } from "use-react-countries";
import useAlert from "../../../../lib/hooks/use-alert";
import useToggleState from "../../../../lib/hooks/use-toggle-state";
import { medusaClient } from "../../../../lib/services/medusa";
import { Input, TextArea } from "../../../common/Form/Input";
import Spinner from "../../../common/assets/spinner";
import { Button } from "../../../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { ScrollArea } from "../../../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../ui/tooltip";
import ImageCard from "./ImageCard";
import { RiDeleteBin6Line, RiDeleteBinLine } from "react-icons/ri";
import CreateVariant from "./CreateVariant";
import { GiCancel } from "react-icons/gi";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";



import React from "react";

enum FieldsName {
  TITLE = "title",
  SUBTITLE = "subtitle",
  TRACKING_NO = "tracking_no",
  HANDLE = "handle",
  DESCRIPTION = "description",
  IS_GIFTCARD = "is_giftcard",
  THUMBNAIL = "thumbnail",
  PROFIILE_ID = "profile_id",
  WEIGHT = "weight",
  LENGTH = "length",
  HEIGHT = "height",
  WIDTH = "width",
  HS_CODE = "hs_code",
  MID_CODE = "mid_code",
  ORIGIN_COUNTRY = "origin_country",
  MATERIAL = "material",
  COLLECTION_ID = "collection_id",
  TYPE_ID = "type_id",
  DISCOUNTABLE = "discountable",
  EXTERNAL_ID = "external_id",
  METADATA = "metadata",
}

interface InputFields extends AdminPostProductsReq { }

type ProductOption = {
  title: string;
  value: string;
};

type CreateProductProps = {
  show: boolean;
  close: () => void;
};

const CreateProduct = ({ show, close }: CreateProductProps) => {
  const { state, open: openAlert, close: closeAlert, Alert } = useAlert();
  const [showModal1, openModal1, closeModal1, toggleModal1] = useToggleState();
  const [showModal2, openModal2, closeModal2, toggleModal2] = useToggleState();
  const [showModal3, openModal3, closeModal3, toggleModal3] = useToggleState();
  const [showModal4, openModal4, closeModal4, toggleModal4] = useToggleState();
  const [showModal5, openModal5, closeModal5, toggleModal5] = useToggleState();
  const [showModal6, openModal6, closeModal6, toggleModal6] = useToggleState();
  const [showVariantOption, , , toggleVariantOption] = useToggleState();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [selectedProductType, setSelectedProductTypes] =
    useState<ProductType>();
  const [collections, setCollecions] = useState<ProductCollection[]>([]);
  const [selectedCollections, setSelectedCollections] =
    useState<ProductCollection>();
  const [tags, setTags] = useState<ProductTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<ProductTag[]>([]);
  const [productOptions, setProductOptions] = useState<ProductOption[]>([
    {
      title: "",
      value: "",
    },
  ]);
  const [productOptionElements, setProductOptionElements] = useState<string[]>([
    "",
  ]);
  const [productVariantIdx, setProductVariantIdx] = useState(
    productOptionElements.length - 1,
  );
  const [discountableToggle, setDiscountableToggle] = useState(false);
  const [salesToggle, setSalesToggle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { countries } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);

  const formMethods = useForm<InputFields>();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors: formErrors },
  } = formMethods;

  const fetchCurrencies = async () => {
    const data = await medusaClient.admin.currencies.list();
    setCurrencies(data.currencies);
  };

  const fetchProductTypes = async () => {
    const data = await medusaClient.admin.productTypes.list({
      limit: 1000,
    });
    setProductTypes(data.product_types);
  };

  const fetchCollections = async () => {
    const data = await medusaClient.admin.collections.list({
      limit: 1000,
      offset: 0,
    });
    setCollecions(data.collections);
  };

  const fetchTags = async () => {
    const data = await medusaClient.admin.productTags.list();
    setTags(data.product_tags);
  };

  const handleAddInput = useCallback(() => {
    setProductOptions([...(productOptions as any), {} as any]);
    setProductOptionElements([...productOptionElements, ""]);
  }, [productOptions]);

  // Function to handle removing an input field
  const handleRemoveInput = useCallback(
    (index: number) => {
      const newProductOptions = [...productOptions];
      newProductOptions.splice(index, 1);
      setProductOptions(newProductOptions);

      const newProductOptionElements = [...productOptionElements];
      newProductOptionElements.splice(index, 1);
      setProductOptionElements(newProductOptionElements);
    },
    [productOptions],
  );

  // Function to handle changing input value
  const handleChange = (data: ProductOption, index: number) => {
    const newProductOptions = [...productOptions];
    newProductOptions[index] = data;
    setProductOptions(newProductOptions);
  };

  const handleThumbnailImageSelect = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const base64Image = event.target.result;
        setThumbnail(base64Image);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleMediaImageSelect = (event: any) => {
    const files = event.target.files;

    for (let file of files) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const base64Image = event.target.result;
        setMedia((prev) => prev.concat(base64Image));
      };

      reader.readAsDataURL(file);
    }
  };

  const ProductOption = useCallback(
    (data: ProductOption, idx: number) => (
      <section className="grid grid-cols-7 w-full pt-2 gap-3 place-self-end">
        <div className="flex flex-col col-span-2 space-y-1">
          <p className="font-medium text-sm">Option title</p>
          <span className="bg-gray-100 overflow-hidden rounded">
            <Input
              className="w-full"
              id="color"
              placeholder="Color..."
              onChange={(e) => {
                data.title = e.target.value;
                const newProductOptions = [...productOptions];
                newProductOptions.splice(idx, 1, data);
                setProductOptions(newProductOptions);
              }}
              defaultValue={data?.title ?? ""}
            />
          </span>
        </div>
        <div className="flex flex-col col-span-4 space-y-1">
          <p className="font-medium text-sm">Variations (comma separated)</p>
          <span className="bg-gray-100 overflow-hidden rounded">
            <Input
              className="w-full"
              id="variation"
              placeholder="Blue, Red, Black..."
              onChange={(e) => {
                data.value = e.target.value;
                const newProductOptions = [...productOptions];
                newProductOptions.splice(idx, 1, data);
                setProductOptions(newProductOptions);
              }}
              defaultValue={data?.value ?? ""}
            />
          </span>
        </div>
        <Button
          variant={"outline"}
          onClick={() => {
            handleRemoveInput(idx);
          }}
          className="px-2 py-1 flex items-center space-x-2 col-span-1 flex-grow text-xs self-end"
        >
          <RiDeleteBinLine className="h-5 w-5" />
        </Button>
      </section>
    ),
    [],
  );

  console.log("productOptions", productOptions);
  const createProduct = handleSubmit(async (data: InputFields) => {
    setIsSubmitting(false);
    medusaClient.admin.products
      .create({
        discountable: discountableToggle,
        is_giftcard: data?.is_giftcard,
        title: data?.title,
        subtitle: data?.subtitle,
        collection_id: data?.collection_id,
        description: data?.description,
        handle: !data?.handle
          ? data.title.toLowerCase().replace(" ", "-")
          : data?.handle?.charAt(0) === "/"
            ? data?.handle
            : `/${data?.handle}`,
        height: data?.height,
        hs_code: data?.hs_code,
        length: data?.length,
        material: data?.material,
        metadata: data.metadata,
        mid_code: data?.mid_code,
        origin_country: selectedCountry,
        width: data?.width,
        weight: data?.weight,
        type: {
          id: selectedProductType?.id ?? "",
          value: selectedProductType?.value ?? "",
        },
        tags: selectedTags,
        options: productOptions.map((each) => ({ title: each.title })),
        images: media,
        thumbnail: thumbnail,
        variants: productVariants as any,
      })
      .then(() => {
        close();
        setIsSubmitting(false);
      })
      .catch(() => {
        openAlert({
          ...state,
          title: "Failed to create product, please try again.",
          variant: "error",
          active: true,
        });
        setIsSubmitting(false);
      });
  });

  useEffect(() => {
    fetchCurrencies();
    fetchProductTypes();
    fetchCollections();
    fetchTags();
  }, []);

  return (
    <div
      className={`${show ? "fixed" : "hidden"
        } z-50 top-0 bottom-0 left-0 right-0 bg-white px-3`}
    >

      <div className="mx-auto max-h-[85vh] overflow-y-auto pt-16 text-gray-400">
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
                <span
                  className={`bg-gray-100 overflow-hidden rounded ${formErrors[FieldsName.TITLE]?.message &&
                    "border border-red-500"
                    }`}
                >
                  <Input
                    className="w-full"
                    id={FieldsName.TITLE}
                    placeholder="Winter Jacket"
                    {...register(FieldsName.TITLE, {
                      required: "Title is required",
                    })}
                  />
                </span>
                {formErrors[FieldsName.TITLE]?.message && (
                  <p className="text-red-500 text-sm">
                    {formErrors[FieldsName.TITLE].message ?? ""}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">
                  Subtitle<span className="text-red-500">*</span>
                </p>
                <span
                  className={`bg-gray-100 overflow-hidden rounded ${formErrors[FieldsName.SUBTITLE]?.message &&
                    "border border-red-500"
                    }`}
                >
                  <Input
                    className="w-full"
                    id={FieldsName.SUBTITLE}
                    placeholder="Warm and cozy..."
                    {...register(FieldsName.SUBTITLE, {
                      required: "Subtitle is required",
                    })}
                  />
                </span>
                {formErrors[FieldsName.SUBTITLE]?.message && (
                  <p className="text-red-500 text-sm">
                    {formErrors[FieldsName.SUBTITLE].message ?? ""}
                  </p>
                )}
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
                <span
                  className={`bg-gray-100 overflow-hidden rounded ${formErrors[FieldsName.HANDLE]?.message &&
                    "border border-red-500"
                    }`}
                >
                  <Input
                    className="w-full"
                    id={FieldsName.HANDLE}
                    placeholder="/winter-jacket"
                    {...register(FieldsName.HANDLE, {
                      // required: "Handle is required",
                    })}
                  />
                </span>
                {formErrors[FieldsName.HANDLE]?.message && (
                  <p className="text-red-500 text-sm">
                    {formErrors[FieldsName.HANDLE].message ?? ""}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">Material</p>
                <span
                  className={`bg-gray-100 overflow-hidden rounded ${formErrors[FieldsName.MATERIAL]?.message &&
                    "border border-red-500"
                    }`}
                >
                  <Input
                    className="w-full"
                    placeholder="100% Cotton"
                    id={FieldsName.MATERIAL}
                    {...register(FieldsName.MATERIAL, {
                      // required: "Handle is required",
                    })}
                  />
                </span>
                {formErrors[FieldsName.MATERIAL]?.message && (
                  <p className="text-red-500 text-sm">
                    {formErrors[FieldsName.MATERIAL].message ?? ""}
                  </p>
                )}
              </div>
            </section>

            <div className="flex flex-col space-y-1">
              <p className="font-medium">Description</p>
              <span
                className={`bg-gray-100 overflow-hidden rounded ${formErrors[FieldsName.DESCRIPTION]?.message &&
                  "border border-red-500"
                  }`}
              >
                <TextArea
                  id={FieldsName.DESCRIPTION}
                  placeholder="A warm and cozy jacket..."
                  {...register(FieldsName.DESCRIPTION, {
                    // required: "Handle is required",
                  })}
                />
              </span>
              {formErrors[FieldsName.MATERIAL]?.message && (
                <p className="text-red-500 text-sm">
                  {formErrors[FieldsName.MATERIAL].message ?? ""}
                </p>
              )}
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
                <Select
                  onValueChange={(value) => {
                    productTypes?.forEach((type) => {
                      if (type.id === value) {
                        setSelectedProductTypes(type);
                      }
                    });
                  }}
                >
                  <SelectTrigger className="bg-gray-100 h-10 overflow-hidden rounded">
                    <SelectValue placeholder="Choose a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((each, i) => (
                      <SelectItem key={i} value={each.id}>
                        {each.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">Collection</p>
                <Select
                  onValueChange={(value) => {
                    collections?.forEach((type) => {
                      if (type.id === value) {
                        setSelectedCollections(type);
                      }
                    });
                  }}
                >
                  <SelectTrigger className="bg-gray-100 h-10 overflow-hidden rounded">
                    <SelectValue placeholder="Choose a collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map((each, i) => (
                      <SelectItem key={i} value={each.id}>
                        {each.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </section>

            <div className="relative flex flex-col space-y-1 pt-2">
              <p className="font-medium text-sm">Tags (comma separated)</p>
              <DropdownMenu>
                <div
                  className={`relative flex w-full overflow-hidden rounded-md border`}
                >
                  <div className="flex min-h-[3rem] w-full flex-wrap items-center space-x-2 space-y-1 overflow-auto rounded-md border border-neutral-300 px-2 py-1">
                    {selectedTags.length === 0 && (
                      <p className="px-3 text-neutral-300">Select a tag</p>
                    )}
                    {selectedTags.map((each, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          const filteredItem = selectedTags.filter(
                            (item) => item.value !== each.value,
                          );
                          setSelectedTags(filteredItem);
                        }}
                        className="flex items-center rounded-md bg-gray-100 p-2 text-sm hover:cursor-pointer"
                      >
                        <p>{each.value}</p>
                        <X className="h-5 w-5" />
                      </div>
                    ))}
                  </div>

                  <span className="absolute inset-y-0 right-2 flex items-center justify-end pr-3 hover:cursor-pointer">
                    <DropdownMenuTrigger className="w-full">
                      <ChevronDown
                        className={`text-shade-medium h-5 w-5 ${"countryDropdown" ? "rotate-0" : `rotate-180`
                          }`}
                      />
                    </DropdownMenuTrigger>
                  </span>
                </div>

                <DropdownMenuContent className="max-h-[30rem] w-full overflow-y-auto border-neutral-200 bg-white shadow-md">
                  {tags.map((each, i) => (
                    <DropdownMenuItem
                      key={i}
                      onClick={() => {
                        if (selectedTags.length !== 3) {
                          const exists = selectedTags.filter(
                            (item) => item.id === each.id,
                          );
                          if (exists.length === 0) {
                            setSelectedTags([
                              ...selectedTags,
                              {
                                ...each,
                                id: each.id,
                                value: each.value,
                              } as any,
                            ]);
                          }
                        }
                      }}
                      className="w-full hover:cursor-pointer"
                    >
                      {each.value ?? ""}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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

            {productOptionElements.map((_, idx) => (
              <div>{ProductOption(productOptions[idx], idx)}</div>
            ))}

            <Button
              variant={"outline"}
              onClick={handleAddInput}
              className="px-2 py-1 w-full flex items-center space-x-2 text-xs"
            >
              <Plus className="h-5 w-5" />
              <p>Add an option</p>
            </Button>
          </CollapsibleContent>

          <CollapsibleContent className="w-full space-y-2 flex flex-col">
            <div className="pt-4 flex items-center space-x-2">
              <p className="font-medium text-black">
                Product variants{" "}
                <span className="text-gray-400">
                  ({`${productVariants.length}`})
                </span>
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

            {productVariants.length > 0 && (
              <section className="flex flex-col space-y-1 text-gray-500">
                <div className="grid grid-cols-8 grid-flow-row">
                  <p className="col-span-5">Variant</p>
                  <p className="col-span-1">Inventory</p>
                  <p className=""></p>
                  <p className=""></p>
                </div>
                {productVariants.map((variant, idx) => (
                  <div className="grid grid-cols-8 grid-flow-row p-3 hover:bg-gray-50 transition-ease rounded-md">
                    <div className="flex flex-col col-span-5">
                      <p className="font-bold">
                        {variant.title.toUpperCase()}
                        <span className="font-normal">
                          ({variant.sku?.toUpperCase()})
                        </span>
                      </p>
                      <p>{variant.ean}</p>
                    </div>

                    <p className="col-span-1 m-auto">
                      {variant.inventory_quantity}
                    </p>

                    <div className="m-auto hover:cursor-pointer col-span-1">
                      {productOptions.length === variant.options.length ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-44 text-sm font-medium text-gray-500">
                                {variant.title.toUpperCase()} is valid
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <GiCancel className="w-4 h-4 text-red-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-44 text-sm font-medium text-gray-500">
                                {variant.title.toUpperCase()} is missing some
                                option value
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>

                    <div className="col-span-1 m-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="border-none p-2 h-fit rounded-sm m-auto bg-white"
                            variant="outline"
                          >
                            <BsThreeDots className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="bg-white border w-38 p-1 space-y-2 text-sm">
                          <DropdownMenuItem className="flex space-x-2 items-center my-1">
                            <button
                              className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                              onClick={() => {
                                setProductVariantIdx(idx);
                                toggleVariantOption();
                              }}
                            >
                              <FiEdit className="w-5 h-5" />
                              <p>Edit</p>
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex space-x-2 items-center my-1.5">
                            <button
                              className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease text-red-500 flex space-x-2"
                              onClick={() => { }}
                            >
                              <RiDeleteBin6Line className="w-5 h-5" />
                              <p>Delete</p>
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </section>
            )}

            <Button
              variant={"outline"}
              onClick={toggleVariantOption}
              disabled={
                productOptionElements.length < 1 ||
                productOptions[0].title === ""
              }
              className="px-2 py-1 w-full flex items-center space-x-2 text-xs"
            >
              <Plus className="h-5 w-5" />
              <p>Add a variant</p>
            </Button>
          </CollapsibleContent>
        </Collapsible>

        {(productOptionElements.length > 1 || productOptions[0].title) &&
          showVariantOption && (
            <CreateVariant
              open={showVariantOption}
              close={toggleVariantOption}
              index={productVariantIdx}
              productOptions={productOptions}
              productVariants={productVariants}
              setProductVariants={setProductVariants}
            />
          )}

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

          <CollapsibleContent className="flex flex-col space-y-2">
            <p className="pt-2 ">Used for shipping and customs purposes.</p>
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
                  />
                </span>
              </div>
            </section>

            <p className="font-medium text-black pt-6">Customs</p>
            <p className="text-gray-500">
              Configure if you are shipping internationally.
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
                  />
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">Country of origin</p>

                <Select
                  onValueChange={(value) => {
                    setSelectedCountry(value);
                  }}
                >
                  <SelectTrigger className="bg-gray-100 h-10 overflow-hidden rounded">
                    <SelectValue
                      placeholder="Choose a country"
                      className="text-gray-600"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-52 rounded-md">
                      {countries.map((country: { name: string }, i: number) => (
                        <SelectItem key={i} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            </section>
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
                <span
                  onClick={() => thumbnailFileInputRef?.current?.click()}
                  className="text-purple-600 hover:cursor-pointer"
                >
                  click to browse
                </span>
                <input
                  ref={thumbnailFileInputRef}
                  accept=".jpg, .jpeg, .png, .gif"
                  type="file"
                  onChange={handleThumbnailImageSelect}
                  className="hidden"
                />
              </p>
              <p className="text-center">
                1200 x 1600 (3:4) recommended, up to 10MB each
              </p>
            </div>

            {thumbnail && (
              <ImageCard
                src={thumbnail}
                className="w-16 h-16 pt-3 rounded-sm"
                handleDelete={() => setThumbnail("")}
              />
            )}
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
                <span
                  onClick={() => mediaFileInputRef?.current?.click()}
                  className="text-purple-600 hover:cursor-pointer"
                >
                  click to browse
                </span>
                <input
                  ref={mediaFileInputRef}
                  accept=".jpg, .jpeg, .png, .gif"
                  type="file"
                  multiple
                  onChange={handleMediaImageSelect}
                  className="hidden"
                />
              </p>
              <p className="text-center">
                1200 x 1600 (3:4) recommended, up to 10MB each
              </p>
            </div>

            <div className="flex space-x-3">
              {media.map((each, i) => (
                <ImageCard
                  id={i}
                  src={each}
                  className="w-20 h-20 pt-3 rounded-sm"
                  handleDelete={(idx: any) => {
                    const newMedia = [...media];
                    newMedia.splice(idx, 1);
                    setMedia(newMedia);
                  }}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <span className="fixed right-3 top-3 z-30">
        <Alert />
      </span>

      <section className="w-full border-b border-b-gray-300 py-3">
        <div className="w-full md:w-[60%] mx-auto flex items-center justify-between">
          <X className="h-6 w-6 text-black" onClick={close} />

          <div className="flex space-x-2 items-center">
            <Button variant={"outline"} disabled={isSubmitting}>
              Save as draft
            </Button>
            <Button
              onClick={createProduct}
              variant={"secondary"}
              disabled={isSubmitting}
            >
              <div className="flex items-center justify-center space-x-2">
                <p>Publish product</p>{" "}
                {isSubmitting && <Spinner color="white" />}
              </div>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateProduct;
