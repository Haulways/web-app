import { Region } from "@medusajs/medusa";
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

interface RegionContextProps {
  region: Region | undefined;
  regions: Region[];
  refreshRegion: () => void;
}

const RegionContext = createContext<RegionContextProps | null>(null);

export const RegionProvider = ({ children }: { children: ReactNode }) => {
  const redirect = useRedirect();
  const params = useParams();
  const [regions, setRegions] = useState<Region[]>([]);
  const [region, setRegion] = useState<Region | undefined>();

  const fetchRegions = async () => {
    const data = await medusaClient.admin.regions.list({});
    setRegions(data.regions);
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    if (regions.length !== 0) {
      const region = regions.find((region) => region.id === params["*"]);
      setRegion(region);
    }
  }, [params, regions]);

  useEffect(() => {
    if (params["*"] === "" && regions.length !== 0) {
      redirect(Routes.SETTINGS_REGION_ROUTE + "/" + regions[0].id);
    }
  }, [regions]);

  return (
    <RegionContext.Provider
      value={{
        region,
        regions,
        refreshRegion: fetchRegions,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegionContext = () => {
  const context = useContext(RegionContext);

  if (context === null) {
    throw new Error("useRegionContext must be used within a RegionProvider");
  }

  return context;
};
