import React from "react";
import Box from "@mui/material/Box";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import Button from "@mui/material/Button";
import BodyTrackerTrack from "./BodyTrackerTrack";
import BodyTrackerHistory from "./BodyTrackerHistory";
import BodyTrackerGraph from "./BodyTrackerGraph";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";

function BodyTracker() {
  const navigate = useNavigate();

  const handleNavigateTrack = () => {
    navigate("");
  };

  const handleNavigateHistory = () => {
    navigate("history");
  };

  const handleNavigateGraph = () => {
    navigate("graph");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="fixed"
        style={{
          top: 0,
          height: "56px",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            {/* 
            <AccessibilityIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            /> */}
            <Typography
              variant="h6"
              noWrap
              component="text"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                letterSpacing: ".0rem",
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              Body Tracker
            </Typography>
            {/* 
            <AccessibilityIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            /> */}

            <Typography
              variant="h5"
              noWrap
              component="text"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,

                letterSpacing: ".0rem",
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              Body Tracker
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <ButtonGroup
        aria-label="outlined button group"
        sx={{ width: "100%" }}
        variant="text"
      >
        <Button
          sx={{
            width:
              "100%" /*  marginTop:"2px",marginLeft:"2px", backgroundColor:"#520975" */,
          }}
          onClick={handleNavigateTrack}
        >
          Track
        </Button>
        <Button
          sx={{
            width: "100%" /*  marginTop:"2px",backgroundColor:"#520975" */,
          }}
          onClick={handleNavigateHistory}
        >
          History
        </Button>
        <Button
          sx={{
            width:
              "100%" /* marginTop:"2px", marginRight:"2px",backgroundColor:"#520975" */,
          }}
          onClick={handleNavigateGraph}
        >
          Graph
        </Button>
      </ButtonGroup>

      <Routes>
        <Route path="" element={<BodyTrackerTrack />} />
        <Route path="history" element={<BodyTrackerHistory />} />
        <Route path="graph" element={<BodyTrackerGraph />} />
      </Routes>
    </Box>
  );
}

export default BodyTracker;
