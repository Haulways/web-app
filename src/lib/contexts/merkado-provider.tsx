import { Customer, LineItem, Order } from "@medusajs/medusa";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StatisticsCardData } from "../../components/dashboard/statistics-card";
import { medusaClient } from "../services/medusa";
import DateTime from "../utils/date-time";
import { actualAmountValue, commaSeperatedNumberFormat } from "../utils/format";

interface MerkadoContextProps {
  totalShipment: StatisticsCardData;
  PendingShipment: StatisticsCardData;
  ongoingShipment: StatisticsCardData;
  deliveryShipment: StatisticsCardData;
  deliveredOrder: number;
  pendingOrder: number;
  cancelledOrder: number;
  productSales: number;
  products: [number, LineItem][];
  orders: Order[] | undefined;
}

const MerkadoContext = createContext<MerkadoContextProps | null>(null);

export const MerkadoProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>();
  const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
  const [prevOrders, setPrevOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>();
  const [currrentCustomers, setCurrentCustomers] = useState<Customer[]>([]);
  const [prevCustomers, setPrevCustomers] = useState<Customer[]>([]);
  const [productSales, setProductSales] = useState(0);
  const [deliveredOrder, setDeliveredOrder] = useState(0);
  const [cancelledOrder, setCancelledOrder] = useState(0);
  const [pendingOrder, setPendingOrder] = useState(0);
  const [products, setProducts] = useState<[number, LineItem][]>([]);

  const totalShipment = useMemo(() => {
    const data = {
      title: "Total shipment",
      percentage: "+0%",
      textColor: "text-[#1748C5]",
      color: "#1748C5",
      bgColor: "bg-[#1748C5]",
      isNegative: false,
      total: "0",
    };

    if (!orders) return data;

    const salesAmount = orders.reduce(
      (accumulator: number, currentOrder: Order) =>
        accumulator + (currentOrder?.cart?.total || 0),
      0,
    );

    const curSalesAmount = currentOrders.reduce(
      (accumulator: number, currentOrder: Order) =>
        accumulator + (currentOrder?.cart?.total || 0),
      0,
    );

    const prevSalesAmount = prevOrders.reduce(
      (accumulator: number, prevOrder: Order) =>
        accumulator + (prevOrder?.cart?.total || 0),
      0,
    );

    const percentage = (curSalesAmount - prevSalesAmount) / prevSalesAmount;
    const isNegative = Math.trunc(percentage) < 0 ? true : false;

    return {
      ...data,
      textColor: !isNegative ? "text-[#1748C5]" : "text-[#FF3939]",
      color: !isNegative ? "#1748C5" : "#FF3939",
      bgColor: !isNegative ? "bg-[#1748C5]" : "bg-[#FF3939]",
      percentage: (!isNegative ? "+" : "") + Math.trunc(percentage) + "%",
      isNegative,
      total: commaSeperatedNumberFormat(92),
    };
  }, [orders, currentOrders, prevOrders]);

  const PendingShipment = useMemo(() => {
    const data = {
      title: "Pending shipment",
      percentage: "+0%",
      textColor: "text-[#37C868]",
      color: "#37C868",
      bgColor: "bg-[#37C868]",
      isNegative: false,
      total: commaSeperatedNumberFormat(63),
    };

    if (!orders) return data;

    const percentage =
      ((currentOrders.length - prevOrders.length) / prevOrders.length) * 100;
    const isNegative = percentage < 0 ? true : false;

    return {
      ...data,
      textColor: !isNegative ? "text-[#37C868]" : "text-[#FF3939]",
      color: !isNegative ? "#37C868" : "#FF3939",
      bgColor: !isNegative ? "bg-[#37C868]" : "bg-[#FF3939]",
      percentage: (!isNegative ? "+" : "") + Math.trunc(percentage) + "%",
      isNegative,
    };
  }, [orders, currentOrders, prevOrders]);

  const ongoingShipment = useMemo(() => {
    const data = {
      title: "Budget Remaining",
      percentage: "+0%",
      textColor: "text-[#892CFF]",
      color: "#892CFF",
      bgColor: "bg-[#892CFF]",
      isNegative: false,
      total: commaSeperatedNumberFormat(59),
    };

    if (!customers) return data;

    const percentage =
      ((currrentCustomers.length - prevCustomers.length) /
        prevCustomers.length) *
      100;
    const isNegative = percentage < 0 ? true : false;

    return {
      ...data,
      textColor: !isNegative ? "text-[#892CFF]" : "text-[#FF3939]",
      color: !isNegative ? "#892CFF" : "#FF3939",
      bgColor: !isNegative ? "bg-[#892CFF]" : "bg-[#FF3939]",
      percentage: (!isNegative ? "+" : "") + Math.trunc(percentage) + "%",
      isNegative,
    };
  }, [customers]);

  const deliveryShipment = useMemo(() => {
    const data = {
      title: "Spent",
      percentage: "+0%",
      textColor: "text-[#FF3939]",
      color: "#FF3939",
      bgColor: "bg-[#FF3939]",
      isNegative: true,
      total: "0",
    };

    if (!orders) return data;

    const total = orders.reduce(
      (accumulator: number, currentOrder: Order) =>
        accumulator +
        (currentOrder?.cart?.total || 0) -
        (currentOrder?.cart?.tax_total || 0) -
        (currentOrder?.cart?.shipping_tax_total || 0),
      0,
    );

    const curRevenueAmount = currentOrders.reduce(
      (accumulator: number, current: Order) =>
        accumulator +
        (current?.cart?.total || 0) -
        (current?.cart?.tax_total || 0) -
        (current?.cart?.shipping_tax_total || 0),
      0,
    );

    const prevRevenueAmount = prevOrders.reduce(
      (accumulator: number, prev: Order) =>
        accumulator +
        (prev?.cart?.total || 0) -
        (prev?.cart?.tax_total || 0) -
        (prev?.cart?.shipping_tax_total || 0),
      0,
    );

    const percentage =
      (curRevenueAmount - prevRevenueAmount) / prevRevenueAmount;
    const isNegative = Math.trunc(percentage) < 0 ? true : false;

    return {
      ...data,
      textColor: !isNegative ? "text-[#1748C5]" : "text-[#FF3939]",
      color: !isNegative ? "#1748C5" : "#FF3939",
      bgColor: !isNegative ? "bg-[#1748C5]" : "bg-[#FF3939]",
      percentage: (!isNegative ? "+" : "") + Math.trunc(percentage) + "%",
      isNegative,
      total: commaSeperatedNumberFormat(19),
    };
  }, [orders]);

  const fetchOrders = useCallback(async () => {
    const data = await medusaClient.admin.orders.list({
      offset: 0,
      limit: 1000,
      expand: "cart,customer,sales_channel,currency",
    });

    const topSales: Record<string, [number, LineItem]> = {};
    let productSales = 0;
    let deliveredOrder = 0;
    let cancelledOrder = 0;
    let pendingOrder = 0;

    for (const order of data.orders) {
      const cart = await fetchCarts(order.cart_id);
      Object.assign(order, { ...order, cart });
      for (const item of cart.items) {
        if (item.variant_id === null) continue;
        if (!(item.variant_id in topSales))
          topSales[item.variant_id] = [0, item];
        topSales[item.variant_id] = [topSales[item.variant_id][0] + 1, item];
        productSales++;
      }
      if (order.status === "pending") pendingOrder += 1;
      if (order.status === "completed") deliveredOrder = +1;
      if (order.status === "canceled") cancelledOrder = +1;
    }

    const prevOrders: Order[] = [];
    const currentOrders: Order[] = [];

    for (const order of data.orders) {
      const month = DateTime.getInterval(order.created_at as unknown as string);
      if (month.includes("month") && month.split(" ")[0] === "2") {
        prevOrders.push(order);
      } else {
        currentOrders.push(order);
      }
    }

    setPrevOrders(prevOrders);
    setCurrentOrders(currentOrders);
    setProducts(Object.values(topSales).sort((a, b) => b[0] - a[0]));
    setPendingOrder(pendingOrder);
    setDeliveredOrder(deliveredOrder);
    setCancelledOrder(cancelledOrder);
    setProductSales(productSales);
    setOrders(data.orders);
  }, []);

  const fetchCarts = useCallback(async (cart_id: string) => {
    const data = await medusaClient.carts.retrieve(cart_id);
    return data.cart;
  }, []);

  const fetchCustomers = useCallback(async () => {
    const data = await medusaClient.admin.customers.list({
      offset: 0,
      limit: 1000,
    });

    const prevCustomers: Customer[] = [];
    const currentCustomers: Customer[] = [];

    for (const customer of data.customers) {
      const month = DateTime.getInterval(
        customer.created_at as unknown as string,
      );
      if (month.includes("month") && month.split(" ")[0] === "2") {
        prevCustomers.push(customer);
      } else {
        currentCustomers.push(customer);
      }
    }

    setPrevCustomers(prevCustomers);
    setCurrentCustomers(currentCustomers);
    setCustomers(data.customers);
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  return (
    <MerkadoContext.Provider
      value={{
        totalShipment,
        PendingShipment,
        ongoingShipment,
        deliveryShipment,
        productSales,
        deliveredOrder,
        cancelledOrder,
        pendingOrder,
        products,
        orders,
      }}
    >
      {children}
    </MerkadoContext.Provider>
  );
};

export const useMerkadoContext = () => {
  const context = useContext(MerkadoContext);

  if (context === null) {
    throw new Error("useMerkadoContext must be used within an MerkadoProvider");
  }

  return context;
};
