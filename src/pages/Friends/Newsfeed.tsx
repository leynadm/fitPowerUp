import React from "react";
import Container from "@mui/material/Container";
import UserWorkoutCard from "./UserWorkoutCard";
import Box from "@mui/material/Box";
function Newsfeed() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserWorkoutCard />
    </Box>
  );
}

export default Newsfeed;
