import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef
} from "react";
import Box from "@mui/material/Box";
import ExercisesCategories from "./ExercisesCategories";
import { Routes, Route } from "react-router-dom";
import NewWorkout from "../../components/ui/NewWorkout";
import ExercisesByCategory from "./ExercisesByCategory";
import ExerciseSelected from "./ExerciseSelected";
import Settings from "../Settings/Settings";
import Exercise from "../../utils/interfaces/Exercise";
import WorkoutCalendar from "./WorkoutCalendar";
import getExercisesByDate from "../../utils/CRUDFunctions/getExercisesByDate";
import BodyTracker from "../BodyTracker/BodyTracker";
import Analysis from "../Analysis/Analysis";
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
  unitsSystem: string;
  setUnitsSystem: Dispatch<SetStateAction<string>>;
}

function Workout({
  existingExercises,
  selectedCategoryExercises,
  exercisesCategories,
  setExercisesCategories,
  setSelectedCategoryExercises,
  setExistingExercises,
  unitsSystem,
  setUnitsSystem,
}: HomeProps) {
  const [todayDate, setTodayDate] = useState<Date>();

  const [selectedExercise, setSelectedExercise] = useState<{
    category: string;
    name: string;
    measurement: any[];
  }>({ category: "", name: "", measurement: [] });

  const [weightIncrementPreference, setWeightIncrementPreference] =
    useState(2.5);
  const [swipe,setSwipe] = useState<any>({moved:false,touchEnd:0,touchStart:0})

  const { moved,touchEnd,touchStart} = swipe

  useEffect(() => {
    if (!todayDate) {
      const currentDate = new Date();
      console.log("logging current date:");
      console.log(currentDate);
      setTodayDate(currentDate);
    }
    getDataPreferences();
  }, []);

  useEffect(() => {
    if (todayDate) {
      getExercisesByDate(todayDate, setExistingExercises);
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

  const handleEffectLogic = useCallback(() => {
    if (todayDate) {
      getExercisesByDate(todayDate, setExistingExercises);
      getDataPreferences();
    }
  }, [todayDate, setExistingExercises]);

  const getDataPreferences = useCallback(() => {
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
        if (record) {
          // Extract the unitsSystem value from the record
          const { unitsSystem, defaultWeightIncrement } = record;
          setUnitsSystem(unitsSystem);
          setWeightIncrementPreference(defaultWeightIncrement);
        }
      };
    };
  }, [setUnitsSystem, setWeightIncrementPreference]);

  /* 
  const SENSITIVITY = 150

  const handleTouchStart = (e:React.TouchEvent<HTMLDivElement>) {
    let touchStartY = e.targetTouches[0].clientY
    setSwipe((swipe:any)=>({...swipe,touchStartY}))
  };

  function handleTouchMove(e:React.TouchEvent<HTMLDivElement>){
    let touchEndY = e.targetTouches[0].clientY
    setSwipe((swipe:any)=>({...swipe,touchEnd:touchEndY,moved:true}))
  }

  function handleTouchEnd(){

    let amountSwipe = touchStart-touchEnd

    if(amountSwipe>SENSITIVITY && moved){
       
    }
  }

  const handleTouchEnd = (event:any) => {
    console.log('inside handleTouchEnd')
    touchEndX.current = event.changedTouches[0].screenX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const swipeDistance = touchEndX.current - touchStartX.current;

    if (swipeDistance > 0) {
      // Swiped right
      console.log('swiped right')
      subtractDays()
    } else if (swipeDistance < 0) {
      // Swiped left
      console.log('swiped left')
      addDays()

    }
  };

 */ 
  const subtractDays = () => {
    if (todayDate) {
      const newDate = new Date(todayDate);
      newDate.setDate(todayDate.getDate() - 1);
      setTodayDate(newDate);
    }
  };

  const addDays = () => {
    if (todayDate) {
      const newDate = new Date(todayDate);
      newDate.setDate(todayDate.getDate() + 1);
      setTodayDate(newDate);
    }
  };

  return (
    <Box sx={{ paddingBottom: "56px", backgroundColor: "#F0F2F5" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
/* 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
    */
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
                addDays={addDays}
                subtractDays={subtractDays}
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
                setSelectedExercise={setSelectedExercise}
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
                setSelectedCategoryExercises={setSelectedCategoryExercises}
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
            element={
              <Settings
                unitsSystem={unitsSystem}
                setUnitsSystem={setUnitsSystem}
                weightIncrementPreference={weightIncrementPreference}
                setWeightIncrementPreference={setWeightIncrementPreference}
              />
            }
          />

          <Route
            path="/calendar"
            element={
              <WorkoutCalendar
                todayDate={todayDate}
                setTodayDate={setTodayDate}
                unitsSystem={unitsSystem}
              />
            }
          />

          <Route path="/analysis/*" element={<Analysis />} />

          <Route
            path="/bodytracker/*"
            element={<BodyTracker todayDate={todayDate} />}
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default Workout;
