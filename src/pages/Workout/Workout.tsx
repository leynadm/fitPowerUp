import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
} from "react";
import CompletedWorkoutsTabs from "./CompletedWorkoutsTabs";
import Box from "@mui/material/Box";
import ExercisesCategories from "./ExercisesCategories";
import { Routes, Route } from "react-router-dom";
import NewWorkout from "./NewWorkout";
import ExercisesByCategory from "./ExercisesByCategory";
import ExerciseSelected from "./ExerciseSelected";
import Settings from "../Settings/Settings";
import Exercise from "../../utils/interfaces/Exercise";
import WorkoutCalendar from "./WorkoutCalendar";
import getExercisesByDate from "../../utils/IndexedDbCRUDFunctions/getNewWorkoutExercises";
import BodyTracker from "../BodyTracker/BodyTracker";
import Analysis from "../Analysis/Analysis";
import SendFeedback from "../Settings/SendFeedback";
import CompletedWorkouts from "./CompletedWorkouts";
import { AuthContext } from "../../context/Auth";
import WorkoutCongratulations from "./WorkoutCongratulations";
import MuscleGroupsSelectionMenu from "./MuscleGroupsSelectionMenu";
import ExerciseSelectionMenu from "./ExerciseSelectionMenu";
interface HomeProps {
  existingExercises: { name: string; exercises: Exercise[] }[];
  setExistingExercises: Dispatch<
    SetStateAction<{ name: string; exercises: Exercise[] }[]>
  >;
}

function Workout({ existingExercises, setExistingExercises }: HomeProps) {
  const [todayDate, setTodayDate] = useState<Date>();
  const { currentUserData } = useContext(AuthContext);

  const [selectedExercise, setSelectedExercise] = useState<{
    category: string;
    name: string;
    measurement: any[];
  }>({ category: "", name: "", measurement: [] });

  const [weightIncrementPreference, setWeightIncrementPreference] =
    useState(2.5);

  useEffect(() => {
    if (!todayDate) {
      const currentDate = new Date();
      setTodayDate(currentDate);
    }

    setWeightIncrementPreference(currentUserData.defaultWeightIncrement);
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
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                todayDate={todayDate}
                setTodayDate={setTodayDate}
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
            element={<ExerciseSelected selectedExercise={selectedExercise} />}
          />

          <Route
            path="/new/workout_categories/*"
            element={<MuscleGroupsSelectionMenu />}
          />

          <Route
            path="/new/workout_categories/exercises"
            element={<ExerciseSelectionMenu />}
          />

          <Route
            path="settings"
            element={
              <Settings
                weightIncrementPreference={weightIncrementPreference}
                setWeightIncrementPreference={setWeightIncrementPreference}
              />
            }
          />

          <Route
            path="calendar"
            element={

              <WorkoutCalendar
                todayDate={todayDate}
                setTodayDate={setTodayDate}

              />
            }
          />

          <Route path="analysis/*" element={<Analysis />} />

          <Route
            path="bodytracker/*"
            element={
              <BodyTracker todayDate={todayDate} unitsSystem={currentUserData.unitsSystem} />
            }
          />

          <Route
            path="new/congratulations"
            element={<WorkoutCongratulations />}
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default Workout;
