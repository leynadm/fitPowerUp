import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Container from "@mui/material/Container";

function ProgressGraph() {
  const measurementOptions = [{ label: "Power Level" }, { label: "Strength Level" }];
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m"); // Initial timeframe is set to 1 month
  const [selectedOption, setSelectedOption] = useState(
    measurementOptions[0].label
  );

  const timeframeOptions = [
    { label: "1m", value: "1m" },
    { label: "3m", value: "3m" },
    { label: "6m", value: "6m" },
    { label: "1y", value: "1y" },
    { label: "All", value: "all" },
  ];



  return (
    <Container sx={{ display: "flex", flexDirection: "column",alignItems:"center",backgroundColor:"#F0F2F5" }}>
     Graph
    </Container>
  );
}

export default ProgressGraph;
