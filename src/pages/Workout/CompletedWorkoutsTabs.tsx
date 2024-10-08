import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { useContext } from "react";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Routes, Route } from "react-router-dom";
import { UserTrainingDataContext } from "../../context/UserTrainingData";
import CompletedDetailsOverview from "./CompletedDetailsOverview";
import { useNavigate } from "react-router-dom";
import ExerciseSelectedHistory from "./ExerciseSelectedHistory";
import ExerciseDetailsGraph from "../Analysis/ExerciseDetailsGraph";
import { ArrowBackIosNew } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

function CompletedWorkoutsTabs() {
  const { userTrainingData } = useContext(UserTrainingDataContext);

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
      <Box sx={{ height: "100%", width: "100%",overflow:"auto" }}>
        <AppBar
          position="fixed"
          style={{
            top: 0,
            height: "56px",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: ".3rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                Exercise Details
              </Typography>

              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  letterSpacing: ".0rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                Exercise Details
              </Typography>

              <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={()=>navigate("/home/workout")}
                >
                  <ArrowBackIosNew />
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
