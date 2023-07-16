import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function LaunchingApp() {


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent:"center",
        height:"100vh"
      }}
    >
      <CircularProgress />
      <Typography fontFamily="Voltaire">Loading...</Typography>
    </Box>
  );
}

export default LaunchingApp