import { Minus, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import useToggleState from "../../../lib/hooks/use-toggle-state";
import { Input } from "../../common/Form/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { Currency } from "@medusajs/medusa";
import { medusaClient } from "../../../lib/services/medusa";
import { ScrollArea } from "../../ui/scroll-area";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../ui/collapsible";

type CreateAPIKeyProps = {
  show: boolean;
  close: () => void;
};

const CreateAPIKey = ({ show, close }: CreateAPIKeyProps) => {
  const [showModal, openModal, closeModal, toggleModal] = useToggleState();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [countries, setCountries] = useState<Currency[]>([]);

  // const fetchCurrencies = async () => {
  //   const data = await medusaClient.admin.currencies.list();
  //   setCurrencies(data.currencies);
  // };
  // const fetchCountries = async () => {
  //   const data = await medusaClient.admin.currencies.list();
  //   setCurrencies(data.currencies);
  // };

  // useEffect(() => {
  //   fetchCurrencies();
  // }, []);

  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } z-50 top-0 bottom-0 left-0 right-0 bg-white text-gray-500`}
    >
      <section className="w-full border-b border-b-gray-300 py-3">
        <div className="w-full md:w-[60%] mx-auto flex items-center justify-between">
          <X className="h-6 w-6 text-black" onClick={close} />

          <Button variant={"secondary"} disabled={true}>
            Publish API key
          </Button>
        </div>
      </section>

      <div className="mx-auto w-full md:w-[55%] pt-16 pb-6 border-b border-gray-300">
        <Collapsible
          open={showModal}
          onOpenChange={() => toggleModal()}
          className=""
        >
          <section className="justify-between flex items-center">
            <p className="font-medium text-3xl text-black">Create API Key</p>

            <CollapsibleTrigger asChild>
              <Button variant="ghost">
                {showModal ? (
                  <Minus className="text-gray-500 hover:cursor-pointer" />
                ) : (
                  <Plus className="text-gray-500 hover:cursor-pointer" />
                )}
              </Button>
            </CollapsibleTrigger>
          </section>

          <CollapsibleContent className="space-y-2">
            <p className="font-medium text-black">General Information</p>
            <p className="">
              Create and manage API keys. Right now this is only related to
              sales channels.
            </p>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
              <div className="flex flex-col space-y-2">
                <p className="font-medium text-sm">
                  Title<span className="text-red-500">*</span>
                </p>
                <span className="bg-gray-100 overflow-hidden rounded">
                  <Input id="title" placeholder="Name your key" />
                </span>
              </div>
            </section>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mx-auto w-full md:w-[55%] py-6 flex items-center justify-between">
        <aside className="flex flex-col space-y-2">
          <p className="font-medium text-black">Sales channels</p>
          <p className="">
            Connect as many sales channels to your API key as you need.
          </p>
        </aside>

        <Button variant={"outline"} className="p-3">
          Add sales channels
        </Button>
      </div>
    </div>
  );
};

export default CreateAPIKey;
