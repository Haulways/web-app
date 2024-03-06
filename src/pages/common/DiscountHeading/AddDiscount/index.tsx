import {
  AllocationType,
  Currency,
  DiscountRuleType,
  Region,
} from "@medusajs/medusa";
import { format } from "date-fns";
import { AlertCircle, Minus, Plus, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaArrowDown } from "react-icons/fa6";
import {
  IoIosArrowDown,
  IoIosCheckbox,
  IoMdRadioButtonOff,
  IoMdRadioButtonOn,
} from "react-icons/io";
import { IoToggle } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { useDiscountContext } from "../../../../lib/contexts/discount-provider";
import useAlert from "../../../../lib/hooks/use-alert";
import useToggleState from "../../../../lib/hooks/use-toggle-state";
import { Button } from "../../../ui/button";
import { Calendar } from "../../../ui/calendar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../ui/tooltip";
import DropDownWithCheckbox from "../../DropdownWrapper/DropDownWithCheckbox";
import { Input } from "../../Form/Input";
import Spinner from "../../assets/spinner";
import { medusaClient } from "../../../../lib/services/medusa";
import { DiscountAllocation } from "@medusajs/medusa/dist/types/totals";

enum FieldsName {
  REGIONS = "regions",
  CODE = "code",
  PERCENTAGE = "percentage",
  DESCRIPTION = "description",
  NO_REDEMPTION = "no_redemption",
}

interface InputFields {
  regions: string[];
  code: string;
  description: string;
  percentage: number;
  no_redemption: number;
}

type AddDiscountProps = {
  show: boolean;
  close: () => void;
};

const AddDiscount = ({ show, close }: AddDiscountProps) => {
  const [showFirstModal, openFirstModal, closeFirstModal, toggleFirstModal] =
    useToggleState();
  const [
    showSecondModal,
    openSecondModal,
    closeSecondModal,
    toggleSecondModal,
  ] = useToggleState();
  const [showThirdModal, openThirdModal, closeThirdModal, toggleThirdModal] =
    useToggleState();
  const [
    showFourthModal,
    openFourthModal,
    closeFourthModal,
    toggleFourthModal,
  ] = useToggleState();
  const [showFifthModal, openFifthModal, closeFifthModal, toggleFifthModal] =
    useToggleState();
  const [startDateToggle, setStartDateToggle] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [expiryDateToggle, setExpiryDateToggle] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [limitToggle, setLimitToggle] = useState(false);
  const [availabilityToggle, setAvailabilityToggle] = useState(false);
  const [discountCheckbox, setDiscountCheckbox] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<
    Currency | undefined
  >();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(false);
  const { state, open: openAlert, close: closeAlert, Alert } = useAlert();
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedAllocation, setSelectedAllocation] = useState("total");
  const { discounts, refreshDiscount } = useDiscountContext();
  const [regions, setRegions] = useState<Region[]>([]);
  const [regionDropdown, setRegionDropdown] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const formMethods = useForm<InputFields>();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors: formErrors },
  } = formMethods;

  const discount_types = [
    {
      id: "percentage",
      title: "Percentage",
      snippet: "Discount applied in %",
    },
    {
      id: "fixed",
      title: "Fixed Amount",
      snippet: "Discount in whole numbers",
    },
    {
      id: "free_shipping",
      title: "Free shipping",
      snippet: "Override delivery amount",
    },
  ];

  const allocations = [
    {
      id: "total",
      title: "Total Amount",
      snippet: "Apply to the total amount",
    },
    {
      id: "item",
      title: "Item Specific",
      snippet: "Discount in whole numbers",
    },
  ];

  const createDiscount = handleSubmit(async (data: InputFields) => {
    setIsSubmitting(true);
    medusaClient.admin.discounts
      .create({
        code: "",
        rule: {
          description: "",
          type: selectedDiscount as DiscountRuleType,
          value: data.percentage,
          allocation: selectedAllocation as AllocationType,
        },
        regions: ["reg_XXXXXXXX"],
        is_dynamic: false,
        is_disabled: false,
        // starts_at: 'Date';
        // ends_at: 'Date';
        // valid_duration: 'string';
        // usage_limit?: 'number';
      })
      .then(() => {
        refreshDiscount();
        close();
      })
      .catch(() => {
        openAlert({
          ...state,
          title: "Failed to create discount, please try again.",
          variant: "error",
          active: true,
        });
      });
    setIsSubmitting(false);
  });
  console.log("regions", regions);

  useEffect(() => {
    setValue(FieldsName.REGIONS, selectedRegions);
  }, [selectedRegions]);

  useEffect(() => {
    toggleFirstModal();
    refreshDiscount();
    // fetchCurrencies();
    // fetchFulfillmentProviders();
    // fetchPaymentProviders();
  }, []);

  return (
    <Fragment>
      <FormProvider {...formMethods}>
        <div
          className={`${
            show ? "fixed" : "hidden"
          } z-50 top-0 bottom-0 left-0 right-0 bg-white`}
        >
          <section className="w-full border-b border-b-gray-300 py-3">
            <div className="w-full px-3 md:w-[60%] mx-auto flex items-center justify-between">
              <X className="h-6 w-6 text-black" onClick={close} />

              <div className="flex items-center space-x-1">
                <Button
                  disabled={isSubmitting}
                  variant={"outline"}
                  className="flex space-x-2 items-center justify-center "
                  // onClick={createDiscount}
                >
                  <p>Save as draft</p>
                  {isSubmitting && <Spinner color="white" />}
                </Button>
                <Button
                  disabled={isSubmitting}
                  variant={"secondary"}
                  className="flex space-x-2 items-center justify-center "
                  // onClick={createDiscount}
                >
                  <p>Publish discount</p>
                  {isSubmitting && <Spinner color="white" />}
                </Button>
              </div>
            </div>
          </section>

          <section className="overflow-y-auto h-[85vh] px-3">
            <div className="mx-auto w-full md:w-[55%] pt-16 pb-6 border-b border-gray-300 text-sm">
              <Collapsible
                open={showFirstModal}
                onOpenChange={() => toggleFirstModal()}
                className=""
              >
                <section className="justify-between flex items-center">
                  <CollapsibleTrigger asChild>
                    <Fragment>
                      <div className="flex items-center space-x-1">
                        <p className="font-semibold text-lg md:text-xl text-black">
                          Discount type<span className="text-red-500">*</span>
                        </p>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <AlertCircle className="w-5 h-5 text-gray-300" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="z-10">Select a discount type</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <Button variant="ghost">
                        {showFirstModal ? (
                          <Minus
                            onClick={toggleFirstModal}
                            className="text-gray-500 hover:cursor-pointer"
                          />
                        ) : (
                          <Plus
                            onClick={toggleFirstModal}
                            className="text-gray-500 hover:cursor-pointer"
                          />
                        )}
                      </Button>
                    </Fragment>
                  </CollapsibleTrigger>
                </section>

                <CollapsibleContent className="">
                  <div className="flex flex-col space-y-3">
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-5 py-5">
                      {discount_types.map((discount, i) => (
                        <div
                          onClick={() => setSelectedDiscount(discount.id)}
                          className={`flex space-x-1 border rounded-md p-3 hover:cursor-pointer ${
                            selectedDiscount === discount.id
                              ? "border-purple-600"
                              : ""
                          }`}
                        >
                          <aside>
                            {selectedDiscount === discount.id ? (
                              <IoMdRadioButtonOn className="h-5 w-5 text-purple-600" />
                            ) : (
                              <IoMdRadioButtonOff className="h-5 w-5 text-gray-300" />
                            )}
                          </aside>
                          <aside className="flex flex-col space-y-1">
                            <p className="font-medium text-gray-600 text-sm">
                              {discount.title}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {discount.snippet}
                            </p>
                          </aside>
                        </div>
                      ))}
                    </section>

                    {selectedDiscount === "fixed" ? (
                      <section>
                        <p className="font-medium text-black">
                          Allocation<span className="text-red-500">*</span>
                        </p>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-5 py-5">
                          {allocations.map((allocation, i) => (
                            <div
                              onClick={() =>
                                setSelectedAllocation(allocation.id)
                              }
                              className={`flex space-x-1 border rounded-md p-3 hover:cursor-pointer ${
                                selectedAllocation === allocation.id
                                  ? "border-purple-600"
                                  : ""
                              }`}
                            >
                              <aside>
                                {selectedAllocation === allocation.id ? (
                                  <IoMdRadioButtonOn className="h-5 w-5 text-purple-600" />
                                ) : (
                                  <IoMdRadioButtonOff className="h-5 w-5 text-gray-300" />
                                )}
                              </aside>
                              <aside className="flex flex-col space-y-1">
                                <p className="font-medium text-gray-600 text-sm">
                                  {allocation.title}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  {allocation.snippet}
                                </p>
                              </aside>
                            </div>
                          ))}
                        </section>
                      </section>
                    ) : null}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="mx-auto w-full md:w-[55%] py-6 border-b border-gray-300 text-sm text-gray-500">
              <Collapsible
                open={showSecondModal}
                onOpenChange={() => toggleSecondModal()}
                className=""
              >
                <section className="justify-between flex items-center">
                  <CollapsibleTrigger asChild>
                    <Fragment>
                      <p className="font-semibold text-lg md:text-xl text-black">
                        General<span className="text-red-500">*</span>
                      </p>

                      <Button variant="ghost">
                        {showSecondModal ? (
                          <Minus
                            onClick={toggleSecondModal}
                            className="text-gray-500 hover:cursor-pointer"
                          />
                        ) : (
                          <Plus
                            onClick={toggleSecondModal}
                            className="text-gray-500 hover:cursor-pointer"
                          />
                        )}
                      </Button>
                    </Fragment>
                  </CollapsibleTrigger>
                </section>

                <CollapsibleContent className="">
                  <section className="grid grid-cols-1 md:grid-cols-4 gap-2 lg:gap-5 py-5">
                    <div className="flex flex-col col-span-1 md:col-span-4 space-y-2">
                      <p className="font-medium text-sm">
                        Choose valid regions
                        <span className="text-red-500">*</span>
                      </p>

                      <section className="relative">
                        <div className="relative bg-gray-100 overflow-hidden rounded">
                          <span
                            className={`flex items-center px-2 bg-gray-100 overflow-hidden rounded border ${
                              formErrors[FieldsName.REGIONS]?.message &&
                              "border-red-600"
                            }`}
                          >
                            {selectedRegions.length > 0 && (
                              <span className="px-2 py-1 h-fit text-xs rounded-lg bg-gray-300">
                                {selectedRegions.length}
                              </span>
                            )}
                            <Input
                              id={FieldsName.REGIONS}
                              {...register(FieldsName.REGIONS, {
                                required: "Regions are required",
                              })}
                              className="border-none"
                              placeholder="Choose regions"
                            />
                          </span>

                          <span
                            onClick={() => setRegionDropdown((prev) => !prev)}
                            className="absolute top-0 bottom-0 right-0 left-0 w-full h-full flex items-center justify-end pr-3 hover:cursor-pointer"
                          >
                            <IoIosArrowDown
                              className={`w-5 h-5 text-shade-medium ${
                                regionDropdown ? `rotate-180` : "rotate-0"
                              }`}
                            />
                          </span>
                        </div>

                        {formErrors[FieldsName.REGIONS]?.message && (
                          <p className="text-xs text-red-600">
                            {formErrors[FieldsName.REGIONS]?.message}
                          </p>
                        )}

                        {regionDropdown && (
                          <DropDownWithCheckbox
                            setDropdown={setRegionDropdown}
                            selected={selectedRegions}
                            setSelected={setSelectedRegions}
                            data={regions.map((each) => {
                              return {
                                id: each.id,
                                value: each.id,
                              };
                            })}
                          />
                        )}
                      </section>
                    </div>

                    <div
                      className={`flex flex-col ${
                        selectedDiscount === "free_shipping"
                          ? "md:col-span-4"
                          : "md:col-span-2"
                      } space-y-2`}
                    >
                      <p className="font-medium text-sm">
                        Code<span className="text-red-500">*</span>
                      </p>
                      <span
                        className={`bg-gray-100 overflow-hidden rounded ${
                          formErrors[FieldsName.CODE]?.message &&
                          "border-red-600"
                        }`}
                      >
                        <Input
                          id={FieldsName.CODE}
                          {...register(FieldsName.CODE, {
                            required: "Code is required",
                          })}
                          placeholder="SUMMERSALES10"
                        />
                      </span>
                      {formErrors[FieldsName.CODE]?.message && (
                        <p className="text-xs text-red-600">
                          {formErrors[FieldsName.CODE]?.message}
                        </p>
                      )}
                    </div>

                    {selectedDiscount !== "free_shipping" ? (
                      <div className="flex flex-col md:col-span-2 space-y-2">
                        {selectedDiscount === "fixed" ? (
                          <p className="font-medium text-sm">
                            Amount<span className="text-red-500">*</span>
                          </p>
                        ) : (
                          <p className="font-medium text-sm">
                            Percentage<span className="text-red-500">*</span>
                          </p>
                        )}

                        <section className="relative bg-gray-100 overflow-hidden rounded">
                          <span
                            className={`bg-gray-100 overflow-hidden rounded-md flex items-center px-3 border border-gray-300 ${
                              formErrors[FieldsName.PERCENTAGE]?.message &&
                              "border-red-600"
                            }`}
                          >
                            {selectedDiscount === "fixed" ? (
                              <p className="text-gray-400">$</p>
                            ) : (
                              <p className="text-gray-400">%</p>
                            )}
                            <Input
                              id={FieldsName.PERCENTAGE}
                              {...register(FieldsName.PERCENTAGE, {
                                // required: "Default Tax Rate  is required",
                              })}
                              className="border-none"
                              placeholder={
                                selectedDiscount === "fixed" ? "0.00" : "10"
                              }
                              type="number"
                              min={0}
                            />
                          </span>
                          {formErrors[FieldsName.PERCENTAGE]?.message && (
                            <p className="text-xs text-red-600">
                              {formErrors[FieldsName.PERCENTAGE]?.message}
                            </p>
                          )}
                        </section>
                      </div>
                    ) : null}

                    <div className="col-span-1 md:col-span-4 text-xs">
                      <p>
                        The code your customers will enter during checkout. This
                        will appear on your customer’s invoice.
                      </p>
                      <p>Uppercase letters and numbers only.</p>
                    </div>

                    <div className="flex flex-col col-span-1 md:col-span-4 space-y-2">
                      <p className="font-medium text-sm">
                        Description<span className="text-red-500">*</span>
                      </p>
                      <span
                        className={`bg-gray-100 overflow-hidden rounded ${
                          formErrors[FieldsName.DESCRIPTION]?.message &&
                          "border-red-600"
                        }`}
                      >
                        <Input
                          id={FieldsName.DESCRIPTION}
                          {...register(FieldsName.DESCRIPTION, {
                            required: "Description is required",
                          })}
                          placeholder="Summer Sale 2022"
                        />
                      </span>
                      {formErrors[FieldsName.DESCRIPTION]?.message && (
                        <p className="text-xs text-red-600">
                          {formErrors[FieldsName.DESCRIPTION]?.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-1 md:col-span-4 space-y-2 flex items-center">
                      <aside className="mt-1 text-gray-500 hover:cursor-pointer">
                        {discountCheckbox ? (
                          <IoIosCheckbox
                            className="h-5 w-5 text-purple-600"
                            onClick={() => setDiscountCheckbox(false)}
                          />
                        ) : (
                          <MdCheckBoxOutlineBlank
                            className="h-5 w-5"
                            onClick={() => setDiscountCheckbox(true)}
                          />
                        )}
                      </aside>

                      <aside className="flex items-center mb-2 space-x-1">
                        <p>This is a template discount</p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <AlertCircle className="w-5 h-5 text-gray-300" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="z-10 w-44 text-xs text-gray-600 font-medium">
                                Template discounts allow you to define a set of
                                rules that can be used across a group of
                                discounts. This is useful in campaigns that
                                should generate unique codes for each user, but
                                where the rules for all unique codes should be
                                the same.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </aside>
                    </div>
                  </section>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="mx-auto w-full md:w-[55%] py-6 border-b border-gray-300 text-sm text-gray-500">
              <Collapsible
                open={showThirdModal}
                onOpenChange={() => toggleThirdModal()}
                className=""
              >
                <section className="justify-between flex items-center">
                  <CollapsibleTrigger asChild>
                    <Fragment>
                      <p className="font-semibold text-lg md:text-xl text-black">
                        Configuration
                      </p>

                      <Button variant="ghost">
                        {showThirdModal ? (
                          <Minus
                            onClick={toggleThirdModal}
                            className="text-gray-500 hover:cursor-pointer"
                          />
                        ) : (
                          <Plus
                            onClick={toggleThirdModal}
                            className="text-gray-500 hover:cursor-pointer"
                          />
                        )}
                      </Button>
                    </Fragment>
                  </CollapsibleTrigger>
                </section>

                <CollapsibleContent className="">
                  <div className="text-gray-500">
                    <p>
                      Discount code applies from when you hit the publish button
                      and forever if left untouched.
                    </p>

                    <div className="flex flex-col py-2 pr-2">
                      <div className="flex justify-between py-2">
                        <aside className="flex items-center mb-2 space-x-1">
                          <p className="text-black font-medium text-sm">
                            Start date
                          </p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button>
                                  <AlertCircle className="w-5 h-5 text-gray-300" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="z-10 w-44 text-xs text-gray-600 ">
                                  If you want to schedule the discount to
                                  activate in the future, you can set a start
                                  date here, otherwise the discount will be
                                  active immediately.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </aside>
                        <aside className="hover:cursor-pointer">
                          {startDateToggle ? (
                            <IoToggle
                              onClick={() => setStartDateToggle(false)}
                              className="h-7 w-7 text-purple-600"
                            />
                          ) : (
                            <IoToggle
                              onClick={() => setStartDateToggle(true)}
                              className="w-7 h-7 text-gray-200 scale-x-[-1]"
                            />
                          )}
                        </aside>
                      </div>
                      <p className="text-sm -mt-2 text-gray-500">
                        Schedule the discount to activate in the future.
                      </p>
                      {startDateToggle ? (
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 py-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <aside className="flex flex-col space-y-2 border rounded-md bg-gray-100 p-2 md:p-3">
                                <section className="flex justify-between">
                                  <p>Start date</p>
                                  <FaArrowDown className="h-3 w-3 hover:cursor-pointer" />
                                </section>
                                <section>
                                  {startDate ? (
                                    format(startDate, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </section>
                              </aside>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          <aside className="flex flex-col space-y-2 border rounded-md bg-gray-100 p-2 md:p-3">
                            <section className="flex justify-between">
                              <p>Start time</p>
                              <FaArrowDown className="h-3 w-3 hover:cursor-pointer" />
                            </section>
                            <Input className="border-none" type="time" />
                          </aside>
                        </section>
                      ) : null}
                    </div>

                    <div className="flex flex-col py-2 pr-2">
                      <div className="flex justify-between py-2">
                        <aside className="flex items-center mb-2 space-x-1">
                          <p className="text-black font-medium text-sm">
                            Discount has an expiry date?
                          </p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button>
                                  <AlertCircle className="w-5 h-5 text-gray-300" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="z-10 w-44 text-xs text-gray-600 ">
                                  If you want to schedule the discount to
                                  deactivate in the future, you can set an
                                  expiry date here.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </aside>
                        <aside className="hover:cursor-pointer">
                          {expiryDateToggle ? (
                            <IoToggle
                              onClick={() => setExpiryDateToggle(false)}
                              className="h-7 w-7 text-purple-600"
                            />
                          ) : (
                            <IoToggle
                              onClick={() => setExpiryDateToggle(true)}
                              className="w-7 h-7 text-gray-200 scale-x-[-1]"
                            />
                          )}
                        </aside>
                      </div>
                      <p className="text-sm -mt-2 text-gray-500">
                        Schedule the discount to deactivate in the future.
                      </p>

                      {expiryDateToggle ? (
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 py-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <aside className="flex flex-col space-y-2 border rounded-md bg-gray-100 p-2 md:p-3">
                                <section className="flex justify-between">
                                  <p>Expire date</p>
                                  <FaArrowDown className="h-3 w-3 hover:cursor-pointer" />
                                </section>
                                <section>
                                  {expiryDate ? (
                                    format(expiryDate, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </section>
                              </aside>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={expiryDate}
                                onSelect={setExpiryDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          <aside className="flex flex-col space-y-2 border rounded-md bg-gray-100 p-2 md:p-3">
                            <section className="flex justify-between">
                              <p>Expire time</p>
                              <FaArrowDown className="h-3 w-3 hover:cursor-pointer" />
                            </section>
                            <Input className="border-none" type="time" />
                          </aside>
                        </section>
                      ) : null}
                    </div>

                    <div className="flex flex-col pr-2">
                      <div className="flex justify-between py-2">
                        <aside className="flex items-center mb-2 space-x-1">
                          <p className="text-black font-medium text-sm">
                            Limit the number of redemptions?
                          </p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button>
                                  <AlertCircle className="w-5 h-5 text-gray-300" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="z-10 w-44 text-xs text-gray-600 ">
                                  If you wish to limit the amount of times a
                                  customer can redeem this discount, you can set
                                  a limit here.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </aside>
                        <aside className="hover:cursor-pointer">
                          {limitToggle ? (
                            <IoToggle
                              onClick={() => setLimitToggle(false)}
                              className="h-7 w-7 text-purple-600"
                            />
                          ) : (
                            <IoToggle
                              onClick={() => setLimitToggle(true)}
                              className="w-7 h-7 text-gray-200 scale-x-[-1]"
                            />
                          )}
                        </aside>
                      </div>
                      <p className="text-sm -mt-2 mb-2 text-gray-500">
                        Limit applies across all customers, not per customer.
                      </p>

                      <div className="flex flex-col col-span-1 md:col-span-4 space-y-2">
                        <p className="font-medium text-sm">
                          Number of redemptions
                        </p>
                        <span
                          className={`bg-gray-100 overflow-hidden rounded ${
                            formErrors[FieldsName.NO_REDEMPTION]?.message &&
                            "border-red-600"
                          }`}
                        >
                          <Input
                            id={FieldsName.NO_REDEMPTION}
                            {...register(FieldsName.NO_REDEMPTION, {})}
                            placeholder="5"
                            type="number"
                          />
                        </span>
                        {formErrors[FieldsName.NO_REDEMPTION]?.message && (
                          <p className="text-xs text-red-600">
                            {formErrors[FieldsName.NO_REDEMPTION]?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col pr-2">
                      <div className="flex justify-between py-2">
                        <aside className="flex items-center mb-2 space-x-1">
                          <p className="text-black font-medium text-sm">
                            Availability duration?
                          </p>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button>
                                  <AlertCircle className="w-5 h-5 text-gray-300" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="z-10 w-fit text-xs text-gray-600 ">
                                  Select a discount type
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </aside>
                        <aside className="hover:cursor-pointer">
                          {availabilityToggle ? (
                            <IoToggle
                              onClick={() => setAvailabilityToggle(false)}
                              className="h-7 w-7 text-purple-600"
                            />
                          ) : (
                            <IoToggle
                              onClick={() => setAvailabilityToggle(true)}
                              className="w-7 h-7 text-gray-200 scale-x-[-1]"
                            />
                          )}
                        </aside>
                      </div>
                      <p className="text-sm -mt-2 mb-2 text-gray-500">
                        Set the duration of the discount.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="mx-auto w-full md:w-[55%] py-6 border-b border-gray-300 text-sm text-gray-500">
              <Collapsible
                open={showFourthModal}
                onOpenChange={() => toggleFourthModal()}
                className=""
              >
                <section className="justify-between flex items-center">
                  <CollapsibleTrigger asChild>
                    <Fragment>
                      <aside className="flex items-center mb-2 space-x-1">
                        <p className="font-semibold text-lg md:text-xl text-black">
                          Conditions
                        </p>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button>
                                <AlertCircle className="w-5 h-5 text-gray-300" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="z-10 w-44 text-xs text-gray-600 ">
                                If you want to schedule the discount to
                                deactivate in the future, you can set an expiry
                                date here.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </aside>

                      <Button variant="ghost">
                        {showFourthModal ? (
                          <Minus
                            onClick={toggleFourthModal}
                            className="text-gray-500 hover:cursor-pointer"
                          />
                        ) : (
                          <Plus
                            onClick={toggleFourthModal}
                            className="text-gray-500 hover:cursor-pointer"
                          />
                        )}
                      </Button>
                    </Fragment>
                  </CollapsibleTrigger>
                </section>

                <CollapsibleContent className="">
                  <div className="text-gray-500">
                    <p>Add conditions to your Discount</p>

                    <Button
                      variant="outline"
                      className="mt-3 text-sm flex space-x-2 w-full rounded-md"
                    >
                      <Plus className="h-4 w-4" />
                      <p>Add Condition</p>
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="mx-auto w-full md:w-[55%] py-6 border-b border-gray-300 text-sm text-gray-500">
              <Collapsible
                open={showFifthModal}
                onOpenChange={() => toggleFifthModal()}
                className=""
              >
                <section className="justify-between flex items-center">
                  <CollapsibleTrigger asChild>
                    <Fragment>
                      <p className="font-semibold text-lg md:text-xl text-black">
                        Metadata
                      </p>

                      <Button variant="ghost">
                        {showFifthModal ? (
                          <Minus
                            onClick={toggleFifthModal}
                            className="text-gray-500 hover:cursor-pointer"
                          />
                        ) : (
                          <Plus
                            onClick={toggleFifthModal}
                            className="text-gray-500 hover:cursor-pointer"
                          />
                        )}
                      </Button>
                    </Fragment>
                  </CollapsibleTrigger>
                </section>

                <CollapsibleContent className="">
                  <div className="text-gray-500">
                    <p>
                      Metadata allows you to add additional information to your
                      discount.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </section>
        </div>
      </FormProvider>

      <span className="fixed right-3 top-3 z-30">
        <Alert />
      </span>
    </Fragment>
  );
};

export default AddDiscount;
