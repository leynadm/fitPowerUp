import React, { Dispatch, SetStateAction } from "react";
import CompletedWorkoutsTabs from "./CompletedWorkoutsTabs";
import { Routes, Route } from "react-router-dom";
import NewWorkout from "./NewWorkout";
import ExerciseSelected from "./ExerciseSelected";
import Settings from "../Settings/Settings";
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
import WorkoutCalendar from "./WorkoutCalendar";
import BodyTracker from "../BodyTracker/BodyTracker";
import Analysis from "../Analysis/Analysis";
import SendFeedback from "../Settings/SendFeedback";
import CompletedWorkouts from "./CompletedWorkouts";
import WorkoutCongratulations from "./WorkoutCongratulations";
import MuscleGroupsSelectionMenu from "./MuscleGroupsSelectionMenu";
import ExerciseSelectionMenu from "./ExerciseSelectionMenu";
import TermsAndConditions from "../Login/TermsAndConditions";
import ImportData from "../Settings/ImportData";
import DevelopmentLog from "../Settings/DevelopmentLog";
import PresetWorkouts from "./PresetWorkouts/PresetWorkouts";
import Favorites from "./Favorites";
import { Box } from "@mui/material";
interface HomeProps {
  existingExercises: { name: string; exercises: Exercise[] }[];
  setExistingExercises: Dispatch<
    SetStateAction<{ name: string; exercises: Exercise[] }[]>
  >;
}

function Workout({ existingExercises, setExistingExercises }: HomeProps) {
  return (

      <Routes>
        <Route
          path="/completed-details/:exerciseName/*"
          element={<CompletedWorkoutsTabs />}
        />

        <Route path="/*" index element={<CompletedWorkouts />} />

        <Route
          path="new/*"
          index
          element={
            <NewWorkout
              existingExercises={existingExercises}
              setExistingExercises={setExistingExercises}
            />
          }
        />

        <Route path="settings/send-feedback" element={<SendFeedback />} />

        <Route
          path="/new/workout_categories/exercises/:selectedMuscleGroup/selected/:exerciseName/*"
          element={<ExerciseSelected />}
        />

        <Route
          path="/new/workout_categories/*"
          element={<MuscleGroupsSelectionMenu />}
        />
        <Route
          path="/new/workout_categories/favorites/"
          element={<Favorites />}
        />

        <Route
          path="/new/workout_categories/exercises/:selectedMuscleGroup/*"
          element={<ExerciseSelectionMenu />}
        />

        <Route path="settings" element={<Settings />} />
        <Route
          path="settings/terms-and-conditions"
          element={<TermsAndConditions />}
        />
        <Route path="settings/import-data" element={<ImportData />} />
        <Route path="settings/development-log" element={<DevelopmentLog />} />

        <Route path="calendar" element={<WorkoutCalendar />} />

        <Route path="analysis/*" element={<Analysis />} />

        <Route path="bodytracker/*" element={<BodyTracker />} />

        <Route
          path="new/congratulations"
          element={<WorkoutCongratulations />}
        />
        <Route path="preset-workouts/*" element={<PresetWorkouts />} />
      </Routes>
  );
}

export default Workout;
