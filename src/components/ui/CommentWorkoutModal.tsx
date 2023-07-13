import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
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
  openCommentWorkoutModal: boolean;
  setOpenCommentWorkoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  workoutCommentValue: string;
  setworkoutCommentValue: React.Dispatch<React.SetStateAction<string>>;
  workoutValue: number;
  setWorkoutValue : React.Dispatch<React.SetStateAction<number>>;
  setWorkoutCommentRenderTrigger : React.Dispatch<React.SetStateAction<number>>;
}

function CommentWorkoutModal({
  openCommentWorkoutModal,
  setOpenCommentWorkoutModal,
  workoutCommentValue,
  setworkoutCommentValue,
  workoutValue,
  setWorkoutValue,
  setWorkoutCommentRenderTrigger
}: ParentComponentProps) {


  function handleClose() {
    setworkoutCommentValue("");
    setOpenCommentWorkoutModal(false);
  }

  /* 
  function saveComment() {

    const request = window.indexedDB.open("fitScouterDb");
    request.onsuccess = function (event: any) {
      const db = event.target.result;
      const transaction = db.transaction("user-exercises-entries", "readwrite");
      const objectStore = transaction.objectStore("user-exercises-entries");

      const getRequest = objectStore.get(exerciseCommentId);

      getRequest.onsuccess = function (event: any) {
        const data = event.target.result;
        if (data) {
          data.comment = workoutCommentValue;
          const updateRequest = objectStore.put(data);
          updateRequest.onsuccess = function () {
            console.log("Record updated successfully");
          };
          updateRequest.onerror = function () {
            console.log("Error updating record");
          };
        } else {
          console.log("Record not found");
        }
      };

      transaction.oncomplete = function () {
        console.log("Transaction completed");
        setworkoutCommentValue("");
        setOpenCommentWorkoutModal(false);
      };
      transaction.onerror = function () {
        console.log("Transaction error");
      };
    };

    request.onerror = function () {
      console.log("Error opening database");
    };

    setDropsetRenderTrigger(prev => prev+1)
  }

 */

  return (
    <div>
      <Modal
        open={openCommentWorkoutModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="legend">Rate your workout</Typography>
            <Rating
              size="large"
              name="simple-controlled"
              value={workoutValue}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setWorkoutValue(newValue);
                }
              }}
            />
          </Box>

          <TextField
            id="outlined-multiline-flexible"
            label="Add a workout comment"
            multiline
            maxRows={4}
            sx={{
              width: "100%",
            }}
            value={workoutCommentValue}
            onChange={(e) => setworkoutCommentValue(e.target.value)}
          />

          <Box sx={{display:"flex",flexDirection:"column"}}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Did you train harder than the last time?"
            />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Did you feel any pain?"
            />

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Did you warm up before and stretch properly at the end?"
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default CommentWorkoutModal;
