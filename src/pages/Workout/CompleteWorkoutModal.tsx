import React, { useState, Dispatch, SetStateAction, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarsIcon from "@mui/icons-material/Stars";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Routes, Route } from "react-router-dom";
import formatDateForTextField from "../../utils/formatDateForTextfield";
import uuid from "react-uuid";
import Exercise from "../../utils/interfaces/Exercise";
import completeWorkout from "../../utils/firebaseDataFunctions/completeWorkout";
import { AuthContext } from "../../context/Auth";
import calculateDOTS from "../../utils/progressFunctions/calculateDOTS";
import calculateOneRepMax from "../../utils/progressFunctions/calculateOneRepMax";
import { elements } from "chart.js";
import deleteAllEntries from "../../utils/IndexedDbCRUDFunctions/deleteAllEntries";
import { useNavigate } from "react-router-dom";
import WorkoutCongratulations from "./WorkoutCongratulations";
import { TrainingDataContext } from "../../context/TrainingData";
import { fetchUserData } from "../../context/TrainingData";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};

interface ParentComponentProps {
  openCompleteWorkoutModal: boolean;
  setOpenCompleteWorkoutModal: Dispatch<SetStateAction<boolean>>;
  todayDate: Date | undefined;
  setWorkoutCommentRenderTrigger: Dispatch<SetStateAction<number>>;
  setWorkoutEvaluationCheck: Dispatch<SetStateAction<boolean>>;
  existingExercises: { name: string; exercises: Exercise[] }[];
}

function CompleteWorkoutModal({
  openCompleteWorkoutModal,
  setOpenCompleteWorkoutModal,
  todayDate,
  setWorkoutCommentRenderTrigger,
  setWorkoutEvaluationCheck,
  existingExercises,
}: ParentComponentProps) {
  const [workoutValue, setWorkoutValue] = useState<number>(0);
  const [workoutCommentValue, setworkoutCommentValue] = useState("");
  const [trainHarderCheck, setTrainHarderCheck] = useState<boolean>(false);
  const [feelPainCheck, setFeelPainCheck] = useState<boolean>(false);
  const [warmStretchCheck, setWarmStretchCheck] = useState<boolean>(false);
  const [workoutDate, setWorkoutDate] = useState<string>(
    formatDateForTextField(new Date())
  );
  const { currentUser, currentUserData } = useContext(AuthContext);
  const { setUserSelectedExercises, setUserTrainingData } =
    useContext(TrainingDataContext);
  const navigate = useNavigate();
  function handleClose() {
    setOpenCompleteWorkoutModal(false);
  }

  function markTrainHarderCheck() {
    setTrainHarderCheck((prevState) => !prevState);
  }

  function markfeelPainCheck() {
    setFeelPainCheck((prevState) => !prevState);
  }

  function markWarmStretchCheck() {
    setWarmStretchCheck((prevState) => !prevState);
  }

  function convertDateEntriesToWorkout(
    existingExercises: { name: string; exercises: Exercise[] }[]
  ) {
    const existingExercisesArr = existingExercises;

    for (let index = 0; index < existingExercisesArr.length; index++) {
      const exerciseEntry = existingExercisesArr[index];

      const exerciseEntryExercises = exerciseEntry.exercises;

      for (let index = 0; index < exerciseEntryExercises.length; index++) {
        const element = exerciseEntryExercises[index];

        element.date = workoutDate;
      }
    }

    return existingExercisesArr;
  }

  function calculateWorkoutPowerLevel(
    existingExercises: { name: string; exercises: Exercise[] }[]
  ) {
    const bestExercises = [];

    const existingExercisesArr = existingExercises;

    for (let index = 0; index < existingExercisesArr.length; index++) {
      const exerciseEntry = existingExercisesArr[index];
      const exerciseEntryExercises = exerciseEntry.exercises;
      let highestObject = null;
      let highestRepsXWeight = 0;
      for (let index = 0; index < exerciseEntryExercises.length; index++) {
        const element = exerciseEntryExercises[index];
        const repsXWeight = element.reps * element.weight;
        if (repsXWeight > highestRepsXWeight) {
          highestRepsXWeight = repsXWeight;
          highestObject = element;
        }
      }
      bestExercises.push(highestObject);
    }

    let totalWeight = 0;

    for (let index = 0; index < bestExercises.length; index++) {
      const exercise = bestExercises[index];

      if (
        exercise?.weight &&
        exercise.reps &&
        exercise.weight > 0 &&
        exercise.reps > 0
      ) {
        const exerciseWeight = calculateOneRepMax(
          exercise.weight,
          exercise.reps
        );
        totalWeight = totalWeight + exerciseWeight;
      }
    }

    const dotsValue = calculateDOTS(86, totalWeight, false);

    return dotsValue;
  }

  function calculateWorkoutSessionStats(
    existingExercises: { name: string; exercises: Exercise[] }[]
  ) {
    const existingExercisesArr = existingExercises;

    let totalWeight = 0;
    let totalReps = 0;
    let totalSessionLoad = 0;

    for (let index = 0; index < existingExercisesArr.length; index++) {
      const exerciseSet = existingExercisesArr[index];

      const exerciseEntry = existingExercisesArr[index];
      const exerciseEntryExercises = exerciseEntry.exercises;

      for (let index = 0; index < exerciseEntryExercises.length; index++) {
        const exercise = exerciseEntryExercises[index];
        totalWeight = totalWeight + exercise.weight;
        totalReps = totalReps + exercise.reps;
      }
    }

    // Access the user's body weight.
    if (currentUserData.weight !== 0) {
      let totalSessionLoadResult = (
        totalWeight / currentUserData.weight
      ).toFixed(1);
      totalSessionLoad = parseFloat(totalSessionLoadResult);
      // Round the result to 1 decimal place
    }

    return { totalWeight, totalReps, totalSessionLoad };
  }

  async function handleCompleteWorkout() {
    const existingExercisesArr = convertDateEntriesToWorkout(existingExercises);
    const workoutSessionPowerLevel =
      calculateWorkoutPowerLevel(existingExercises);
    const workoutStatsResults = calculateWorkoutSessionStats(existingExercises);

    const workoutData = {
      workoutId: uuid(),
      workoutDate: workoutDate,
      workoutEvaluation: {
        workoutComment: workoutCommentValue,
        workoutValue: workoutValue,
        feelPainCheck: feelPainCheck,
        warmStretchCheck: warmStretchCheck,
        trainHarderCheck: trainHarderCheck,
      },
      workoutStats: {
        totalWeight: workoutStatsResults.totalWeight,
        totalReps: workoutStatsResults.totalReps,
        totalLoad: workoutStatsResults.totalSessionLoad,
      },
      workoutSessionPowerLevel: workoutSessionPowerLevel,
      workoutExercises: existingExercisesArr,
    };
    await completeWorkout(currentUser.uid, workoutData);
    deleteAllEntries();
    navigate("congratulations", {
      state: { workoutData },
    });
    await fetchUserData(
      currentUser,
      setUserSelectedExercises,
      setUserTrainingData
    );
  }

  const handleWorkoutDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Get the text value of the input field
    const textValue = event.target.value;

    const formattedWorkoutDate = formatDateForTextField(new Date(textValue));

    // Set the workout date to the parsed date
    setWorkoutDate(formattedWorkoutDate);
  };

  return (
    <div>
      <Modal
        open={openCompleteWorkoutModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="legend">
              Rate and save your workout
            </Typography>
            <Rating
              max={7}
              size="large"
              name="simple-controlled"
              sx={{ color: "#FFA500", paddingBottom: "8px" }}
              value={workoutValue}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setWorkoutValue(newValue);
                }
              }}
              icon={<StarsIcon fontSize="inherit" />}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />

            <IconButton
              sx={{ position: "absolute", top: "1rem", right: "1rem" }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <DeleteForeverIcon />
            </IconButton>
          </Box>

          <TextField
            label="Choose the workout date"
            type="date"
            required
            sx={{ width: "100%", paddingBottom: "8px" }}
            onChange={handleWorkoutDateChange}
            value={workoutDate}
            variant="filled"
          ></TextField>

          <TextField
            id="outlined-multiline-flexible"
            label="Add a workout comment"
            multiline
            maxRows={6}
            minRows={2}
            variant="filled"
            sx={{
              width: "100%",
            }}
            value={workoutCommentValue}
            onChange={(e) => setworkoutCommentValue(e.target.value)}
          />

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControlLabel
              control={<Switch />}
              label="Did you train better than the last time?"
              checked={trainHarderCheck}
              onChange={markTrainHarderCheck}
            />
            <FormControlLabel
              control={<Switch />}
              label="Did you warm up/stretch properly?"
              checked={warmStretchCheck}
              onChange={markWarmStretchCheck}
            />

            <FormControlLabel
              control={<Switch />}
              checked={feelPainCheck}
              onChange={markfeelPainCheck}
              label="Did you exerience any discomfort?"
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="dbz_save"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
              onClick={handleCompleteWorkout}
            >
              Complete
            </Button>
            <Button
              variant="dbz_clear"
              sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default CompleteWorkoutModal;
