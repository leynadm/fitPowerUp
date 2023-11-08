import { useContext, useMemo, useState } from "react";
import { TrainingDataContext } from "../../context/TrainingData";
import { IUserSelectedExercises } from "../../context/TrainingData";
import { AppBar, Divider, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExerciseSearchingBar from "../../components/ui/ExerciseSearchingBar";
import { useNavigate } from "react-router-dom";
import ExerciseSelectionTile from "../../components/ui/ExerciseSelectionTile";
import getExercisesMuscleGroups from "../../utils/firebaseDataFunctions/getExercisesMuscleGroups";

function MuscleGroupsSelectionMenu() {
  const [query, setQuery] = useState("");

  const { userSelectedExercises } = useContext(TrainingDataContext);

  const exercisesMuscleGroupsArr = getExercisesMuscleGroups(
    userSelectedExercises
  );

  const muscleGroupExercises: IUserSelectedExercises[] =
    getMuscleGroupExercises();

  const filteredExercises = useMemo(() => {
    return muscleGroupExercises.filter((exercise) => {
      return exercise.name
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
    });
  }, [query]);

  const navigate = useNavigate();

  if (userSelectedExercises === undefined) {
    return <>Querying Data...</>;
  }

  function getMuscleGroupExercises() {
    const exercisesArray: IUserSelectedExercises[] =
      userSelectedExercises[0].exercises;
    const filteredArray: IUserSelectedExercises[] = exercisesArray.filter(
      (item: IUserSelectedExercises) => item.category
    );
    filteredArray.sort((a, b) => a.name.localeCompare(b.name));

    return filteredArray;
  }

  const handleMuscleGroupClick = (muscleGroup: string) => {
    navigate("exercises", { state: { muscleGroup } });
  };

  function handleTileClick(exerciseName: string) {
    navigate(`exercises/selected/${exerciseName}`);
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
        }}
        maxWidth="md"
      >
        <AppBar
          elevation={0}
          position="fixed"
          style={{
            top: 0,
            background:
              "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
          }}
        >
          <Container maxWidth="md">
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
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Muscle Groups
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
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Muscle Groups
              </Typography>

              <Box sx={{ marginLeft: "auto" }} display="flex">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  //onClick={getOnlyFavorites}
                >
                  <BookmarkIcon
                    sx={{
                      color: true ? "orange" : "white",
                    }}
                  />
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  //              onClick={handleAddNewExerciseModal}
                >
                  <AddOutlinedIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Divider sx={{ width: "100%" }} />
        <ExerciseSearchingBar query={query} setQuery={setQuery} />
      </Container>

      <Container
        sx={{
          width: "100%",
          paddingBottom: "56px",
        }}
        maxWidth="md"
      >
        {query === "" &&
          exercisesMuscleGroupsArr.map((muscleGroup: string, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => handleMuscleGroupClick(muscleGroup)}
                  sx={{ paddingLeft: "1rem" }}
                >
                  <Typography>{muscleGroup}</Typography>
                </IconButton>

                {/* 
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
 */}
                <IconButton
                  size="large"
                  aria-label="muscle-group-button-submenu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  /* 
                  onClick={(event) =>
                    handleOptionsClick(
                      event,
                      exercise.name,
                      exercise.category,
                      exercise.id
                    )
                  } */
                >
                  <MoreVertIcon sx={{ zIndex: 0 }} />
                </IconButton>
              </Box>
              <Divider sx={{ width: "100%" }} />
            </Box>
          ))}

        {query !== "" && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(10rem,1fr))",
              gridTemplateRows: "minmax(10rem, 1fr)",
              gap: 1,
              placeItems: "center",
              paddingBottom: "64px",
            }}
          >
            {filteredExercises.map(
              (exercise: IUserSelectedExercises, index: number) => (
                <ExerciseSelectionTile
                  key={index}
                  exerciseName={exercise.name}
                  exerciseIcon={exercise.iconURL}
                  handleTileClick={() => handleTileClick(exercise.name)} // Pass as a callback
                />
              )
            )}
          </Box>
        )}
      </Container>
    </>
  );
}

export default MuscleGroupsSelectionMenu;
