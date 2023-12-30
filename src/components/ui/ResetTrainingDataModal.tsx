import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WarningIcon from "@mui/icons-material/Warning";
import resetTrainingData from "../../utils/firebaseDataFunctions/resetTrainingData";
import { AuthContext } from "../../context/Auth";
import { auth } from "../../config/firebase";
import { Container } from "@mui/material";
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
  openResetTrainingData: boolean;
  setOpenResetTrainingData: Dispatch<SetStateAction<boolean>>;
}

function ResetTrainingDataModal({
  openResetTrainingData,
  setOpenResetTrainingData,
}: ParentComponentProps) {
  const { currentUser } = useContext(AuthContext);
  const handleClose = () => setOpenResetTrainingData(false);
  const [isLoading, setIsLoading] = useState(false);
  async function handleResetTrainingData() {
    setIsLoading(true);
    await resetTrainingData(currentUser.uid);
    setOpenResetTrainingData(false);
    setIsLoading(false);
    auth.signOut();
  }

  return (
    <div>
      <Modal
        open={openResetTrainingData}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style} maxWidth="md">
          {isLoading ? (
            <CircularProgressWithText text="Please wait, currently reseting your data..." />
          ) : (
            <Box>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <WarningIcon style={{ color: "red" }} /> Warning
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You are about to delete <strong>ALL</strong> your training data,
                specifically your workouts data, bodytracker data, power and
                feats data, etc. Your social media activity will be preserved.
                <br></br>
                <strong>This process cannot be reversed!</strong>
                <br />
                Please ensure that you want to proceed with the deletion process
                before taking this action!
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
                  onClick={handleResetTrainingData}
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

export default ResetTrainingDataModal;
