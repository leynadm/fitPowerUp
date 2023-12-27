import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CommentIcon from "@mui/icons-material/Comment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { AuthContext } from "../../context/Auth";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { useContext } from "react";
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
interface GroupedWorkoutProps {
  workoutExercises: { name: string; exercises: Exercise[] }[];
}

function GroupedWorkout({ workoutExercises }: GroupedWorkoutProps) {
  const { currentUserData } = useContext(AuthContext);

  return (
    <Box>
      {workoutExercises.map((group: any, index: any) => (
        <Box
          key={index}
          sx={{
            borderRadius: "4px",
            boxShadow: 2,
            marginBottom: "8px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontSize: "large",
              background:
                "radial-gradient(circle, rgba(82,9,117,1) 0%, rgba(0,0,0,1) 100%)",
              boxShadow: 2,
              borderRadius: "4px",
              color: "white",
            }}
            //onClick={() => handleSelectWorkoutExercise(group.name,group.exercises[0].group)}
          >
            {group.name.toLocaleUpperCase()}
          </Typography>

          <Divider sx={{ backgroundColor: "aliceblue" }} />
          {group.exercises.map((exercise: any, exerciseIndex: any) => (
            <Box
              key={exerciseIndex}
              sx={{
                display: "grid",
                gridAutoFlow: "column",
                gridTemplateColumns: "1fr 1fr 4fr",
                justifyContent: "space-evenly",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              {exercise.comment ? ( // Check if 'comment' property exists
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
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
                  <EmojiEventsIcon sx={{ zIndex: -1, color: "#520975" }} />
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
                  gridTemplateColumns: "repeat(2, minmax(auto, 1fr))",
                  alignItems: "center",
                  justifyItems: "center",
                  width: "100%",
                  justifyContent: "space-evenly",
                  borderLeft: exercise.dropset
                    ? "5px solid red"
                    : "5px solid transparent",
                }}
              >
                {exercise.weight !== 0 && (
                  <Typography>
                    {`${exercise.weight.toFixed(2)} ${
                      currentUserData.unitsSystem === "metric" ? "kgs" : "lbs"
                    }`}
                  </Typography>
                )}

                {exercise.reps !== 0 && (
                  <Typography>{exercise.reps}{exercise.amrap&&"+"} reps</Typography>
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
    </Box>
  );
}

export default GroupedWorkout