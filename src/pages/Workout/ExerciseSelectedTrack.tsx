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
interface ExerciseSelectionProps {
  selectedExercise: { category: string; name: string; measurement: any[] };
  todayDate: Date | undefined;
}

interface Exercise {
  exercise: string;
  date: Date | string;
  weight: number;
  reps: number;
  distance: number;
  distance_unit: number | object;
  time: number;
  category: string;
  // Add other properties here as per your exercise object structure
}

function ExerciseSelectedTrack({
  selectedExercise,
  todayDate,
}: ExerciseSelectionProps) {
  const [weightValue, setWeightValue] = useState(0);
  const [repsValue, setRepsValue] = useState(0);
  const [distanceValue, setDistanceValue] = useState(0);
  const [timeValue, setTimeValue] = useState(0);
  const [existingExercises, setExistingExercises] = useState<Exercise[]>([]);

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
  }, [todayDate]);

  useEffect(() => {
    setEntryToSave((prevState) => ({
      ...prevState,
      weight: weightValue,
      reps: repsValue,
      distance: distanceValue,
      time: timeValue,
    }));
  }, [weightValue, repsValue, distanceValue, timeValue]);

  function getExistingExercises() {
    if (!todayDate) {
      return;
    }

    const request = indexedDB.open("ExerciseDB", 1);

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
        [selectedExercise.name, new Date(todayDate.getTime() + 86400000)]
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

  function saveExerciseEntry() {
    const request = indexedDB.open("ExerciseDB", 1);

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

  // Function to handle changes in the TextField
  function handleTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    if (id === "reps") {
      console.log("currently in reps");
      setRepsValue(parseInt(value, 10));
    } else if (id === "weight") {
      console.log("currently in weight");
      setWeightValue(parseInt(value, 10));
    } else if (id === "distance") {
      console.log("currently in distance");
      setDistanceValue(parseInt(value, 10));
      console.log("currently in time");
    } else if (id === "time") {
      setTimeValue(parseInt(value, 10));
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
            <Button variant="outlined">
              <RemoveIcon />
            </Button>

            <TextField
              type="number"
              id={selectedExercise.measurement[index]}
              variant="filled"
              inputProps={{
                style: { fontSize: "large" },
              }}
              onChange={handleTextFieldChange}
            />

            <Button variant="outlined">
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
                <Typography>{exercise.weight} kgs </Typography>
              )}
              {exercise.reps !== 0 && <Typography>{exercise.reps} reps</Typography>}
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
            <Divider/>            
          </Box>

        ))}
      </Box>

    </Box>
  );
}

export default ExerciseSelectedTrack;
