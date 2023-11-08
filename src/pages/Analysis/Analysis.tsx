import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Routes, Route } from "react-router-dom";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { useNavigate } from "react-router-dom";
import MuscleGroupsAnalysis from "./MuscleGroupsAnalysis";
import ButtonGroup from "@mui/material/ButtonGroup";
import ExerciseDetailsGraph from "../Workout/ExerciseDetailsGraph";
import ExerciseBreakdownAnalysis from "./ExerciseBreakdownAnalysis";
function Analysis() {
  const navigate = useNavigate();

  const handleNavigateCategoryAnalysis = () => {
    navigate("");
  };

  const handleNavigateBreakdown = () => {
    navigate("breakdown");
  };

  const handleNavigateProgressRecords = () => {
    navigate("exercise-analysis");
  };

  return (
    <>
      <AppBar
        elevation={0}
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
            <InsertChartIcon
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
              Analysis
            </Typography>

            <InsertChartIcon
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
              Analysis
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <ButtonGroup
        variant="text"
        aria-label="outlined button group"
        sx={{ width: "100%" }}
        className="aaa-button-group"
      >
        <Button sx={{ width: "100%" }} onClick={handleNavigateCategoryAnalysis}>
          Muscle Group
        </Button>
        <Button sx={{ width: "100%" }} onClick={handleNavigateProgressRecords}>
          Exercises
        </Button>
        <Button sx={{ width: "100%" }} onClick={handleNavigateBreakdown}>
          Breakdown
        </Button>
      </ButtonGroup>

      <Routes>
        <Route path="" element={<MuscleGroupsAnalysis />} />
        <Route path="exercise-analysis" element={<ExerciseDetailsGraph />} />
        <Route path="breakdown" element={<ExerciseBreakdownAnalysis />} />
      </Routes>
    </>
  );
}

export default Analysis;
