import { Product } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useGetIdentity, useListContext, useRedirect, useStore } from "react-admin";
import { BsThreeDots } from "react-icons/bs";
import { CiGrid41 } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { PiListBulletsLight, PiScreencast } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { medusaClient } from "../../../../lib/services/medusa";
import Status, { Status_Variant } from "../../../common/Status";
import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as _Table,
} from "../../../ui/table";
import React from "react";
import Medusa from "@medusajs/medusa-js";
import { GetStoreVendor } from "../../../post/Post";

const Table = (props) => {
  const { addProduct } = props;
  const redirect = useRedirect();
  const { data, page, isLoading, perPage } = useListContext();
  const [products, setProducts] = useState<(Product | PricedProduct)[]>([]);
  const [listView, setListView] = useState(true);
  const { data: identity, isLoading: identityLoading } = useGetIdentity();
  const [medusaUser, setMedusaUser] = useStore('medusa_user');
  const medusaClient = new Medusa({
    maxRetries: 3,
    baseUrl: "https://ecommerce.haulway.co",
    apiKey: medusaUser?.api_token || null,
  });

  useEffect(() => {
    if (identity) {
      medusaClient.admin.auth.createSession({
        email: identity?.email,
        password: import.meta.env.VITE_AUTH_PASSWORD,
      }).then(({ user }) => {
        setMedusaUser(user);
        // console.log(user);

      })
    }

  }, [identity])

  useEffect(() => {
    if (medusaUser) {
      // console.log(medusaUser)
      // medusaClient.admin.store.retrieve()
      //   .then(({ store }) => {
      //     console.log(store);
      //   })
    }
  }, [medusaUser])



  const fetchProducts = useCallback(async () => {

    const { products, limit, offset, count } =
      await medusaClient.admin.products.list({
        // expand: 'store,store_id',
        limit: 50,
        offset: page - 1,
      });
    setProducts(products.filter(prod => { return prod?.store_id === medusaUser?.store_id }));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, perPage, addProduct]);

  useEffect(() => {
    if (products) {
      console.log(products)
    }
  }, [products])



  return (
    <Fragment>
      <_Table className="shadow-none w-full overflow-auto">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="">
          <TableRow>
            <TableHead className="">{listView ? "Name" : ""}</TableHead>
            <TableHead>{listView ? "Collection" : ""}</TableHead>
            <TableHead>{listView ? "Status" : ""}</TableHead>
            <TableHead>{listView ? "Availability" : ""}</TableHead>
            <TableHead>{listView ? "Inventory" : ""}</TableHead>
            <TableHead className="flex space-x-1 items-center justify-end">
              <PiListBulletsLight
                onClick={() => setListView(true)}
                className="w-5 h-5 hover:cursor-pointer"
              />
              <CiGrid41
                onClick={() => setListView(false)}
                className="w-5 h-5 hover:cursor-pointer"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        {listView ? (
          <TableBody>
            {products &&
              products.map((product: Product | PricedProduct, i) => (
                <TableRow
                  key={i}
                  onClick={() =>
                    redirect(
                      "show",
                      "product",
                      product.id,
                      {},
                      {
                        product,
                      },
                    )
                  }
                  className="hover:cursor-pointer"
                >
                  <TableCell className="truncate">
                    <div className="truncate flex space-x-2 items-center">
                      {product.thumbnail && (
                        <img
                          alt={product?.title ?? ""}
                          src={product.thumbnail}
                          className="w-10 h-10"
                        />
                      )}
                      {product?.title && (
                        <p className="flex text-sm items-center justify-center rounded-full">
                          {product.title}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="truncate">
                    {product.collection?.title ?? "_"}
                  </TableCell>
                  <TableCell className="truncate">
                    <Status
                      active={true}
                      className="flex h-1.5 w-1.5 rounded-full"
                      background={false}
                      border={false}
                      title={product.status ?? "_"}
                      variant={
                        (
                          product.status as string
                        ).toLowerCase() as Status_Variant
                      }
                    />
                  </TableCell>
                  <TableCell className="truncate">
                    {product?.sales_channels
                      ? product?.sales_channels[0].name
                      : ""}
                  </TableCell>
                  <TableCell className="truncate">{`${product &&
                    product.variants.reduce(
                      (prev, curr) => prev + (curr?.inventory_quantity || 0),
                      0,
                    )
                    } in stock for ${product.variants.length
                    } variant(s)`}</TableCell>
                  <TableCell className="z-10 flex justify-end items-center pr-5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="border-none" variant="outline">
                          <BsThreeDots />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="bg-white border w-52 p-3 space-y-2 text-sm">
                        <DropdownMenuItem
                          className="flex space-x-2 items-center my-1.5"
                          onClick={() => { }}
                        >
                          <button
                            className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                            onClick={() => { }}
                          >
                            <FiEdit className="w-5 h-5" />
                            <p>Edit</p>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex space-x-2 items-center my-1.5"
                          onClick={() => { }}
                        >
                          <button
                            className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                            onClick={() => { }}
                          >
                            <PiScreencast className="w-5 h-5" />
                            <p>Unpublish</p>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex space-x-2 items-center my-1.5"
                          onClick={() => { }}
                        >
                          <button
                            className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                            onClick={() => { }}
                          >
                            <HiOutlineDuplicate className="w-5 h-5" />
                            <p>Duplicate</p>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex space-x-2 items-center my-1.5"
                          onClick={() => { }}
                        >
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
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        ) : null}
      </_Table>
      {!listView ? (
        <section className="grid grid-cols-3 md:grid-cols-6 gap-6 p-6 w-full">
          {products &&
            products.map((product: Product | PricedProduct, i) => (
              <div className="flex flex-col space-y-2 w-full relative">
                <section className="hover:cursor-pointer bg-gray-50 rounded-md overflow-hidden flex items-center h-60 w-full border">
                  <img
                    onClick={() =>
                      redirect(
                        "show",
                        "product",
                        product.id,
                        {},
                        {
                          product,
                        },
                      )
                    }
                    src={product.thumbnail ?? "/images/gallery.png"}
                    alt={product.title}
                  />
                  <aside className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="border-none p-0.5 h-4 rounded-sm"
                          variant="outline"
                        >
                          <BsThreeDots />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="bg-white border w-38 p-1 space-y-2 text-sm">
                        <DropdownMenuItem
                          className="flex space-x-2 items-center my-1"
                          onClick={() => { }}
                        >
                          <button
                            className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                            onClick={() => { }}
                          >
                            <FiEdit className="w-5 h-5" />
                            <p>Edit</p>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex space-x-2 items-center my-1.5"
                          onClick={() => { }}
                        >
                          <button
                            className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                            onClick={() => { }}
                          >
                            <PiScreencast className="w-5 h-5" />
                            <p>Unpublish</p>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex space-x-2 items-center my-1.5"
                          onClick={() => { }}
                        >
                          <button
                            className="w-full text-start px-2 py-1 hover:bg-gray-100 transition-ease flex space-x-2"
                            onClick={() => { }}
                          >
                            <HiOutlineDuplicate className="w-5 h-5" />
                            <p>Duplicate</p>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex space-x-2 items-center my-1.5"
                          onClick={() => { }}
                        >
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
                  </aside>
                </section>
              </div>
            ))}
        </section>
      ) : null}
    </Fragment>
  );
};

export default Table;
