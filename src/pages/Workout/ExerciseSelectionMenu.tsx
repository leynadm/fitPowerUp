import { useLocation } from "react-router-dom";
import { TrainingDataContext } from "../../context/TrainingData";
import { useContext } from "react";
import { IUserSelectedExercises } from "../../context/TrainingData";
import ExerciseSelectionTile from "../../components/ui/ExerciseSelectionTile";
import Container from "@mui/material/Container";
import { useState, useMemo } from "react";
import { AppBar, Toolbar } from "@mui/material";
import ExerciseSearchingBar from "../../components/ui/ExerciseSearchingBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "react-router-dom";
function ExerciseSelectionMenu() {
  const muscleGroup: string = useLocation().state.muscleGroup;
  const { userSelectedExercises } = useContext(TrainingDataContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const muscleGroupExercises: IUserSelectedExercises[] =
    getMuscleGroupExercises();

  const filteredExercises = useMemo(() => {
    return muscleGroupExercises.filter((exercise) => {
      return exercise.name
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
    });
  }, [query]);

  function getMuscleGroupExercises() {
    const exercisesArray: IUserSelectedExercises[] =
      userSelectedExercises[0].exercises;
    const filteredArray: IUserSelectedExercises[] = exercisesArray.filter(
      (item: IUserSelectedExercises) => item.category === muscleGroup
    );
    filteredArray.sort((a, b) => a.name.localeCompare(b.name));

    return filteredArray;
  }

  function handleTileClick(exerciseName: string) {
    navigate(`selected/${exerciseName}`);
  }

  return (
    <>
      <Container maxWidth="md">
        <AppBar
          elevation={2}
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

                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {muscleGroup}
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

                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {muscleGroup}
              </Typography>

              <Box sx={{ flexGrow: 1, display: "flex" }}>
                <Box sx={{ marginLeft: "auto" }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    //onClick={getOnlyFavorites}
                  >
                    {/* 
                  <BookmarkIcon
                    sx={{
                      color: showFavoriteOnly ? "orange" : "white",
                    }}
                  /> */}
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
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <ExerciseSearchingBar query={query} setQuery={setQuery} />

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
                handleTileClick={() => handleTileClick(exercise.name)}
              />
            )
          )}
        </Box>
      </Container>
    </>
  );
}

export default ExerciseSelectionMenu;
