import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CommentIcon from "@mui/icons-material/Comment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
import { Card } from "@mui/material";
interface GroupedWorkoutProps {
  workoutExercises: { name: string; exercises: Exercise[] }[];
}

function GroupedWorkout({ workoutExercises }: GroupedWorkoutProps) {
  const { currentUserData } = useContext(AuthContext);

  return (
    <Box>
      {workoutExercises.map((group: any, index: any) => (
        <Card
        variant="outlined"
          key={index}
          sx={{
            borderRadius: "4px",
            marginBottom: "8px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontSize: "large",
              background:"black",
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
                      currentUserData.unitsSystem === "metric" ? "kg" : "lbs"
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
        </Card>
      ))}
    </Box>
  );
}

export default GroupedWorkout