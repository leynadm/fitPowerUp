import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import getExercisesByDate from "../../utils/CRUDFunctions/getExercisesByDate";
import Exercise from "../../utils/interfaces/Exercise";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import CommentIcon from "@mui/icons-material/Comment";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
const style = {
  bgcolor: "aliceblue",
  boxShadow: 24,
  p: 1,
  borderRadius: 1,
};

interface CalendarProps {
  calendarWorkoutModalVisibility: boolean;
  setCalendarWorkoutModalVisibility: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  todayDate: Date | undefined;
  unitsSystem: string;
}

function CalendarWorkoutModal({
  calendarWorkoutModalVisibility,
  setCalendarWorkoutModalVisibility,
  todayDate,
  unitsSystem,
}: CalendarProps) {
  const [workoutDateExercises, setWorkoutDateExercises] = useState<
    { name: string; exercises: Exercise[] }[]
  >([]);  
  const navigate = useNavigate()
  const handleClose = () => setCalendarWorkoutModalVisibility(false);

  useEffect(() => {
    console.log("logging date query inside calendarworkoutmodal");
    if (todayDate) {
      getExercisesByDate(todayDate, setWorkoutDateExercises);
    }
  }, [todayDate]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Dialog
        open={calendarWorkoutModalVisibility}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ marginBottom: "56px" }}
      >
        <Box sx={style}>
          <Typography sx={{ width: "100%", textAlign: "center" }}>
            {todayDate?.toLocaleDateString()}
          </Typography>

          {workoutDateExercises.map((group, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: "4px",
                boxShadow: 1,
                margin: "16px",
                backgroundColor: "white",
              }}
            >
              <Typography
                variant="h6"
                sx={{ textAlign: "center", fontSize: "medium" }}
              >
                {group.name.toLocaleUpperCase()}
              </Typography>

              <Divider sx={{ backgroundColor: "aliceblue" }} />
              {group.exercises.map((exercise, exerciseIndex) => (
                <Box
                  key={exerciseIndex}
                  sx={{
                    display: "grid",
                    gridAutoFlow: "column",
                    gridTemplateColumns: "1fr 1fr 4fr",
                    justifyContent: "space-evenly",
                    justifyItems: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {exercise.comment ? ( // Check if 'comment' property exists
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={(event) => console.log("yes")}
                    >
                      <CommentIcon
                        sx={{
                          zIndex: 0,
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      disabled // Placeholder element
                    >
                      <CommentIcon style={{ opacity: 0 }} />
                    </IconButton>
                  )}

                  {exercise.is_pr ? (
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      disabled // Placeholder element
                    >
                      <EmojiEventsIcon sx={{ zIndex: 0 }} />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      disabled // Placeholder element
                    >
                      <EmojiEventsIcon sx={{ opacity: 0, zIndex: 0 }} />
                    </IconButton>
                  )}

                  <Box
                    sx={{
                      display: "grid",

                      gridTemplateColumns: "1fr 1fr",
                      alignItems: "center",
                      justifyItems: "center",
                      width: "100%",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {exercise.weight !== 0 && (
                      <Typography>
                        {`${exercise.weight.toFixed(2)} ${
                          unitsSystem === "metric" ? "kgs" : "lbs"
                        }`}
                      </Typography>
                    )}

                    {exercise.reps !== 0 && (
                      <Typography>{exercise.reps} reps</Typography>
                    )}

                    {exercise.distance !== 0 && (
                      <Typography>{`${exercise.distance} ${exercise.distance_unit}`}</Typography>
                    )}

                    {exercise.time !== 0 && (
                      <Typography>
                        {exercise.time !== 0 ? formatTime(exercise.time) : ""}
                      </Typography>
                    )}
                  </Box>

                  <Divider />
                </Box>
              ))}
            </Box>
          ))}

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
              onClick={() => navigate("/home")}
            >
              Go To
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

        <Box></Box>
      </Dialog>
    </Box>
  );
}

export default CalendarWorkoutModal;
