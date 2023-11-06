import WifiOffIcon from "@mui/icons-material/WifiOff";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

function NoConnection() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap:1
      }}
    >
      <Typography sx={{ textAlign: "center" }}>
        Oops! You are offline.<br></br> Please check your internet connection.
      </Typography>
      <WifiOffIcon />
    </Box>
  );
}

export default NoConnection;
