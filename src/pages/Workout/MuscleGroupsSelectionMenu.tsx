import { useContext, useMemo, useState, useEffect } from "react";
import { AppBar, Divider, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ExerciseSearchingBar from "../../components/ui/ExerciseSearchingBar";
import { useNavigate } from "react-router-dom";
import getExercisesMuscleGroups from "../../utils/firebaseDataFunctions/getExercisesMuscleGroups";
import { FixedSizeList } from "react-window";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
import { IUserExercisesLibrary } from "../../utils/interfaces/IUserExercisesLibrary";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
import getMuscleGroupExercises from "../../utils/firebaseDataFunctions/getMuscleGroupExercises";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddNewExerciseModal from "../../components/ui/AddNewExerciseModal";
import { useSearchParams } from "react-router-dom";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { ArrowBackIosNew } from "@mui/icons-material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function MuscleGroupsSelectionMenu() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");

  const [openAddNewExerciseModal, setOpenAddNewExerciseModal] = useState(false);
  const { userExercisesLibrary, refetchUserExercisesLibrary } = useContext(
    UserExercisesLibraryContext
  );

  const [exercisesMuscleGroupsArr, setExercisesMuscleGroupsArr] = useState(
    () => {
      if (userExercisesLibrary.length > 0) {
        return getExercisesMuscleGroups(userExercisesLibrary);
      }

      return [];
    }
  );

  const [muscleGroupExercises, setMuscleGroupExercises] = useState(() => {
    if (userExercisesLibrary.length > 0) {
      const muscleGroupExercises: IUserExercisesLibrary[] =
        getMuscleGroupExercises(userExercisesLibrary);
      return muscleGroupExercises;
    }

    return [];
  });

  useEffect(() => {
    const fetchData = async () => {
      if (userExercisesLibrary.length === 0) {
        await refetchUserExercisesLibrary();
      }
    };

    if (userExercisesLibrary.length > 0) {
      setExercisesMuscleGroupsArr(
        getExercisesMuscleGroups(userExercisesLibrary)
      );
      setMuscleGroupExercises(
        getMuscleGroupExercises(userExercisesLibrary[0].exercises)
      );
    }

    fetchData().catch(console.error); // Handle errors
  }, [userExercisesLibrary]);

  const filteredExercises = useMemo(() => {
    return muscleGroupExercises.filter((exercise) => {
      return exercise.name
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
    });
  }, [query, muscleGroupExercises]);

  const navigate = useNavigate();

  if (userExercisesLibrary.length === 0) {
    return (
      <LoadingScreenCircle text="Hold on, Trunks is still explaining the time travel rules..." />
    );
  }

  const handleMuscleGroupClick = (muscleGroup: string) => {
    navigate(`exercises/${muscleGroup}`, { state: { muscleGroup } });
  };

  function handleTileClick(exerciseName: string, exerciseMuscleGroup: string) {
    navigate(`exercises/${exerciseMuscleGroup}/selected/${exerciseName}`, {
      state: { muscleGroup: exerciseMuscleGroup },
    });
  }

  function handleAddNewExerciseModal() {
    setOpenAddNewExerciseModal(!openAddNewExerciseModal);
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setSearchParams({ query: newQuery || "" });
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
      ...style
    };
    return (
      <Card
      variant="outlined"
      style={rowStyle}
        onClick={() => handleTileClick(userExercise.name, userExercise.group)}
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
                  <Typography textAlign="center" color="text.secondary">
          {userExercise.type.toLocaleUpperCase()}
          </Typography>

       </CardContent>
      </Card>
    );
  };

  return (
    <Container sx={{}} maxWidth="md">
      <AppBar
        position="fixed"
        style={{
          top: 0,
          height: "56px"
        }}
      >
        <AddNewExerciseModal
          openAddNewExerciseModal={openAddNewExerciseModal}
          setOpenAddNewExerciseModal={setOpenAddNewExerciseModal}
        />
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
              Muscle Groups
            </Typography>
            {/* 
            <FitnessCenterIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            /> */}

            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                letterSpacing: ".0rem",
                color:"#FFA500",
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
                onClick={()=>navigate('favorites')}
              >
                <BookmarkIcon
                  sx={{color:"orange"}}
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
                <AddBoxIcon />
              </IconButton>

              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={()=>navigate("/home/workout/new")}
                >
                  <ArrowBackIosNew />
                </IconButton>

            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <ExerciseSearchingBar query={query} onChange={onChange} />

      <Box
        sx={{
          width: "100%",

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
                  <Typography color="text.secondary" fontSize="1.15rem">{muscleGroup.toLocaleUpperCase()}</Typography>
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
              itemSize={250}
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
