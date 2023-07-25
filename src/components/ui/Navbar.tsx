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
    <Box sx={{ pb: 7 }}>
      <CssBaseline />

      <Paper
        sx={{ zIndex:9995, position: "fixed", bottom: 0, left: 0, right: 0,backgroundColor:"white" }}
        elevation={0}
      >
        <BottomNavigation sx={{backgroundColor:"white", zIndex:9999}} showLabels onChange={(event, newValue) => {}}>
          <BottomNavigationAction
            label="Workout Log"
            icon={<FitnessCenterIcon />}
            onClick={handleWorkoutClick}
          />
          <BottomNavigationAction
            label="Fit World"
            icon={<PeopleIcon />}
            onClick={handleFriendsClick}
            

          />
          <BottomNavigationAction
            label="Progress Level"
            icon={<QueryStatsIcon />}
            onClick={handleProgressClick}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default Navbar;
