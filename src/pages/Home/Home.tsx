import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Progress from "../Progress/Progress";
import Friends from "../Friends/Friends";
import Workout from "../Workout/Workout";
import Box from "@mui/material/Box";
function Home() {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/*" element={<Workout />} index />
        <Route path="friends" element={<Friends />} />
        <Route path="progress" element={<Progress />} />
      </Routes>
    </Box>
  );
}

export default Home;
