import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TimerIcon from "@mui/icons-material/Timer";
import ExerciseSelectedTrack from "./ExerciseSelectedTrack";
import ExerciseSelectedHistory from "./ExerciseSelectedHistory";
import ExerciseSelectedGraph from "./ExerciseSelectedGraph";
import { useNavigate } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Routes, Route } from "react-router-dom";
import RestTimer from "../../components/ui/RestTimer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
interface ExerciseSelectionProps {
  todayDate: Date | undefined;
  selectedExercise: { category: string; name: string; measurement: any[] };
  unitsSystem: string;
  weightIncrementPreference: number;
}

function ExerciseSelected({
  todayDate,
  selectedExercise,
  unitsSystem,
  weightIncrementPreference,
}: ExerciseSelectionProps) {
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [countdownValue, setCountdownValue] = useState(120);
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

  function handleShowRestTimer() {
    setShowRestTimer(!showRestTimer);
  }

  useEffect(() => {
    console.log("logging selected exercise");
    console.log(selectedExercise);
    console.log(todayDate);
  }, []);

  return (
    <Box sx={{ height: "100%" }}>
      <RestTimer
        showRestTimer={showRestTimer}
        setShowRestTimer={setShowRestTimer}
      />

      <AppBar elevation={0} position="fixed" style={{ top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LibraryBooksIcon
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

            <LibraryBooksIcon
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
              Add
            </Typography>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleShowRestTimer}
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
                  <EmojiEventsIcon />
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
          height: "32px",
          width: "100vw",
          backgroundColor: "#FF8C00",
          borderBottom:"2px black solid"
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
            <ExerciseSelectedTrack
              selectedExercise={selectedExercise}
              todayDate={todayDate}
              unitsSystem={unitsSystem}
              weightIncrementPreference={weightIncrementPreference}
            />
          }
        />
        <Route
          path="history"
          element={
            <ExerciseSelectedHistory
              selectedExercise={selectedExercise}
              unitsSystem={unitsSystem}
            />
          }
        />
        <Route
          path="graph"
          element={
            <ExerciseSelectedGraph selectedExercise={selectedExercise} />
          }
        />
      </Routes>
    </Box>
  );
}

export default ExerciseSelected;
