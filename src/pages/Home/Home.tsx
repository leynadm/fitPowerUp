import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Progress from "../Progress/Progress";
import Friends from "../Friends/Friends";
import Workout from "../Workout/Workout";
import Box from "@mui/material/Box";
import importedPreselectedExercises from "../../utils/preselectedExercises";
import Exercise from "../../utils/interfaces/Exercise";

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
  useEffect(() => {
    console.log('IN HOME: Setting up preselected exercises')
    setPreselectedExercises(importedPreselectedExercises);
  }, []);

  useEffect(() => {
    if (preselectedExercises.length > 0) {
      console.log('in HOME: populating preselected exercises')
      populatePreselectedExercises();
    }
  }, [preselectedExercises]);

  function populatePreselectedExercises() {
    const request = indexedDB.open("fitScouterDb", 1);

    if (!request) {
      console.log("request value:");
      console.log(request);
      return;
    }

    // Check if there are any error while opening the Db
    request.onerror = function (event) {
      console.error("And error occured with IndexedDb");
      console.error(event);
    };

    request.onupgradeneeded = function () {
      const db = request.result; // Result of our open request

      // Create first table with its indexes
      const store = db.createObjectStore("preselected-exercises", {
        keyPath: "id",
        autoIncrement: true,
      });

      store.createIndex("exercise_name", "name", { unique: false });
      store.createIndex("exercise_category", "category", { unique: false });
      store.createIndex("exercise_name_and_category", ["name", "category"], {
        unique: false,
      });

      // create second table with its indexes
      const user_entries = db.createObjectStore("user-exercises-entries", {
        keyPath: "id",
        autoIncrement: true,
      });

      user_entries.createIndex("exercise_date", "date", { unique: false });
      user_entries.createIndex("exercise_name", "exercise", { unique: false });
      user_entries.createIndex("exercise_category", "category", {
        unique: false,
      });
      user_entries.createIndex("exercise_weight", "weight", { unique: false });
      user_entries.createIndex("exercise_reps", "reps", { unique: false });
      user_entries.createIndex("exercise_distance", "distance", {
        unique: false,
      });
      user_entries.createIndex("exercise_distance_unit", "distance_unit", {
        unique: false,
      });
      user_entries.createIndex("exercise_time", "time", { unique: false });
      user_entries.createIndex("exercise_name_and_date", ["exercise", "date"], {
        unique: false,
      });

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
    };

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

  return (
    <Box
      sx={{
        height: "100vh",
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
            />
          }
          index
        />
        <Route path="friends" element={<Friends />} />
        <Route path="progress" element={<Progress />} />
      </Routes>
    </Box>
  );
}

export default Home;
