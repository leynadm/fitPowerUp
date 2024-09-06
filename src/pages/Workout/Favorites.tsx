import React, { useContext, useState, useEffect, useMemo } from "react";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
import { FixedSizeList } from "react-window";
import getExercisesMuscleGroups from "../../utils/firebaseDataFunctions/getExercisesMuscleGroups";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { AuthContext } from "../../context/Auth";
import CircularProgress from "@mui/material/CircularProgress";
import { IUserExercisesLibrary } from "../../utils/interfaces/IUserExercisesLibrary";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function Favorites() {
  const { userExercisesLibrary } = useContext(UserExercisesLibraryContext);

  const { currentUserData } = useContext(AuthContext);

  const navigate = useNavigate();

  const isMale = currentUserData.sex === "male" ? true : false;

  const [muscleGroup, setMuscleGroup] = useState("");

  const [exercisesMuscleGroupsArr, setExercisesMuscleGroupsArr] = useState(
    () => {
      if (userExercisesLibrary.length > 0) {
        return getExercisesMuscleGroups(userExercisesLibrary);
      }

      return [];
    }
  );

  const filteredExercises = useMemo(() => {
    return (userExercisesLibrary[0].exercises.length > 0 &&
      userExercisesLibrary)
      ? userExercisesLibrary[0].exercises.filter(
          (exercise: IUserExercisesLibrary) => {
            return (
              exercise.group
                .toLowerCase()
                .includes(muscleGroup.toLocaleLowerCase()) && exercise.favorite
            );
          }
        )
      : [];
  }, [muscleGroup]);

  function handleTileClick(exerciseName: string, exerciseGroup: string) {
    navigate(
      `/home/workout/new/workout_categories/exercises/${exerciseGroup}/selected/${exerciseName}`
    );
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
        onClick={() => handleTileClick(userExercise.name, userExercise.group)}
        pt={2}
      >
        <Typography align="center" overflow="hidden">
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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setMuscleGroup(event.target.value.toLocaleLowerCase() as string);
  };

  return (
    <>
      <AppBar
        position="fixed"
        style={{
          top: 0,
          height: "56px",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            {/* 
            <EditNoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
             */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                letterSpacing: ".3rem",
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              Favorites
            </Typography>

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
              Favorites
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        sx={{
          height: "calc(100svh - 112px)",
          pt: "12px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Select
          sx={{
            width: "100%",
            marginTop: "8px",
          }}
          onChange={handleSelectChange}
          value={muscleGroup}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 400, // Set the maximum height here (in pixels)
              },
            },
          }}
        >
          {userExercisesLibrary &&
            exercisesMuscleGroupsArr.length > 0 &&
            exercisesMuscleGroupsArr.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
              </MenuItem>
            ))}
        </Select>

        {userExercisesLibrary && filteredExercises.length > 0 ? (
          <Box>
            <FixedSizeList
              height={window.innerHeight - 190}
              itemCount={filteredExercises.length}
              itemSize={225}
              width="100%"
            >
              {Row}
            </FixedSizeList>
          </Box>
        ) : (
          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography align="center">
              No favorite exercises found for this group.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export default Favorites;
