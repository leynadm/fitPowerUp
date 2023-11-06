import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
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
import ViewCommentModal from "../../components/ui/ViewCommentModal";
import Exercise from "../../utils/interfaces/Exercise";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import CommentWorkoutModal from "./CompleteWorkoutModal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import getNewWorkoutExercises from "../../utils/IndexedDbCRUDFunctions/getNewWorkoutExercises";
import toast from "react-hot-toast";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import IWorkoutEvaluationData from "../../utils/interfaces/WorkoutEvaluationData";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { AuthContext } from "../../context/Auth";

interface NewWorkoutProps {
  existingExercises: { name: string; exercises: Exercise[] }[];
  setExistingExercises: Dispatch<
    SetStateAction<{ name: string; exercises: Exercise[] }[]>
  >;
}

function NewWorkout({
  existingExercises,
  setExistingExercises,
}: NewWorkoutProps) {
  const navigate = useNavigate();
  
  const [openViewCommentModal, setOpenViewCommentModal] = useState(false);
  const [exerciseComment, setExerciseComment] = useState("");
  const [openCompleteWorkoutModal, setOpenCompleteWorkoutModal] = useState(false);
  const [workoutCommentRenderTrigger, setWorkoutCommentRenderTrigger] =
    useState(0);

  const [workoutEvaluationCheck, setWorkoutEvaluationCheck] = useState(false);
  const {currentUserData} = useContext(AuthContext)
  const [workoutEvaluationData, setWorkoutEvaluationData] =
    useState<IWorkoutEvaluationData | null>(null);
  const [todayDate, setTodayDate] = useState<Date>();

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await getNewWorkoutExercises(setExistingExercises);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [todayDate, workoutCommentRenderTrigger]);

  const handleNewWorkout = () => {
    navigate("workout_categories");
  };


  const handleSelectWorkoutExercise = (exerciseName: string) => {
    navigate(`workout_categories/exercises/selected/${exerciseName}`);
  };

  function handleCommentWorkoutModalVisibility() {
    setOpenCompleteWorkoutModal(!openCompleteWorkoutModal);
  }

  
  function handleViewCommentModalVisibility(
    exerciseComment: string | undefined
  ) {
    if (exerciseComment) {
      setExerciseComment(exerciseComment);
      setOpenViewCommentModal(!openViewCommentModal);
    }
  } 

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ViewCommentModal
        openViewCommentModal={openViewCommentModal}
        setOpenViewCommentModal={setOpenViewCommentModal}
        exerciseComment={exerciseComment}
      />

      <CommentWorkoutModal
        openCompleteWorkoutModal={openCompleteWorkoutModal}
        setOpenCompleteWorkoutModal={setOpenCompleteWorkoutModal}
        todayDate={todayDate}
        setWorkoutCommentRenderTrigger={setWorkoutCommentRenderTrigger}
        setWorkoutEvaluationCheck={setWorkoutEvaluationCheck}
        existingExercises={existingExercises}
      />

      <Box position="fixed" sx={{ width: "100%" }}>
        <AppBar
          elevation={3}
          style={{
            top: 0,
            width: "100%",
            height: "56px",
            background:
              "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <PostAddIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />

              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                New Workout
              </Typography>

              <PostAddIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />

              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                New Workout
              </Typography>

              <Box sx={{ flexGrow: 1, display: "flex" }}>
                <Box sx={{ marginLeft: "auto" }}>
                  {existingExercises.length > 0 && (
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={handleCommentWorkoutModalVisibility}
                    >
                      <DoneOutlineIcon sx={{ color: "white" }} />
                    </IconButton>
                  )}

                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleNewWorkout}
                  >
                    <AddOutlinedIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Container sx={{ padding: 0, height: "calc(100vh - 112px)" }}>
        {existingExercises.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              height: "calc(100%)",
            }}
          >
            {workoutEvaluationCheck && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "4px",
                  boxShadow: 1,
                  margin: "16px",
                  marginTop: "48px",
                  backgroundColor: "white",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  disabled // Placeholder element
                >
                  <EditNoteIcon sx={{ zIndex: -1 }} />
                </IconButton>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                height: "100%",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "large",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Typography>

              <IconButton
                aria-label="add workout"
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: "56px",
                }}
                onClick={handleNewWorkout}
              >
                <AddIcon />
                <Typography variant="body2">Add an exercise</Typography>
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              paddingTop: "8px",
              paddingBottom: "64px",
            }}
          >
            {workoutEvaluationCheck && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "4px",
                  boxShadow: 1,
                  margin: "16px",
                  backgroundColor: "white",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  disabled // Placeholder element
                >
                  <EditNoteIcon sx={{ zIndex: 0 }} />
                </IconButton>
              </Box>
            )}

            {existingExercises.map((group, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: "4px",
                  boxShadow: 2,
                  margin: "16px",
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
                  onClick={() => handleSelectWorkoutExercise(group.name)}
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
                    }}
                  >
                    {exercise.comment ? ( // Check if 'comment' property exists
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() =>
                          handleViewCommentModalVisibility(exercise.comment)
                        }
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
                        <EmojiEventsIcon
                          sx={{ zIndex: -1, color: "#520975" }}
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
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default NewWorkout;
