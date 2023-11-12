import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useContext, useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Routes, Route } from "react-router-dom";
import { TrainingDataContext } from "../../context/TrainingData";
import CompletedDetailsOverview from "./CompletedDetailsOverview";
import { useNavigate } from "react-router-dom";
import ExerciseSelectedHistory from "./ExerciseSelectedHistory";
import ExerciseDetailsGraph from "../Analysis/ExerciseDetailsGraph";
function CompletedWorkoutsTabs() {
  const { userTrainingData } = useContext(TrainingDataContext);

  const navigate = useNavigate();
  if (userTrainingData === undefined) {
    return <>Querying data...</>;
  }

  function handleNavigateOverall() {
    navigate("");
  }

  function handleNavigateHistory() {
    navigate("history");
  }

  function handleNavigateGraph() {
    navigate("graph");
  }

  return (
    <>
      <Box sx={{ height: "100%", width: "100%" }}>
        <AppBar
          elevation={3}
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
              <LibraryBooksIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
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
                Details
              </Typography>

              <LibraryBooksIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />

              <Typography
                variant="h5"
                noWrap
                component="a"
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
                Details
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>

        <ButtonGroup
          variant="text"
          aria-label="outlined button group"
          sx={{ width: "100%" }}
        >
          <Button sx={{ width: "100%" }} onClick={handleNavigateOverall}>
            Overall
          </Button>
          <Button sx={{ width: "100%" }} onClick={handleNavigateHistory}>
            History
          </Button>
          <Button sx={{ width: "100%" }} onClick={handleNavigateGraph}>
            Graph
          </Button>
        </ButtonGroup>
      </Box>

      <Routes>
        <Route path="" element={<CompletedDetailsOverview />} />
        <Route path="history" element={<ExerciseSelectedHistory />} />
        <Route path="graph" element={<ExerciseDetailsGraph />} /> {/* */}
      </Routes>
    </>
  );
}

export default CompletedWorkoutsTabs;
