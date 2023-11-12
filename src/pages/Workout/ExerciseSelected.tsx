import React, { useContext, useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TimerIcon from "@mui/icons-material/Timer";
import ExerciseSelectedTrack from "./ExerciseSelectedTrack";
import ExerciseSelectedHistory from "./ExerciseSelectedHistory";
import { useNavigate, useParams, Routes, Route } from "react-router-dom";
import { LogDataContext } from "../../context/LogData";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddHomeIcon from "@mui/icons-material/AddHome";
import ExerciseDetailsGraph from "../Analysis/ExerciseDetailsGraph";

function ExerciseSelected() {
  const [countdownValue, setCountdownValue] = useState(120);
  const { showRestTimer, setShowRestTimer } = useContext(LogDataContext);
  const { exerciseName } = useParams();

  console.log(exerciseName);
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
  const handleNewWorkout = () => {
    navigate("/home/workout/new");
  };

  return (
    <>
      <AppBar
        elevation={2}
        position="fixed"
        style={{
          top: 0,
          height: "56px",
          background:
            "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <EditNoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Add
            </Typography>

            <EditNoteIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,

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
                  onClick={handleNewWorkout}
                >
                  <AddHomeIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <ButtonGroup
        variant="text"
        aria-label="outlined button group"
        sx={{ width: "100%" }}
        className="aaa-button-group"
      >
        <Button sx={{ width: "100%" }} onClick={handleNavigateTrack}>
          Track
        </Button>
        <Button sx={{ width: "100%" }} onClick={handleNavigateHistory}>
          History
        </Button>
        <Button sx={{ width: "100%" }} onClick={handleNavigateGraph}>
          Graph
        </Button>
      </ButtonGroup>

      <Routes>
        <Route path="" element={<ExerciseSelectedTrack />} />
        <Route path="history" element={<ExerciseSelectedHistory />} />
        <Route path="graph" element={<ExerciseDetailsGraph />} />
      </Routes>
    </>
  );
}

export default ExerciseSelected;
