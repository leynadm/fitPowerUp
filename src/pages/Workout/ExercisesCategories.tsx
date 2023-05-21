import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import importedPreselectedExercises from "../../utils/preselectedExercises";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { IndexedDBContext } from "../../context/IndexedDB";
interface NewWorkoutProps {
  todayDate: Date | undefined;
  setTodayDate: Dispatch<SetStateAction<Date | undefined>>;

  selectedCategoryExercises: {
    category: string;
    name: string;
    measurement: any[];
  }[];

  setSelectedCategoryExercises: Dispatch<
    SetStateAction<{ category: string; name: string; measurement: any[] }[]>
  >;
}

function ExercisesCategories({
  todayDate,
  setTodayDate,
  selectedCategoryExercises,
  setSelectedCategoryExercises,
}: NewWorkoutProps) {
  const [preselectedExercises, setPreselectedExercises] = useState<
    { category: string; name: string; measurement: any[] }[]
  >([]);

  const [exercisesCategories, setExercisesCategories] = useState<string[]>([]);
  const indexedDb = useContext(IndexedDBContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("logging the passed date:");
    console.log(todayDate);
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
      
      // create first table
      const store = db.createObjectStore("preselected-exercises", {
        keyPath: "id",
        autoIncrement: true,
      });

      store.createIndex("exercise_name", "name", { unique: false });
      store.createIndex("exercise_category", "category", { unique: false });
      store.createIndex("exercise_name_and_category", ["name", "category"], {
        unique: false,
      });

      // create second table
      const user_entries = db.createObjectStore("user-exercises-entries", {
        keyPath: "id",
        autoIncrement: true,
      });

      user_entries.createIndex("exercise_date", "date", { unique: false });
      user_entries.createIndex("exercise_name", "exercise", { unique: false });
      user_entries.createIndex("exercise_category", "category", { unique: false });
      user_entries.createIndex("exercise_weight", "weight", { unique: false });
      user_entries.createIndex("exercise_reps", "reps", { unique: false });
      user_entries.createIndex("exercise_distance", "distance", { unique: false });
      user_entries.createIndex("exercise_distance_unit", "distance_unit", { unique: false });
      user_entries.createIndex("exercise_time", "time", { unique: false });
      user_entries.createIndex("exercise_name_and_date", ["exercise", "date"], {
        unique: false,
      });
    };

    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction("preselected-exercises", "readwrite");
      const store = transaction.objectStore("preselected-exercises");

      const exerciseNameIndex = store.index("exercise_name");
      const exerciseCategoryIndex = store.index("exercise_category");

      preselectedExercises.forEach((exercise) => {
        const formattedExercise = {
          name: exercise.name,
          category: exercise.category,
          measurement:exercise.measurement
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
      const selectedCategoryExercises: {
        category: string;
        name: string;
        measurement: any[];
      }[] = [];

      categoryQuery.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          selectedCategoryExercises.push(cursor.value);
          cursor.continue();
        } else {
          setSelectedCategoryExercises(selectedCategoryExercises);
          console.log(
            "Selected Category Exercises:",
            selectedCategoryExercises
          );
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };

      navigate("exercises");
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
      <AppBar position="fixed" style={{ top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Work
            </Typography>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => console.log("yes")}
                >
                  <AddOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

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
      {/* 
      <Routes>
        <Route path="exercises" element={<ExercisesByCategory />} />
      </Routes>
 */}
    </Container>
  );
}

export default ExercisesCategories;
