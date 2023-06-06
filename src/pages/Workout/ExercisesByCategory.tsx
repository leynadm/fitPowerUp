import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { AppBar, Toolbar, Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddNewExerciseModal from "../../components/ui/AddNewExerciseModal";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import deleteExerciseEntries from "../../utils/CRUDFunctions/deleteExerciseEntries";
import updateExerciseCategories from "../../utils/CRUDFunctions/updateExerciseCategories";
import handleCategoryClick from "../../utils/CRUDFunctions/handleCategoryClick";
import ExerciseSearchBar from "../../components/ui/ExerciseSearchBar";
import getAllExercises from "../../utils/CRUDFunctions/getAllExercises";

interface ExercisesCategoriesProps {
  todayDate: Date | undefined;
  selectedCategoryExercises: {
    category: string;
    name: string;
    measurement: any[];
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
  }) => {
    setSelectedExercise(exercise);
    navigate(`selected`);
  };

  useEffect(() => {}, [exercisesCategories]);

  const [openAddNewExerciseModal, setOpenAddNewExerciseModal] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState("");
  const [categoryToRefresh, setCategoryToRefresh] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [query, setQuery] = useState("");
  const [exercisesToSearch, setExercisesToSearch] = useState<
    { category: string; name: string; measurement: any[]; id: number }[]
  >([]);

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
  function handleOptionsClick(
    event: React.MouseEvent<HTMLButtonElement>,
    exerciseName: string,
    exerciseCategory: string
  ) {
    setAnchorEl(event.currentTarget);

    setExerciseToDelete(exerciseName);
    setCategoryToRefresh(exerciseCategory);
  }

  const handleClose = () => {
    deleteExerciseEntries(exerciseToDelete);
    handleCategoryClick(categoryToRefresh, setSelectedCategoryExercises);
    setAnchorEl(null);
  };

  function handleAddNewExerciseModal() {
    setOpenAddNewExerciseModal(!openAddNewExerciseModal);
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

      <ExerciseSearchBar query={query} setQuery={setQuery} />
      <Divider sx={{ width: "100%" }} />
      <Box
        sx={{
          width: "100%",
          height: "100%",
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
                    {exercise.name}
                  </Typography>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <MoreVertIcon sx={{ zIndex: 0 }} />
                  </IconButton>
                </Box>
                <Divider sx={{ width: "100%" }} />
              </Box>
            ))
          : selectedCategoryExercises
              .slice() // Create a copy of the array to avoid mutating the original array
              .sort((a, b) => a.name.localeCompare(b.name)) // Sort the categories alphabetically
              .map((exercise, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
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
                          exercise.category
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
        style={{ boxShadow: "none", border: "none" }}
      >
        <MenuItem onClick={handleClose}>Delete Exercise</MenuItem>
      </Menu>
    </Container>
  );
}

export default ExercisesByCategory;
