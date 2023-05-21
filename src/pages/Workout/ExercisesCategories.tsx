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
  exercisesCategories: string[];

  setSelectedCategoryExercises: Dispatch<
    SetStateAction<{ category: string; name: string; measurement: any[] }[]>
  >;
}

function ExercisesCategories({
  todayDate,
  setTodayDate,
  selectedCategoryExercises,
  setSelectedCategoryExercises,
  exercisesCategories,
}: NewWorkoutProps) {
  /*  
  const [preselectedExercises, setPreselectedExercises] = useState<
    { category: string; name: string; measurement: any[] }[]
  >([]);
*/

  const indexedDb = useContext(IndexedDBContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("logging the passed date:");
    console.log(todayDate);
    /* 
    setPreselectedExercises(importedPreselectedExercises);
   */
  }, []);

  /* 
  useEffect(() => {
    
    if (preselectedExercises.length > 0) {
      populatePreselectedExercises();
    }
  
  }, [preselectedExercises]);
 */

  /* 
  function handleCategoryClick(category:string){
    console.log('test')
  } */

  function handleCategoryClick(category: string) {
    const indexedDb = window.indexedDB;

    if (!indexedDb) {
      console.log("IndexedDB could not be found in this browser.");
    }

    const request = indexedDB.open("fitScouterDb", 1);

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
