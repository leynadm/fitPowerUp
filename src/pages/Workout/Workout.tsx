import React, { useState, useEffect,Dispatch,SetStateAction,useRef } from "react";
import Box from "@mui/material/Box";
import ExercisesCategories from "./ExercisesCategories";
import { Routes, Route } from "react-router-dom";
import NewWorkout from "../../components/ui/NewWorkout";
import ExercisesByCategory from "./ExercisesByCategory";
import ExerciseSelected from "./ExerciseSelected";
import Settings from "../Settings/Settings";
import Exercise from "../../utils/interfaces/Exercise";
import { Ref } from 'react';
/* 
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
} */

interface HomeProps {
  existingExercises: { name: string; exercises: Exercise[] }[];
  selectedCategoryExercises: {
    category: string;
    name: string;
    measurement: any[];
  }[];
  exercisesCategories: string[];
  setExistingExercises:Dispatch<
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
  setSelectedCategoryExercises,
  setExistingExercises,
}: HomeProps) {
  const [todayDate, setTodayDate] = useState<Date>();

  const [selectedExercise, setSelectedExercise] = useState<{
    category: string;
    name: string;
    measurement: any[];
  }>({ category: "", name: "", measurement: [] });

  const [unitsSystem, setUnitsSystem] = useState('');
  const workoutRef = useRef(null);

  useEffect(() => {
    if (!todayDate) {
      const currentDate = new Date();
      setTodayDate(currentDate);
    }
    console.log('logging exercises categories: ')
    console.log(exercisesCategories)
    getDataPreferences()
  }, []);

  useEffect(() => {
    if (todayDate) {
       
      getExercisesByDate(todayDate);
      
    }
  }, [todayDate]);


  function getDataPreferences() {
    const request = indexedDB.open('fitScouterDb', 1);

    request.onerror = function(event) {
      // Handle errors
    };

    request.onsuccess = function(event) {
      const db = request.result;

      // Retrieve the record with id 1 from the object store
      const transaction = db.transaction('user-data-preferences', 'readonly');
      const objectStore = transaction.objectStore('user-data-preferences');
      const getRequest = objectStore.get(1);

      getRequest.onsuccess = function(event) {
        const record = getRequest.result;
        if (record) {
          // Extract the unitsSystem value from the record
          const { unitsSystem } = record;
          setUnitsSystem(unitsSystem);
          console.log(unitsSystem)
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
    <Box
    sx={{ paddingBottom:"56px" }}
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
                unitsSystem={unitsSystem}
              />
            }
          />

          <Route path="/settings" element={<Settings unitsSystem={unitsSystem} />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Workout;
