import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import Box from "@mui/material/Box";
import ExercisesCategories from "./ExercisesCategories";
import { Routes, Route } from "react-router-dom";
import NewWorkout from "../../components/ui/NewWorkout";
import ExercisesByCategory from "./ExercisesByCategory";
import ExerciseSelected from "./ExerciseSelected";
import Settings from "../Settings/Settings";
import Exercise from "../../utils/interfaces/Exercise";

interface HomeProps {
  existingExercises: { name: string; exercises: Exercise[] }[];
  selectedCategoryExercises: {
    category: string;
    name: string;
    measurement: any[];
  }[];
  exercisesCategories: string[];
  setExercisesCategories: Dispatch<SetStateAction<string[]>>;

  setExistingExercises: Dispatch<
    SetStateAction<{ name: string; exercises: Exercise[] }[]>
  >;
  setSelectedCategoryExercises: Dispatch<
    SetStateAction<{ category: string; name: string; measurement: any[] }[]>
  >;
}

function Workout({
  existingExercises,
  selectedCategoryExercises,
  exercisesCategories,
  setExercisesCategories,
  setSelectedCategoryExercises,
  setExistingExercises,
}: HomeProps) {
  const [todayDate, setTodayDate] = useState<Date>();

  const [selectedExercise, setSelectedExercise] = useState<{
    category: string;
    name: string;
    measurement: any[];
  }>({ category: "", name: "", measurement: [] });

  const [unitsSystem, setUnitsSystem] = useState("");
  const [weightIncrementPreference, setWeightIncrementPreference] = useState(2.5);

  useEffect(() => {
    if (!todayDate) {
      const currentDate = new Date();
      setTodayDate(currentDate);
    }
    getDataPreferences();
  }, []);

  useEffect(() => {
    if (todayDate) {
      getExercisesByDate(todayDate);
    }
  }, [todayDate]);

  
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

  function handleEffectLogic() {
    if (todayDate) {
      getExercisesByDate(todayDate);
      getDataPreferences();
    }
  } 

  function getDataPreferences() {
    const request = indexedDB.open("fitScouterDb", 1);

    request.onerror = function (event) {
      // Handle errors
    };

    request.onsuccess = function (event) {
      const db = request.result;

      // Retrieve the record with id 1 from the object store
      const transaction = db.transaction("user-data-preferences", "readonly");
      const objectStore = transaction.objectStore("user-data-preferences");
      const getRequest = objectStore.get(1);

      getRequest.onsuccess = function (event) {
        const record = getRequest.result;
        console.log('logging the record inside getDataPreferences')
        console.log(record)
        if (record) {
          // Extract the unitsSystem value from the record
          const { unitsSystem, defaultWeightIncrement } = record;
          setUnitsSystem(unitsSystem);
          setWeightIncrementPreference(defaultWeightIncrement)
          console.log('logging default weight increment:')
          console.log(defaultWeightIncrement)
        }
      };
    };
  }

  function getExercisesByDate(currentDate: Date) {
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

      const dateIndex = userEntryTransactionStore.index("exercise_date");

      const dateToQuery = currentDate;
      console.log("logging dateToQuery: " + dateToQuery);
      const range = IDBKeyRange.only(dateToQuery);

      const exercisesRequest = dateIndex.openCursor(range);
      const groupedExercisesByName: { [name: string]: Exercise[] } = {};

      exercisesRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          const exercise = cursor.value;

          // Find the group for the current exercise name, or create a new group if it doesn't exist
          const group = groupedExercisesByName[exercise.exercise];
          if (group) {
            group.push(exercise);
          } else {
            groupedExercisesByName[exercise.exercise] = [exercise];
          }

          cursor.continue();
        } else {
          const groupedExercises: { name: string; exercises: Exercise[] }[] =
            [];

          // Create a group for each name and add exercises grouped by name
          Object.keys(groupedExercisesByName).forEach((name) => {
            groupedExercises.push({
              name,
              exercises: groupedExercisesByName[name],
            });
          });

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
      console.error("Error opening database");
    };
  }

  return (
    <Box sx={{ paddingBottom: "56px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <NewWorkout
                unitsSystem={unitsSystem}
                todayDate={todayDate}
                setTodayDate={setTodayDate}
                existingExercises={existingExercises}
                setSelectedCategoryExercises={setSelectedCategoryExercises}
                selectedCategoryExercises={selectedCategoryExercises}
                setSelectedExercise={setSelectedExercise}
                selectedExercise={selectedExercise}
              />
            }
          />

          <Route
            path="workout_categories/*"
            element={
              <ExercisesCategories
                setExercisesCategories={setExercisesCategories}
                todayDate={todayDate}
                setTodayDate={setTodayDate}
                selectedCategoryExercises={selectedCategoryExercises}
                setSelectedCategoryExercises={setSelectedCategoryExercises}
                exercisesCategories={exercisesCategories}
              />
            }
          />

          <Route
            path="workout_categories/exercises"
            element={
              <ExercisesByCategory
                setExercisesCategories={setExercisesCategories}
                todayDate={todayDate}
                selectedCategoryExercises={selectedCategoryExercises}
                setSelectedExercise={setSelectedExercise}
                exercisesCategories={exercisesCategories}
              />
            }
          />

          <Route
            path="workout_categories/exercises/selected/*"
            element={
              <ExerciseSelected
                todayDate={todayDate}
                selectedExercise={selectedExercise}
                unitsSystem={unitsSystem}
                weightIncrementPreference={weightIncrementPreference}
              />
            }
          />

          <Route
            path="/settings"
            element={<Settings unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} weightIncrementPreference={weightIncrementPreference} setWeightIncrementPreference={setWeightIncrementPreference}  />}
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default Workout;
