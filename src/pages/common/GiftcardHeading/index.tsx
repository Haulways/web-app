import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Button, ButtonProps, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { Routes } from "../../../routes";
import { Fragment, useState } from "react";
import CustomGiftcardCreate from "./CustomGiftcardCreate";

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

const GiftcardHeading = () => {
  const location = useLocation();
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
              color: "black",
              fontWeight: "600",
              fontSize: "20px",
              ":active": {
                color: "black",
              },
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            History
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          {location.pathname === Routes.GIFTCARD_ROUTE ? (
            <StyledButton
              onClick={() => setToggle(true)}
              variant="outlined"
              startIcon={<AddOutlinedIcon />}
              aria-label="custom gift card"
            >
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: "500",
                }}
              >
                Custom Gift Card
              </Typography>
            </StyledButton>
          ) : null}
        </Box>
      </Box>

      {toggle && (
        <CustomGiftcardCreate open={toggle} close={() => setToggle(false)} />
      )}
    </Fragment>
  );
};

export default GiftcardHeading;
