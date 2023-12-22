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
        gap:1,
        height:"calc(100svh - 112px)"
      }}
    >
      <Typography sx={{ textAlign: "center" }}>
        Hey, it seems you are offline.<br></br> Please check your internet connection.
      </Typography>
      <WifiOffIcon />
    </Box>
  );
}

export default NoConnection;
