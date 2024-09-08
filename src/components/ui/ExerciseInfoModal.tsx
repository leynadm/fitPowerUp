import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
import { IUserExercisesLibrary } from "../../utils/interfaces/IUserExercisesLibrary";
import { Typography } from "@mui/material";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  gap: 1,
  overflow: "scroll",
};

interface ParentComponentProps {
  openExerciseInfoModal: boolean;
  setOpenExerciseInfoModal: Dispatch<SetStateAction<boolean>>;
  exerciseName?: string;
}

function ExerciseInfoModal({
  openExerciseInfoModal,
  setOpenExerciseInfoModal,
  exerciseName,
}: ParentComponentProps) {
 
  const { userExercisesLibrary } = useContext(UserExercisesLibraryContext);
  const [exerciseImageURL, setExerciseImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const exerciseSelected = findExerciseSelected();

  useEffect(() => {

    if (exerciseName && userExercisesLibrary.length > 0) {

      const fetchImageURL = async () => {
        
        if(exerciseSelected){

          const exerciseImageRef = ref(
            storage,
            `assets/exercises-assets/${exerciseSelected.id
              .toLocaleLowerCase()}.jpg`
          );
          try {
            const url = await getDownloadURL(exerciseImageRef);
            setExerciseImageURL(url);
          } catch (error) {
            //toast.error("Oops, there was an error fetching the image!");
            console.error("Error fetching image:", error);
          } finally {
            setIsLoading(false); // Stop loading whether there was an error or not
          }


        } else {
          const exerciseImageRef = ref(
            storage,
            `assets/exercises-assets/${exerciseName
              ?.replaceAll(" ", "-")
              .toLocaleLowerCase()}.jpg`
          );
          try {
            const url = await getDownloadURL(exerciseImageRef);
            setExerciseImageURL(url);
          } catch (error) {
            //toast.error("Oops, there was an error fetching the image!");
            console.error("Error fetching image:", error);
          } finally {
            setIsLoading(false); // Stop loading whether there was an error or not
          }
        };
        }        
        
        

      fetchImageURL();
    }
  }, [userExercisesLibrary]); // Dependency array includes index and userExercise

  function findExerciseSelected() {
    if (userExercisesLibrary.length > 0) {
      const exerciseSelected: IUserExercisesLibrary =
        userExercisesLibrary[0].exercises.find(
          (exercise: IUserExercisesLibrary) =>
            exercise.name.toUpperCase() === exerciseName?.toUpperCase()
        );

      return exerciseSelected;
    }
  }

  function handleClose() {
    setOpenExerciseInfoModal(false);
  }

  function searchExercise() {
    if (exerciseSelected) {
      let query = encodeURIComponent(exerciseSelected.name);
      window.open("https://www.google.com/search?q=" + query, "_blank");
    }
  }

  return (
    <div>
      <Modal
        open={openExerciseInfoModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" variant="h6">
            {exerciseSelected && exerciseSelected.name.toLocaleUpperCase()}
          </Typography>

          <Box display="flex" justifyContent="center">
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            ) : (
              <img
                src={exerciseImageURL}
                alt={exerciseSelected && exerciseSelected.name}
                width="100%"
                height="100%"
                style={{ borderRadius:8, minHeight: "270px", objectFit: "cover" }}
              />
            )}
          </Box>
          <Button
            variant="dbz_save"
            endIcon={<SearchIcon fontSize="large" />}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={searchExercise}
          >
            Find How-to Guide
          </Button>

          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography
              display="flex"
              justifyContent="center"
              variant="button"
              gap={1}
            >
              <SportsGymnasticsIcon /> Muscles Involved:{" "}
            </Typography>

            <ul style={{ listStyleType: "square", marginLeft: "50px" }}>
              {exerciseSelected &&
                exerciseSelected.mInvolved.map(
                  (muscle: string, index: number) => (
                    <li key={index}>{muscle}</li>
                  )
                )}
            </ul>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ExerciseInfoModal;
