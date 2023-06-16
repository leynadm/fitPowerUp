import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Routes, Route } from "react-router-dom";
import Breakdown from "./Breakdown";
import ExerciseAnalysis from "./ExerciseAnalysis";
import CategoryAnalysis from "./CategoryAnalysis";
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { useNavigate } from "react-router-dom";

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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#F0F2F5",
      }}
    >
      <AppBar elevation={0} position="fixed" style={{ top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <InsertChartIcon
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "32px",
          width: "100vw",
          backgroundColor: "#FF8C00",
        }}
      >
        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            width: "100%",
          }}
          onClick={handleNavigateCategoryAnalysis}
        >
          Category
        </Button>

        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            width: "100%",
          }}
          onClick={handleNavigateProgressRecords}
        >
          Exercise
        </Button>

        <Button
          sx={{
            color: "white",
            fontWeight: "bold",
            width: "100%",
          }}
          onClick={handleNavigateBreakdown}
        >
          Breakdown
        </Button>

      </Box>

      <Routes>
        <Route path="" element={<CategoryAnalysis />} />
        <Route path="exercise-analysis" element={<ExerciseAnalysis />} />
        <Route path="breakdown" element={<Breakdown />} />

      </Routes>
    </Box>
  );
}

export default Analysis;
