import React,{useState,useEffect} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface ExerciseSelectedProps {
  showRestTimer: boolean;
  setShowRestTimer: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 1,
  borderRadius: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

function RestTimer({ showRestTimer, setShowRestTimer }: ExerciseSelectedProps) {
  const handleClose = () => setShowRestTimer(false);
  const [time, setTime] = useState(120); // initial time in seconds
  const [countdown, setCountdown] = useState(time);
  const [autoStart, setAutoStart] = useState(true);
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (autoStart) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(timer);
            setShowRestTimer(false);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      setTimerId(timer);

      return () => {
        clearInterval(timer);
      };
    }
  }, [autoStart, setShowRestTimer]);

  const handleStartTimer = () => {
    
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(timer);
            setShowRestTimer(false);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    
  };

  const handleStopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const handleDecreaseTime = () => {
    setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
    setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : prevCountdown));
  };

  const handleIncreaseTime = () => {
    setTime((prevTime) => prevTime + 1);
    setCountdown((prevCountdown) => prevCountdown + 1);
  };

  return (
    <Box>
      <Modal
        open={showRestTimer}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ fontSize: "larger" }}>Rest Timer</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Button variant="outlined" onClick={handleDecreaseTime}>
              <RemoveIcon />
            </Button>

            <TextField
              id="filled-number"
              type="number"
              /* 
              defaultValue={120}
               */
              value={countdown}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ textAlign: "center" }}
              variant="filled"
            />
            <Button variant="outlined" onClick={handleIncreaseTime}>
              <AddIcon />
            </Button>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox  />}
              label="AUTO START"
            />
          </FormGroup>
          <Box sx={{ width: "100%", display:"flex"}}>
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%", margin: "0.25rem" }}
              onClick={handleStartTimer}
            >
              START
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "100%", margin: "0.25rem" }}
              onClick={handleStopTimer}
            >
              STOP
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default RestTimer;
