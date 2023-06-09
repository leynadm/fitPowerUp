import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Progress from "../Progress/Progress";
import Friends from "../Friends/Friends";
import Workout from "../Workout/Workout";
import Box from "@mui/material/Box";
import importedPreselectedExercises from "../../utils/preselectedExercises";
import Exercise from "../../utils/interfaces/Exercise";
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Home() {
  const [preselectedExercises, setPreselectedExercises] = useState<
    { category: string; name: string; measurement: any[] }[]
  >([]);
  const [existingExercises, setExistingExercises] = useState<
    { name: string; exercises: Exercise[] }[]
  >([]);
  const [selectedCategoryExercises, setSelectedCategoryExercises] = useState<
    { category: string; name: string; measurement: any[] }[]
  >([]);
  const [exercisesCategories, setExercisesCategories] = useState<string[]>([]);
  const [unitsSystem, setUnitsSystem] = useState("");

  useEffect(() => {
    console.log("IN HOME: Setting up preselected exercises");
    setPreselectedExercises(importedPreselectedExercises);
  }, []);

  useEffect(() => {
    if (preselectedExercises.length > 0) {
      console.log("in HOME: populating preselected exercises");
      console.log("doing a check on all exercises:");
      populatePreselectedExercises();
    }
  }, [preselectedExercises]);

  function populatePreselectedExercises() {
    const request = indexedDB.open("fitScouterDb", 1);

    request.onsuccess = function (event) {
      const db = request.result;
      const defaultRecord = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("preselected-exercises", "readwrite");
      const store = transaction.objectStore("preselected-exercises");

      const exerciseNameIndex = store.index("exercise_name");
      const exerciseCategoryIndex = store.index("exercise_category");

      preselectedExercises.forEach((exercise) => {
        const formattedExercise = {
          name: exercise.name,
          category: exercise.category,
          measurement: exercise.measurement,
        };

        const exerciseNameQuery = exerciseNameIndex.getAll(exercise.name);

        exerciseNameQuery.onsuccess = function (event) {
          const result = (event.target as IDBRequest).result;
          if (result.length === 0) {
            store.add(formattedExercise);
          }
        };
      });

      const categoryQuery = exerciseCategoryIndex.openKeyCursor();
      const uniqueCategories = new Set<string>(); // Specify string type for the Set

      categoryQuery.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          const category: string = cursor.key; // Specify string type for the category
          uniqueCategories.add(category);
          cursor.continue();
        } else {
          const categories: string[] = Array.from(uniqueCategories); // Specify string[] type
          console.log("Categories:", categories);

          console.log("categories");

          setExercisesCategories(categories);

          console.log(categories);
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

  function initializeIndexedDB() {
    const request = indexedDB.open("fitScouterDb", 1);

    if (!request) {
      return;
    }

    request.onerror = function (event) {
      // Handle errors
    };

    request.onupgradeneeded = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create a table or object store only if it doesn't exist
      if (!db.objectStoreNames.contains("user-data-preferences")) {
        const objectStore = db.createObjectStore("user-data-preferences", {
          keyPath: "id",
          autoIncrement: true,
        });

        // Add an index for querying if needed
        objectStore.createIndex("unitsIndex", "unitsSystem");

        // Add the default record
        const defaultRecord = {
          unitsSystem: "metric",
          defaultWeightIncrement: 2.5,
        };

        objectStore.add(defaultRecord);
      }
    };

    request.onsuccess = function (event) {
      const db = request.result;

      // Check if the default record exists
      const transaction = db.transaction("user-data-preferences", "readwrite");
      const objectStore = transaction.objectStore("user-data-preferences");
      const getRequest = objectStore.get(1); // Assuming the default record has id = 1

      getRequest.onsuccess = function (event) {
        const defaultRecord = (event.target as IDBOpenDBRequest).result;

        if (!defaultRecord) {
          // The default record doesn't exist, so add it
          const addRequest = objectStore.add({
            unitsSystem: "metric",
            defaultWeightIncrement: 2.5,
          });

          addRequest.onsuccess = function () {
            console.log("Default record added successfully.");
          };

          addRequest.onerror = function (event) {
            console.error("Failed to add default record:");
          };
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
  let theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#808080',
      },
      success: {
        main: '#FF8C00',
      },
    },
    typography: {

      button: { // Here is where you can customise the button
        fontWeight: "bold", 
      },
    }    
  });


  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        height: "calc(100vh - 56px)",
        backgroundColor: "#F0F2F5",
      }}
    > 
      <Navbar />
      <Routes>
        <Route
          path="/*"
          element={
            <Workout
              setExercisesCategories={setExercisesCategories}
              existingExercises={existingExercises}
              selectedCategoryExercises={selectedCategoryExercises}
              exercisesCategories={exercisesCategories}
              setSelectedCategoryExercises={setSelectedCategoryExercises}
              setExistingExercises={setExistingExercises}
              unitsSystem={unitsSystem}
              setUnitsSystem={setUnitsSystem}
            />
          }
          index
        />
        <Route
          path="friends/*"
          element={<Friends 
            existingExercises={existingExercises}
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
            />}
        />
        <Route path="progress" element={<Progress />} />
      </Routes>
    </Box>
    </ThemeProvider>
  );
}

export default Home;
