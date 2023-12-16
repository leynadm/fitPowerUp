import { useLocation } from "react-router-dom";
import { TrainingDataContext } from "../../context/TrainingData";
import { useContext } from "react";
import { IUserSelectedExercises } from "../../context/TrainingData";
import Container from "@mui/material/Container";
import { useState, useMemo, useEffect } from "react";
import { AppBar, Toolbar } from "@mui/material";
import ExerciseSearchingBar from "../../components/ui/ExerciseSearchingBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "react-router-dom";
import { FixedSizeList } from "react-window";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
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
      (item: IUserSelectedExercises) => item.group === muscleGroup
    );
    filteredArray.sort((a, b) => a.name.localeCompare(b.name));

    return filteredArray;
  }

  function handleTileClick(exerciseName: string) {
    navigate(`selected/${exerciseName}`);
  }

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const [imageURL, setImageURL] = useState("");
    const userExercise = filteredExercises[index];
    const [isLoading, setIsLoading] = useState(true); // New state for loading status

    useEffect(() => {
      const fetchImageURL = async () => {
        const exerciseImageRef = ref(
          storage,
          `assets/exercises-assets/${userExercise.id}.jpg`
        );
        try {
          const url = await getDownloadURL(exerciseImageRef);
          setImageURL(url);
        } catch (error) {
          toast.error("Oops, there was an error fetching the image!");
          console.error("Error fetching image:", error);
        } finally {
          setIsLoading(false); // Stop loading whether there was an error or not
        }
      };

      fetchImageURL();
    }, [index, userExercise]); // Dependency array includes index and userExercise

    const rowStyle = {
      ...style,
      display: "grid",
      gridTemplateRows: "1fr 8fr 1fr",
      width: "100%",
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingTop: "16px",
      justifyContent: "center",
      alignItems: "center",
    };

    return (
      <Box
        boxShadow={2}
        borderRadius="4px"
        style={rowStyle}
        onClick={() => handleTileClick(userExercise.name)}
      >
        <Typography align="center">
          {userExercise.name.toLocaleUpperCase()}
        </Typography>

        {isLoading ? (
          <Box
            justifyContent="center"
            display="flex"
            alignItems="center"
            height="100%"
            width="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            height="100%"
            width="100%"
            justifyContent="center"
            display="flex"
          >
            <img
              src={imageURL}
              alt={userExercise.name}
              height="100%"
              width="100%"
              style={{
                maxHeight: "200px",
                width: "auto",
              }}
            />
          </Box>
        )}

        <Box display="flex" justifyContent="center" gap={1}>
          <Typography variant="caption">
            {userExercise.type.toLocaleUpperCase()}
          </Typography>
        </Box>
      </Box>
    );
  };

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
                {muscleGroup.toLocaleUpperCase()}
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
                {muscleGroup.toLocaleUpperCase()}
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

        <Box paddingLeft="8px" paddingRight="8px">
          <FixedSizeList
            height={window.innerHeight - 165}
            itemCount={filteredExercises.length}
            itemSize={300}
            width="100%"
          >
            {Row}
          </FixedSizeList>
        </Box>
      </Container>
    </>
  );
}

export default ExerciseSelectionMenu;
