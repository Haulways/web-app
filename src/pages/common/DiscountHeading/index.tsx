import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Button, ButtonProps, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRedirect } from "react-admin";
import { useLocation } from "react-router-dom";
import { Routes } from "../../../routes";
import { Fragment, useState } from "react";
import AddDiscount from "./AddDiscount";

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

const DiscountHeading = () => {
  const location = useLocation();
  const redirect = useRedirect();
  const [toggle, setToggle] = useState(false);

  return (
    <Fragment>
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
          <Link
            underline="none"
            sx={{
              color:
                location.pathname === Routes.DISCOUNT_ROUTE
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
            onClick={() => redirect(Routes.DISCOUNT_ROUTE)}
          >
            Discount
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          {location.pathname === Routes.DISCOUNT_ROUTE ? (
            <StyledButton
              onClick={() => setToggle(true)}
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
                Add Discount
              </Typography>
            </StyledButton>
          ) : null}
        </Box>
      </Box>

      {toggle && <AddDiscount show={toggle} close={() => setToggle(false)} />}
    </Fragment>
  );
};

export default DiscountHeading;
