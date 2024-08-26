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
import AddNewPresetRoutineModal from "../../../components/ui/AddNewPresetRoutineModal";
import { Paper } from "@mui/material";
import AddExerciseToPresetWorkoutModal from "../../../components/ui/AddExerciseToPresetWorkoutModal";
import getNewPresetWorkoutExercises from "../../../utils/IndexedDbCRUDFunctions/getNewPresetWorkoutExercises";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddNewPresetWorkoutModal from "../../../components/ui/AddNewPresetWorkoutModal";
import { useSearchParams } from "react-router-dom";
import { UserPresetWorkoutsDataContext } from "../../../context/UserPresetWorkouts";
import toast from "react-hot-toast";
function NewPresetRoutine() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [existingExercises, setExistingExercises] = useState<
    { name: string; exercises: Exercise[] }[]
  >([]);
  const [multiWeeksRoutineCheck, setMultiWeeksRoutineCheck] = useState(false);

  const { presetWorkoutsData } = useContext(UserPresetWorkoutsDataContext);

  const existingRoutinesNames = getRoutineNames();
  
  const isDataValidated = () => {
    if (
      workoutState.routineName !== "" &&
      workoutState.routineBy !== "" &&
      workoutState.routineDescription !== ""
    ) {
      return true;
    }

    return false;
  };


  const [workoutState, setWorkoutState] = useState({
    routineName: searchParams.get("routineName") || "",
    routineDescription: searchParams.get("routineDescription") || "",
    routineBy: searchParams.get("routineBy") || "",
    routineLinkReference: searchParams.get("routineLinkReference") || "",
    multi:multiWeeksRoutineCheck
  });

  const [exerciseComment, setExerciseComment] = useState("");
  const [openViewCommentModal, setOpenViewCommentModal] = useState(false);

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

  const handleSwitchChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    setWorkoutState((prevState) => ({ ...prevState, multi: checked }));
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
    openAddExerciseToPresetRoutineModal,
    setOpenAddExerciseToPresetRoutineModal,
  ] = useState(false);

  const [openAddNewPresetRoutineModal, setOpenAddNewPresetRoutineModal] =
    useState(false);
  function handleOpenAddExerciseToPresetRoutineModal() {
    setOpenAddExerciseToPresetRoutineModal(
      !openAddExerciseToPresetRoutineModal
    );
  }

  function handleopenAddNewPresetRoutineModal() {
    setOpenAddNewPresetRoutineModal(!openAddNewPresetRoutineModal);
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

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "calc(100svh - 112px)",
      }}
    >
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
                Add New Routine
              </Typography>
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
                Add New Routine
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                {isDataValidated() && (
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleopenAddNewPresetRoutineModal}
                  >
                    <DoneOutlineIcon sx={{ color: "white" }} />
                  </IconButton>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <AddNewPresetRoutineModal
        openAddNewPresetRoutineModal={openAddNewPresetRoutineModal}
        setOpenAddNewPresetRoutineModal={setOpenAddNewPresetRoutineModal}
        existingExercises={existingExercises}
        workoutState={workoutState}
      />

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        gap={4}
        pt={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          width="100%"
          justifyContent="center"
          alignItems="center"
          pb="72px"
        >
          <Paper sx={{ padding: 1, mt: 1, mb: 1 }} elevation={2}>
            <Typography fontSize="small">
              A routine can contain multiple workouts, with workouts that can be
              distributed across multiple weeks.
              <br />
              You can create new routines any time you want.
              <br />
              After you create your routine, you'll be able to add new workouts
              to it.
            </Typography>
          </Paper>
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

          <Typography fontSize="small" textAlign="center">
            Toggle the button below if your routine has different workouts
            across multiple weeks
          </Typography>
          <FormControlLabel
            control={<Switch />}
            checked={workoutState.multi}
            onChange={handleSwitchChange} // Passing additional value
            label={
              multiWeeksRoutineCheck ? "Multi-week Routine" : "Standard Routine"
            }
          />
{/*           <Button variant="dbz_mini">Next</Button> */}
        </Box>
      </Box>
    </Box>
  );
}

export default NewPresetRoutine;
