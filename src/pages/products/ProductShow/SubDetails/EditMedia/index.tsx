import { Product } from "@medusajs/medusa";
import { X } from "lucide-react";
import { useEffect } from "react";
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

type Props = {
  open: boolean;
  close: () => void;
  product: Product;
};

const EditMedia = ({ open, close, product }: Props) => {
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
        <div className="bg-white h-fit max-h-[85vh] overflow-y-auto w-[90%] md:w-[50%] rounded-lg flex flex-col">
          <section className="flex items-center justify-between p-5 border-b border-b-gray-300">
            <p className="text-xl md:text-3xl font-medium text-black">
              Edit Media
            </p>
            <Button onClick={() => close()} variant={"outline"}>
              <X className="w-5 h-5" />
            </Button>
          </section>

          <section className="flex flex-col px-8 py-4">
            <p className="font-medium text-black text-lg">Thumbnail</p>

            <p className="text-gray-500 text-sm">
              Used to represent your product during checkout, social sharing and
              more.
            </p>

            <section className="flex flex-col space-y-2 text-sm text-gray-400 mt-4">
              <div className="p-5 md:p-8 flex flex-col items-center justify-center border border-dashed rounded-lg text-sm border-gray-500 hover:border-purple-600">
                <p className="text-center">
                  Drop your images here, or{" "}
                  <span className="text-purple-600">click to browse</span>
                </p>
                <p className="text-center">
                  1200 x 1600 (3:4) recommended, up to 10MB each
                </p>
              </div>
            </section>
          </section>

          {product?.images && product.images.length !== 0 && (
            <section className="flex flex-col space-y-2 px-8 py-4">
              <p className="font-medium text-black text-lg">Upload</p>

              <div className="flex flex-col space-y-2">
                {product.images.map((image, i) => (
                  <section className="flex items-center justify-between w-full px-3 rounded-md hover:bg-gray-100 transition-ease">
                    <div className="rounded-lg bg-gray-100 p-3">
                      <img
                        alt={product?.title ?? ""}
                        src={image?.url ?? ""}
                        className="w-10 h-10"
                      />
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="border-none" variant="outline">
                          <BsThreeDots />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="bg-white border w-40 p-3 space-y-1">
                        <DropdownMenuItem className="">
                          <button
                            className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease text-red-500 flex space-x-2"
                            onClick={() => {}}
                          >
                            <RiDeleteBin6Line className="w-5 h-5" />
                            <p>Delete</p>
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </section>
                ))}
              </div>
            </section>
          )}

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

export default EditMedia;
