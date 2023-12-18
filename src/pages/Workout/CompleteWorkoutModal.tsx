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
import formatDateForTextField from "../../utils/formatDateForTextfield";
import uuid from "react-uuid";
import Exercise from "../../utils/interfaces/Exercise";
import completeWorkout from "../../utils/firebaseDataFunctions/completeWorkout";
import { AuthContext } from "../../context/Auth";
import calculateDOTS from "../../utils/progressFunctions/calculateDOTS";
import calculateOneRepMax from "../../utils/progressFunctions/calculateOneRepMax";
import deleteAllEntries from "../../utils/IndexedDbCRUDFunctions/deleteAllEntries";
import { useNavigate } from "react-router-dom";
import { TrainingDataContext } from "../../context/TrainingData";
import { fetchUserTrainingData } from "../../context/TrainingData";
import updateUserFeats from "../../utils/firebaseDataFunctions/updateUserFeats";
import { fetchUserFeatsData } from "../../context/TrainingData";
import getUserWeight from "../../utils/getUserWeight";
import useOnlineStatus from "../../hooks/useOnlineStatus";
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
  existingExercises: { name: string; exercises: Exercise[] }[];
}

function CompleteWorkoutModal({
  openCompleteWorkoutModal,
  setOpenCompleteWorkoutModal,
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
  const { currentUser } = useContext(AuthContext);
  
  const isOnline = useOnlineStatus()
  
  const {
    setUserTrainingData,
    userTrainingData,
    userFeatsData,
    setUserFeatsData,
    userBodyTrackerData,
  } = useContext(TrainingDataContext);
  const navigate = useNavigate();

  const userTrainingDataSize = userTrainingData.length;

  function handleClose() {
    setOpenCompleteWorkoutModal(false);
  }

  console.log(userBodyTrackerData);

  const userBodyWeight = getUserWeight(userBodyTrackerData);
  
  function markTrainHarderCheck() {
    setTrainHarderCheck((prevState) => !prevState);
  }

  function markfeelPainCheck() {
    setFeelPainCheck((prevState) => !prevState);
  }

  function markWarmStretchCheck() {
    setWarmStretchCheck((prevState) => !prevState);
  }

  async function handleCompleteWorkout() {
    const existingExercisesArr = convertDateEntriesToWorkout(existingExercises,workoutDate);

    const workoutSessionPowerLevel =
      calculateWorkoutPowerLevel(existingExercises);
    const workoutStatsResults = calculateWorkoutSessionStats(existingExercises);

    const workoutData = {
      id: uuid(),
      date: workoutDate,
      wEval: {
        comment: workoutCommentValue,
        value: workoutValue,
        feelPain: feelPainCheck,
        warmStretch: warmStretchCheck,
        trainHarder: trainHarderCheck,
      },
      stats: {
        sets: workoutStatsResults.totalSets,
        reps: workoutStatsResults.totalReps,
        vol: workoutStatsResults.totalVolWeight,
      },
      power: workoutSessionPowerLevel,
      wExercises: existingExercisesArr,
    };
    console.log('logging workout data:')
    console.log(workoutData)
    try {
      await completeWorkout(currentUser.uid, workoutData, userTrainingDataSize);
      await updateUserFeats(currentUser.uid, userFeatsData, userBodyWeight);

      deleteAllEntries();

      await fetchUserTrainingData(currentUser, setUserTrainingData);

      await fetchUserFeatsData(currentUser, setUserFeatsData);

      navigate("congratulations", {
        state: { workoutData },
      });
    } catch (error) {
      console.log(error);
    }
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
            <Typography variant="h6" component="legend">
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
              disabled={!isOnline}
            >
              {isOnline?'Complete':'Reconecting...'}
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


export function convertDateEntriesToWorkout(
  existingExercises: { name: string; exercises: Exercise[] }[],
  workoutDate:string
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

export function calculateWorkoutSessionStats(
  existingExercises: { name: string; exercises: Exercise[] }[]
) {
  const existingExercisesArr = existingExercises;

  let totalVolWeight = 0;
  let totalReps = 0;
  let totalSets = 0;
  let totalWeight = 0;
  
  for (let index = 0; index < existingExercisesArr.length; index++) {
    const exerciseEntry = existingExercisesArr[index];
    const exerciseEntryExercises = exerciseEntry.exercises;

    totalSets += exerciseEntryExercises.length;

    for (let index = 0; index < exerciseEntryExercises.length; index++) {
      const exercise = exerciseEntryExercises[index];
      totalWeight = totalWeight + exercise.weight;
      totalReps = totalReps + exercise.reps;
      const currentSetVolume = exercise.reps * exercise.weight;
      totalVolWeight = totalVolWeight + currentSetVolume;
    }
  }

  return { totalReps, totalSets, totalVolWeight };
}

export function calculateWorkoutPowerLevel(
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