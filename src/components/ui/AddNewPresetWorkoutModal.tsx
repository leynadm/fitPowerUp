import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import formatDateForTextField from "../../utils/formatDateForTextfield";
import uuid from "react-uuid";
import deleteAllPresetEntries from "../../utils/IndexedDbCRUDFunctions/deleteAllPresetEntries";
import addPresetCompleteWorkout from "../../utils/firebaseDataFunctions/addCompletePresetWorkout";
import { AuthContext } from "../../context/Auth";
import { convertDateEntriesToWorkout } from "../../pages/Workout/CompleteWorkoutModal";
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import { UserPresetWorkoutsDataContext } from "../../context/UserPresetWorkouts";
import { Container } from "@mui/material";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import CircularProgressWithText from "./CircularProgressWithText";
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
  pb: 1,
};

interface ParentComponentProps {
  openAddNewPresetWorkoutModal: boolean;
  setOpenAddNewPresetWorkoutModal: Dispatch<SetStateAction<boolean>>;
  existingExercises: { name: string; exercises: Exercise[] }[];
  workoutState: {
    routineName: string;
    workoutName: string;
    workoutDescription: string;
    routineDescription: string;
    routineBy: string;
    routineLinkReference: string;
    workoutBy: string;
    workoutLinkReference: string;
  };
  routineTypeCheck: string;
}

function AddNewPresetWorkoutModal({
  openAddNewPresetWorkoutModal,
  setOpenAddNewPresetWorkoutModal,
  existingExercises,
  workoutState,
  routineTypeCheck,
}: ParentComponentProps) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const isOnline = useOnlineStatus()
  const { refetchPresetWorkoutsData } = useContext(
    UserPresetWorkoutsDataContext
  );

  const [isLoading, setIsLoading] = useState(false)
  const workoutDate = formatDateForTextField(new Date());

  function handleClose() {
    setOpenAddNewPresetWorkoutModal(false);
  }

  async function handleCompleteNewPresetWorkout() {
    const existingExercisesArr = convertDateEntriesToWorkout(
      existingExercises,
      workoutDate
    );

    const tempExercisesInRoutine = [];
    for (let index = 0; index < existingExercisesArr.length; index++) {
      const element = existingExercisesArr[index];
      tempExercisesInRoutine.push(element.name);
    }

    const presetWorkoutData = {
      id: uuid(),
      wExercises: existingExercisesArr,
      workoutName: workoutState.workoutName.toLocaleLowerCase(),
      workoutDescription: workoutState.workoutDescription,
      exercisesinRoutine: tempExercisesInRoutine,
      delete: true,
      workoutBy: workoutState.workoutBy,
      workoutLinkReference: workoutState.workoutLinkReference,
    };

    try {
      setIsLoading(true)/* 
      await addPresetCompleteWorkout(currentUser.uid, presetWorkoutData);
 */
      deleteAllPresetEntries();
      await refetchPresetWorkoutsData();
      toast.success("Preset workout succesfully added !");
      setIsLoading(false)
      navigate("/home/workout/preset-workouts");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Modal
        open={openAddNewPresetWorkoutModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="md" sx={style}>

          {isLoading?(
            <CircularProgressWithText text="Please wait, your preset workout is being saved..."/>
          ):(
<Box
            display="flex"
            flexDirection="column"
            gap={1}
            justifyContent="center"
            height="100%"
          >
            <Typography align="center" variant="h6">
              Save your preset workout
            </Typography>


           

            <TextField
              id="outlined-basic"
              label="Workout Name"
              variant="filled"
              required
              size="small"
              InputProps={{
                readOnly: true,
              }}
              value={workoutState.workoutName}
            />

            {workoutState.workoutDescription !== "" && (
              <TextField
                id="outlined-basic"
                required
                label="Workout Description"
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
                multiline
                maxRows={3}
                value={workoutState.workoutDescription}
              />
            )}


              <Box display="flex" flexDirection="column" width="100%" gap={1}>
                <TextField
                  id="outlined-basic"
                  required
                  label="Workout By"
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  maxRows={3}
                  value={workoutState.workoutBy}
                />

                <TextField
                  id="outlined-basic"
                  label="Workout Link Reference"
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  maxRows={3}
                  value={workoutState.workoutLinkReference}
                />
              </Box>

            <Box
              sx={{
                display: "flex",
              }}
            >
              <Button
                variant="dbz_save"
                sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
                onClick={handleCompleteNewPresetWorkout}
                disabled={!isOnline}
              >
                {isOnline ? "Save" : "Reconecting..."}
              </Button>
              <Button
                variant="dbz_clear"
                sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
          )}

          
        </Container>
      </Modal>
    </div>
  );
}

export default AddNewPresetWorkoutModal;
