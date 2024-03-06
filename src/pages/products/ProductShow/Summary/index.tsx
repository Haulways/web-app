import { Product } from "@medusajs/medusa";
import { Fragment, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { GrGateway } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import Status, { Status_Variant } from "../../../common/Status";
import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import EditGeneralInfo from "./EditGeneralInfo";
import EditSalesChannel from "./EditSalesChannel";

const Summary = ({ product }: { product: Product }) => {
  const [editGeneralInfo, setEditGeneralInfo] = useState(false);
  const [editSalesChannel, setEditSalesChannel] = useState(false);

  return (
    <Fragment>
      <div className="flex flex-col space-y-6 border rounded-lg bg-white p-6">
        <section className="flex justify-between items-center">
          <p className="text-xl md:text-3xl font-semibold">
            {product?.title ?? ""}
          </p>

          <div className="flex items-center space-x-2">
            <Status
              active={true}
              className="flex h-1.5 w-1.5 rounded-full"
              background={false}
              border={false}
              title={product.status ?? "_"}
              variant={
                (product.status as string).toLowerCase() as Status_Variant
              }
            />

            <aside>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="border-none" variant="outline">
                    <BsThreeDots className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border w-58 p-3 space-y-2 text-sm">
                  <DropdownMenuItem>
                    <button
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                      onClick={() => setEditGeneralInfo(true)}
                    >
                      <FiEdit className="w-5 h-5" />
                      <p>Edit General Information</p>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                      onClick={() => setEditSalesChannel(true)}
                    >
                      <GrGateway className="w-5 h-5" />
                      <p>Edit Sales Channels</p>
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      className="w-full text-left text-red-500 px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                      onClick={() => {}}
                    >
                      <RiDeleteBin6Line className="w-5 h-5" />
                      <p>Delete</p>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </aside>
          </div>
        </section>

        <p>{product?.description ?? ""}</p>

        <section className="flex flex-col space-y-3 w-full">
          <p className="font-bold text-lg">Details</p>

          <div className="flex justify-between items-center">
            <aside>Subtitle</aside>
            <aside>{product?.subtitle ?? "_"}</aside>
          </div>
          <div className="flex justify-between items-center">
            <aside>Handle</aside>
            <aside>{product?.handle ?? "_"}</aside>
          </div>
          <div className="flex justify-between items-center">
            <aside>Type</aside>
            <aside>{product?.type?.value ?? "_"}</aside>
          </div>
          <div className="flex justify-between items-center">
            <aside>Collection</aside>
            <aside>{product?.collection?.title ?? "_"}</aside>
          </div>
          <div className="flex justify-between items-center">
            <aside>Discountable</aside>
            <aside>{product?.discountable}</aside>
          </div>
          {/* <div className="flex justify-between items-center">
            <aside>Metadata</aside>
            <aside>
              {Object.values(product?.metadata ?? {})
                .join(", ")
                .toString() ?? "_"}
            </aside>
          </div> */}

          {/* <p className="pt-3">Sales channels</p>
          {product?.sales_channels?.length !== 0 && (
            <Button variant={"outline"} className="w-fit">
              {product?.sales_channels[0].name}
            </Button>
          )}

          <p>
            Available in {product?.sales_channels?.length} out of{" "}
            {product?.sales_channels?.length} Sales Channels
          </p> */}
        </section>
      </div>

      {editGeneralInfo && (
        <EditGeneralInfo
          open={editGeneralInfo}
          close={() => setEditGeneralInfo(false)}
          product={product}
        />
      )}

      {editSalesChannel && (
        <EditSalesChannel
          open={editSalesChannel}
          close={() => setEditSalesChannel(false)}
          salesChannels={product?.sales_channels ?? []}
        />
      )}
    </Fragment>
  );
};

export default Summary;
