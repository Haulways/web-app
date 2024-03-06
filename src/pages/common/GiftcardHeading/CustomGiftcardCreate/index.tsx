"use client";

import { format } from "date-fns";
import { X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowDown } from "react-icons/fa6";
import { IoToggle } from "react-icons/io5";
import { useRegionContext } from "../../../../lib/contexts/region-provider";
import useAlert from "../../../../lib/hooks/use-alert";
import useToggleState from "../../../../lib/hooks/use-toggle-state";
import { medusaClient } from "../../../../lib/services/medusa";
import { Button } from "../../../ui/button";
import { Calendar } from "../../../ui/calendar";
import { Dialog, DialogTrigger } from "../../../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Input, TextArea } from "../../Form/Input";

type Props = {
  open: boolean;
  close: () => void;
};

enum FieldsName {
  REGION = "region",
  AMOUNT = "amount",
  EMAIL = "email",
  MESSAGE = "message",
}

interface InputFields {
  region: string;
  amount: number;
  email: string;
  message: string;
}

const CustomGiftcardCreate = ({ open, close }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state, open: openAlert, close: closeAlert, Alert } = useAlert();
  const [expiryDateToggle, setExpiryDateToggle] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [expiryTime, setExpiryTime] = useState("");
  const { regions } = useRegionContext();
  const [selectedRegion, setSelectedRegion] = useState("");
  const formMethods = useForm<InputFields>();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors: formErrors },
  } = formMethods;

  const submit = handleSubmit(async (data: InputFields) => {
    setIsSubmitting(true);
    medusaClient.admin.giftCards
      .create({
        region_id: selectedRegion,
        ends_at: expiryDate,
        value: +data.amount * 100 || 0,
      })
      .then(() => {
        close();
      })
      .catch(() => {
        openAlert({
          ...state,
          title: "Failed to create gift card",
          variant: "error",
          active: true,
        });
      });
    setIsSubmitting(false);
  });

  useEffect(() => {
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={(prev: any) => close()}>
      <DialogTrigger asChild></DialogTrigger>
      <Fragment>
        <div
          className={`${
            open ? "fixed" : "hidden"
          } z-50 -top-3 bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm flex items-center justify-center`}
        >
          <div className="bg-white h-fit w-[90%] md:w-[50%] rounded-lg flex flex-col text-sm">
            <section className="flex items-center justify-between p-5 border-b border-b-gray-300">
              <p className="text-xl md:text-3xl font-medium text-black">
                Custom Gift Card
              </p>
              <Button onClick={() => close()} variant={"outline"}>
                <X className="w-5 h-5" />
              </Button>
            </section>

            <section className="max-h-[65vh] overflow-y-auto px-8 py-4 text-gray-500 flex flex-col space-y-8">
              <section className="flex flex-col space-y-2">
                <p className="font-medium text-black">Details</p>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="text-xs font-medium">
                      Region<span className="text-red-500">*</span>
                    </p>
                    <Select onValueChange={(value) => setSelectedRegion(value)}>
                      <SelectTrigger className="bg-gray-100 h-10 overflow-hidden rounded">
                        <SelectValue
                          placeholder="Choose Region"
                          defaultValue={"EU"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region, i) => (
                          <SelectItem key={i} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="text-xs font-medium">
                      Amount<span className="text-red-500">*</span>
                    </p>
                    <span
                      className={`bg-gray-100 overflow-hidden rounded-md px-3 flex items-center border border-gray-300`}
                    >
                      <p className="text-gray-400">$</p>
                      <Input
                        id={FieldsName.AMOUNT}
                        {...register(FieldsName.AMOUNT, {})}
                        className="border-none"
                        type="number"
                        placeholder="0.00"
                      />
                    </span>
                  </div>
                </section>
              </section>

              <div className="flex flex-col py-2 pr-2">
                <div className="flex justify-between py-2">
                  <p className="text-black font-medium text-sm">
                    Gift Card has an expiry date?
                  </p>

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
                  Schedule the Gift Card to deactivate in the future.
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
                      <Input
                        onChange={(e) => setExpiryTime(e.target.value)}
                        className="border-none"
                        type="time"
                      />
                    </aside>
                  </section>
                ) : null}
              </div>

              <section className="flex flex-col space-y-2">
                <p className="font-medium text-black">Receiver</p>

                <section className="grid grid-cols-1 gap-3 w-full">
                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="text-xs font-medium">
                      Email<span className="text-red-500">*</span>
                    </p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <Input
                        id={FieldsName.EMAIL}
                        {...register(FieldsName.EMAIL, {
                          required: "Email is required",
                        })}
                        type="email"
                        placeholder="Email..."
                      />
                    </span>
                  </div>

                  <div className="flex flex-col col-span-1 space-y-1">
                    <p className="text-xs font-medium">Personal Message</p>
                    <span className="bg-gray-100 overflow-hidden rounded">
                      <TextArea
                        id={FieldsName.MESSAGE}
                        {...register(FieldsName.MESSAGE, {})}
                        rows={5}
                        placeholder="Write a personal message here"
                      />
                    </span>
                  </div>
                </section>
              </section>
            </section>

            <aside className="flex justify-end items-center space-x-3 w-full border-t border-t-gray-300 px-8 py-5">
              <Button onClick={close} variant={"outline"}>
                Cancel
              </Button>
              <Button onClick={submit} variant={"secondary"}>
                Create and Publish
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

export default CustomGiftcardCreate;
