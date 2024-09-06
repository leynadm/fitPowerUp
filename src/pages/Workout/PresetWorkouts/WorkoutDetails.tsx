import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { UserPresetWorkoutsDataContext } from "../../../context/UserPresetWorkouts";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GroupedWorkout from "../../../components/ui/GroupedWorkout";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import capitalizeWords from "../../../utils/capitalizeWords";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteRoutineOrWorkoutModal from "../../../components/ui/DeleteRoutineOrWorkoutModal";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowBackIos, ArrowBackIosNew } from "@mui/icons-material";

function WorkoutDetails() {
  const location = useLocation();

  const workoutData = location.state.workoutData;
  const routine = location.state.routine;

  console.log(location.state);
  console.log(workoutData);

  const encodedRoutine = encodeURIComponent(routine.rName)

  const navigate = useNavigate();
  const { presetWorkoutsData } = useContext(UserPresetWorkoutsDataContext);

  const [openDeleteRoutineOrWorkoutModal, setOpenDeleteRoutineOrWorkoutModal] =
    useState(false);

  async function handleCopyWorkout() {
    try {
      const request = indexedDB.open("fitPowerUpDb", 2);

      request.onsuccess = function () {
        const db = request.result;

        const userEntryTransaction = db.transaction(
          "user-exercises-entries",
          "readwrite"
        );

        const userEntryTransactionStore = userEntryTransaction.objectStore(
          "user-exercises-entries"
        );

        for (let index = 0; index < workoutData.wEx.length; index++) {
          const exercisesGroup = workoutData.wEx[index];

          for (
            let index = 0;
            index < exercisesGroup.exercises.length;
            index++
          ) {
            const exerciseEntry = exercisesGroup.exercises[index];

            const newEntryToSave = {
              date: new Date(),
              distance: exerciseEntry.distance,
              distance_unit: exerciseEntry.distance_unit,
              dropset: exerciseEntry.dropset,
              exercise: exerciseEntry.exercise,
              group: exerciseEntry.group,
              is_pr: false,
              reps: exerciseEntry.reps,
              time: exerciseEntry.time,
              weight: exerciseEntry.weight,
              amrap: exerciseEntry.amrap,
            };
            userEntryTransactionStore.add(newEntryToSave);
          }
        }
        userEntryTransaction.oncomplete = async function () {
          db.close();
          navigate("/home/workout/new");
          toast.success("Workout was copied successfully!");
        };

        request.onerror = function () {
          toast.error("Oops, saveExerciseEntry has an error!");
        };
      };
    } catch (error) {
      console.error("Error:", error);
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
      {
        <DeleteRoutineOrWorkoutModal
          openDeleteRoutineOrWorkoutModal={openDeleteRoutineOrWorkoutModal}
          setOpenDeleteRoutineOrWorkoutModal={
            setOpenDeleteRoutineOrWorkoutModal
          }
          routineOrWorkout="workout"
          presetWorkoutData={presetWorkoutsData}
          routineOrWorkoutId={routine.id}
          workoutData={workoutData}
          isValid={workoutData.wEx.length > 0}
        />
      }

      <Box position="fixed" sx={{ width: "100%", zIndex: 1 }}>
        <AppBar
          elevation={2}
          style={{
            top: 0,
            width: "100%",
            height: "56px",
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
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                Workout Details
              </Typography>

              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 0,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  letterSpacing: ".0rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                Workout Details
              </Typography>

              <Box sx={{ flexGrow: 1, display: "flex" }}>
                
 

                {workoutData && workoutData.del && (
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
                )}

                <Box sx={{ marginLeft: "auto" }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleCopyWorkout}
                  >
                    <ContentCopyIcon sx={{ color: "white" }} />
                  </IconButton>

                  <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() =>
                    navigate(`/home/workout/preset-workouts/preset-routine-details/${encodedRoutine}`,{state:{routine}})
                  }
                >
                  <ArrowBackIosNew sx={{ color: "white" }} />
                </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Box >
        <Typography
          align="center"
          color="text.secondary"
          variant="h6"
          gutterBottom
        >
          {workoutData && capitalizeWords(workoutData.wName)}
        </Typography>

        <Box pt={1}>
          {presetWorkoutsData.length > 0 && (
            <GroupedWorkout workoutExercises={workoutData.wEx} />
          )}
        </Box>
        <Typography sx={{color:"text.secondary"}} align="left">
          Workout Description
        </Typography>
        <Typography sx={{color:"text.secondary"}} variant="secondary" fontWeight={500}>{workoutData.wDesc}</Typography>
      </Box>
    </Box>
  );
}

export default WorkoutDetails;
