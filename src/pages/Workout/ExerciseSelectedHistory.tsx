import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";

interface ExerciseSelectionProps {
  selectedExercise: { category: string; name: string; measurement: any[] };
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
  // Add other properties
}

function ExerciseSelectedHistory({ selectedExercise }: ExerciseSelectionProps) {
  const [existingExercises, setExistingExercises] = useState<
    { date: Date | string; exercises: Exercise[] }[]
  >([]);

  useEffect(() => {
    getExerciseHistory();
  }, []);

  function getExerciseHistory() {
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

      const exerciseNameIndex =
        userEntryTransactionStore.index("exercise_name");

      const range = IDBKeyRange.only(selectedExercise.name);

      const exercisesRequest = exerciseNameIndex.openCursor(range);
      const groupedExercises: { date: Date | string; exercises: Exercise[] }[] =
        [];
      exercisesRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          const exercise = cursor.value;
          const date = exercise.date.toDateString(); // Convert the date to a string for grouping

          // Find the group for the current date, or create a new group if it doesn't exist
          const group = groupedExercises.find((group) => group.date === date);
          if (group) {
            group.exercises.push(exercise);
          } else {
            groupedExercises.push({ date, exercises: [exercise] });
          }

          cursor.continue();
        } else {
          setExistingExercises(groupedExercises);
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

  return (
    <Box>
      <Typography
        sx={{
          padding: {
            xs: "0.5rem", // Padding for extra small screens
            sm: "0.75rem", // Padding for small screens
            md: "1rem", // Padding for medium screens
            lg: "1.5rem", // Padding for large screens
          },
          textAlign: "center",
        }}
      >
        {selectedExercise.name.toLocaleUpperCase()}
      </Typography>
      <Divider sx={{ width: "100vw" }}></Divider>

      <Box>
        {existingExercises
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((group, index) => (
            <Box key={index}>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                {group.date.toLocaleString()}
              </Typography>
              <Divider />
              {group.exercises.map((exercise, exerciseIndex) => (
                <Box
                  key={exerciseIndex}
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
                    {exercise.reps !== 0 && (
                      <Typography>{exercise.reps} reps</Typography>
                    )}
                    {exercise.distance !== 0 && (
                      <Typography>{exercise.distance}</Typography>
                    )}
                    {exercise.time !== 0 && (
                      <Typography>{exercise.time}</Typography>
                    )}
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
          ))}
      </Box>
    </Box>
  );
}

export default ExerciseSelectedHistory;

/* 
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";

interface ExerciseSelectionProps {
  selectedExercise: { category: string; name: string; measurement: any[] };
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
  // Add other properties
}

function ExerciseSelectedHistory({ selectedExercise }: ExerciseSelectionProps) {
  const [existingExercises, setExistingExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    getExerciseHistory();
  }, []);

  function getExerciseHistory() {
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

      const exerciseNameIndex =
        userEntryTransactionStore.index("exercise_name");

      const range = IDBKeyRange.only(selectedExercise.name);

      const exercisesRequest = exerciseNameIndex.openCursor(range);
      const existingExercises: any[] | ((prevState: Exercise[]) => Exercise[]) =
        [];
      exercisesRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          existingExercises.push(cursor.value);
          cursor.continue();
        } else {
            console.log('the array:')
            console.log(existingExercises)
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

  return (
    <Box>
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
              {exercise.reps !== 0 && <Typography>{exercise.reps}</Typography>}
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

export default ExerciseSelectedHistory;
 */
