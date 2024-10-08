import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/Auth";
import { UserTrainingDataContext } from "../../context/UserTrainingData";
import deleteCompletedWorkout from "../../utils/firebaseDataFunctions/deleteCompletedWorkout";
import toast from "react-hot-toast";
import CircularProgressWithText from "./CircularProgressWithText";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",

  p: 2,
  borderRadius: 1,
};

interface ParentComponentProps {
  openDeleteCompletedWorkout: boolean;
  setOpenDeleteCompletedWorkout: Dispatch<SetStateAction<boolean>>;
  workoutId: string | null;
}

function DeleteCompletedWorkout({
  openDeleteCompletedWorkout,
  setOpenDeleteCompletedWorkout,
  workoutId,
}: ParentComponentProps) {
  const { currentUser } = useContext(AuthContext);
  const { userTrainingData, refetchUserTrainingData } = useContext(
    UserTrainingDataContext
  );

  const [isLoading, setIsLoading] = useState(false);

  function handleClose() {
    setIsLoading(false);
    setOpenDeleteCompletedWorkout(false);
  }

  async function handleDeleteCompletedWorkout() {
    try {
      if (workoutId) {
        setIsLoading(true);

        await deleteCompletedWorkout(
          currentUser.uid,
          userTrainingData,
          workoutId
        );
        refetchUserTrainingData();
        setIsLoading(false);
        handleClose();
        toast.success("The workout was successfully deleted!");
      } else {
        toast.error("No workout could be found!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Modal
        open={openDeleteCompletedWorkout}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Container sx={style}>
          {isLoading ? (
            <CircularProgressWithText text="Please wait, workout is being deleted..." />
          ) : (
            <Box>
              <Typography align="center">
                {`Are you sure you want to delete this workout?`}
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
                  onClick={handleDeleteCompletedWorkout}
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

export default DeleteCompletedWorkout;
