import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarsIcon from '@mui/icons-material/Stars';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import toast from "react-hot-toast";

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
  openViewCommentWorkoutModal: boolean;
  setOpenViewCommentWorkoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  todayDate: Date | undefined;
  workoutCommentRenderTrigger:number
}

function ViewCommentWorkoutModal({
  openViewCommentWorkoutModal,
  setOpenViewCommentWorkoutModal,
  todayDate,
  workoutCommentRenderTrigger
}: ParentComponentProps) {
  const [workoutValue, setWorkoutValue] = useState<number>(0);
  const [workoutCommentValue, setworkoutCommentValue] = useState("");
  const [trainHarderCheck, setTrainHarderCheck] = useState<boolean>(false);
  const [feelPainCheck, setFeelPainCheck] = useState<boolean>(false);
  const [warmStretchCheck, setWarmStretchCheck] = useState<boolean>(false);

  useEffect(() => {
    if(todayDate){
      getWorkoutEvaluation(todayDate)
    }
  }, [todayDate,workoutCommentRenderTrigger]);

  function handleClose() {
    setOpenViewCommentWorkoutModal(false);
  }


  function getWorkoutEvaluation(currentDate: Date) {
    const request = window.indexedDB.open("fitScouterDb", 1);
  
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
  
    request.onerror = function () {
      toast.error("Oops, couldn't open the database in getWorkoutEvaluation!")
      console.error("Error opening database.");
    };
  
  }

  return (
    <div>
      <Modal
        open={openViewCommentWorkoutModal}
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
            <Typography component="legend">Your workout rating</Typography>
            <Rating
              size="large"
              name="simple-controlled"
              value={workoutValue}

              sx={{ paddingBottom: "8px" }}
              icon={<StarsIcon fontSize="inherit"/>}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
          </Box>

          <TextField
            id="read-only-input"
            label="Your workout comment"
            multiline
            maxRows={4}
            sx={{
              width: "100%",
            }}

            InputProps={{
                readOnly: true,
              }}

            value={workoutCommentValue}


          />

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControlLabel
              control={<Switch />}
              
              label="Did you train harder than the last time?"
              checked={trainHarderCheck}
            />

            <FormControlLabel
              control={<Switch />}
              
              label="Did you feel any pain?"
              checked={feelPainCheck}
              
            />

            <FormControlLabel
              control={<Switch />}
              label="Did you warm up before and stretch properly at the end?"
              checked={warmStretchCheck}
              
            />
          </Box>
      
        </Box>
      </Modal>
    </div>
  );
}

export default ViewCommentWorkoutModal;
