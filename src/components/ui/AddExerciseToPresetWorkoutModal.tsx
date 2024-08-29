import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ExerciseSearchingBar from "./ExerciseSearchingBar";
import { FixedSizeList } from "react-window";
import { useEffect, useMemo } from "react";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
import LoadingScreenCircle from "./LoadingScreenCircle";
import { IUserExercisesLibrary } from "../../utils/interfaces/IUserExercisesLibrary";
import { AuthContext } from "../../context/Auth";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  pl: 1,
  pr: 1,
  borderRadius: 1,
  height: "calc(100svh - 112px)",
};

interface ParentComponentProps {
  openAddExerciseToPresetWorkoutModal: boolean;
  setOpenAddExerciseToPresetWorkoutModal: Dispatch<SetStateAction<boolean>>;
  searchParams: any;
}

function AddExerciseToPresetWorkoutModal({
  openAddExerciseToPresetWorkoutModal,
  setOpenAddExerciseToPresetWorkoutModal,
  searchParams,
}: ParentComponentProps) {
  const [query, setQuery] = useState("");

  const { userExercisesLibrary, refetchUserExercisesLibrary } = useContext(
    UserExercisesLibraryContext
  );

  const navigate = useNavigate();

  const { currentUserData } = useContext(AuthContext);


  console.log('inside AddExerciseToPresetWorkoutModal:')
  const location = useLocation();
  const routine = location.state.routine;

  
  const handleClose = () => setOpenAddExerciseToPresetWorkoutModal(false);

  const isMale = currentUserData && currentUserData.sex === "male" ? true : false;

  const [libraryOfExercises, setLibraryOfExercises] = useState<
    IUserExercisesLibrary[]
  >(() => {
    if (userExercisesLibrary.length > 0) {
      return getLibraryOfExercises();
    } else {
      return [];
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      if (userExercisesLibrary.length === 0) {
        await refetchUserExercisesLibrary();
      }
      updateLibraryOfExercises();
    };

    const tempLibraryOfExercises = getLibraryOfExercises();
    setLibraryOfExercises(tempLibraryOfExercises);

    fetchData().catch(console.error); // Handle errors
  }, [userExercisesLibrary]);

  function updateLibraryOfExercises() {
    // Ensure that userExercisesLibrary is not empty and contains exercises
    if (userExercisesLibrary.length > 0 && userExercisesLibrary[0].exercises) {
      const tempLibraryOfExercises = getLibraryOfExercises();
      setLibraryOfExercises(tempLibraryOfExercises);
    }
  }

  function getLibraryOfExercises() {
    if (userExercisesLibrary.length > 0) {
      const exercisesArray: IUserExercisesLibrary[] =
        userExercisesLibrary[0].exercises;

      exercisesArray.sort((a, b) => a.name.localeCompare(b.name));

      return exercisesArray;
    } else {
      return [];
    }
  }

  const filteredExercises = useMemo(() => {
    return libraryOfExercises
      ? libraryOfExercises.filter((exercise) => {
          return exercise.name.toLowerCase().includes(query.toLowerCase());
        })
      : [];
  }, [query, libraryOfExercises]);

  if (userExercisesLibrary.length === 0) {
    return (
      <LoadingScreenCircle text="Hang tight! Goku is running on Snake Way..." />
    );
  }

  function handleTileClick(exerciseName: string) {
    navigate(`preset-workout-exercise/${exerciseName}?${searchParams}`,{ state: { routine } });
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
        pt={2}
        onClick={() => handleTileClick(userExercise.name)}
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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  return (
    <div>
      <Modal
        open={openAddExerciseToPresetWorkoutModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ExerciseSearchingBar query={query} onChange={onChange} />
          <FixedSizeList
            height={window.innerHeight - 165}
            itemCount={filteredExercises.length}
            itemSize={200}
            width="100%"
          >
            {Row}
          </FixedSizeList>
        </Box>
      </Modal>
    </div>
  );
}

export default AddExerciseToPresetWorkoutModal;
