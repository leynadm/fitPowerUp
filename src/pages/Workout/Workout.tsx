import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import CompletedWorkoutsTabs from "./CompletedWorkoutsTabs";
import { Routes, Route } from "react-router-dom";
import NewWorkout from "./NewWorkout";
import ExerciseSelected from "./ExerciseSelected";
import Settings from "../Settings/Settings";
import Exercise from "../../utils/interfaces/Exercise";
import WorkoutCalendar from "./WorkoutCalendar";
import getExercisesByDate from "../../utils/IndexedDbCRUDFunctions/getNewWorkoutExercises";
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
interface HomeProps {
  existingExercises: { name: string; exercises: Exercise[] }[];
  setExistingExercises: Dispatch<
    SetStateAction<{ name: string; exercises: Exercise[] }[]>
  >;
}

function Workout({ existingExercises, setExistingExercises }: HomeProps) {
  const [todayDate, setTodayDate] = useState<Date>();

  useEffect(() => {
    if (!todayDate) {
      const currentDate = new Date();
      setTodayDate(currentDate);
    }
  }, []);

  /* Use this useEffect to force requerying of data and update state when user navigates with back button */
  useEffect(() => {
    const handlePopstate = () => {
      handleEffectLogic();
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [todayDate]);

  const handleEffectLogic = useCallback(() => {
    if (todayDate) {
      getExercisesByDate(setExistingExercises);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/completed-details/:exerciseName/*"
        element={<CompletedWorkoutsTabs />}
      />

      <Route
        path="/*"
        index
        element={
          <CompletedWorkouts
          />
        }
      />

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
        path="/new/workout_categories/exercises/selected/:exerciseName/*"
        element={<ExerciseSelected />}
      />

      <Route
        path="/new/workout_categories/*"
        element={<MuscleGroupsSelectionMenu />}
      />

      <Route
        path="/new/workout_categories/exercises"
        element={<ExerciseSelectionMenu />}
      />

      <Route path="settings" element={<Settings />} />
      <Route path="settings/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="settings/import-data" element={<ImportData />} />
      <Route path="settings/development-log" element={<DevelopmentLog />} />

      <Route
        path="calendar"
        element={
          <WorkoutCalendar />
        }
      />

      <Route path="analysis/*" element={<Analysis />} />

      <Route path="bodytracker/*" element={<BodyTracker />} />

      <Route path="new/congratulations" element={<WorkoutCongratulations />} />
    </Routes>
  );
}

export default Workout;
