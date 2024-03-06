import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Box, Button, ButtonProps, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRedirect } from "react-admin";
import { useLocation } from "react-router-dom";
import { Routes } from "../../../routes";

// const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
const StyledButton = styled(Button)<ButtonProps>(() => ({
  color: "black",
  backgroundColor: "transparent",
  border: "1px solid #dddddd",
  ":hover": {
    backgroundColor: "#fafafa",
    border: "1px solid #dddddd",
  },
}));

const OrderHeading = () => {
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
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        {/* <Link
          underline="none"
          sx={{
            color:
              location.pathname === Routes.ORDERS_ROUTE ? "black" : "#9ca3af",
            fontWeight: "600",
            fontSize: "18px",
            ":active": {
              color: "black",
            },
            ":hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => redirect(Routes.ORDERS_ROUTE)}
        >
          Orders
        </Link>
        <Link
          underline="none"
          sx={{
            color:
              location.pathname === Routes.ORDERS_DRAFT_ROUTE
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
          onClick={() => redirect(Routes.ORDERS_DRAFT_ROUTE)}
        >
          Drafts
        </Link> */}
      </Box>

      <div className="flex">
        {
          // location.pathname === Routes.ORDERS_ROUTE 
          true
            ? (
              <StyledButton
                variant="outlined"
                startIcon={<FileUploadOutlinedIcon />}
                aria-label="export orders"
              >
                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  Export Orders
                </Typography>
              </StyledButton>
            ) : (
              <StyledButton
                variant="outlined"
                startIcon={<AddOutlinedIcon />}
                aria-label="create draft"
              >
                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  Create draft order
                </Typography>
              </StyledButton>
            )}
      </div>
    </Box>
  );
};

export default OrderHeading;
