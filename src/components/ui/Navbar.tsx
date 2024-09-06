import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PeopleIcon from "@mui/icons-material/People";
import Paper from "@mui/material/Paper";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleWorkoutClick() {
    navigate("workout");
  }

  function handleFriendsClick() {
    navigate("friends");
  }

  function handleProgressClick() {
    navigate("progress");
  }

  return (
    <>
      <CssBaseline />

      <Paper
        sx={{
          position: "fixed",
          zIndex: 1,        
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
        }}
      >
        <BottomNavigation
          className="bottomNavigation"
          sx={{ backgroundColor: "white", zIndex: 9999 }}
          showLabels
          onChange={(event, newValue) => {}}
        >
          <BottomNavigationAction
            label="Workouts"
            icon={<FitnessCenterIcon />}
            onClick={handleWorkoutClick}
          />
          <BottomNavigationAction
            label="Fit World"
            icon={<PeopleIcon />}
            onClick={handleFriendsClick}
          />
          <BottomNavigationAction
            label="Progress"
            icon={<QueryStatsIcon />}
            onClick={handleProgressClick}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default Navbar;
