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
import { useNavigate } from "react-router-dom";
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
import AddExerciseToStandaloneWorkout from "../../../components/ui/AddExerciseToStandaloneWorkout";
import {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material/Autocomplete";

import { Card, Paper } from "@mui/material";

import getNewPresetWorkoutExercises from "../../../utils/IndexedDbCRUDFunctions/getNewPresetWorkoutExercises";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddNewPresetWorkoutModal from "../../../components/ui/AddNewPresetWorkoutModal";
import { useSearchParams } from "react-router-dom";
import { UserPresetWorkoutsDataContext } from "../../../context/UserPresetWorkouts";
import toast from "react-hot-toast";
function NewPresetWorkout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUserData } = useContext(AuthContext);
  const [existingExercises, setExistingExercises] = useState<
    { name: string; exercises: Exercise[] }[]
  >([]);

  const { presetWorkoutsData } = useContext(UserPresetWorkoutsDataContext);

  const existingRoutinesNames = getRoutineNames();

  const isDataValidated = () => {
    if (
      workoutState.workoutName !== "" &&
      workoutState.workoutDescription !== "" &&
      workoutState.workoutBy !== ""
    ) {
      return true;
    }

    return false;
  };
  const [routineTypeCheck, setRoutineTypeCheck] = useState(
    searchParams.get("routineTypeCheck") || "new"
  );
  const [workoutState, setWorkoutState] = useState({
    workoutName: searchParams.get("workoutName") || "",
    workoutDescription: searchParams.get("workoutDescription") || "",
    workoutLinkReference: searchParams.get("workoutLinkReference") || "",
    workoutBy: searchParams.get("workoutBy") || "",
  });

  const [exerciseComment, setExerciseComment] = useState("");
  const [openViewCommentModal, setOpenViewCommentModal] = useState(false);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setWorkoutState((prevState) => ({ ...prevState, [id]: value }));
    // Create a new object with all current search parameters
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(id, value);

    // Update the URL without overwriting other parameters
    setSearchParams(newSearchParams);
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

  const [
    openAddExerciseToStandaloneWorkout,
    setOpenAddExerciseToStandaloneWorkout,
  ] = useState(false);

  const [openAddNewPresetWorkoutModal, setOpenAddNewPresetWorkoutModal] =
    useState(false);
  function handleOpenAddExerciseToStandaloneWorkout() {
    setOpenAddExerciseToStandaloneWorkout(!openAddExerciseToStandaloneWorkout);
  }

  function handleopenAddNewPresetWorkoutModal() {
    setOpenAddNewPresetWorkoutModal(!openAddNewPresetWorkoutModal);
  }

  function getRoutineNames() {
    const tempRoutines: string[] = [];

    if (presetWorkoutsData.length > 0) {
      for (let index = 0; index < presetWorkoutsData.length; index++) {
        const presetWorkout = presetWorkoutsData[index];
        if (!tempRoutines.includes(presetWorkout.routineName)) {
          tempRoutines.push(presetWorkout.routineName);
        }
      }
    }

    return tempRoutines.sort(); // Sort the array alphabetically
  }

  const handleSelectWorkoutExercise = (
    exerciseName: string,
    exerciseGroup: string
  ) => {
    // Create the navigation URL, appending the search parameters
    const navigationUrl = `standalone-workout-exercise/${exerciseName}`;

    // Navigate to the new URL with the search parameters
    navigate(navigationUrl);

    //navigate(`preset-workout-exercise/${exerciseName}?${searchParamsString}`);
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
      <AddExerciseToStandaloneWorkout
        openAddExerciseToStandaloneWorkout={openAddExerciseToStandaloneWorkout}
        setOpenAddExerciseToStandaloneWorkout={
          setOpenAddExerciseToStandaloneWorkout
        }
        searchParams={searchParams}
      />

      <AddNewPresetWorkoutModal
        openAddNewPresetWorkoutModal={openAddNewPresetWorkoutModal}
        setOpenAddNewPresetWorkoutModal={setOpenAddNewPresetWorkoutModal}
        existingExercises={existingExercises}
        workoutState={workoutState}
        routineTypeCheck={routineTypeCheck}
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
                  letterSpacing: ".3rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                Add Preset Workout
              </Typography>
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
                Add Preset Workout
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "row-reverse",
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
                      onClick={handleopenAddNewPresetWorkoutModal}
                    >
                      <DoneOutlineIcon sx={{ color: "white" }} />
                    </IconButton>
                  )}
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
          placeholder="Day 1/Workout A/etc..."
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
          placeholder="Add relevant details for your workout..."
          multiline
          rows={3}
          onChange={handleFieldChange}
          value={workoutState.workoutDescription}
        />

        <Box display="flex" flexDirection="column" gap={2} width="100%">
          <TextField
            fullWidth
            required
            id="workoutBy"
            label="Workout Created By"
            inputProps={{ maxLength: 48 }}
            variant="outlined"
            placeholder="Add the name of the creator of this workout"
            onChange={handleFieldChange}
            value={workoutState.workoutBy}
          />

          <TextField
            fullWidth
            id="workoutLinkReference"
            label="Workout Link Reference"
            inputProps={{ maxLength: 256 }}
            variant="outlined"
            placeholder="Link external sources for this workout"
            onChange={handleFieldChange}
            value={workoutState.workoutLinkReference}
          />
        </Box>

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
            onClick={handleOpenAddExerciseToStandaloneWorkout}
          >
            <AddIcon fontSize="medium" />
            <Typography fontSize="1rem" p={0} m={0}>
              Add exercise to your preset workout
            </Typography>
          </IconButton>
        </Paper>

        <Container
          sx={{ padding: 1, height: "100%" }}
          maxWidth="md"
          className="ThisIsTheFirstContainer"
        >
          <Box
            className="wrapperForTheExercisesGrouped"
            display="flex"
            flexDirection="column"
          >
            {existingExercises.map((group, index) => (
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
                  onClick={() =>
                    handleSelectWorkoutExercise(
                      group.name,
                      group.exercises[0].group
                    )
                  }
                >
                  {group.name.toLocaleUpperCase()}
                </Typography>

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
                            currentUserData.unitsSystem === "metric"
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
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default NewPresetWorkout;
