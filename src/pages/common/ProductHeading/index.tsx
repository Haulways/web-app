import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Box, ButtonProps, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRedirect } from "react-admin";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { Routes } from "../../../routes";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../ui/button";
import React from "react";

// const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
// const StyledButton = styled(Button)<ButtonProps>(() => ({
//   color: "black",
//   backgroundColor: "transparent",
//   fontSize: "10px",
//   border: "1px solid #dddddd",
//   ":hover": {
//     backgroundColor: "#fafafa",
//     border: "1px solid #dddddd",
//   },
// }));

type Props = {
  setAddProduct: Dispatch<SetStateAction<boolean>>;
};

const ProductHeading = ({ setAddProduct }: Props) => {
  const location = useLocation();
  const redirect = useRedirect();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <div className="w-full flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
        {/* <section className="flex space-x-2">
          <Link
            underline="none"
            sx={{
              color:
                location.pathname === Routes.PRODUCTS_ROUTE
                  ? "black"
                  : "#9ca3af",
              fontWeight: "600",
              fontSize: "18px",
              ":active": {
                color: "black",
              },
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => redirect(Routes.PRODUCTS_ROUTE)}
          >
            Products
          </Link>
          <Link
            underline="none"
            sx={{
              color:
                location.pathname === Routes.PRODUCT_COLLECTIONS_ROUTE
                  ? "black"
                  : "#9ca3af",
              fontWeight: "600",
              fontSize: "18px",
              ":active": {
                color: "black",
              },
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => redirect(Routes.PRODUCT_COLLECTIONS_ROUTE)}
          >
            Collection
          </Link>
        </section> */}

        <div className="flex">
          {
            // location.pathname === Routes.PRODUCTS_ROUTE
            true
              ? (
                <div className="flex space-x-1 md:items-center flex-wrap space-y-1 md:space-y-0 w-full md:w-fit">
                  {/* <Button
                    variant={"outline"}
                    aria-label="import product"
                    className="px-2 py-1 flex items-center space-x-2 text-xs"
                  >
                    <AiOutlineCloudUpload className="h-5 w-5" />
                    <p>Import Products</p>
                  </Button>
                  <Button
                    variant={"outline"}
                    aria-label="export product"
                    className="px-2 py-1 flex items-center space-x-2 text-xs"
                  >
                    <FileUploadOutlinedIcon className="h-5 w-5" />
                    <p>Export Products</p>
                  </Button> */}
                  <Button
                    variant={"outline"}
                    aria-label="new product"
                    onClick={() => setAddProduct(true)}
                    className="px-2 py-1 flex items-center space-x-2 text-xs"
                  >
                    <AddOutlinedIcon className="h-5 w-5" />
                    <p>New Product</p>
                  </Button>
                </div>
              ) : (
                <Button
                  variant={"outline"}
                  aria-label="new collection"
                  className="px-2 py-1 flex items-center space-x-2 text-xs"
                >
                  <AddOutlinedIcon className="h-5 w-5" />
                  <p>New Collection</p>
                </Button>
              )}
        </div>
      </div>
    </Box>
  );
};

export default ProductHeading;
