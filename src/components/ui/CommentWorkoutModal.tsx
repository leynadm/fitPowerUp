import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarsIcon from "@mui/icons-material/Stars";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FailedGenericAlert from "./FailedGenericAlert";
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
  todayDate: Date | undefined;
  setWorkoutCommentRenderTrigger: React.Dispatch<React.SetStateAction<number>>;
  setWorkoutEvaluationCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommentWorkoutModal({
  openCommentWorkoutModal,
  setOpenCommentWorkoutModal,
  todayDate,
  setWorkoutCommentRenderTrigger,
  setWorkoutEvaluationCheck,
}: ParentComponentProps) {
  const [workoutValue, setWorkoutValue] = useState<number>(0);
  const [workoutCommentValue, setworkoutCommentValue] = useState("");
  const [trainHarderCheck, setTrainHarderCheck] = useState<boolean>(false);
  const [feelPainCheck, setFeelPainCheck] = useState<boolean>(false);
  const [warmStretchCheck, setWarmStretchCheck] = useState<boolean>(false);

  useEffect(() => {
    if (todayDate) {
      getWorkoutEvaluation(todayDate);
    }
  }, [todayDate]);

  function handleClose() {
    setOpenCommentWorkoutModal(false);
  }

  function markTrainHarderCheck() {
    setTrainHarderCheck((prevState) => !prevState);
  }

  function markfeelPainCheck() {
    setFeelPainCheck((prevState) => !prevState);
  }

  function markWarmStretchCheck() {
    setWarmStretchCheck((prevState) => !prevState);
  }

  function getWorkoutEvaluation(currentDate: Date) {

    // Open IndexedDB database connection
    const request = window.indexedDB.open("fitScouterDb");

    request.onsuccess = function (event: any) {
      const db = event.target.result;

      // Open transaction to access the object store
      const transaction = db.transaction(["workout-evaluation"], "readonly");
      const objectStore = transaction.objectStore("workout-evaluation");

      const index = objectStore.index("workout_evaluation_date");
      const getRequest = index.get(currentDate);

      getRequest.onsuccess = function (event: any) {
        const comment = event.target.result?.workout_comment || "";
        setworkoutCommentValue(comment);
        const rating = event.target.result?.rating || 0;
        setWorkoutValue(rating);
        const pain = event.target.result?.pain || false;
        setFeelPainCheck(pain);
        const train = event.target.result?.train || false;
        setTrainHarderCheck(train);
        const stretchWarm = event.target.result?.warm_stretch || false;
        setWarmStretchCheck(stretchWarm);
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

  function saveWorkoutEvaluation() {
    const request = window.indexedDB.open("fitScouterDb");
    request.onsuccess = function (event: any) {
      const db = event.target.result;
      const transaction = db.transaction("workout-evaluation", "readwrite");
      const objectStore = transaction.objectStore("workout-evaluation");

      const index = objectStore.index("workout_evaluation_date");
      const getRequest = index.get(todayDate);

      getRequest.onsuccess = function (event: any) {
        const existingEntry = getRequest.result;

        if (existingEntry) {
          if (workoutCommentValue !== "") {
            existingEntry.workout_comment = workoutCommentValue;
          }
          if (workoutValue !== 0) {
            existingEntry.rating = workoutValue;
          }
          if (trainHarderCheck) {
            existingEntry.train = trainHarderCheck;
          } else {
            existingEntry.train = false;
          }

          if (feelPainCheck) {
            existingEntry.pain = feelPainCheck;
          } else {
            existingEntry.pain = false;
          }
          if (warmStretchCheck) {
            existingEntry.warm_stretch = warmStretchCheck;
          } else {
            existingEntry.warm_stretch = false;
          }

          const updateRequest = objectStore.put(existingEntry);

          updateRequest.onsuccess = function () {
            console.log("Record updated successfully");
          };
          updateRequest.onerror = function () {
            console.log("Error updating record");
          };
        } else {
          const record = {
            date: todayDate,
            workout_comment: workoutCommentValue,
            rating: workoutValue,
            train: trainHarderCheck,
            pain: feelPainCheck,
            warm_stretch: warmStretchCheck,
          };

          const addRequest = objectStore.add(record);

          addRequest.onsuccess = () => {
            console.log("works");
          };

          addRequest.onerror = () => {
            console.error("Failed to save the record");
          };
        }
      };

      transaction.oncomplete = function () {
        console.log("Transaction completed");
        setWorkoutCommentRenderTrigger((prev) => prev + 1);
        setOpenCommentWorkoutModal(!openCommentWorkoutModal);
      };
      transaction.onerror = function () {
        console.log("Transaction error");
      };
    };

    request.onerror = function () {
      console.log("Error opening database");
    };
  }

  function deleteWorkoutEvaluation() {
    const request = window.indexedDB.open("fitScouterDb");

    request.onsuccess = function (event: any) {
      const db = event.target.result;
      const transaction = db.transaction("workout-evaluation", "readwrite");
      const objectStore = transaction.objectStore("workout-evaluation");

      const index = objectStore.index("workout_evaluation_date");
      const getRequest = index.get(todayDate);

      getRequest.onsuccess = function (event: any) {
        const existingEntry = getRequest.result;

        if (existingEntry) {
          const deleteRequest = objectStore.delete(existingEntry.id);

          deleteRequest.onsuccess = function () {
            console.log("Record deleted successfully");
          };
          deleteRequest.onerror = function () {
            console.log("Error deleting record");
          };
        } else {
          console.log("Entry not found");
        }
      };

      transaction.oncomplete = function () {
        console.log("Transaction completed, will get the new evaluation");
        setWorkoutEvaluationCheck(false);
        setWorkoutCommentRenderTrigger((prev) => prev + 1);
        setOpenCommentWorkoutModal(!openCommentWorkoutModal);
      };
      transaction.onerror = function () {
        console.log("Transaction error");
      };
    };

    request.onerror = function () {
      console.log("Error opening database");
    };
  }

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
              icon={<StarsIcon fontSize="inherit" />}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              sx={{ paddingBottom: "8px" }}
            />

            <IconButton
              sx={{ position: "absolute", top: "1rem", right: "1rem" }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={deleteWorkoutEvaluation}
            >
              <DeleteForeverIcon />
            </IconButton>
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

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControlLabel
              control={<Switch />}
              label="Did you train harder than the last time?"
              checked={trainHarderCheck}
              onChange={markTrainHarderCheck}
            />

            <FormControlLabel
              control={<Switch />}
              checked={feelPainCheck}
              onChange={markfeelPainCheck}
              label="Did you feel any pain?"
            />

            <FormControlLabel
              control={<Switch />}
              label="Did you warm up before and stretch properly at the end?"
              checked={warmStretchCheck}
              onChange={markWarmStretchCheck}
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
              onClick={saveWorkoutEvaluation}
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
