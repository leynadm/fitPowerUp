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
import addWorkoutToRoutine from "../../utils/firebaseDataFunctions/AddWorkoutToRoutine";
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
  pb: 1,
};

interface ParentComponentProps {
  openAddNewPresetWorkoutForRoutineModal: boolean;
  setOpenAddNewPresetWorkoutForRoutineModal: Dispatch<SetStateAction<boolean>>;
  existingExercises: { name: string; exercises: Exercise[] }[];
  workoutState: {
    workoutName: string;
    workoutDescription: string;
    workoutLinkReference: string;
    weekInterval: number;
  };
  routineId: string;
}

function AddNewPresetWorkoutForRoutineModal({
  openAddNewPresetWorkoutForRoutineModal,
  setOpenAddNewPresetWorkoutForRoutineModal,
  existingExercises,
  workoutState,
  routineId,
}: ParentComponentProps) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const routine = location.state.routine;

  const isOnline = useOnlineStatus();
  const { refetchPresetWorkoutsData } = useContext(
    UserPresetWorkoutsDataContext
  );

  const [isLoading, setIsLoading] = useState(false);
  const workoutDate = formatDateForTextField(new Date());

  function handleClose() {
    setOpenAddNewPresetWorkoutForRoutineModal(false);
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
      wEx: existingExercisesArr,
      wName: workoutState.workoutName,
      wDesc: workoutState.workoutDescription,
      wOvr: tempExercisesInRoutine,
      del: true,
      wInt: workoutState.weekInterval,
      wBy: "",
      wLink: workoutState.workoutLinkReference,
    };

    try {
      console.log({ presetWorkoutData });
      setIsLoading(true);
      await addWorkoutToRoutine(currentUser.uid, presetWorkoutData, routineId);

      deleteAllPresetEntries();
      await refetchPresetWorkoutsData();
      toast.success("Preset workout succesfully added !");
      setIsLoading(false);
      navigate("/home/workout/preset-workouts", { state: { routine } });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Modal
        open={openAddNewPresetWorkoutForRoutineModal}
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
                Save your preset workout
              </Typography>

              <TextField
                id="outlined-basic"
                label="Workout Name"
                variant="filled"
                required
                size="small"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                value={workoutState.workoutName}
              />

              {workoutState.workoutDescription !== "" && (
                <TextField
                  id="outlined-basic"
                  required
                  label="Workout Description"
                  variant="filled"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  multiline
                  maxRows={3}
                  value={workoutState.workoutDescription}
                />
              )}

              <Box display="flex" flexDirection="column" width="100%" gap={1}>
                {workoutState.weekInterval !== 0 && (
                  <TextField
                    id="outlined-basic"
                    label="Week Interval"
                    variant="filled"
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                    multiline
                    maxRows={3}
                    value={`Week ${workoutState.weekInterval}`}
                  />
                )}

                <TextField
                  id="outlined-basic"
                  label="Workout Link Reference"
                  variant="filled"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
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

export default AddNewPresetWorkoutForRoutineModal;
