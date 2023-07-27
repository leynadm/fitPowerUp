import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Progress from "../Progress/Progress";
import Friends from "../Friends/Friends";
import Workout from "../Workout/Workout";
import Box from "@mui/material/Box";
import importedPreselectedExercises from "../../utils/preselectedExercises";
import Exercise from "../../utils/interfaces/Exercise";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import VerifyEmailDialog from "../../components/ui/VerifyEmailDialog";
import { AuthContext } from "../../context/Auth";
import RestTimer from "../../components/ui/RestTimer";
import { SocialDataProvider } from "../../context/SocialData";
import { LogDataProvider } from "../../context/LogData";
interface AppProps {
  sessionVerificationEmailCheck: boolean;
  setSessionVerificationEmailCheck: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function Home({
  sessionVerificationEmailCheck,
  setSessionVerificationEmailCheck,
}: AppProps) {
  const [preselectedExercises, setPreselectedExercises] = useState<
    { category: string; name: string; measurement: any[]; favorite?: boolean }[]
  >([]);
  const [existingExercises, setExistingExercises] = useState<
    { name: string; exercises: Exercise[] }[]
  >([]);
  const [selectedCategoryExercises, setSelectedCategoryExercises] = useState<
    { category: string; name: string; measurement: any[] }[]
  >([]);
  const [exercisesCategories, setExercisesCategories] = useState<string[]>([]);

  const [unitsSystem, setUnitsSystem] = useState("");
  const [initialCategoriesLoaded, setInitialCategoriesLoaded] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setPreselectedExercises(importedPreselectedExercises);
    if (
      !currentUser.emailVerified &&
      !currentUser.isAnonymous &&
      sessionVerificationEmailCheck
    ) {
      setVerifyEmailModalOpen(true);
      setSessionVerificationEmailCheck(false);
    }
  }, []);

  useEffect(() => {
    if (preselectedExercises.length > 0) {
      populatePreselectedExercises();
    }
  }, [preselectedExercises]);

  useEffect(() => {
    if (preselectedExercises.length > 0 && !initialCategoriesLoaded) {
      populatePreselectedExercises();
    }
  }, [preselectedExercises, initialCategoriesLoaded]);

  function initializeCategories(categories: any) {
    setExercisesCategories(categories);
    setInitialCategoriesLoaded(true);
  }

  const [verifyEmailModalOpen, setVerifyEmailModalOpen] = useState(false);

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
          favorite: exercise.favorite,
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

          setExercisesCategories(categories);
          initializeCategories(categories);
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

  let theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#808080",
      },
      /* 
      success: {
        main: "#3f51b5",
      },

*/
      success: {
        main: "#FF8C00",
      },
    },
    typography: {
      button: {
        // Here is where you can customise the button
        fontWeight: "bold",
      },
    },
    shape: {},
  });

  return (
    <ThemeProvider theme={theme}>
      <SocialDataProvider>
        <LogDataProvider>
          <Box
            sx={{
              height: "calc(100vh - 56px)",
              backgroundColor: "#F0F2F5",
            }}
          >
            <VerifyEmailDialog
              verifyEmailModalOpen={verifyEmailModalOpen}
              setVerifyEmailModalOpen={setVerifyEmailModalOpen}
            />

            <RestTimer />

            <Navbar />
            <Routes>
              <Route
                path="workout/*"
                index
                element={
                  <Workout
                    setExercisesCategories={setExercisesCategories}
                    exercisesCategories={exercisesCategories} // Passed as a prop
                    setUnitsSystem={setUnitsSystem}
                    existingExercises={existingExercises}
                    selectedCategoryExercises={selectedCategoryExercises}
                    setSelectedCategoryExercises={setSelectedCategoryExercises}
                    setExistingExercises={setExistingExercises}
                    unitsSystem={unitsSystem}
                  />
                }
              />

              <Route
                path="friends/*"
                element={
                  <Friends
                    existingExercises={existingExercises}
                    unitsSystem={unitsSystem}
                    setUnitsSystem={setUnitsSystem}
                  />
                }
              />
              <Route path="progress/*" element={<Progress />} />
            </Routes>
          </Box>
        </LogDataProvider>
      </SocialDataProvider>
    </ThemeProvider>
  );
}

export default Home;
