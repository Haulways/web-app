import { Currency } from "@medusajs/medusa";
import { ExtendedStoreDTO } from "@medusajs/medusa/dist/types/store";
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

interface StoreContextProps {
  // currency: Currency | undefined;
  store: ExtendedStoreDTO | undefined;
  refreshStore: () => void;
}

const StoreContext = createContext<StoreContextProps | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<ExtendedStoreDTO | undefined>();

  const fetchStore = async () => {
    const data = await medusaClient.admin.store.retrieve({});
    setStore(data.store);
  };

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        store,
        refreshStore: fetchStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (context === null) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return context;
};
