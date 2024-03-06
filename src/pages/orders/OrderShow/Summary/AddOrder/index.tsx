import { Order, Product, ProductVariant } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { medusaClient } from "../../../../../lib/services/medusa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../ui/table";

type Props = {
  close: () => void;
  order: Order;
};

const AddOrder = ({ close, order: storeOrder }: Props) => {
  const [add, setAdd] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [data, setData] = useState<ProductVariant[]>([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(Math.ceil(data.length / 10));

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPage) setPage((prev) => prev + 1);
  };

  const handleRemoveAll = () => {};
  const handleSelectAll = () => {};
  //   const [cart, setCart] = useState<
  //     Omit<Cart, "refundable_amount" | "refunded_total"> | undefined
  //   >();
  //   const [edit, setEdit] = useState(false);

  //   const fetchCart = async () => {
  //     const data = await medusaClient.carts.retrieve(order.cart_id);
  //     setCart(data.cart);
  //   };

  //   useEffect(() => {
  //     fetchCart();
  //   }, []);

  const fetchProducts = async () => {
    const data = await medusaClient.admin.products.list({
      offset,
      limit: pageSize,
      //   fields: 'variants',
      expand: "variants",
    });
    console.log("data", data.products);

    // setData(data.products.slice(data.offset, data.offset + pageSize).flatMap((each) => each.variants));
    setOffset(data.offset + pageSize);
    setCount(data.count);
    setTotalPage(Math.ceil(data.count / 10));
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  //   useEffect(() => {
  //     const count =
  //   }, [selected]);

  useEffect(() => {
    setAdd(false);
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());

    return () => {
      document.removeEventListener("keydown", (e) => e.key === "Escape");
    };
  }, []);

  return (
    <section className="flex flex-col max-h-[65vh] overflow-y-auto px-8 py-4">
      <Table className="shadow-none w-full overflow-auto pt-5 text-gray-500">
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-10">
              {selectedAll ? (
                <IoCheckbox
                  onClick={handleRemoveAll}
                  className="text-purple-600 w-5 h-5"
                />
              ) : (
                <MdCheckBoxOutlineBlank
                  onClick={handleSelectAll}
                  className="w-5 h-5"
                />
              )}
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((product, i) => (
              <TableRow key={i} className="hover:cursor-pointer">
                <TableCell className="truncate w-10">
                  {selected.includes(product.id ?? "") ? (
                    <IoCheckbox
                      onClick={() => {
                        setSelected(
                          selected.filter((each) => each !== product.id),
                        ),
                          console.log("filter");
                      }}
                      className="text-purple-600 w-5 h-5"
                    />
                  ) : (
                    <MdCheckBoxOutlineBlank
                      onClick={() => selected.push(product?.id ?? "")}
                      className="w-5 h-5"
                    />
                  )}
                </TableCell>
                <TableCell className="truncate">
                  <div className="truncate flex space-x-2 items-center">
                    {product.product.thumbnail && (
                      <img
                        alt={product?.title ?? ""}
                        src={product.product.thumbnail ?? ""}
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
                  {product.inventory_quantity}
                </TableCell>
                <TableCell className="truncate">NGN 22.00 NGN</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <section className="w-full px-3 pt-5 text-gray-500 flex flex-grow items-center justify-between text-xs md:text-sm">
        <aside className="flex items-center space-x-2 flex-grow">
          {offset} - {offset + data.length} of {count} products
        </aside>
        <aside className="flex items-center space-x-2 w-fit">
          <p>
            {page} of {totalPage}
          </p>
          <span className="flex space-x-2 text-gray-500 hover:cursor-pointer">
            <MoveLeft className="text-gray-400 w-4" onClick={handlePrev} />
            <MoveRight className="text-gray-400 w-4" onClick={handleNext} />
          </span>
        </aside>
      </section>
    </section>
  );
};

export default AddOrder;
