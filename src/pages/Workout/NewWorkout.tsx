import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import CompleteWorkoutModal from "./CompleteWorkoutModal";
import getNewWorkoutExercises from "../../utils/IndexedDbCRUDFunctions/getNewWorkoutExercises";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { AuthContext } from "../../context/Auth";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { Button, Card } from "@mui/material";
import { BodyTrackerDataContext } from "../../context/BodyTrackerData";
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
  const [openCompleteWorkoutModal, setOpenCompleteWorkoutModal] =
    useState(false);

  const { currentUserData } = useContext(AuthContext);
  const {userBodyTrackerData}= useContext(BodyTrackerDataContext)

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await getNewWorkoutExercises(setExistingExercises);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const handleNewWorkout = () => {
    navigate("workout_categories");
  };

  const handleSelectWorkoutExercise = (
    exerciseName: string,
    exerciseGroup: string
  ) => {
    navigate(
      `workout_categories/exercises/${exerciseGroup}/selected/${exerciseName}`
    );
  };

  function CompleteWorkoutModalVisibility() {
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
        height:"100%"
      }}
      className="WrapperInsideNewWorkout"
    >
      <ViewCommentModal
        openViewCommentModal={openViewCommentModal}
        setOpenViewCommentModal={setOpenViewCommentModal}
        exerciseComment={exerciseComment}
      />

      <CompleteWorkoutModal
        openCompleteWorkoutModal={openCompleteWorkoutModal}
        setOpenCompleteWorkoutModal={setOpenCompleteWorkoutModal}
        existingExercises={existingExercises}
      />

      <Box position="fixed" sx={{ width: "100%" }} zIndex={1}>
        <AppBar
          style={{
            top: 0,
            width: "100%",
            height: "56px",

            }}
        >
          <Container maxWidth="md">
            <Toolbar disableGutters>
              {/* 
              <PostAddIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              /> */}

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: ".3rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                New Workout
              </Typography>

              {/* 
              <PostAddIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              /> */}

              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  letterSpacing: ".1rem",
                color:"#FFA500",
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
                      onClick={CompleteWorkoutModalVisibility}
                    >
                      <DoneOutlineIcon sx={{ color: "#FFA500" }} />
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
                    <AddOutlinedIcon sx={{ color: "#FFA500" }} />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Container
        sx={{ padding: 1,height:"100%" }}
        maxWidth="md"
        className="ThisIsTheFirstContainer"
      >
        {existingExercises && existingExercises.length === 0 && userBodyTrackerData.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              flexGrow: 1,
              height: "100%",
            }}
          >
            <IconButton
              aria-label="add workout"
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
              }}
              onClick={handleNewWorkout}
            >
              <AddIcon fontSize="medium" color="primary" />
              <Typography color="text.secondary">Add new exercise</Typography>
            </IconButton>

            <IconButton
              aria-label="add workout"
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => navigate("/home/workout/calendar")}
            >
              <ContentCopyIcon fontSize="medium" color="primary" />
              <Typography color="text.secondary">Copy previous workout</Typography>
            </IconButton>

            <IconButton
              aria-label="add workout"
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
              }}
              onClick={() => navigate("/home/workout/preset-workouts")}
            >
              <FormatListNumberedIcon fontSize="medium" color="primary" />
              <Typography color="text.secondary">Copy preset workout</Typography>
            </IconButton>
          </Box>
        ) : (
          <Box
            className="wrapperForTheExercisesGrouped"
            display="flex"
            flexDirection="column"
          >
            {existingExercises.map((group, index) => (
              
              <Card
                key={index}
                variant="outlined"
                sx={{
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              >
                <Button

                  sx={{
                    textAlign: "center",
                    fontSize:"large",
                    background:"#520975",
                    padding:0,
                    color:"white",
                    width:"100%",
                  }}
                  onClick={() =>
                    handleSelectWorkoutExercise(
                      group.name,
                      group.exercises[0].group
                    )
                  }
                >
                  {group.name.toLocaleUpperCase()}
                </Button>



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
                          sx={{ zIndex: -1, color: "neutral.main" }}
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
                        <Typography
                        sx={{color:"text.secondary"}}
                        >
                          {`${exercise.weight.toFixed(2)} ${
                            currentUserData && currentUserData.unitsSystem === "metric"
                              ? "kg"
                              : "lbs"
                          }`}
                        </Typography>
                      )}

                      {exercise.reps !== 0 && (
                        <Typography
                        sx={{color:"text.secondary"}}
                        >
                          {exercise.reps}
                          {exercise.amrap && "+"} reps
                        </Typography>
                      )}

                      {exercise.distance !== 0 && (
                        <Typography
                        sx={{color:"text.secondary"}}
                        >{`${exercise.distance} ${exercise.distance_unit}`}</Typography>
                      )}

                      {exercise.time !== 0 && (
                        <Typography
                        sx={{color:"text.secondary"}}
                        >
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
        )}
      </Container>
    </Box>
  );
}

export default NewWorkout;
