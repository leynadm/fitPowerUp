import { useContext, useMemo, useState, useEffect } from "react";
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
import { FixedSizeList } from "react-window";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
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
      (item: IUserSelectedExercises) => item.group
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
          //toast.error("Oops, there was an error fetching the image!");
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
      justifyContent: "center",
      alignItems: "center",
    };
    return (
      <Box
        boxShadow={2}
        borderRadius="4px"
        style={rowStyle}
        pt={2}
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
            alignItems="center"
          >
            <img
              src={imageURL}
              alt={userExercise.name}
              height="100%"
              width="100%"
              style={{
                maxHeight: "128px",
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
    <Container sx={{}} maxWidth="md">
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

      <ExerciseSearchingBar query={query} setQuery={setQuery} />

      <Box
        sx={{
          width: "100%",
          paddingBottom: "56px",
        }}
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
                  <Typography>{muscleGroup.toLocaleUpperCase()}</Typography>
                </IconButton>

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
          <Box>
            <FixedSizeList
              height={window.innerHeight - 170}
              itemCount={filteredExercises.length}
              itemSize={275}
              width="100%"
            >
              {Row}
            </FixedSizeList>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default MuscleGroupsSelectionMenu;
