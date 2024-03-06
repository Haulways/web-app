import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Button, ButtonProps, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRedirect } from "react-admin";
import { useLocation } from "react-router-dom";
import { Routes } from "../../../routes";

const StyledButton = styled(Button)<ButtonProps>(() => ({
  color: "black",
  backgroundColor: "transparent",
  fontSize: "10px",
  border: "1px solid #dddddd",
  ":hover": {
    backgroundColor: "#fafafa",
    border: "1px solid #dddddd",
  },
}));

const CustomerHeading = () => {
  const location = useLocation();
  const redirect = useRedirect();

  return (
    <div className="flex justify-between gap-2">
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Link
          underline="none"
          sx={{
            color:
              location.pathname === Routes.CUSTOMERS_ROUTE
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
          onClick={() => redirect(Routes.CUSTOMERS_ROUTE)}
        >
          Customers
        </Link>
        <Link
          underline="none"
          sx={{
            color:
              location.pathname === Routes.CUSTOMER_GROUP_ROUTE
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
          onClick={() => redirect(Routes.CUSTOMER_GROUP_ROUTE)}
        >
          Groups
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
        }}
      >
        {location.pathname === Routes.PRODUCTS_ROUTE ? (
          <StyledButton
            variant="outlined"
            startIcon={<AddOutlinedIcon />}
            aria-label="new group"
          >
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: "500",
              }}
            >
              New group
            </Typography>
          </StyledButton>
        ) : null}
      </Box>
    </div>
  );
};

export default CustomerHeading;
