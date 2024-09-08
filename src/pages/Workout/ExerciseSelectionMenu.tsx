import { useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import Container from "@mui/material/Container";
import { useState, Fragment,useMemo, useEffect } from "react";
import { AppBar, Toolbar } from "@mui/material";
import ExerciseSearchingBar from "../../components/ui/ExerciseSearchingBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import capitalizeWords from "../../utils/capitalizeWords";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { FixedSizeList } from "react-window";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { IUserExercisesLibrary } from "../../utils/interfaces/IUserExercisesLibrary";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
import { AuthContext } from "../../context/Auth";
import { useSearchParams } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
function ExerciseSelectionMenu() {
  const { currentUserData } = useContext(AuthContext);
  const { selectedMuscleGroup } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  /* const muscleGroup: string = useLocation().state.muscleGroup;
   */
  
  const location = useLocation();
  const muscleGroup = location.state?.muscleGroup;

  console.log(muscleGroup)
  const { userExercisesLibrary, refetchUserExercisesLibrary } = useContext(
    UserExercisesLibraryContext
  );
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const navigate = useNavigate();
  const isMale = currentUserData.sex === "male" ? true : false;
  const [muscleGroupExercises, setMuscleGroupExercises] = useState<
    IUserExercisesLibrary[]
  >(() => {
    if (userExercisesLibrary.length > 0) {
      return getMuscleGroupExercises();
    } else {
      return [];
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      if (userExercisesLibrary.length === 0 || !muscleGroup) {
        await refetchUserExercisesLibrary();
      }
      updateMuscleGroupExercises();
    };

    const tempMuscleGroupExercises = getMuscleGroupExercises();
    setMuscleGroupExercises(tempMuscleGroupExercises);

    fetchData().catch(console.error); // Handle errors
  }, []);

  function updateMuscleGroupExercises() {
    // Ensure that userExercisesLibrary is not empty and contains exercises
    if (userExercisesLibrary.length > 0 && userExercisesLibrary[0].exercises) {
      const tempMuscleGroupExercises = getMuscleGroupExercises();
      setMuscleGroupExercises(tempMuscleGroupExercises);
    }
  }

  function getMuscleGroupExercises() {
    if (userExercisesLibrary.length > 0) {
      const exercisesArray: IUserExercisesLibrary[] =
        userExercisesLibrary[0].exercises;

      if (muscleGroup) {
        const filteredArray: IUserExercisesLibrary[] = exercisesArray.filter(
          (item: IUserExercisesLibrary) => item.group === muscleGroup
        );
        filteredArray.sort((a, b) => a.name.localeCompare(b.name));

        return filteredArray;
      } else {
        const filteredArray: IUserExercisesLibrary[] = exercisesArray.filter(
          (item: IUserExercisesLibrary) =>
            item.group.toLocaleLowerCase() ===
            selectedMuscleGroup?.toLocaleLowerCase()
        );

        filteredArray.sort((a, b) => a.name.localeCompare(b.name));
        return filteredArray;
      }
    } else {
      return [];
    }
  }

  const filteredExercises = useMemo(() => {
    return muscleGroupExercises
      ? muscleGroupExercises.filter((exercise) => {
          return exercise.name.toLowerCase().includes(query.toLowerCase());
        })
      : [];
  }, [query, muscleGroupExercises]);

  if (userExercisesLibrary.length === 0) {
    return (
      <LoadingScreenCircle text="Hang tight! Goku is running on Snake Way..." />
    );
  }

  function handleTileClick(exerciseName: string) {
    navigate(`selected/${exerciseName}`);
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Update only the query parameter without affecting the path
    const newSearchParams = new URLSearchParams();
    if (newQuery) {
      newSearchParams.set("query", newQuery);
    }
    setSearchParams(newSearchParams);
  };

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
        let exerciseImageRef;

        if (!isMale && userExercise.multi) {
          exerciseImageRef = ref(
            storage,
            `assets/exercises-assets/${userExercise.id}(2).jpg`
          );
        } else {
          exerciseImageRef = ref(
            storage,
            `assets/exercises-assets/${userExercise.id}.jpg`
          );
        }

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
      ...style
    };

    return (
      <Card
        onClick={() => handleTileClick(userExercise.name)}
        variant="outlined"
        style={rowStyle}
      >
        <CardContent sx={{ display: "grid", gridTemplateRows: "2fr 5fr 1fr",height:"100%" }}>
          <Typography fontSize={18} textAlign="center" color="secondary">
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
              borderRadius={8}
            >
              <img
                src={imageURL}
                alt={userExercise.name}
                width="100%"
                style={{
                  maxHeight: "128px",
                  width: "auto",
                  borderRadius:8
                }}
              />
            </Box>
          )}
          <Typography textAlign="center" color="text.secondary">
          {userExercise.type.toLocaleUpperCase()}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Container maxWidth="md">
        <AppBar
          position="fixed"
          style={{
            top: 0,
            height: "56px"
          }}
        >
          <Container maxWidth="md">
            <Toolbar disableGutters>
              {/* 
              <FitnessCenterIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },

                  letterSpacing: ".1rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                {muscleGroup ? capitalizeWords(muscleGroup):selectedMuscleGroup&&capitalizeWords(selectedMuscleGroup)}
              </Typography>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,

                  letterSpacing: ".1rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                {muscleGroup ? capitalizeWords(muscleGroup):selectedMuscleGroup&&capitalizeWords(selectedMuscleGroup)}
              </Typography>

              <Box sx={{ flexGrow: 1, display: "flex" }}>
                <Box sx={{ marginLeft: "auto" }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  ></IconButton>
                   <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={()=>navigate("/home/workout/new/workout_categories/")}
                >
                  <ArrowBackIosNew />
                </IconButton>

                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <ExerciseSearchingBar query={query} onChange={onChange} />

        <Box>
          <FixedSizeList
            height={window.innerHeight - 170}
            itemCount={filteredExercises.length}
            itemSize={250}
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
