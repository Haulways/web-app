import { Currency } from "@medusajs/medusa";
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

interface CurrencyContextProps {
  // currency: Currency | undefined;
  currencies: Currency[];
  refreshCurrency: () => void;
}

const CurrencyContext = createContext<CurrencyContextProps | null>(null);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const redirect = useRedirect();
  const params = useParams();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [currency, setCurrency] = useState<Currency | undefined>();

  const fetchCurrencies = async () => {
    const data = await medusaClient.admin.currencies.list({});
    setCurrencies(data.currencies);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (currencies.length !== 0) {
      const Currency = currencies.find(
        (currency) => currency.code === params["*"],
      );
      setCurrency(Currency);
    }
  }, [Currency]);

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
        refreshCurrency: fetchCurrencies,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);

  if (context === null) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }

  return context;
};
