import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import NewPresetWorkout from "./NewPresetWorkout";
import PresetWorkoutsOverview from "./PresetWorkoutsOverview";
import PresetWorkoutExercise from "./PresetWorkoutExercise";
import RoutineCardDetails from "./RoutineCardDetails";
import WorkoutDetails from "./WorkoutDetails";
function PresetWorkouts() {
  return (
    <Container maxWidth="md">
      <Routes>
        <Route path="" element={<PresetWorkoutsOverview />} />
        <Route path="new-preset-workout" element={<NewPresetWorkout />} />
        <Route
          path="new-preset-workout/preset-workout-exercise/:exerciseName"
          element={<PresetWorkoutExercise />}
        />
        <Route
          path="preset-routine-details/:routineName"
          element={<RoutineCardDetails />}
        />
        <Route
          path="preset-routine-details/:routineName/workout-details/:workoutName"
          element={<WorkoutDetails />}
        />
        <Route
          path="standalone-workout-details/:workoutName"
          element={<WorkoutDetails />}
        />
        
      </Routes>
    </Container>
  );
}

export default PresetWorkouts;
