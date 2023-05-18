/* 

import React, { useEffect, useState } from "react";
import { openDB, deleteDB, wrap, unwrap } from "idb";
import importedPreselectedExercises from "../../utils/preselectedExercises";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, InputBase, makeStyles } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

function ExercisesCategories() {
  const [preselectedExercises, setPreselectedExercises] = useState<
    { category: string; name: string }[]
  >([]);
  const [exercisesCategories, setExercisesCategories] = useState<string[]>([]);
  const [selectedCategoryExercises, setSelectedCategoryExercises] = useState<
    { category: string; name: string }[]
  >([]);

  useEffect(() => {
    setPreselectedExercises(importedPreselectedExercises);
  }, []);

  useEffect(() => {
    if (preselectedExercises.length > 0) {
      populatePreselectedExercises();
    }
  }, [preselectedExercises]);

  function populatePreselectedExercises() {
    const indexedDb = window.indexedDB;

    if (!indexedDb) {
      console.log("IndexedDB could not be found in this browser.");
    }

    const request = indexedDB.open("ExerciseDB", 1);

    // Check if there are any error while opening the Db
    request.onerror = function (event) {
      console.error("And error occured with IndexedDb");
      console.error(event);
    };

    request.onupgradeneeded = function () {
      const db = request.result; // Result of our open request
      console.log(db);
      const store = db.createObjectStore("preselected-exercises", {
        keyPath: "id",
        autoIncrement: true,
      });

      store.createIndex("exercise_name", "name", { unique: false });
      store.createIndex("exercise_category", "category", { unique: false });
      store.createIndex("exercise_name_and_category", ["name", "category"], {
        unique: false,
      });
    };

    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction("preselected-exercises", "readwrite");
      const store = transaction.objectStore("preselected-exercises");

      const exerciseNameIndex = store.index("exercise_name");
      const exerciseCategoryIndex = store.index("exercise_category");
      const exerciseNameAndCategoryIndex = store.index(
        "exercise_name_and_category"
      );

      preselectedExercises.forEach((exercise) => {
        console.log("looping exercises");
        console.log(exercise);
        const formattedExercise = {
          name: exercise.name,
          category: exercise.category,
        };

        const exerciseNameQuery = exerciseNameIndex.getAll(exercise.name);

        console.log("logging the query inside the loop:");
        console.log(exerciseNameQuery);

        exerciseNameQuery.onsuccess = function (event) {
          const result = (event.target as IDBRequest).result;
          console.log("logging the length of exercise: ");
          console.log(result.length);
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
          setExercisesCategories(categories);
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

  function handleCategoryClick(category: string) {
    const indexedDb = window.indexedDB;

    if (!indexedDb) {
      console.log("IndexedDB could not be found in this browser.");
    }

    const request = indexedDB.open("ExerciseDB", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };

    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction("preselected-exercises", "readonly");
      const store = transaction.objectStore("preselected-exercises");
      const exerciseCategoryIndex = store.index("exercise_category");

      const categoryRange = IDBKeyRange.only(category);

      const categoryQuery = exerciseCategoryIndex.openCursor(categoryRange);
      const selectedCategoryExercises: { category: string; name: string }[] = [];

      categoryQuery.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          selectedCategoryExercises.push(cursor.value);
          cursor.continue();
        } else {
          setSelectedCategoryExercises(selectedCategoryExercises);
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }


  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
      }}
    >
      <TextField
        id="standard-basic"
        label="Look for an exercise"
        variant="standard"
        sx={{
          width: "100%",
        }}
      />

      <Box>
        {exercisesCategories.map((category, index) => (
          <Typography
            key={index}
            sx={{
              width: "100%",
              fontSize: "larger",
              margin: "0.15rem",
              cursor: "pointer",
            }}
              onClick={() => handleCategoryClick(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
          </Typography>
        ))}
      </Box>

      <Box>
        {selectedCategoryExercises.map((exercise, index) => (
          <Typography key={index}>{exercise.name}</Typography>
        ))}
      </Box>
    </Container>
  );
}

export default ExercisesCategories;
















import React, { useEffect, useState } from "react";
import { openDB, deleteDB, wrap, unwrap } from "idb";
import importedPreselectedExercises from "../../utils/preselectedExercises";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, InputBase, makeStyles } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


function ExercisesCategories() {
  const [preselectedExercises, setPreselectedExercises] = useState<
    { category: string; name: string }[]
  >([]);
  const [exercisesCategories, setExercisesCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCategoryExercises, setSelectedCategoryExercises] = useState<
    { category: string; name: string }[]
  >([]);

  useEffect(() => {
    setPreselectedExercises(importedPreselectedExercises);
  }, []);

  useEffect(() => {
    if (preselectedExercises.length > 0) {
      populatePreselectedExercises();
    }
  }, [preselectedExercises]);

  function populatePreselectedExercises() {
    const indexedDb = window.indexedDB;

    if (!indexedDb) {
      console.log("IndexedDB could not be found in this browser.");
    }

    const request = indexedDB.open("ExerciseDB", 1);

    // Check if there are any errors while opening the DB
    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };

    request.onupgradeneeded = function () {
      const db = request.result; // Result of our open request
      console.log(db);
      const store = db.createObjectStore("preselected-exercises", {
        keyPath: "id",
        autoIncrement: true,
      });

      store.createIndex("exercise_name", "name", { unique: false });
      store.createIndex("exercise_category", "category", { unique: false });
      store.createIndex("exercise_name_and_category", ["name", "category"], {
        unique: false,
      });
    };

    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction("preselected-exercises", "readwrite");
      const store = transaction.objectStore("preselected-exercises");

      const exerciseNameIndex = store.index("exercise_name");
      const exerciseCategoryIndex = store.index("exercise_category");
      const exerciseNameAndCategoryIndex = store.index(
        "exercise_name_and_category"
      );

      preselectedExercises.forEach((exercise) => {
        console.log("looping exercises");
        console.log(exercise);
        const formattedExercise = {
          name: exercise.name,
          category: exercise.category,
        };

        const exerciseNameQuery = exerciseNameIndex.getAll(exercise.name);

        console.log("logging the query inside the loop:");
        console.log(exerciseNameQuery);

        exerciseNameQuery.onsuccess = function (event) {
          const result = (event.target as IDBRequest).result;
          console.log("logging the length of exercise: ");
          console.log(result.length);
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
          setExercisesCategories(categories);
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

  function handleCategoryClick(category: string) {
    const indexedDb = window.indexedDB;

    if (!indexedDb) {
      console.log("IndexedDB could not be found in this browser.");
    }

    const request = indexedDB.open("ExerciseDB", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };

    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction("preselected-exercises", "readonly");
      const store = transaction.objectStore("preselected-exercises");
      const exerciseCategoryIndex = store.index("exercise_category");

      const categoryRange = IDBKeyRange.only(category);

      const categoryQuery = exerciseCategoryIndex.openCursor(categoryRange);
      const selectedCategoryExercises: { category: string; name: string }[] = [];

      categoryQuery.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          selectedCategoryExercises.push(cursor.value);
          cursor.continue();
        } else {
          setSelectedCategoryExercises(selectedCategoryExercises);
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };

    setSelectedCategory(category);
  }

  return (
    <Container
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: "100%",
      height: "100%",
    }}
  >
    <TextField
      id="standard-basic"
      label="Look for an exercise"
      variant="standard"
      sx={{
        width: "100%",
      }}
    />

    <Box>
      {exercisesCategories.map((category, index) => (
        <Link to={`/exercises/${category}`} key={index}>
          <Typography
            sx={{
              width: "100%",
              fontSize: "larger",
              margin: "0.15rem",
            }}
          >
            {category}
          </Typography>
        </Link>
      ))}
    </Box>
  </Container>
  );
}

export default ExercisesCategories;


*/
