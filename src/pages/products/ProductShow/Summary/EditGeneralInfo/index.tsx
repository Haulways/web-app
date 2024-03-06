import { Product } from "@medusajs/medusa";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
import { Input, TextArea } from "../../../../common/Form/Input";
import { Button } from "../../../../ui/button";
import { Dialog, DialogTrigger } from "../../../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../../../ui/select";
import Spinner from "../../../../common/assets/spinner";
import { medusaClient } from "../../../../../lib/services/medusa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../../ui/dropdown-menu";
import customers from "@medusajs/medusa/dist/api/routes/admin/customers";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type Props = {
  open: boolean;
  close: () => void;
  product: Product;
};

enum FieldsName {
  TITLE = "title",
  SUBTITLE = "subtitle",
  DESCRIPTION = "description",
  HANDLE = "handle",
  MATERIAL = "material",
}

interface InputFields {
  title: string;
  subtitle: string;
  description: string;
  handle: string;
  material: string;
}

const EditGeneralInfo = ({ open, close, product }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [discountableToggle, setDiscountableToggle] = useState(false);
  const formMethods = useForm<InputFields>();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors: formErrors, isLoading },
  } = formMethods;

  const productTYpes = useMemo(async () => {
    // const data = await medusaClient.admin.products.list({
    //   offset: 0,
    //   limit: 1000,
    // })
    return []; //data.products
  }, []);

  console.log("productTYpes", productTYpes);

  const submit = handleSubmit(async (data: InputFields) => {
    // medusaClient.admin.products
    //   .update({
    //     name: data.title,
    //     description: data.description,
    //   })
    //   .then(() => {
    //     close();
    //   })
    //   .catch(() => {
    //     openAlert({
    //       ...state,
    //       title: "Failed to create sales channel, please try again.",
    //       variant: "error",
    //       active: true,
    //     });
    //   });
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
      <div
        className={`${
          open ? "fixed" : "hidden"
        } z-50 -top-3 bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm flex items-center justify-center`}
      >
        <FormProvider {...formMethods}>
          <div className="bg-white h-fit w-[90%] md:w-[50%] rounded-lg flex flex-col">
            <section className="flex items-center justify-between p-5 border-b border-b-gray-300">
              <p className="text-xl md:text-3xl font-medium text-black">
                Edit General Information
              </p>
              <Button onClick={() => close()} variant={"outline"}>
                <X className="w-5 h-5" />
              </Button>
            </section>

            <section className="flex flex-col max-h-[65vh] overflow-y-auto space-y-2 px-8 py-2 text-sm text-gray-500">
              <section className="grid grid-cols-1 md:grid-cols-2 gap-5 py-3">
                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm">
                    Title<span className="text-red-500">*</span>
                  </p>
                  <span className="bg-gray-100 overflow-hidden rounded">
                    <Input
                      className="w-full"
                      id={FieldsName.TITLE}
                      {...register(FieldsName.TITLE, {
                        required: "Title is required",
                      })}
                      defaultValue={product?.title ?? ""}
                      placeholder="Winter Jacket"
                    />
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm">
                    Subtitle<span className="text-red-500">*</span>
                  </p>
                  <span className="bg-gray-100 overflow-hidden rounded">
                    <Input
                      className="w-full"
                      id={FieldsName.SUBTITLE}
                      {...register(FieldsName.SUBTITLE, {
                        required: "Subtitle is required",
                      })}
                      defaultValue={product?.subtitle ?? ""}
                      placeholder="subtitle"
                    />
                  </span>
                </div>
              </section>

              <section className="flex flex-col">
                <p>Give your product a short and clear title.</p>
                <p>
                  50-60 characters is the recommended length for search engines.
                </p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-5 py-3">
                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm">
                    Handle<span className="text-red-500">*</span>
                  </p>
                  <span className="bg-gray-100 overflow-hidden rounded">
                    <Input
                      className="w-full"
                      id={FieldsName.HANDLE}
                      {...register(FieldsName.HANDLE, {
                        required: "Handle is required",
                      })}
                      defaultValue={product?.handle ?? ""}
                      placeholder="/winter-jacket"
                    />
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm">
                    Material<span className="text-red-500">*</span>
                  </p>
                  <span className="bg-gray-100 overflow-hidden rounded">
                    <Input
                      id={FieldsName.MATERIAL}
                      {...register(FieldsName.MATERIAL, {
                        required: "material is required",
                      })}
                      className="w-full"
                      defaultValue={product?.material ?? ""}
                      placeholder="100% Cotton"
                    />
                  </span>
                </div>
              </section>

              <section>
                <div className="flex flex-col space-y-3">
                  <p className="font-medium">Description</p>
                  <span className="bg-gray-100 overflow-hidden rounded">
                    <TextArea
                      id={FieldsName.DESCRIPTION}
                      {...register(FieldsName.DESCRIPTION, {})}
                      placeholder="A warm and cozy jacket..."
                      defaultValue={product?.description ?? ""}
                    />
                  </span>
                </div>

                <p className="pt-3">
                  Give your product a short and clear description.
                </p>
                <p>
                  120-160 characters is the recommended length for search
                  engines.
                </p>
              </section>

              <p className="py-3 font-medium text-black">Organize Product</p>

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

              <section className="flex justify-between space-x-3 pt-5">
                <div className="flex flex-col">
                  <p className="text-black font-medium">Discountable</p>
                  <p>
                    When unchecked discounts will not be applied to this
                    product.
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
            </section>

            <section className="flex justify-end items-center space-x-3 border-t border-t-gray-300 px-8 py-5">
              <Button onClick={() => {}} variant={"outline"}>
                back
              </Button>
              <Button
                disabled={isSubmitting}
                onClick={submit}
                variant={"secondary"}
              >
                Save and close {isSubmitting && <Spinner />}
              </Button>
            </section>
          </div>
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default EditGeneralInfo;
