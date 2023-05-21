import React, { Dispatch, SetStateAction, useEffect } from "react";

import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TimerIcon from "@mui/icons-material/Timer";
import ExerciseSelectedTrack from "./ExerciseSelectedTrack";
import ExerciseSelectedHistory from "./ExerciseSelectedHistory";
import ExerciseSelectedGraph from "./ExerciseSelectedGraph";
import { useNavigate } from "react-router-dom";

import { Routes, Route } from "react-router-dom";

interface ExerciseSelectionProps {
  todayDate:Date | undefined
  selectedExercise: { category: string; name: string; measurement: any[] };
  setSelectedExercise: Dispatch<
    SetStateAction<{ category: string; name: string; measurement: any[] }>
  >;
}

function ExerciseSelected({
  todayDate,
  selectedExercise,
  setSelectedExercise,
}: ExerciseSelectionProps) {
  /* 
    useEffect(() => {
        navigate("track");
      }, []); // Empty dependency array ensures this effect runs only once on mount
     */

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
    <Box>
      <AppBar position="fixed" style={{ top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

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
              Work
            </Typography>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => console.log("yes")}
                >
                  <TimerIcon />
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => console.log("yes")}
                >
                  <AddOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "4.5vh",
          width: "100vw",
          backgroundColor: "#3f51b5",
          paddingTop: "8px",
          paddingBottom: "8px",
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
            <ExerciseSelectedTrack selectedExercise={selectedExercise} todayDate={todayDate} />
          }
        />
        <Route path="history" element={<ExerciseSelectedHistory selectedExercise={selectedExercise} />} />
        <Route path="graph" element={<ExerciseSelectedGraph />} />
      </Routes>
    </Box>
  );
}

export default ExerciseSelected;
