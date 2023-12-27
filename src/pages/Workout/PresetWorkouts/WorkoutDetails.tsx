import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { useParams } from "react-router-dom";
import { UserPresetWorkoutsDataContext } from "../../../context/UserPresetWorkouts";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GroupedWorkout from "../../../components/ui/GroupedWorkout";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextField from "@mui/material/TextField";
import capitalizeWords from "../../../utils/capitalizeWords";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteRoutineOrWorkoutModal from "../../../components/ui/DeleteRoutineOrWorkoutModal";
import { IPresetWorkoutGroup } from "./PresetWorkoutsOverview";
import { useState } from "react";

function WorkoutDetails() {
  const { routineName, workoutName } = useParams();

  const navigate = useNavigate();
  const { presetWorkoutsData } = useContext(UserPresetWorkoutsDataContext);

  const [openDeleteRoutineOrWorkoutModal, setOpenDeleteRoutineOrWorkoutModal] =
    useState(false);

    const individualWorkout = routineName 
  ? getIndividualWorkoutInRoutine() 
  : getIndividualWorkout();
  
  
  const individualRoutineIsEmptyCheck = isRoutineEmpty(individualWorkout);


  function isRoutineEmpty(obj: IPresetWorkoutGroup) {
    if (individualWorkout) {
      return Object.keys(obj).length === 0;
    }
  }
  function getIndividualWorkoutInRoutine() {
    if (presetWorkoutsData.length > 0) {
      for (let index = 0; index < presetWorkoutsData.length; index++) {
        const workoutElement = presetWorkoutsData[index];
        if (
          workoutElement.routineName === routineName &&
          workoutElement.workoutName === workoutName
        ) {
          return workoutElement;
        }
      }
    }
  }

  function getIndividualWorkout(){
    if (presetWorkoutsData.length > 0) {
      for (let index = 0; index < presetWorkoutsData.length; index++) {
        const workoutElement = presetWorkoutsData[index];
        if (
          workoutElement.routineName === ''&&
          workoutElement.workoutName === workoutName
        ) {
          return workoutElement;
        }
      }
    }
  }

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

        for (
          let index = 0;
          index < individualWorkout.wExercises.length;
          index++
        ) {
          const exercisesGroup = individualWorkout.wExercises[index];

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
              amrap:exerciseEntry.amrap
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
      <DeleteRoutineOrWorkoutModal
        openDeleteRoutineOrWorkoutModal={openDeleteRoutineOrWorkoutModal}
        setOpenDeleteRoutineOrWorkoutModal={setOpenDeleteRoutineOrWorkoutModal}
        routineOrWorkout="workout"
        presetWorkoutData={presetWorkoutsData}
        routineOrWorkoutName={individualWorkout.id}
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
                Workout Details
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
                Workout Details
              </Typography>

              <Box sx={{ flexGrow: 1, display: "flex" }}>
                
                {individualWorkout.delete&&
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
             
                }
                 
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
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Box pb="56px">
        <Typography
          align="center"
          color="text.secondary"
          variant="h6"
          gutterBottom
        >
          {individualWorkout && capitalizeWords(individualWorkout.workoutName)}
        </Typography>

        <Typography variant="caption" align="left">
          Workout Description
        </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          defaultValue={
            individualWorkout && individualWorkout.workoutDescription
          }
          InputProps={{
            readOnly: true,
          }}
          sx={{
            "& .MuiInputBase-input": {
              // Target the input element inside the TextField
              fontSize: "1rem", // Set the font size
              fontWeight: "400", // Set the font weight
            },
          }}
        />
        <Box pt={1}>
          {presetWorkoutsData.length > 0 && (
            <GroupedWorkout workoutExercises={individualWorkout.wExercises} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default WorkoutDetails;
