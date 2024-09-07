import React, {
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  SyntheticEvent,
} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CommentIcon from "@mui/icons-material/Comment";
import ViewCommentModal from "../../../components/ui/ViewCommentModal";
import { Exercise } from "../../../utils/interfaces/IUserTrainingData";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../../utils/formatTime";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { AuthContext } from "../../../context/Auth";
import TextField from "@mui/material/TextField";
import AddNewPresetWorkoutForRoutineModal from "../../../components/ui/AddNewPresetWorkoutForRoutineModal";
import { Paper } from "@mui/material";
import AddExerciseToPresetWorkoutModal from "../../../components/ui/AddExerciseToPresetWorkoutModal";
import getNewPresetWorkoutExercises from "../../../utils/IndexedDbCRUDFunctions/getNewPresetWorkoutExercises";
import { useSearchParams } from "react-router-dom";
import { UserPresetWorkoutsDataContext } from "../../../context/UserPresetWorkouts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ArrowBackIosNew } from "@mui/icons-material";

function NewPresetWorkoutForRoutine() {

  const navigate = useNavigate();

  const { routineName } = useParams();

  const location = useLocation();
  const routine = location.state.routine;
  
  const encodedParameter = encodeURIComponent(routine.rName);

  const { currentUserData } = useContext(AuthContext);
  const [existingExercises, setExistingExercises] = useState<
    { name: string; exercises: Exercise[] }[]
  >([]);

  const [
    openAddExerciseToPresetWorkoutModal,
    setOpenAddExerciseToPresetWorkoutModal,
  ] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [
    openAddNewPresetWorkoutForRoutineModal,
    setOpenAddNewPresetWorkoutForRoutineModal,
  ] = useState(false);

  const [workoutState, setWorkoutState] = useState({
    workoutName:  "",
    workoutDescription: "",
    workoutLinkReference:  "",
    weekInterval:  0,
    routineName: routineName||"",
  });

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setWorkoutState((prevState) => ({ ...prevState, [id]: value }));
    // Create a new object with all current search parameters
/*     const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(id, value);

    // Update the URL without overwriting other parameters
    setSearchParams(newSearchParams);
 */
  };

  const isDataValidated = () => {
    if (
      workoutState.workoutName !== "" &&
      workoutState.workoutDescription !== ""&&
      (routine.multi?  workoutState.weekInterval:true)
    ) {
      return true;
    }

    return false;
  };

  const handleWeekIntervalChange = (event: SelectChangeEvent) => {
    setWorkoutState((prevState) => ({
      ...prevState,
      weekInterval: parseInt(event.target.value),
    }));
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await getNewPresetWorkoutExercises(setExistingExercises);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const [exerciseComment, setExerciseComment] = useState("");
  const [openViewCommentModal, setOpenViewCommentModal] = useState(false);

  const handleSelectWorkoutExercise = (
    exerciseName: string,
    exerciseGroup: string
  ) => {
    // Create the navigation URL, appending the search parameters
    const navigationUrl = `/home/workout/preset-workouts/preset-routine-details/${encodedParameter}/new-preset-workout/preset-workout-exercise/${exerciseName}`;

    // Navigate to the new URL with the search parameters
    navigate(navigationUrl, { state: { routine } });
  };

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
      <AddNewPresetWorkoutForRoutineModal
        openAddNewPresetWorkoutForRoutineModal={
          openAddNewPresetWorkoutForRoutineModal
        }
        setOpenAddNewPresetWorkoutForRoutineModal={
          setOpenAddNewPresetWorkoutForRoutineModal
        }
        existingExercises={existingExercises}
        workoutState={workoutState}
        routineId={routine.id}
      />

      <AddExerciseToPresetWorkoutModal
        openAddExerciseToPresetWorkoutModal={
          openAddExerciseToPresetWorkoutModal
        }
        setOpenAddExerciseToPresetWorkoutModal={
          setOpenAddExerciseToPresetWorkoutModal
        }
        searchParams={searchParams}
      />

      <ViewCommentModal
        openViewCommentModal={openViewCommentModal}
        setOpenViewCommentModal={setOpenViewCommentModal}
        exerciseComment={exerciseComment}
      />

      <Box position="fixed" sx={{ width: "100%", zIndex: 2 }}>
        <AppBar
          style={{
            top: 0,
            width: "100%",
            height: "56px"
          }}
        >
          <Container maxWidth="md">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: ".1rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                Add Workout to Routine
              </Typography>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 0,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  letterSpacing: ".0rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                Add W to Routine
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems:"flex-end",
                  justifyContent:"flex-end"
                }}
              >


                {existingExercises.length > 0 &&
                  isDataValidated() &&
                  workoutState.workoutName !== "" && (
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={() =>
                        setOpenAddNewPresetWorkoutForRoutineModal(
                          !openAddNewPresetWorkoutForRoutineModal
                        )
                      }
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
                  onClick={() =>
                    navigate(`/home/workout/preset-workouts/preset-routine-details/${encodedParameter}`,{state:{routine}})
                  }
                >
                  <ArrowBackIosNew sx={{ color: "white" }} />
                </IconButton>



              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        gap={2}
        pt={2}
      >
        <TextField
          fullWidth
          required
          id="workoutName"
          label="Workout Name"
          inputProps={{ maxLength: 48 }}
          variant="outlined"
          placeholder="Monday/Day 1/Workout A, etc..."
          onChange={handleFieldChange}
          value={workoutState.workoutName}
        />

        <TextField
          fullWidth
          required
          id="workoutDescription"
          label="Workout Description"
          variant="outlined"
          inputProps={{ maxLength: 512 }}
          placeholder="Add relevant details for your workout in this routine..."
          multiline
          rows={3}
          onChange={handleFieldChange}
          value={workoutState.workoutDescription}
        />

        {/*         <TextField
          fullWidth
          required
          id="weekInterval"
          label="Week Interval"
          inputProps={{ maxLength: 48 }}
          variant="outlined"
          placeholder="Week 1/Week 2/etc..."
          onChange={handleFieldChange}
          value={workoutState.weekInterval}
        /> */}

        {routine.multi &&

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Week Interval</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={String(workoutState.weekInterval)}
              label="Week Interval"
              onChange={handleWeekIntervalChange}
            >
              <MenuItem value={1}>Week 1</MenuItem>
              <MenuItem value={2}>Week 2</MenuItem>
              <MenuItem value={3}>Week 3</MenuItem>
              <MenuItem value={4}>Week 4</MenuItem>
              <MenuItem value={5}>Week 5</MenuItem>
              <MenuItem value={6}>Week 6</MenuItem>
              <MenuItem value={7}>Week 7</MenuItem>
              <MenuItem value={8}>Week 8</MenuItem>
              <MenuItem value={9}>Week 9</MenuItem>
              <MenuItem value={10}>Week 10</MenuItem>
              <MenuItem value={11}>Week 11</MenuItem>
              <MenuItem value={12}>Week 12</MenuItem>
            </Select>
          </FormControl>
        }

        <TextField
          fullWidth
          id="workoutLinkReference"
          label="Workout Link Reference"
          inputProps={{ maxLength: 1024 }}
          variant="outlined"
          placeholder="Add an external link to the workout..."
          onChange={handleFieldChange}
          value={workoutState.workoutLinkReference}
        />

        <Paper
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="outlined"
        >
          <IconButton
            aria-label="add workout"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() =>
              setOpenAddExerciseToPresetWorkoutModal(
                !openAddExerciseToPresetWorkoutModal
              )
            }
          >
            <AddIcon fontSize="medium" />
            <Typography fontSize="1rem" p={0} m={0}>
              Add exercises to this workout
              <br /> in your routine
            </Typography>
          </IconButton>
        </Paper>

        <Container
          sx={{ padding: 1, height: "100%" }}
          maxWidth="md"
        >
          <Box
            className="wrapperForTheExercisesGrouped"
            display="flex"
            flexDirection="column"
          >
            {existingExercises.map((group, index) => (
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
                  onClick={() =>
                    handleSelectWorkoutExercise(
                      group.name,
                      group.exercises[0].group
                    )
                  }
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
                            currentUserData && currentUserData.unitsSystem === "metric"
                              ? "kg"
                              : "lbs"
                          }`}
                        </Typography>
                      )}

                      {exercise.reps !== 0 && (
                        <Typography>
                          {exercise.reps}
                          {exercise.amrap && "+"} reps
                        </Typography>
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
        </Container>
      </Box>
    </Box>
  );
}

export default NewPresetWorkoutForRoutine;
