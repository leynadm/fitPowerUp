import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import {
  IPresetWorkoutGroup,
  getIndividualRoutine,
} from "./PresetWorkoutsOverview";
import { useParams } from "react-router-dom";
import { UserPresetWorkoutsDataContext } from "../../../context/UserPresetWorkouts";
import { useContext, useState } from "react";
import { getIndividualPresetWorkouts } from "./PresetWorkoutsOverview";
import IPresetWorkoutData from "../../../utils/interfaces/IPresetWorkoutsData";
import WorkoutCard from "./WorkoutCard";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import DeleteRoutineOrWorkoutModal from "../../../components/ui/DeleteRoutineOrWorkoutModal";
import TextField from "@mui/material/TextField";
function RoutineCardDetails() {
  const { routineName } = useParams();

  const { presetWorkoutsData } = useContext(UserPresetWorkoutsDataContext);
  const [openDeleteRoutineOrWorkoutModal, setOpenDeleteRoutineOrWorkoutModal] =
    useState(false);
  const workouts = getIndividualPresetWorkouts(presetWorkoutsData, routineName);

  const individualRoutineObj = getIndividualRoutine(
    presetWorkoutsData,
    routineName
  );

  const individualRoutineIsEmptyCheck = isRoutineEmpty(individualRoutineObj);

  function isRoutineEmpty(obj: IPresetWorkoutGroup) {
    if (individualRoutineObj) {
      return Object.keys(obj).length === 0;
    }
  }

  let routineDetails = null;

  if (individualRoutineObj && typeof individualRoutineObj === "object") {
    const firstKey = Object.keys(individualRoutineObj)[0]; // Get the first key (e.g., "5/3/1 Beginners")
    if (firstKey && individualRoutineObj[firstKey].details) {
      routineDetails = individualRoutineObj[firstKey].details;
    }
  }

  function handleDeleteRoutineOrWorkoutModal() {
    setOpenDeleteRoutineOrWorkoutModal(!openDeleteRoutineOrWorkoutModal);
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DeleteRoutineOrWorkoutModal
        openDeleteRoutineOrWorkoutModal={openDeleteRoutineOrWorkoutModal}
        setOpenDeleteRoutineOrWorkoutModal={setOpenDeleteRoutineOrWorkoutModal}
        routineOrWorkout="routine"
        presetWorkoutData={presetWorkoutsData}
        routineOrWorkoutName={routineName}
        isValid={!individualRoutineIsEmptyCheck}
      />

      <Box position="fixed" sx={{ width: "100%", zIndex: 1 }}>
        <AppBar
          elevation={2}
          style={{
            top: 0,
            width: "100%",
            height: "56px",
            background:
              "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
          }}
        >
          <Container maxWidth="md">
            <Toolbar disableGutters>
              <FormatListNumberedIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Routine Details
              </Typography>

              <FormatListNumberedIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />

              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Routine Details
              </Typography>

              {!individualRoutineIsEmptyCheck &&
                routineDetails &&
                routineDetails.delete && (
                  <Box sx={{ flexGrow: 1, display: "flex" }}>
                    <Box sx={{ marginLeft: "auto" }}>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleDeleteRoutineOrWorkoutModal}
                      >
                        <DeleteForeverIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Box>
                  </Box>
                )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      {individualRoutineIsEmptyCheck && (
        <Box
          height="calc(100svh - 112px)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>
            We couldn't find the routine you're looking for!
          </Typography>
        </Box>
      )}

      {!individualRoutineIsEmptyCheck && (
        <Box>
          {routineDetails && (
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="h6" align="center">
                {routineName?.toLocaleUpperCase()}
              </Typography>
              <Typography variant="body2" align="right">
                by {routineDetails && routineDetails.routineBy}
              </Typography>
            </Box>
          )}
          <Box display="flex" flexDirection="column" gap={1} pb="64px">
            {presetWorkoutsData.length > 0 &&
              workouts.map((workout: IPresetWorkoutData, index: number) => (
                <WorkoutCard key={index} workoutData={workout} />
              ))}

            {routineDetails && routineDetails.routineLinkReference !== "" && (
              <Box>
                <Typography variant="caption">Routine Description</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  defaultValue={
                    routineDetails && routineDetails.routineDescription
                  }
                />
              </Box>
            )}

            {routineDetails && routineDetails.routineLinkReference !== "" && (
              <Typography variant="subtitle2" align="center">
                <a
                  href={routineDetails.routineLinkReference}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {routineDetails.routineLinkReference}
                </a>
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default RoutineCardDetails;
