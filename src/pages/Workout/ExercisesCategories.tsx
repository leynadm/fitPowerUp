import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { AppBar, Divider, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AdbIcon from "@mui/icons-material/Adb";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import AddNewExerciseModal from "../../components/ui/AddNewExerciseModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import deleteEntriesByCategory from "../../utils/CRUDFunctions/deleteEntriesByCategory";
import populatePreselectedExercises from "../../utils/CRUDFunctions/populatePreselectedExercises";

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
  setExercisesCategories: Dispatch<SetStateAction<string[]>>;
}

function ExercisesCategories({
  todayDate,
  setTodayDate,
  selectedCategoryExercises,
  setSelectedCategoryExercises,
  exercisesCategories,
  setExercisesCategories,
}: NewWorkoutProps) {
  const navigate = useNavigate();
  const [openAddNewExerciseModal, setOpenAddNewExerciseModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [categoryToDelete, setCategoryToDelete] = useState('')
  
  
  useEffect(()=>{

  },[exercisesCategories])

  const open = Boolean(anchorEl);

  function handleOptionsClick (event: React.MouseEvent<HTMLButtonElement>, category:string) {
    setAnchorEl(event.currentTarget);
    console.log('logging category inside handleOptionClick:')
    console.log(category)
    setCategoryToDelete(category)
  };
  const handleClose = () => {
    deleteEntriesByCategory(categoryToDelete)
    populatePreselectedExercises(setExercisesCategories)
    setAnchorEl(null);
  };

  function handleAddNewExerciseModal() {
    setOpenAddNewExerciseModal(!openAddNewExerciseModal);
  }

  function handleCategoryClick(category: string) {
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
      <AddNewExerciseModal
        exercisesCategories={exercisesCategories}
        openAddNewExerciseModal={openAddNewExerciseModal}
        setOpenAddNewExerciseModal={setOpenAddNewExerciseModal}
        setExercisesCategories={setExercisesCategories}
        selectedCategoryExercises={selectedCategoryExercises}
        setSelectedCategoryExercises={setSelectedCategoryExercises}
      />

      <AppBar elevation={0} position="fixed" style={{ top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <FitnessCenterIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
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

            <FitnessCenterIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

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
              Log
            </Typography>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleAddNewExerciseModal}
                >
                  <AddOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* 
      <TextField
        id="standard-basic"
        label="Look for an exercise"
        variant="standard"
        sx={{
          width: "100%",
        }}
      />
 */}
      <Box
        sx={{
          width: "100%",
        }}
      >
        {exercisesCategories
          .slice() // Create a copy of the array to avoid mutating the original array
          .sort((a, b) => a.localeCompare(b)) // Sort the categories alphabetically
          .map((category, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={(event) => handleOptionsClick(event, category)}
                >
                  <MoreVertIcon sx={{ zIndex: 0 }} />
                </IconButton>
              </Box>

              <Divider sx={{ width: "100%" }} />
            </Box>
          ))}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ boxShadow: "none", border: "none" }}
      >
        <MenuItem onClick={handleClose}>Delete Category</MenuItem>
      </Menu>
    </Container>
  );
}

export default ExercisesCategories;
