import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ExercisesCategories from "../../components/ui/ExercisesCategories";
import { Routes, Route } from "react-router-dom";
import NewWorkout from "../../components/ui/NewWorkout";
import ExercisesByCategory from "../../components/ui/ExercisesByCategory";
import ExerciseSelected from "../../components/ui/ExerciseSelected";
import ExerciseSelectedHistory from "../../components/ui/ExerciseSelectedHistory";
import ExerciseSelectedGraph from "../../components/ui/ExerciseSelectedHistory";

function Workout() {
  const [todayDate, setTodayDate] = useState<Date | undefined>(undefined);
  const [selectedCategoryExercises, setSelectedCategoryExercises] = useState<
    { category: string; name: string }[]
  >([]);
  const [selectedExercise, setSelectedExercise] = useState({ category: "", name: "" });

  useEffect(() => {
    const currentDate = new Date();
    setTodayDate(currentDate);
    console.log(currentDate);
  }, []);

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
              <NewWorkout todayDate={todayDate} setTodayDate={setTodayDate} />
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
              selectedExercise={selectedExercise}
              setSelectedExercise={setSelectedExercise}
              />
            }
          />

        </Routes>
      </Box>
    </Box>
  );
}

export default Workout;
