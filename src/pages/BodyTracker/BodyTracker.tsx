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

interface WorkoutProps {
  todayDate: Date | undefined;
  unitsSystem: string;
}

function BodyTracker({ todayDate, unitsSystem }: WorkoutProps) {
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
      <AppBar elevation={0} position="fixed" style={{ top: 0, height: "56px" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AccessibilityIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <AccessibilityIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Tracker
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "32px",
          width: "100vw",
          backgroundColor: "#FF8C00",
          borderBottom: "2px black solid",
        }}
      >
        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            width: "100%",
          }}
          onClick={handleNavigateTrack}
        >
          TRACK
        </Button>

        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            width: "100%",
          }}
          onClick={handleNavigateHistory}
        >
          HISTORY
        </Button>
        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            width: "100%",
          }}
          onClick={handleNavigateGraph}
        >
          GRAPH
        </Button>
      </Box>

      <Routes>
        <Route
          path=""
          element={
            <BodyTrackerTrack todayDate={todayDate} unitsSystem={unitsSystem} />
          }
        />
        <Route
          path="history"
          element={<BodyTrackerHistory unitsSystem={unitsSystem} />}
        />
        <Route path="graph" element={<BodyTrackerGraph />} />
      </Routes>
    </Box>
  );
}

export default BodyTracker;
