import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ExercisesCategories from "./ExercisesCategories";
import { Routes, Route } from "react-router-dom";
import NewWorkout from "../../components/ui/NewWorkout";
import ExercisesByCategory from "./ExercisesByCategory";
import ExerciseSelected from "./ExerciseSelected";
import Settings from "../Settings/Settings";

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

function Workout() {
  const [todayDate, setTodayDate] = useState<Date>();

  const [selectedCategoryExercises, setSelectedCategoryExercises] = useState<
    { category: string; name: string; measurement: any[] }[]
  >([]);
  const [existingExercises, setExistingExercises] = useState<
    { date: Date | string; exercises: Exercise[] }[]
  >([]);

  const [selectedExercise, setSelectedExercise] = useState<{
    category: string;
    name: string;
    measurement: any[];
  }>({ category: "", name: "", measurement: [] });

  useEffect(() => {
    const currentDate = new Date();
    setTodayDate(currentDate);
  }, []);

  useEffect(() => {
    if (todayDate) {
      getExercisesByDate(todayDate);
    }
  }, [todayDate]);

  function getExercisesByDate(currentDate: Date) {
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

      const dateIndex = userEntryTransactionStore.index("exercise_date");

      const dateToQuery = currentDate;
      console.log("loggin dateToQuery; " + dateToQuery);
      const range = IDBKeyRange.only(dateToQuery);

      const exercisesRequest = dateIndex.openCursor(range);
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
          console.log(groupedExercises);
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
    <Box
      sx={{
        height: "75vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <NewWorkout
                todayDate={todayDate}
                setTodayDate={setTodayDate}
                existingExercises={existingExercises}
              />
            }
          />

          <Route
            path="workout_categories/*"
            element={
              <ExercisesCategories
                todayDate={todayDate}
                setTodayDate={setTodayDate}
                selectedCategoryExercises={selectedCategoryExercises}
                setSelectedCategoryExercises={setSelectedCategoryExercises}
              />
            }
          />

          <Route
            path="workout_categories/exercises"
            element={
              <ExercisesByCategory
                todayDate={todayDate}
                selectedCategoryExercises={selectedCategoryExercises}
                setSelectedExercise={setSelectedExercise}
              />
            }
          />

          <Route
            path="workout_categories/exercises/selected/*"
            element={
              <ExerciseSelected
                todayDate={todayDate}
                selectedExercise={selectedExercise}
                setSelectedExercise={setSelectedExercise}
              />
            }
          />

          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Workout;
