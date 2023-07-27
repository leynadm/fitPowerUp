import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { AppBar, Divider, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
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
import ExerciseSearchBar from "../../components/ui/ExerciseSearchBar";
import getAllExercises from "../../utils/CRUDFunctions/getAllExercises";
import toast from "react-hot-toast";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import getFavoriteExercises from "../../utils/CRUDFunctions/getFavoriteExercises";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from "@mui/material/ListItemIcon";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import deleteExerciseEntries from "../../utils/CRUDFunctions/deleteExerciseEntries";
import EditExercisePropertiesModal from "../../components/ui/EditExercisePropertiesModal";
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
  setSelectedExercise: Dispatch<
    SetStateAction<{ name: string; category: string; measurement: any[] }>
  >;
}

function ExercisesCategories({
  todayDate,
  setTodayDate,
  selectedCategoryExercises,
  setSelectedCategoryExercises,
  exercisesCategories,
  setExercisesCategories,
  setSelectedExercise,
}: NewWorkoutProps) {
  const navigate = useNavigate();
  const [openAddNewExerciseModal, setOpenAddNewExerciseModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorExercise, setAnchorExercise] =
    React.useState<null | HTMLElement>(null);
  const [openEditExercisePropertiesModal, setOpenEditExercisePropertiesModal] =
    useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState("");
  const [exerciseToDelete, setExerciseToDelete] = useState("");
  const [categoryToRefresh, setCategoryToRefresh] = useState("");
  const [selectedExerciseId, setSelectedExerciseId] = useState<any>(null);
  const [exercisesToSearch, setExercisesToSearch] = useState<
    {
      category: string;
      name: string;
      measurement: any[];
      id: number;
      favorite: boolean;
    }[]
  >([]);
  const [favoriteExercises, setFavoriteExercises] = useState<
  {
      category: string;
      name: string;
      measurement: any[];
      id: number;
      favorite: boolean;
    }[]
  >([]);
  const [showFavoriteOnly, setShowFavoriteOnly] = useState(false);
  const [exerciseChange, setExerciseChange] = useState(0)  
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllExercises(setExercisesToSearch);
  }, []);

  useEffect(() => {}, [exercisesCategories, exercisesToSearch]);

  useEffect(() => {
    if (query === "" || exercisesToSearch.length === 0) {
      getAllExercises((exercises: any) => {
        setExercisesToSearch(exercises);
      });
    } else {
      const filteredExercises = exercisesToSearch.filter((exercise) =>
        exercise.name.toLowerCase().includes(query.toLowerCase())
      );
      setExercisesToSearch(filteredExercises);
    }
  }, [query]);

  const open = Boolean(anchorEl);
  const openExercise = Boolean(anchorExercise);

  function resetLoadScreen(){
    setQuery("")
    setShowFavoriteOnly(false)

  }

  function handleOptionsClick(
    event: React.MouseEvent<HTMLButtonElement>,
    exerciseName: string,
    exerciseCategory: string,
    exerciseId: any
  ) {
    setAnchorExercise(event.currentTarget);
    setExerciseToDelete(exerciseName);
    setCategoryToRefresh(exerciseCategory);
    setSelectedExerciseId(exerciseId);
  }

  function deleteExerciseClick() {
    deleteExerciseEntries(exerciseToDelete);
    setAnchorExercise(null);
    resetLoadScreen()
    toast.success("Exercise deleted successfully!")
  }

  function handleOptionsCategoryClick(
    event: React.MouseEvent<HTMLButtonElement>,
    category: string
  ) {
    setAnchorEl(event.currentTarget);
    setCategoryToDelete(category);
  }
  const handleClose = () => {
    populatePreselectedExercises(setExercisesCategories);
    setAnchorEl(null);
    setAnchorExercise(null)
    setExerciseChange(prev=>prev+1)
  };

  function handleAddNewExerciseModal() {
    setOpenAddNewExerciseModal(!openAddNewExerciseModal);
  }

  function getOnlyFavorites() {
    setShowFavoriteOnly(!showFavoriteOnly);
    getFavoriteExercises(setFavoriteExercises);
  }

  function handleCategoryClick(category: string) {
    const request = indexedDB.open("fitScouterDb");

    request.onerror = function (event) {
      toast.error("Oops, handleCategoryClick has an error!");
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
        }
      };

      categoryQuery.onerror = function (event) {
        console.error("An error occurred while iterating through the cursor.");
        toast.error("Oops, handleCategoryClick cursor has an error!");
      };

      transaction.oncomplete = function () {
        db.close();
      };

      navigate("exercises");
    };
  }

  function addExerciseToFavorites() {
    // If selectedExerciseId is not available or empty, no need to fetch the record
    if (!selectedExerciseId) {
      return;
    }

    const request = indexedDB.open("fitScouterDb");

    request.onerror = (event) => {
      toast.error("Oops, addExerciseToFavorites has an error!")
      console.log("Error opening IndexedDB:", request.error);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;

      // Start a new transaction
      const transaction = db.transaction("preselected-exercises", "readwrite");

      // Retrieve the object store
      const store = transaction.objectStore("preselected-exercises");

      // Get the exercise with the selectedExerciseId
      const getRequest = store.get(selectedExerciseId);

      getRequest.onsuccess = (event: any) => {
        const exercise = event.target.result;

        if (!exercise) {
          
          return;
        }

        const updatedExercise = {
          ...exercise,
          favorite: !exercise.favorite,
        };

        // If the exercise record is found, update the state with the values
        const putRequest = store.put(updatedExercise);

        putRequest.onsuccess = () => {

        };

        putRequest.onerror = () => {
          toast.error("Oops, putRequest in addExerciseToFavorites has an error!")
          console.log("Error updating exercise:", putRequest.error);
        };
      };

      getRequest.onerror = () => {
        toast.error("Oops, getRequest in addExerciseToFavorites has an error!")
        console.log("Error fetching exercise:", getRequest.error);
      };

      // Close the transaction and the database connection
      transaction.oncomplete = () => {
        db.close();
        handleClose()
        resetLoadScreen()
        toast.success("Exercise updated!")
      };
    };
  }

  function deleteCategoryClick() {
    deleteEntriesByCategory(categoryToDelete);
    populatePreselectedExercises(setExercisesCategories);
    setAnchorEl(null);
  }

  const handleEditExerciseClick = () => {
    setOpenEditExercisePropertiesModal(true);
    setAnchorExercise(null);
    
  };

  const handleExerciseClick = (exercise: {
    category: string;
    name: string;
    measurement: any[];
  }) => {
    setSelectedExercise(exercise);
    navigate(`exercises/selected`);
  };

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
      {selectedExerciseId && (
        <EditExercisePropertiesModal
          setExercisesCategories={setExercisesCategories}
          exercisesCategories={exercisesCategories}
          openEditExercisePropertiesModal={openEditExercisePropertiesModal}
          setOpenEditExercisePropertiesModal={
            setOpenEditExercisePropertiesModal
          }
          setSelectedCategoryExercises={setSelectedCategoryExercises}
          selectedCategoryExercises={selectedCategoryExercises}
          selectedExerciseId={selectedExerciseId}
        />
      )}

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
                  onClick={getOnlyFavorites}
                >
                  <BookmarkIcon
                    sx={{
                      color: showFavoriteOnly ? "orange" : "white",
                    }}
                  />
                </IconButton>

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
      <AddNewExerciseModal
        exercisesCategories={exercisesCategories}
        openAddNewExerciseModal={openAddNewExerciseModal}
        setOpenAddNewExerciseModal={setOpenAddNewExerciseModal}
        setExercisesCategories={setExercisesCategories}
        selectedCategoryExercises={selectedCategoryExercises}
        setSelectedCategoryExercises={setSelectedCategoryExercises}
      />
      <ExerciseSearchBar query={query} setQuery={setQuery} />

      <Divider sx={{ width: "100%" }} />

      {query === "" && favoriteExercises.length > 0 && showFavoriteOnly && (
        <Box sx={{ width: "100%" }}>
          {favoriteExercises.map((exercise, index) => (
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
                  onClick={() => handleExerciseClick(exercise)}
                >
                  {exercise.name}
                </Typography>
                {exercise.favorite && (
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <BookmarkIcon sx={{ zIndex: 0 }} />
                  </IconButton>
                )}

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={(event) =>
                    handleOptionsClick(
                      event,
                      exercise.name,
                      exercise.category,
                      exercise.id
                    )
                  }
                >
                  <MoreVertIcon sx={{ zIndex: 0 }} />
                </IconButton>
              </Box>
              <Divider sx={{ width: "100%" }} />
            </Box>
          ))}
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          paddingBottom: "56px",
        }}
      >
        {query !== "" &&
          exercisesToSearch.map((exercise, index) => (
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
                  onClick={() => handleExerciseClick(exercise)}
                >
                  {exercise.name}
                </Typography>

                {exercise.favorite && (
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <BookmarkIcon sx={{ zIndex: 0 }} />
                  </IconButton>
                )}

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={(event) =>
                    handleOptionsClick(
                      event,
                      exercise.name,
                      exercise.category,
                      exercise.id
                    )
                  }
                >
                  <MoreVertIcon sx={{ zIndex: 0 }} />
                </IconButton>
              </Box>
              <Divider sx={{ width: "100%" }} />
            </Box>
          ))}

        {!showFavoriteOnly &&
          query === "" &&
          exercisesCategories
            .slice()
            .sort((a, b) => a.localeCompare(b))
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
                    onClick={(event) =>
                      handleOptionsCategoryClick(event, category)
                    }
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
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{ boxShadow: "none", border: "none", fontSize: "small" }}
      >
        <MenuItem
          onClick={deleteCategoryClick}
          sx={{ margin: 0, fontSize: "small" }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete Category
        </MenuItem>
      </Menu>

      <Menu
        id="basic-menu"
        anchorEl={anchorExercise}
        open={openExercise}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{ boxShadow: "none", border: "none", fontSize: "small" }}
      >
        <MenuItem
          onClick={deleteExerciseClick}
          sx={{ margin: 0, fontSize: "small" }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete Exercise
        </MenuItem>
        <MenuItem
          onClick={handleEditExerciseClick}
          sx={{ margin: 0, fontSize: "small" }}
        >
          <ListItemIcon>
            <ChangeCircleIcon fontSize="small" />
          </ListItemIcon>
          Edit Exercise
        </MenuItem>
        <MenuItem
          sx={{ margin: 0, fontSize: "small" }}
          onClick={addExerciseToFavorites}
        >
          <ListItemIcon>
            <BookmarkAddIcon fontSize="small" />
          </ListItemIcon>
          Select Favorite
        </MenuItem>
      </Menu>
    </Container>
  );
}

export default ExercisesCategories;
