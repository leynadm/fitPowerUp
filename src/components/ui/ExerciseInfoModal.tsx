import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TrainingDataContext } from "../../context/TrainingData";
import { IUserSelectedExercises } from "../../context/TrainingData";
import { Typography } from "@mui/material";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
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
   
  gap:1,
  overflow:'scroll',


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
  const { userSelectedExercises } = useContext(TrainingDataContext);
  const [exerciseImageURL, setExerciseImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImageURL = async () => {
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

    fetchImageURL();
  }, []); // Dependency array includes index and userExercise

  const exerciseSelected: IUserSelectedExercises =
    userSelectedExercises[0].exercises.find(
      (exercise: IUserSelectedExercises) =>
        exercise.name.toUpperCase() === exerciseName?.toUpperCase()
    );

  function handleClose() {
    setOpenExerciseInfoModal(false);
  }

  function searchExercise() {
    var query = encodeURIComponent(exerciseSelected.name);
    window.open("https://www.google.com/search?q=" + query, "_blank");
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
            {exerciseSelected.name.toLocaleUpperCase()}
          </Typography>

          <Box
            display="flex"
            justifyContent="center"

          >
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            ) : (
              <img
                src={exerciseImageURL}
                alt={exerciseSelected.name}
                width="100%"
                height="100%"
                
                style={{ minHeight: "270px", objectFit: "cover",
              
              }}
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
              {exerciseSelected.mInvolved.map(
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
