import { Product } from "@medusajs/medusa";
import { Fragment, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "../../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../ui/tooltip";
import EditMedia from "./EditMedia";
import EditThumbnail from "./EditThumbnail";
import { SmallPHorizontalCards } from "../../../../components/card/ShowCard";



const SubDetails = ({ product }: { product: Product }) => {
  const [editThumbnail, setEditThumbnail] = useState(false);
  const [editMedia, setEditMedia] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);

  return (
    <Fragment>
      <div className="h-fit rounded-lg border flex-grow md:max-w-[40%] flex-col space-y-5">
        <section className="bg-white p-6 flex flex-col space-y-5">
          <div className=" w-full flex justify-between items-center">
            <p className="font-bold text-xl md:text-3xl">Thumbnail</p>
            <aside className="flex justify-between items-center space-x-2">
              <Button
                onClick={() => setEditThumbnail(true)}
                variant={"outline"}
                className="p-3"
              >
                Edit
              </Button>
              {!toggleDelete ? (
                <Button
                  onClick={() => setToggleDelete(true)}
                  variant={"outline"}
                  className="p-3"
                >
                  <RiDeleteBin6Line className="w-5 h-5" />
                </Button>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => {}}
                        variant={"outline"}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white hover:text-white"
                      >
                        Confirm
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-44 text-sm font-medium text-gray-500">
                        Are your Sure?
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </aside>
          </div>

          <div className="flex items-center w-full overflow-y-auto hidden-scrollbar">
            <div className="rounded-lg bg-gray-100 py-5 px-2">
              <img
                alt={product?.title ?? ""}
                src={product?.thumbnail ?? ""}
                className="w-10 h-10"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 flex flex-col space-y-5">
          <div className=" w-full flex justify-between items-center">
            <p className="font-bold text-xl md:text-3xl">Media</p>
            <Button
              onClick={() => setEditMedia(true)}
              variant={"outline"}
              className="p-3"
            >
              Edit Media
            </Button>
          </div>

          {/* <div className="grid grid-cols-3 gap-3 items-center w-full h-48 overflow-y-auto hidden-scrollbar">
            {product.images.map((image, i) => (
              <div
                key={i}
                className="rounded-lg col-span-1 flex-grow flex items-center justify-center bg-gray-50 py-5 px-2"
              >
                <img
                  alt={product?.title ?? ""}
                  src={image?.url ?? ""}
                  className="w-20 h-20"
                />
              </div>
            ))}
          </div> */}
          <SmallPHorizontalCards post={product} />
        </section>
      </div>

      {editThumbnail && (
        <EditThumbnail
          open={editThumbnail}
          close={() => setEditThumbnail(false)}
          product={product}
        />
      )}

      {editMedia && (
        <EditMedia
          open={editMedia}
          close={() => setEditMedia(false)}
          product={product}
        />
      )}
    </Fragment>
  );
};

export default SubDetails;
