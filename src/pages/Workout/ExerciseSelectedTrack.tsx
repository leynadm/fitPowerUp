import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { time } from "console";
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Exercise from "../../utils/interfaces/Exercise";
import CommentModal from "../../components/ui/CommentModal";

interface ExerciseSelectionProps {
  selectedExercise: { category: string; name: string; measurement: any[] };
  todayDate: Date | undefined;
  unitsSystem: string;
}

function ExerciseSelectedTrack({
  selectedExercise,
  todayDate,
  unitsSystem,
}: ExerciseSelectionProps) {
  const [weightValue, setWeightValue] = useState(0);
  const [repsValue, setRepsValue] = useState(0);
  const [distanceValue, setDistanceValue] = useState(0);
  const [timeValue, setTimeValue] = useState(0);
  const [existingExercises, setExistingExercises] = useState<Exercise[]>([]);
  const [userDataInput, setUserDataInput] = useState(false);
  const [userUpdatedExerciseData, setUserUpdatedExerciseData] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [exerciseCommentId, setExerciseCommentId] = useState(0);
  const [entryToSave, setEntryToSave] = useState({
    date: todayDate,
    exercise: selectedExercise.name,
    category: selectedExercise.category,
    weight: weightValue,
    reps: repsValue,
    distance: distanceValue,
    distance_unit: 0,
    time: timeValue,
  });

  useEffect(() => {
    getExistingExercises();

    if (existingExercises.length > 0 && !userUpdatedExerciseData) {
      setUserUpdatedExerciseData(true);
      const lastExercise = existingExercises[existingExercises.length - 1];
      setWeightValue(lastExercise.weight);
      setRepsValue(lastExercise.reps);
      setDistanceValue(lastExercise.distance);
      setTimeValue(lastExercise.time);
    }
  }, [todayDate, existingExercises]);

  useEffect(() => {
    setEntryToSave((prevState) => ({
      ...prevState,
      weight: weightValue,
      reps: repsValue,
      distance: distanceValue,
      time: timeValue,
    }));
  }, [weightValue, repsValue, distanceValue, timeValue]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function getExistingExercises() {
    if (!todayDate) {
      return;
    }

    const request = indexedDB.open("fitScouterDb", 1);

    request.onsuccess = function () {
      const db = request.result;

      const userEntryTransaction = db.transaction(
        "user-exercises-entries",
        "readonly"
      );

      const userEntryTransactionStore = userEntryTransaction.objectStore(
        "user-exercises-entries"
      );

      const exerciseNameAndDateIndex = userEntryTransactionStore.index(
        "exercise_name_and_date"
      );

      const range = IDBKeyRange.bound(
        [selectedExercise.name, todayDate],
        [selectedExercise.name, todayDate] // Use the same date for both bounds
      );

      const exercisesRequest = exerciseNameAndDateIndex.openCursor(range);
      const existingExercises: any[] | ((prevState: Exercise[]) => Exercise[]) =
        [];
      exercisesRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          existingExercises.push(cursor.value);
          cursor.continue();
        } else {
          setExistingExercises(existingExercises);
        }
      };

      exercisesRequest.onerror = function () {
        console.error("Error retrieving existing exercises");
      };

      userEntryTransaction.oncomplete = function () {
        db.close();
      };
    };

    request.onerror = function () {
      console.log("Error opening database");
    };
  }

  function handleModalVisibility(exerciseId: number) {
    setExerciseCommentId(exerciseId);
    setOpenCommentModal(!openCommentModal);
  }

  function saveExerciseEntry() {
    const request = indexedDB.open("fitScouterDb", 1);

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("user_exercises-entries")) {
        console.log("no table");
        const userEntries = db.createObjectStore("user_exercises-entries", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = function () {
      const db = request.result;

      console.log(weightValue, repsValue, distanceValue, timeValue);
      const userEntryTransaction = db.transaction(
        "user-exercises-entries",
        "readwrite"
      );

      const userEntryTransactionStore = userEntryTransaction.objectStore(
        "user-exercises-entries"
      );

      const exerciseNameIndex =
        userEntryTransactionStore.index("exercise_name");

      const exerciseDateIndex =
        userEntryTransactionStore.index("exercise_date");

      const exerciseNameAndDateIndex = userEntryTransactionStore.index(
        "exercise_name_and_date"
      );

      userEntryTransactionStore.add(entryToSave);

      const exerciseNameQuery = exerciseNameIndex.getAll(selectedExercise.name);

      let exerciseNameAndDateQuery;
      if (todayDate) {
        exerciseNameAndDateQuery = exerciseNameAndDateIndex.getAll([
          selectedExercise.name,
          todayDate,
        ]);
      }

      userEntryTransaction.oncomplete = function () {
        db.close();
        getExistingExercises();
      };
    };

    request.onerror = function () {
      console.log("found error:");
    };
  }
  function handleTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    if (id === "reps") {
      setRepsValue(parseInt(value, 10));
      setEntryToSave((prevState) => ({
        ...prevState,
        reps: parseInt(value, 10),
      }));
    } else if (id === "weight") {
      setWeightValue(parseFloat(value));
      setEntryToSave((prevState) => ({
        ...prevState,
        weight: parseFloat(value),
      }));
    } else if (id === "distance") {
      setDistanceValue(parseFloat(value));
      setEntryToSave((prevState) => ({
        ...prevState,
        distance: parseFloat(value),
      }));
    } else if (id === "time") {
      setTimeValue(parseFloat(value));
      setEntryToSave((prevState) => ({
        ...prevState,
        time: parseFloat(value),
      }));
    }
  }

  function handleAddButtonClick(index: number) {
    setUserDataInput(true);
    switch (selectedExercise.measurement[index]) {
      case "weight":
        setWeightValue((prevWeight) => prevWeight + 1);
        break;
      case "reps":
        setRepsValue((prevReps) => prevReps + 1);
        break;
      case "distance":
        setDistanceValue((prevDistance) => prevDistance + 1);
        break;
      case "time":
        setTimeValue((prevTime) => prevTime + 1);
        break;
      default:
        break;
    }
  }

  function handleSubtractButtonClick(index: number) {
    setUserDataInput(true);
    switch (selectedExercise.measurement[index]) {
      case "weight":
        setWeightValue((prevWeight) => prevWeight - 1);
        break;
      case "reps":
        setRepsValue((prevReps) => prevReps - 1);
        break;
      case "distance":
        setDistanceValue((prevDistance) => prevDistance - 1);
        break;
      case "time":
        setTimeValue((prevTime) => prevTime - 1);
        break;
      default:
        break;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100vw",
        alignItems: "center",
      }}
    >
      <CommentModal
        openCommentModal={openCommentModal}
        setOpenCommentModal={setOpenCommentModal}
        commentValue={commentValue}
        setCommentValue={setCommentValue}
        exerciseCommentId={exerciseCommentId}
      />

      <Typography
        sx={{
          padding: {
            xs: "0.5rem", // Padding for extra small screens
            sm: "0.75rem", // Padding for small screens
            md: "1rem", // Padding for medium screens
            lg: "1.5rem", // Padding for large screens
          },
        }}
      >
        {selectedExercise.name.toLocaleUpperCase()}
      </Typography>

      <Divider sx={{ width: "100vw" }}></Divider>

      {selectedExercise.measurement.map((exercise, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          }}
        >
          <Typography
            key={index}
            sx={{
              width: "100%",
              fontSize: "larger",
              margin: "0.15rem",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            {selectedExercise.measurement[index].toLocaleUpperCase()}
          </Typography>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => handleSubtractButtonClick(index)}
            >
              <RemoveIcon />
            </Button>

            <TextField
              type="number"
              id={selectedExercise.measurement[index]}
              variant="filled"
              inputProps={{
                style: { fontSize: "large", textAlign: "center" },
              }}
              value={
                selectedExercise.measurement[index] === "weight"
                  ? weightValue.toFixed(2)
                  : selectedExercise.measurement[index] === "reps"
                  ? repsValue
                  : selectedExercise.measurement[index] === "distance"
                  ? distanceValue
                  : timeValue
              }
              onChange={handleTextFieldChange}
            />

            <Button
              variant="outlined"
              onClick={() => handleAddButtonClick(index)}
            >
              <AddIcon />
            </Button>
          </Box>
        </Box>
      ))}

      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          variant="contained"
          color="success"
          sx={{ width: "100%", margin: "0.25rem" }}
          onClick={saveExerciseEntry}
        >
          SAVE
        </Button>
        <Button variant="contained" sx={{ width: "100%", margin: "0.25rem" }}>
          CLEAR
        </Button>
      </Box>

      <Box>
        {existingExercises.map((exercise, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100vw",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => handleModalVisibility(exercise.id)}
            >
              <AddCommentIcon />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                width: "100vw",
                justifyContent: "space-around",
              }}
            >
              {exercise.weight !== 0 && (
                <Typography>
                  {exercise.weight.toFixed(2)}{" "}
                  {unitsSystem === "metric" ? "kgs" : "lbs"}
                </Typography>
              )}
              {exercise.reps !== 0 && (
                <Typography>{exercise.reps} reps</Typography>
              )}
              {exercise.distance !== 0 && (
                <Typography>{exercise.distance}</Typography>
              )}
              {exercise.time !== 0 && <Typography>{exercise.time}</Typography>}
            </Box>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <DeleteIcon />
            </IconButton>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ExerciseSelectedTrack;
