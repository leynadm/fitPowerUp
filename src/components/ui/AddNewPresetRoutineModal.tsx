import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import addNewRoutine from "../../utils/firebaseDataFunctions/addNewRoutine";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import formatDateForTextField from "../../utils/formatDateForTextfield";
import uuid from "react-uuid";
import deleteAllPresetEntries from "../../utils/IndexedDbCRUDFunctions/deleteAllPresetEntries";
import addPresetCompleteWorkout from "../../utils/firebaseDataFunctions/addCompletePresetWorkout";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

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
  openAddNewPresetRoutineModal: boolean;
  setOpenAddNewPresetRoutineModal: Dispatch<SetStateAction<boolean>>;
  existingExercises: { name: string; exercises: Exercise[] }[];
  workoutState: {
    routineName: string;
    routineDescription: string;
    routineBy: string;
    routineLinkReference: string;
    multi: boolean;
  };
}

function AddNewPresetRoutineModal({
  openAddNewPresetRoutineModal,
  setOpenAddNewPresetRoutineModal,
  existingExercises,
  workoutState,
}: ParentComponentProps) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const isOnline = useOnlineStatus();
  const { refetchPresetWorkoutsData } = useContext(
    UserPresetWorkoutsDataContext
  );

  const [isLoading, setIsLoading] = useState(false);
  const workoutDate = formatDateForTextField(new Date());

  function handleClose() {
    setOpenAddNewPresetRoutineModal(false);
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
      rName: workoutState.routineName.toLocaleLowerCase(),
      rDesc: workoutState.routineDescription,
      rBy: workoutState.routineBy,
      rLink: workoutState.routineLinkReference,
      del: true,
      rWorkouts: [],
      rImg:"r-def",
      multi: workoutState.multi,
    };

    try {
      setIsLoading(true);
      await addNewRoutine(currentUser.uid, presetWorkoutData,uuid());
      deleteAllPresetEntries();
      await refetchPresetWorkoutsData();
      toast.success("Preset workout succesfully added !");
      setIsLoading(false);
      navigate("/home/workout/preset-workouts");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Modal
        open={openAddNewPresetRoutineModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="md" sx={style}>
          {isLoading ? (
            <CircularProgressWithText text="Please wait, your preset workout is being saved..." />
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              justifyContent="center"
              height="100%"
            >
              <Typography align="center" variant="h6">
                Save Your Preset Routine
              </Typography>

              <Box display="flex" flexDirection="column" gap={1} width="100%">
                <TextField
                  id="outlined-basic"
                  label="Routine Name"
                  variant="filled"
                  size="small"
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                  value={workoutState.routineName.toLocaleUpperCase()}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  justifyContent="center"
                  height="100%"
                >
                  <TextField
                    id="outlined-basic"
                    label="Routine Description"
                    variant="filled"
                    InputProps={{
                      readOnly: true,
                    }}
                    multiline
                    maxRows={3}
                    value={workoutState.routineDescription}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Routine Created By"
                    variant="filled"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={workoutState.routineBy}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Routine Link Reference"
                    variant="filled"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={workoutState.routineLinkReference}
                  />

                  <FormControlLabel
                    control={<Switch />}
                    checked={workoutState.multi}
                    disabled
                    value={workoutState.multi}
                    label={
                      workoutState.multi
                        ? "Multi-week Routine"
                        : "Standard Routine"
                    }
                  />
                </Box>
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

export default AddNewPresetRoutineModal;
