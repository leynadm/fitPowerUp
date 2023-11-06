import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { AppBar, Toolbar, Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddNewExerciseModal from "../../components/ui/AddNewExerciseModal";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import deleteExerciseEntries from "../../utils/IndexedDbCRUDFunctions/deleteExerciseEntries";
import handleCategoryClick from "../../utils/IndexedDbCRUDFunctions/handleCategoryClick";
import ExerciseSearchBar from "../../components/ui/ExerciseSearchBar";
import getExercisesByCategory from "../../utils/IndexedDbCRUDFunctions/getExercisesByCategory";
import EditExercisePropertiesModal from "../../components/ui/EditExercisePropertiesModal";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import toast from "react-hot-toast";
interface ExercisesCategoriesProps {
  todayDate: Date | undefined;
  selectedCategoryExercises: {
    category: string;
    name: string;
    measurement: any[];
    id?: any;
    favorite?: boolean;
  }[];
  
  setSelectedExercise: Dispatch<
    SetStateAction<{ name: string; category: string; measurement: any[] }>
  >;

  exercisesCategories: string[];
  setExercisesCategories: Dispatch<SetStateAction<string[]>>;
  setSelectedCategoryExercises: Dispatch<
    SetStateAction<{ category: string; name: string; measurement: any[] }[]>
  >;
}

function ExercisesByCategory({
  todayDate,
  selectedCategoryExercises,
  setSelectedExercise,
  exercisesCategories,
  setExercisesCategories,
  setSelectedCategoryExercises,
}: ExercisesCategoriesProps) {
  const navigate = useNavigate();

  const handleExerciseClick = (exercise: {
    category: string;
    name: string;
    measurement: any[];
    favorite?: boolean;
  }) => {
    setSelectedExercise(exercise);
    navigate(`selected`);
  };
 
  const handleEditExerciseClick = () => {
    setOpenEditExercisePropertiesModal(true);
    setAnchorEl(null);
  };

  useEffect(() => {}, [exercisesCategories]);

  const [openAddNewExerciseModal, setOpenAddNewExerciseModal] = useState(false);
  const [openEditExercisePropertiesModal, setOpenEditExercisePropertiesModal] =
    useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState("");
  const [categoryToRefresh, setCategoryToRefresh] = useState(""); 
  const [selectedExerciseId, setSelectedExerciseId] = useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [query, setQuery] = useState("");
  const [exercisesToSearch, setExercisesToSearch] = useState<
    { category: string; name: string; measurement: any[]; id: number }[]
  >([]);
  const [exerciseToEdit, setExerciseToEdit] = useState("");

  useEffect(() => {
    if (query === "" || exercisesToSearch.length === 0) {
      if (selectedCategoryExercises.length > 0) {
        getExercisesByCategory(
          selectedCategoryExercises[0].category,
          (exercises: any) => {
            setExercisesToSearch(exercises);
          }
        );
      }
    } else {
      const filteredExercises = exercisesToSearch.filter((exercise) =>
        exercise.name.toLowerCase().includes(query.toLowerCase())
      );
      setExercisesToSearch(filteredExercises);
    }
  }, [query]);

  const open = Boolean(anchorEl);
  function handleOptionsClick(
    event: React.MouseEvent<HTMLButtonElement>,
    exerciseName: string,
    exerciseCategory: string,
    exerciseId: any
  ) {
    setAnchorEl(event.currentTarget);
    setExerciseToDelete(exerciseName);
    setCategoryToRefresh(exerciseCategory);
    setSelectedExerciseId(exerciseId);
  }

  function deleteExerciseClick() {
    deleteExerciseEntries(exerciseToDelete);
    handleCategoryClick(categoryToRefresh, setSelectedCategoryExercises);
    setAnchorEl(null);
  }

  const handleClose = () => {
    handleCategoryClick(categoryToRefresh, setSelectedCategoryExercises);
    setAnchorEl(null);
  };

  function handleAddNewExerciseModal() {
    setOpenAddNewExerciseModal(!openAddNewExerciseModal);
  }

  function addExerciseToFavorites() {
    // If selectedExerciseId is not available or empty, no need to fetch the record
    if (!selectedExerciseId) {

      return;
    }

    const request = indexedDB.open("fitScouterDb");

    request.onerror = (event) => {
      toast.error("Oops, addExerciseToFavorites couldn't open the database!")
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
          toast.error("Oops, putRequest inside addExerciseToFavorites has an error!")
          console.log("Error updating exercise:", putRequest.error);
        };
      };

      getRequest.onerror = () => {
        toast.error("Oops, getRequest inside addExerciseToFavorites has an error!")
        console.log("Error fetching exercise:", getRequest.error);
      };

      // Close the transaction and the database connection
      transaction.oncomplete = () => {
        handleClose()
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
      <AddNewExerciseModal
        setExercisesCategories={setExercisesCategories}
        exercisesCategories={exercisesCategories}
        openAddNewExerciseModal={openAddNewExerciseModal}
        setOpenAddNewExerciseModal={setOpenAddNewExerciseModal}
        setSelectedCategoryExercises={setSelectedCategoryExercises}
        selectedCategoryExercises={selectedCategoryExercises}
      />

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

      <AppBar elevation={3} position="fixed" style={{ top: 0,
 background: "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)"     
      }}>
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
                  onClick={handleAddNewExerciseModal}
                >
                  <AddOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <ExerciseSearchBar query={query} setQuery={setQuery} />
      <Divider sx={{ width: "100%" }} />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          paddingBottom: "56px",
        }}
      >
        {query !== ""
          ? exercisesToSearch.map((exercise, index) => (
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
                    {exercise.name.charAt(0).toUpperCase() +
                      exercise.name.slice(1)}
                  </Typography>

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
            ))
          : selectedCategoryExercises
              .slice() // Create a copy of the array to avoid mutating the original array
              .sort((a, b) => a.name.localeCompare(b.name)) // Sort the exercises alphabetically
              .map((exercise, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
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
                      {exercise.name.charAt(0).toUpperCase() +
                        exercise.name.slice(1)}
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

export default ExercisesByCategory;
