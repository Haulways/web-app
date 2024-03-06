import { Discount, Region } from "@medusajs/medusa";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRedirect } from "react-admin";
import { useParams } from "react-router-dom";
import { medusaClient } from "../services/medusa";
import { Routes } from "../../routes";

interface DiscountContextProps {
  discount: Discount | undefined;
  discounts: Discount[];
  refreshDiscount: () => void;
}

const DiscountContext = createContext<DiscountContextProps | null>(null);

export const DiscountProvider = ({ children }: { children: ReactNode }) => {
  const redirect = useRedirect();
  const params = useParams();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [discount, setDiscount] = useState<Discount | undefined>();

  const fetchDiscount = async () => {
    const data = await medusaClient.admin.discounts.list({});
    setDiscounts(data.discounts);
  };

  useEffect(() => {
    fetchDiscount();
  }, []);

  //   useEffect(() => {
  //     if (discounts.length !== 0) {
  //       const region = discounts.find((region) => region.id === params["*"]);
  //       setRegion(region);
  //     }
  //   }, [params, discounts]);

  //   useEffect(() => {
  //     if (params["*"] === "" && discounts.length !== 0) {
  //       redirect(Routes.SETTINGS_REGION_ROUTE + "/" + discounts[0].id);
  //     }
  //   }, [discounts]);

  return (
    <DiscountContext.Provider
      value={{
        discount,
        discounts,
        refreshDiscount: fetchDiscount,
      }}
    >
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscountContext = () => {
  const context = useContext(DiscountContext);

  if (context === null) {
    throw new Error(
      "useDiscountContext must be used within a DiscountProvider",
    );
  }

  return context;
};
