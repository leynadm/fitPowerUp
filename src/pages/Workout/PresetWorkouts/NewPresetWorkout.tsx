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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import Autocomplete from "@mui/material/Autocomplete";
import capitalizeWords from "../../../utils/capitalizeWords";
import {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material/Autocomplete";

import { Paper } from "@mui/material";
import AddExerciseToPresetWorkoutModal from "../../../components/ui/AddExerciseToPresetWorkoutModal";
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
  const [workoutRoutineCheck, setWorkoutRoutineCheck] = useState(
    searchParams.get("workoutRoutineCheck") === "true" ? true : false
  );

  const isDataValidated = () => {
    if (
      workoutRoutineCheck &&
      routineTypeCheck === "new" &&
      workoutState.routineBy !== "" &&
      workoutState.routineName !== "" &&
      workoutState.routineDescription !== "" &&
      workoutState.workoutName !== "" &&
      workoutState.workoutDescription !== ""
    ) {
      return true;
    } else if (
      workoutRoutineCheck &&
      routineTypeCheck === "existing" &&
      workoutState.routineName !== "" &&
      workoutState.workoutName !== "" &&
      workoutState.workoutDescription !== ""
    ) {
      return true;
    } else if (
      !workoutRoutineCheck &&
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
    routineName: searchParams.get("routineName") || "",
    workoutName: searchParams.get("workoutName") || "",
    workoutDescription: searchParams.get("workoutDescription") || "",
    routineDescription: searchParams.get("routineDescription") || "",
    routineBy: searchParams.get("routineBy") || "",
    routineLinkReference: searchParams.get("routineLinkReference") || "",
    workoutLinkReference: searchParams.get("workoutLinkReference") || "",
    workoutBy: searchParams.get("workoutBy") || "",
  });

  const [exerciseComment, setExerciseComment] = useState("");
  const [openViewCommentModal, setOpenViewCommentModal] = useState(false);

  function handleRoutineTypeCheck(checkValue: string) {
    if (checkValue === "existing") {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("routineTypeCheck", "existing");
      // Update the URL without overwriting other parameters
      setSearchParams(newSearchParams);
      setRoutineTypeCheck("existing");
    } else if (checkValue === "new") {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("routineTypeCheck", "new");
      // Update the URL without overwriting other parameters
      setSearchParams(newSearchParams);
      setRoutineTypeCheck("new");
    }
  }

  const handleWorkoutNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (
      value !== "" &&
      existingRoutinesNames.includes(value.toLocaleLowerCase())
    ) {
      toast.error(`${value} routine already exists!`);
      return;
    }

    setWorkoutState((prevState) => ({ ...prevState, [id]: value }));
    // Create a new object with all current search parameters
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(id, value);

    // Update the URL without overwriting other parameters
    setSearchParams(newSearchParams);
  };

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
    openAddExerciseToPresetWorkoutModal,
    setOpenAddExerciseToPresetWorkoutModal,
  ] = useState(false);

  const [openAddNewPresetWorkoutModal, setOpenAddNewPresetWorkoutModal] =
    useState(false);
  function handleOpenAddExerciseToPresetWorkoutModal() {
    setOpenAddExerciseToPresetWorkoutModal(
      !openAddExerciseToPresetWorkoutModal
    );
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
    const searchParamsString = searchParams.toString();

    // Create the navigation URL, appending the search parameters
    const navigationUrl = `preset-workout-exercise/${exerciseName}?${searchParamsString}`;

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

  const handleRoutineChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any>
  ) => {
    if (newValue !== null) {
      setWorkoutState((prevState) => ({ ...prevState, routineName: newValue }));
      // Update the URL search parameters
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("routineName", newValue);
      setSearchParams(newSearchParams);
    }
  };

  const handleRoutineCheck = (
    event: React.SyntheticEvent,
    checked: boolean
  ) => {
    if (!checked) {
      setWorkoutRoutineCheck(false);
      setWorkoutState((prevState) => ({
        ...prevState,
        routineName: "",
        routineDescription: "",
        routineLinkReference: "",
        routineBy: "",
      }));
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("workoutRoutineCheck", "false");

      // Update the URL without overwriting other parameters
      setSearchParams(newSearchParams);
    } else {
      setWorkoutRoutineCheck(true);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("workoutRoutineCheck", "true");
      setWorkoutState((prevState) => ({
        ...prevState,
        routineName: "",
        routineDescription: "",
        routineLinkReference: "",
        routineBy: "",
        workoutBy: "",
        workoutLinkReference: "",
      }));

      // Update the URL without overwriting other parameters
      setSearchParams(newSearchParams);
    }
  };

  const isWorkoutRoutineChecked = () => {
    const param = searchParams.get("workoutRoutineCheck");
    return param === "true" ? true : false;
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AddExerciseToPresetWorkoutModal
        openAddExerciseToPresetWorkoutModal={
          openAddExerciseToPresetWorkoutModal
        }
        setOpenAddExerciseToPresetWorkoutModal={
          setOpenAddExerciseToPresetWorkoutModal
        }
        searchParams={searchParams}
      />

      <AddNewPresetWorkoutModal
        openAddNewPresetWorkoutModal={openAddNewPresetWorkoutModal}
        setOpenAddNewPresetWorkoutModal={setOpenAddNewPresetWorkoutModal}
        existingExercises={existingExercises}
        workoutState={workoutState}
        workoutRoutineCheck={workoutRoutineCheck}
        routineTypeCheck={routineTypeCheck}
      />
      <ViewCommentModal
        openViewCommentModal={openViewCommentModal}
        setOpenViewCommentModal={setOpenViewCommentModal}
        exerciseComment={exerciseComment}
      />

      <Box position="fixed" sx={{ width: "100%", zIndex: 2 }}>
        <AppBar
          elevation={2}
          style={{
            top: 0,
            width: "100%",
            height: "56px",
            background:
              "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
          }}
        >
          <Container maxWidth="md">
            <Toolbar disableGutters>
              {/* 
              <ChecklistRtlIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              /> */}

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Add Preset Workout
              </Typography>
              {/* 
              <ChecklistRtlIcon
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
                  color: "inherit",
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
      >
        <FormControlLabel
          control={<Switch />}
          checked={isWorkoutRoutineChecked()}
          onChange={handleRoutineCheck} // Passing additional value
          label={
            workoutRoutineCheck
              ? "This workout is part of a routine"
              : "This is a standalone workout"
          }
        />
        {workoutRoutineCheck && (
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            fullWidth
          >
            <Button
              onClick={() => handleRoutineTypeCheck("new")}
              sx={{ backgroundColor: "#520975" }}
            >
              New Routine
            </Button>
            <Button
              onClick={() => handleRoutineTypeCheck("existing")}
              sx={{ backgroundColor: "#520975" }}
            >
              Existing Routine
            </Button>
          </ButtonGroup>
        )}

        {workoutRoutineCheck && routineTypeCheck === "new" ? (
          <Box display="flex" flexDirection="column" gap={1} width="100%">
            <TextField
              fullWidth
              id="routineName"
              label="New Routine Name"
              variant="outlined"
              placeholder="Add your routine name"
              required
              onChange={handleWorkoutNameChange}
              value={workoutState.routineName}
              inputProps={{ maxLength: 48 }}
            />

            <TextField
              fullWidth
              id="routineDescription"
              label="New Routine Short Description"
              variant="outlined"
              placeholder="Add a routine description/summary"
              inputProps={{ maxLength: 1024 }}
              required
              multiline
              rows={3}
              onChange={handleFieldChange}
              value={workoutState.routineDescription}
            />

            <TextField
              fullWidth
              id="routineBy"
              label="Routine Created By"
              variant="outlined"
              inputProps={{ maxLength: 48 }}
              placeholder="Add the name of the creator of this routine"
              required
              onChange={handleFieldChange}
              value={workoutState.routineBy}
            />

            <TextField
              fullWidth
              id="routineLinkReference"
              label="Routine Link Reference"
              variant="outlined"
              inputProps={{ maxLength: 256 }}
              placeholder="Link external sources for this routine"
              onChange={handleFieldChange}
              value={workoutState.routineLinkReference}
            />
          </Box>
        ) : workoutRoutineCheck && routineTypeCheck === "existing" ? (
          <Autocomplete
            fullWidth
            disablePortal
            id="combo-box-demo"
            options={existingRoutinesNames}
            value={capitalizeWords(workoutState.routineName)}
            onChange={handleRoutineChange}
            renderInput={(params) => (
              <TextField {...params} label="Existing Routines" />
            )}
          />
        ) : null}

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

        {!workoutRoutineCheck && (
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
        )}

        <Paper
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          elevation={1}
        >
          <IconButton
            aria-label="add workout"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={handleOpenAddExerciseToPresetWorkoutModal}
          >
            <AddIcon fontSize="medium" />
            <Typography fontSize="1rem" p={0} m={0}>
              Add exercise to your preset workout
            </Typography>
          </IconButton>
        </Paper>

        <Container
          sx={{ padding: 1, height: "100%", paddingBottom: "56px" }}
          maxWidth="md"
          className="ThisIsTheFirstContainer"
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
                            currentUserData.unitsSystem === "metric"
                              ? "kgs"
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

export default NewPresetWorkout;
