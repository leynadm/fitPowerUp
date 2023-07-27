import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import { LogDataContext } from "../../context/LogData";
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

function RestTimer() {
  const {
    showRestTimer,
    setShowRestTimer,
    time,
    setTime,
    autoStart,
    setAutoStart,
  } = useContext(LogDataContext);
  const handleClose = () => setShowRestTimer(false);
  const [countdown, setCountdown] = useState(time);
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null);
  const [timerLabel, setTimerLabel] = useState("Start the timer...");
  useEffect(() => {
    if (autoStart) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown: any) => {
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
  }, []);

  useEffect(() => {}, [timerId]);

  const handleStartTimer = () => {
    if (timerId) {
      clearInterval(timerId); // Clear any existing interval before starting a new one
    }
    const timer = setInterval(() => {
      setCountdown((prevCountdown: any) => {
        if (prevCountdown === 0) {
          clearInterval(timer);
          setShowRestTimer(true);
          setTimerLabel("Time's up!");
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    setTimerId(timer);
  };

  const handleStopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null); // Reset the timerId state when stopping the timer
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the userInputTime state when the user types in the TextField
    setTimerLabel("Start the timer...");
    if (isNaN(parseInt(event.target.value))) {
      setTime(0);
      setCountdown(0);
    } else {
      setTime(parseInt(event.target.value));
      setCountdown(parseInt(event.target.value));
    }
  };

  const handleDecreaseTime = () => {
    setTime((prevTime: any) => (prevTime > 0 ? prevTime - 1 : prevTime));
    setCountdown((prevCountdown: any) =>
      prevCountdown > 0 ? prevCountdown - 1 : prevCountdown
    );
  };

  const handleIncreaseTime = () => {
    setTime((prevTime: any) => prevTime + 1);
    setCountdown((prevCountdown: any) => prevCountdown + 1);
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
          {timerLabel === "Start the timer..." ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <HourglassEmptyIcon />
              <Typography sx={{ fontSize: "larger" }}>{timerLabel}</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography sx={{ fontSize: "larger" }}>{timerLabel}</Typography>
              <HourglassFullIcon />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            <Button variant="outlined" onClick={handleDecreaseTime}>
              <RemoveIcon />
            </Button>

            <TextField
              id="filled-number"
              type="number"
              value={countdown}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                style: {
                  fontSize: "1.5rem",
                  textAlign: "center",
                  padding: "10px",
                },
              }}
              sx={{ textAlign: "center", width: "100%" }}
              variant="filled"
            />

            <Button variant="outlined" onClick={handleIncreaseTime}>
              <AddIcon />
            </Button>
          </Box>

          {/* 
          <FormGroup>
            <FormControlLabel
              control={<Checkbox  
                checked={autoStart}
                onChange={handleAutoStartChange}
              />}
              label="AUTO START"
            />
             
          </FormGroup>
          */}
          <Box sx={{ width: "100%", display: "flex" }}>
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
