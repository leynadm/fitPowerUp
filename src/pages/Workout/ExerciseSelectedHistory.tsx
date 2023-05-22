import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";
import Exercise from "../../utils/interfaces/Exercise";
import CommentIcon from "@mui/icons-material/Comment";
interface ExerciseSelectionProps {
  selectedExercise: { category: string; name: string; measurement: any[] };
  unitsSystem: string;
}

function ExerciseSelectedHistory({
  selectedExercise,
  unitsSystem,
}: ExerciseSelectionProps) {
  const [existingExercises, setExistingExercises] = useState<
    { date: Date | string; exercises: Exercise[] }[]
  >([]);

  useEffect(() => {
    getExerciseHistory();
  }, []);

  function getExerciseHistory() {
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
                    alignItems: "center",
                    width: "100vw",
                  }}
                >
                  {exercise.comment ? ( // Check if 'comment' property exists
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="secondary"
                    >
                      <CommentIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      disabled // Placeholder element
                    >
                      <CommentIcon style={{ opacity: 0 }} />
                    </IconButton>
                  )}
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
