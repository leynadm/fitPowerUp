import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { UserPresetWorkoutsDataContext } from "../../../context/UserPresetWorkouts";
import { useContext, useState } from "react";
import IPresetWorkoutData from "../../../utils/interfaces/IPresetWorkoutsData";
import WorkoutCard from "./WorkoutCard";
import IconButton from "@mui/material/IconButton";
import DeleteRoutineOrWorkoutModal from "../../../components/ui/DeleteRoutineOrWorkoutModal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useLocation, useNavigate } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {  ArrowBackIosNew, DeleteForever } from "@mui/icons-material";
function RoutineCardDetails() {
  const location = useLocation();

  const routine = location.state.routine;

  const navigate = useNavigate();

  const { presetWorkoutsData } = useContext(UserPresetWorkoutsDataContext);

  const [openDeleteRoutineOrWorkoutModal, setOpenDeleteRoutineOrWorkoutModal] =
    useState(false);

  const groupedWorkoutsArr = groupWorkoutsByWeekInterval(routine.rWorkouts);

  const [selectedWeekInterval, setSelectedWeekInterval] = useState<
    number | null
  >(routine.multi ? 1 : 0);

  const handleWeekIntervalChange = (
    event: React.MouseEvent<HTMLElement>,
    newWeekInterval: number | null
  ) => {
    
    if (newWeekInterval !== null) {
      setSelectedWeekInterval(newWeekInterval);
    }

  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 1,
        position: "relative",
      }}
    >
      <DeleteRoutineOrWorkoutModal
        openDeleteRoutineOrWorkoutModal={openDeleteRoutineOrWorkoutModal}
        setOpenDeleteRoutineOrWorkoutModal={setOpenDeleteRoutineOrWorkoutModal}
        routineOrWorkout="routine"
        presetWorkoutData={presetWorkoutsData}
        routineOrWorkoutId={routine.id}
        isValid={routine.del}
      />

      <Box position="fixed" sx={{ width: "100%", zIndex: 1 }}>
        <AppBar
          style={{
            top: 0,
            width: "100%",
            height: "56px"
          }}
        >
          <Container maxWidth="md">
            <Toolbar disableGutters>
              {/* 
              <FormatListNumberedIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              /> */}

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: ".1rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                Routine
              </Typography>
              {/* 
              <FormatListNumberedIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              /> */}

              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  letterSpacing: ".1rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                Routine
              </Typography>

              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() =>
                    setOpenDeleteRoutineOrWorkoutModal(
                      !openDeleteRoutineOrWorkoutModal
                    )
                  }
                >
                  <DeleteForever sx={{ color: "white" }} />
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() =>
                    navigate("new-preset-workout", { state: { routine } })
                  }
                >
                  <AddOutlinedIcon sx={{ color: "white" }} />
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => navigate("/home/workout/preset-workouts/")}
                >
                  <ArrowBackIosNew sx={{ color: "white" }} />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Typography fontSize={24} color="secondary" textAlign="center">
        {routine.rName}
      </Typography>
      <Typography fontSize={18} textAlign="right">
        {routine.rBy}
      </Typography>

      <Typography
        sx={{
          bgcolor: "#FFA500",
          p: 1,
          borderRadius: 1,
          border: "1px solid black",
        }}
        variant="secondary"
        fontWeight={700}
>
        {routine.rDesc}
      </Typography>

      <ToggleButtonGroup
        value={selectedWeekInterval}
        exclusive
        onChange={handleWeekIntervalChange}
        aria-label="week interval selection"
        sx={{
          width: "100%",
          display: "flex",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        }}
      >
        {routine.multi &&
          Object.keys(groupedWorkoutsArr).map((key, index) => (
            <ToggleButton
              key={index}
              value={key}
              aria-label={`Week ${key}`}
              sx={{ w: "100%", minWidth: "4rem" }}
            >
              WK {key}
            </ToggleButton>
          ))}
      </ToggleButtonGroup>

      {routine.rWorkouts.length > 0 ? (
        <>
          {selectedWeekInterval !== null &&
          groupedWorkoutsArr[selectedWeekInterval] ? (
            <Box display="flex" flexDirection="column" gap={2} height="100%">
              {routine.multi && (
                <Typography variant="h6">
                  Week {selectedWeekInterval}
                </Typography>
              )}

              {groupedWorkoutsArr[selectedWeekInterval].map(
                (workout, workoutIndex) => (
                  <WorkoutCard
                    key={workoutIndex}
                    workoutData={workout}
                    routine={routine}
                  />
                )
              )}
            </Box>
          ) : (
            <Typography variant="h6" textAlign="center">
              Select a week to view workouts
            </Typography>
          )}
        </>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/svg/vegeta.svg" alt="son goku" width={128} height={128} />
          <Typography textAlign="center" fontSize="2rem" color="#1c4595">
            No workouts
            <br /> in routine
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default RoutineCardDetails;

function groupWorkoutsByWeekInterval(workouts: IPresetWorkoutData[]) {
  if (workouts.length === 0) return [];

  const groupedWorkoutsByWeekInterval = workouts.reduce((acc, workout) => {
    const key = workout.wInt;

    // Check if the key is missing or invalid
    if (key === undefined || key === null || isNaN(key)) {
      console.error("Invalid or missing 'wInt' found in:", workout);
      return acc; // Skip adding this workout to any group if key is invalid
    }

    // Initialize the group if it doesn't exist
    if (!acc[key]) {
      acc[key] = [];
    }

    // Add the workout to the correct group based on wInt
    acc[key].push(workout);

    return acc;
  }, {} as Record<number, IPresetWorkoutData[]>); // Use number type for keys

  return groupedWorkoutsByWeekInterval;
}
