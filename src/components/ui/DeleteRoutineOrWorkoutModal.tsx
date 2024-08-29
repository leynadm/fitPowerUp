import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IPresetWorkoutData from "../../utils/interfaces/IPresetWorkoutsData";
import { AuthContext } from "../../context/Auth";
import deleteRoutine from "../../utils/presetWorkouts/deleteRoutine";
import { UserPresetWorkoutsDataContext } from "../../context/UserPresetWorkouts";
import { useNavigate } from "react-router-dom";
import deletePresetWorkout from "../../utils/presetWorkouts/deletePresetWorkout";
import toast from "react-hot-toast";
import CircularProgressWithText from "./CircularProgressWithText";
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
};

interface ParentComponentProps {
  openDeleteRoutineOrWorkoutModal: boolean;
  setOpenDeleteRoutineOrWorkoutModal: Dispatch<SetStateAction<boolean>>;
  routineOrWorkout: string;
  presetWorkoutData: IPresetWorkoutData[];
  routineOrWorkoutId: string | undefined;
  isValid: boolean | undefined;
}

function DeleteRoutineOrWorkoutModal({
  openDeleteRoutineOrWorkoutModal,
  setOpenDeleteRoutineOrWorkoutModal,
  routineOrWorkout,
  presetWorkoutData,
  routineOrWorkoutId,
  isValid,
}: ParentComponentProps) {
  const { currentUser } = useContext(AuthContext);
  const { refetchPresetWorkoutsData } = useContext(
    UserPresetWorkoutsDataContext
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setOpenDeleteRoutineOrWorkoutModal(false);
  const navigate = useNavigate();
  async function handleDeleteRoutineOrWorkout() {
    if (routineOrWorkout === "routine") {
      if (isValid) {
        setIsLoading(true);
        await deleteRoutine(
          currentUser.uid,
          presetWorkoutData,
          routineOrWorkoutId
        );

        await refetchPresetWorkoutsData();
        toast.success("Routine was deleted successfully!");
        setIsLoading(false);
        navigate("/home/workout/preset-workouts");
      }
    } else {
      if (isValid) {
        setIsLoading(true);
        await deletePresetWorkout(
          currentUser.uid,
          presetWorkoutData,
          routineOrWorkoutId
        );

        await refetchPresetWorkoutsData();
        toast.success("Routine was deleted successfully!");
        setIsLoading(false);
        navigate("/home/workout/preset-workouts");
      }
    }
  }

  return (
    <div>
      <Modal
        open={openDeleteRoutineOrWorkoutModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          {isLoading ? (
            <CircularProgressWithText
              text={`Please wait, your ${routineOrWorkout} is being deleted...`}
            />
          ) : (
            <Box>
              <Typography align="center">
                {`Are you sure you want to delete this ${routineOrWorkout}?`}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Button
                  variant="dbz_save"
                  color="success"
                  sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
                  onClick={handleDeleteRoutineOrWorkout}
                >
                  DELETE
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

export default DeleteRoutineOrWorkoutModal;
