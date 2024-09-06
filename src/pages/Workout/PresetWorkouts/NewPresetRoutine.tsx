import React, {
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  SyntheticEvent,
} from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { Exercise } from "../../../utils/interfaces/IUserTrainingData";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AddNewPresetRoutineModal from "../../../components/ui/AddNewPresetRoutineModal";
import { Paper } from "@mui/material";
import getNewPresetWorkoutExercises from "../../../utils/IndexedDbCRUDFunctions/getNewPresetWorkoutExercises";
import { useSearchParams } from "react-router-dom";
import { UserPresetWorkoutsDataContext } from "../../../context/UserPresetWorkouts";
import toast from "react-hot-toast";
function NewPresetRoutine() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [existingExercises, setExistingExercises] = useState<
    { name: string; exercises: Exercise[] }[]
  >([]);

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
    multi: false,
  });

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

  const handleSwitchChange = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
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

  const [openAddNewPresetRoutineModal, setOpenAddNewPresetRoutineModal] =
    useState(false);

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

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "calc(100svh - 112px)",
      }}
    >
      <Box position="fixed" sx={{ width: "100%", zIndex: 2 }}>
        <AppBar
          style={{
            top: 0,
            width: "100%",
            height: "56px",
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
                color:"#FFA500",
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
          <Paper sx={{ padding: 1, mt: 1, mb: 1 }} variant="outlined">
            <Typography  variant="secondary" fontWeight={500}>
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
            InputProps={{
              sx:{

              }
            }}
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
            InputProps={{
              sx:{

              }
            }}
            onChange={handleFieldChange}
            value={workoutState.routineDescription}
          />

          <TextField
            fullWidth
            id="routineBy"
            label="Routine Created By"
            variant="outlined"
            InputProps={{
              sx:{

              }
            }}
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
            InputProps={{
              sx:{

              }
            }}
            value={workoutState.routineLinkReference}
          />

          <Typography textAlign="center" variant="secondary" fontWeight={500}>
            Toggle the button below if your routine has different workouts
            across multiple weeks
          </Typography>
          <FormControlLabel
            control={<Switch />}
            checked={workoutState.multi}
            onChange={handleSwitchChange} // Passing additional value
            
            label={            
              workoutState.multi ? "Multi-week Routine" : "Standard Routine"
            }
            
          />
        </Box>
      </Box>
    </Box>
  );
}

export default NewPresetRoutine;
