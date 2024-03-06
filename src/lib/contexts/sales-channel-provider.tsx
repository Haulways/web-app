import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRedirect, useResetStore, useStore } from "react-admin";
import { Routes } from "../../routes";
import { User, User_Medusa } from "../../types/database.types";
import { medusaClient } from "../services/medusa";
import { supabaseClient } from "../services/supabase";
import { SalesChannel } from "@medusajs/medusa";
import { useParams } from "react-router-dom";

interface SalesChannelContextProps {
  salesChannel: SalesChannel | undefined;
  salesChannels: SalesChannel[];
  refreshSalesChannel: () => void;
}

const SalesChannelContext = createContext<SalesChannelContextProps | null>(
  null,
);

export const SalesChannelProvider = ({ children }: { children: ReactNode }) => {
  const redirect = useRedirect();
  const params = useParams();
  const [salesChannels, setSalesChannels] = useState<SalesChannel[]>([]);
  const [salesChannel, setSalesChannel] = useState<SalesChannel | undefined>();

  const fetchSalesChannels = async () => {
    const data = await medusaClient.admin.salesChannels.list({});
    setSalesChannels(data.sales_channels);
  };

  useEffect(() => {
    fetchSalesChannels();
  }, []);

  useEffect(() => {
    if (salesChannels.length !== 0) {
      const salesChannel = salesChannels.find(
        (salesChannel) => salesChannel.id === params["*"],
      );
      setSalesChannel(salesChannel);
    }
  }, [params, salesChannel]);

  useEffect(() => {
    if (params["*"] === "" && salesChannels.length !== 0) {
      redirect(Routes.SALES_CHANNEL_ROUTE + "/" + salesChannels[0].id);
    }
  }, [salesChannels]);

  return (
    <SalesChannelContext.Provider
      value={{
        salesChannel,
        salesChannels,
        refreshSalesChannel: fetchSalesChannels,
      }}
    >
      {children}
    </SalesChannelContext.Provider>
  );
};

export const useSalesChannelContext = () => {
  const context = useContext(SalesChannelContext);

  if (context === null) {
    throw new Error(
      "useSalesChannel must be used within an SalesChannelProvider",
    );
  }

  return context;
};
