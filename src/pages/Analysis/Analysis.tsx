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
import Box from "@mui/material/Box";

import ExerciseDetailsGraph from "./ExerciseDetailsGraph";
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
        position="fixed"
        style={{
          top: 0,
          height: "56px"
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            {/* 
            <InsertChartIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            /> */}
            <Typography
              variant="h6"
              noWrap
              component="text"

              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                letterSpacing: ".3rem",
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              Analysis
            </Typography>
            {/* 
            <InsertChartIcon
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
              Analysis
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      {/*      <Box display="flex" width="100%">  */}

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
          onClick={handleNavigateCategoryAnalysis}
        >
          Muscles
        </Button>
        <Button
          sx={{
            width: "100%" /*  marginTop:"2px",backgroundColor:"#520975" */,
          }}
          onClick={handleNavigateProgressRecords}
        >
          Exercises
        </Button>
        <Button
          sx={{
            width:
              "100%" /* marginTop:"2px", marginRight:"2px",backgroundColor:"#520975" */,
          }}
          onClick={handleNavigateBreakdown}
        >
          Breakdown
        </Button>
      </ButtonGroup>
      {/*  </Box>*/}

      <Routes>
        <Route path="" element={<MuscleGroupsAnalysis />} />
        <Route path="exercise-analysis" element={<ExerciseDetailsGraph />} />
        <Route path="breakdown" element={<ExerciseBreakdownAnalysis />} />
      </Routes>
    </>
  );
}

export default Analysis;
