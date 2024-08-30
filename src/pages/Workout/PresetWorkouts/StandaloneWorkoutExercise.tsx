import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentModal from "../../../components/ui/CommentModal";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ValidationAlert from "../../../components/ui/ValidationAlert";
import Autocomplete from "@mui/material/Autocomplete";
import formatTime from "../../../utils/formatTime";
import Container from "@mui/material/Container";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { UserTrainingDataContext } from "../../../context/UserTrainingData";
import { UserExercisesLibraryContext } from "../../../context/UserExercisesLibrary";
import { AuthContext } from "../../../context/Auth";
import { AppBar, Toolbar } from "@mui/material";
import AddHomeIcon from "@mui/icons-material/AddHome";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from "react-router-dom";
import {
  IWorkoutData,
  Exercise,
} from "../../../utils/interfaces/IUserTrainingData";
import { IUserExercisesLibrary } from "../../../utils/interfaces/IUserExercisesLibrary";
import updateExercisesPRAfterAction from "../../../utils/IndexedDbCRUDFunctions/updateExercisesPRAfterAction";
import LoadingScreenCircle from "../../../components/ui/LoadingScreenCircle";
import getExistingPresetExerciseComment from "../../../utils/IndexedDbCRUDFunctions/presetExercise/getExistingPresetExerciseComment";
import getExistingPresetExercises from "../../../utils/IndexedDbCRUDFunctions/presetExercise/getExistingPresetExercises";
import { validateIndexedDbEntry } from "../../../utils/IndexedDbCRUDFunctions/validateIndexedDbEntry";

function StandaloneWorkoutExercise() {
  const { exerciseName } = useParams();
  const navigate = useNavigate();

  
  
  const { userTrainingData, refetchUserTrainingData } = useContext(
    UserTrainingDataContext
  );
  const { userExercisesLibrary, refetchUserExercisesLibrary } = useContext(
    UserExercisesLibraryContext
  );

  const { currentUserData } = useContext(AuthContext);
  const [isAMRAP, setIsAMRAP] = useState(false);
  const [existingExercises, setExistingExercises] = useState<Exercise[]>([]);
  const lastExercise = getLastCompletedExerciseEntry();
  const [editingExercise, setEditingExercise] = useState(false);

  const [weightValue, setWeightValue] = useState(
    lastExercise?.weight !== undefined && lastExercise.weight !== 0
      ? lastExercise.weight
      : ""
  );
  const [repsValue, setRepsValue] = useState(
    lastExercise?.reps !== undefined && lastExercise.reps !== 0
      ? lastExercise.reps
      : 0
  );
  const [distanceValue, setDistanceValue] = useState(
    lastExercise?.distance !== undefined && lastExercise.distance !== 0
      ? lastExercise.distance
      : 0
  );
  const [distanceUnit, setDistanceUnit] = useState(
    lastExercise?.distance_unit || "m"
  );
  const [timeValue, setTimeValue] = useState(
    lastExercise?.time !== undefined && lastExercise.time !== 0
      ? lastExercise.time
      : 0
  );

  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [idExerciseUpdate, setIdExerciseUpdate] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isDropset, setIsDropset] = useState<boolean>(false);
  const [alertTimeoutId, setAlertTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );
  const [dropsetRenderTrigger, setDropsetRenderTrigger] = useState(0);
  //const [lastExercise, setLastExercise] = useState<Exercise | null>(null);

  const exerciseSelected =
    userExercisesLibrary.length > 0
      ? userExercisesLibrary[0].exercises.find(
          (exercise: IUserExercisesLibrary) => exercise.name === exerciseName
        )
      : null;

  useEffect(() => {
    const fetchData = async () => {
      if (userExercisesLibrary.length === 0) {
        await refetchUserTrainingData();
        await refetchUserExercisesLibrary();
      }
    };

    const fetchLocalExerciseData = async () => {
      if (exerciseSelected) {
        await getExistingPresetExercises(
          exerciseSelected.name,
          setExistingExercises
        );
      }
    };

    fetchLocalExerciseData();
    fetchData();
  }, [userExercisesLibrary, userTrainingData, exerciseSelected]);

  const entryToSave = {
    date: new Date(),
    exercise: exerciseSelected !== null ? exerciseSelected.name : null,
    group: exerciseSelected !== null ? exerciseSelected.group : null,
    weight: weightValue,
    reps: repsValue,
    distance: distanceValue,
    distance_unit: distanceUnit,
    time: timeValue,
    is_pr: false,
    dropset: false,
    amrap: false,
  };

  function getLastCompletedExerciseEntry() {
    if (userExercisesLibrary.length === 0) {
      return;
    }

    const userTrainingDataArr = userTrainingData;

    if (userTrainingDataArr) {
      const groupedCompletedExercises: {
        date: string;
        exercises: Exercise[];
      }[] = [];

      userTrainingDataArr.forEach((workoutEntry: IWorkoutData) => {
        workoutEntry.wExercises.forEach(
          (exerciseEntry: { name: string; exercises: Exercise[] }) => {
            const completedExerciseName = exerciseEntry.name.toUpperCase();
            const exercises = exerciseEntry.exercises;
            if (completedExerciseName === exerciseName?.toUpperCase()) {
              const date = workoutEntry.date; // Convert the date to a string for grouping
              groupedCompletedExercises.push({
                date,
                exercises: exercises,
              });
            }
          }
        );
      });

      groupedCompletedExercises.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      if (groupedCompletedExercises.length > 0) {
        let exercisesLength = groupedCompletedExercises[0].exercises.length - 1;
        const lastExercise =
          groupedCompletedExercises[0].exercises[exercisesLength];
        return lastExercise;
      }
    }
  }

  function handleUpdateExerciseSelection(
    exerciseId: number,
    exerciseReps: number,
    exerciseWeight: number,
    exerciseDistance: number,
    exerciseTime: number,
    exerciseDistanceUnit: string
  ) {
    setRepsValue(exerciseReps);
    setTimeValue(exerciseTime);
    setDistanceValue(exerciseDistance);
    setDistanceUnit(exerciseDistanceUnit);
    setWeightValue(exerciseWeight.toString());
    setEditingExercise(true);
    setIdExerciseUpdate(exerciseId);
  }

  function handleModalVisibility(exerciseId: number) {
    setIdExerciseUpdate(exerciseId);
    getExistingPresetExerciseComment(
      exerciseId,
      setCommentValue,
      setIsDropset,
      setIsAMRAP
    );
    setOpenCommentModal(!openCommentModal);
  }

  function exerciseFieldValidation() {
    if (
      exerciseSelected.measurement.includes("weight") &&
      exerciseSelected.measurement.includes("reps") &&
      exerciseSelected.measurement.length > 0
    ) {
      if (
        repsValue === 0 ||
        repsValue === null ||
        isNaN(repsValue) ||
        weightValue === "" ||
        weightValue === null ||
        weightValue === undefined
      ) {
        return "invalid";
      }
    }

    if (
      exerciseSelected.measurement.includes("weight") &&
      exerciseSelected.measurement.includes("distance") &&
      exerciseSelected.measurement.length > 0
    ) {
      if (
        (weightValue === "" ||
          weightValue === null ||
          weightValue === undefined) &&
        distanceValue === 0
      ) {
        return "invalid";
      }
    }

    if (
      exerciseSelected.measurement.includes("weight") &&
      exerciseSelected.measurement.includes("time") &&
      exerciseSelected.measurement.length > 0
    ) {
      if (
        (weightValue === "" ||
          weightValue === null ||
          weightValue === undefined) &&
        timeValue === 0
      ) {
        return "invalid";
      }
    }

    if (
      exerciseSelected.measurement.includes("reps") &&
      exerciseSelected.measurement.includes("distance") &&
      exerciseSelected.measurement.length > 0
    ) {
      if ((repsValue === 0 || repsValue === null) && distanceValue === 0) {
        return "invalid";
      }
    }

    if (
      exerciseSelected.measurement.includes("reps") &&
      exerciseSelected.measurement.includes("time") &&
      exerciseSelected.measurement.length > 0
    ) {
      if ((repsValue === 0 || repsValue === null) && timeValue === 0) {
        return "invalid";
      }
    }

    if (
      exerciseSelected.measurement.includes("distance") &&
      exerciseSelected.measurement.includes("time") &&
      exerciseSelected.measurement.length > 0
    ) {
      if (distanceValue === 0 && timeValue === 0) {
        return "invalid";
      }
    }

    if (
      exerciseSelected.measurement.includes("weight") &&
      exerciseSelected.measurement.length === 1
    ) {
      if (
        weightValue === "" ||
        weightValue === null ||
        weightValue === undefined
      ) {
        return "invalid";
      }
    }

    if (
      exerciseSelected.measurement.includes("reps") &&
      exerciseSelected.measurement.length === 1
    ) {
      if (repsValue === 0 || repsValue === null) {
        return "invalid";
      }
    }

    if (
      exerciseSelected.measurement.includes("distance") &&
      exerciseSelected.measurement.length === 1
    ) {
      if (distanceValue === 0) {
        return "invalid";
      }
    }

    if (
      exerciseSelected.measurement.includes("time") &&
      exerciseSelected.measurement.length === 1
    ) {
      if (timeValue === 0) {
        return "invalid";
      }
    }
  }

  function safelyParseFloat(value: string | number): number {
    let numberValue: number;

    if (typeof value === "string") {
      numberValue = parseFloat(value);
    } else if (typeof value === "number") {
      numberValue = value;
    } else {
      console.error("Unsupported type");
      return 0;
    }

    // Check for NaN or negative value
    return isNaN(numberValue) || numberValue < 0 ? 0 : numberValue;
  }

  async function handleSaveExerciseEntry() {
    if (editingExercise) {
      await updateExerciseEntry();
      setEditingExercise(false);
    } else {
      await saveExerciseEntry();
    }
  }

  async function saveExerciseEntry() {
    const checkEntriesValidity = exerciseFieldValidation();

    if (checkEntriesValidity) {
      setShowAlert(true);
      // Clear previous timeout if it exists
      if (alertTimeoutId) {
        clearTimeout(alertTimeoutId);
      }

      // Set new timeout to hide the alert after 2 seconds
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      setAlertTimeoutId(timeoutId);
      return;
    }

    let weightValueFloat = safelyParseFloat(entryToSave.weight);
    let repsValueFloat = safelyParseFloat(entryToSave.reps);
    let distanceValueFloat = safelyParseFloat(entryToSave.distance);
    let timeValueFloat = safelyParseFloat(entryToSave.time);

    const updatedEntryToSave = {
      date: entryToSave.date,
      exercise: entryToSave.exercise,
      group: entryToSave.group,
      reps: entryToSave.reps,
      distance: entryToSave.distance,
      distance_unit: entryToSave.distance_unit,
      time: entryToSave.time,
      is_pr: entryToSave.is_pr,
      dropset: entryToSave.dropset,
      weight: 0,
      amrap: entryToSave.amrap,
    };

    updatedEntryToSave.weight = weightValueFloat;
    updatedEntryToSave.reps = repsValueFloat;
    updatedEntryToSave.distance = distanceValueFloat;
    updatedEntryToSave.time = timeValueFloat;

    let secondEntryValidation = validateIndexedDbEntry(
      exerciseSelected.measurement,
      repsValueFloat,
      weightValueFloat,
      distanceValueFloat,
      timeValueFloat
    );

    if (secondEntryValidation) {
      toast.error("You can only use positive numbers!");
      return;
    }

    try {
      const request = indexedDB.open("fitPowerUpDb", 2);

      request.onsuccess = function () {
        const db = request.result;

        const userEntryTransaction = db.transaction(
          "user-preset-workouts",
          "readwrite"
        );

        const userEntryTransactionStore = userEntryTransaction.objectStore(
          "user-preset-workouts"
        );

        userEntryTransactionStore.add(updatedEntryToSave);

        userEntryTransaction.oncomplete = async function () {
          db.close();
          await updateExercisesPRAfterAction(
            userTrainingData,
            exerciseSelected.name,
            updatedEntryToSave
          );
          await getExistingPresetExercises(
            exerciseSelected.name,
            setExistingExercises
          );
        };

        request.onerror = function () {
          toast.error("Oops, saveExerciseEntry has an error!");
        };
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function updateExerciseEntry() {
    const checkEntriesValidity = exerciseFieldValidation();

    if (checkEntriesValidity) {
      setShowAlert(true);
      // Clear previous timeout if it exists
      if (alertTimeoutId) {
        clearTimeout(alertTimeoutId);
      }

      // Set new timeout to hide the alert after 2 seconds
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      setAlertTimeoutId(timeoutId);
      return;
    }

    let weightValueFloat = safelyParseFloat(entryToSave.weight);
    let repsValueFloat = safelyParseFloat(entryToSave.reps);
    let distanceValueFloat = safelyParseFloat(entryToSave.distance);
    let timeValueFloat = safelyParseFloat(entryToSave.time);

    let secondEntryValidation = validateIndexedDbEntry(
      exerciseSelected.measurement,
      repsValueFloat,
      weightValueFloat,
      distanceValueFloat,
      timeValueFloat
    );

    if (secondEntryValidation) {
      toast.error("You can only use positive numbers!");
      return;
    }

    try {
      const request = indexedDB.open("fitPowerUpDb", 2);

      request.onerror = function (event) {
        toast.error("Oops, there was an error opening the database.");
      };

      request.onsuccess = function () {
        const db = request.result;

        const userEntryTransaction = db.transaction(
          "user-preset-workouts",
          "readwrite"
        );

        userEntryTransaction.onerror = function (event) {
          toast.error("Oops, there was an error with the transaction.");
        };

        const userEntryTransactionStore = userEntryTransaction.objectStore(
          "user-preset-workouts"
        );

        const getRequest = userEntryTransactionStore.get(idExerciseUpdate);

        getRequest.onsuccess = function (event) {
          const data = (event.target as IDBRequest).result;
          if (data) {
            data.weight = weightValueFloat;
            data.reps = repsValue;
            data.distance = distanceValue;
            data.time = timeValue;

            const updateRequest = userEntryTransactionStore.put(data);

            updateRequest.onsuccess = async function () {
              await updateExercisesPRAfterAction(
                userTrainingData,
                exerciseSelected.name,
                data
              );
              await getExistingPresetExercises(
                exerciseSelected.name,
                setExistingExercises
              );
            };

            updateRequest.onerror = function () {
              toast.error("Oops, there was an error updating the record.");
              console.error("Error updating record");
            };
          } else {
            //console.log("Record not found");
          }
        };

        userEntryTransaction.oncomplete = function () {
          db.close();
        };
      };
    } catch (error) {
      toast.error("Oops, an unexpected error occurred!");
      console.error("Error:", error);
    }
  }

  async function deleteEntry(id: number, exerciseName: string) {
    try {
      const request = indexedDB.open("fitPowerUpDb", 2);

      request.onsuccess = function (event) {
        const db = (event.target as IDBRequest).result;

        const userEntryTransaction = db.transaction(
          "user-preset-workouts",
          "readwrite"
        );

        const userEntryTransactionStore = userEntryTransaction.objectStore(
          "user-preset-workouts"
        );

        const getRecordRequest = userEntryTransactionStore.get(id);

        getRecordRequest.onsuccess = async function (event: Event) {
          const record = (event.target as IDBRequest).result;

          const deleteRecordRequest = userEntryTransactionStore.delete(id);

          deleteRecordRequest.onsuccess = async function () {
            await updateExercisesPRAfterAction(
              userTrainingData,
              exerciseSelected.name,
              record
            );
            await getExistingPresetExercises(
              exerciseSelected.name,
              setExistingExercises
            );
          };

          deleteRecordRequest.onerror = function (event: Event) {
            console.error(
              "Error deleting record:",
              (event.target as IDBRequest).error
            );
          };
        };
        getRecordRequest.onerror = function (event: Event) {
          console.error(
            "Error getting record:",
            (event.target as IDBRequest).error
          );
        };
      };
    } catch (error) {
      console.error("Error opening database:", error);
    }
  }

  function handleTextFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    if (/^-?\d*[\.,]?\d*$/.test(value) || value === "" || value === null) {
      if (id === "reps") {
        setRepsValue(parseInt(value, 10));
      } else if (id === "weight") {
        setWeightValue(value);
      } else if (id === "distance") {
        setDistanceValue(parseFloat(value));
      } else if (id === "time") {
        setTimeValue(parseFloat(value));
      }
    }
  }

  const handleAddButtonClick = (measurement: string) => {
    switch (measurement.toLocaleLowerCase()) {
      case "weight":
        if (weightValue === "" || weightValue === null) {
          setWeightValue(0 + currentUserData.defaultWeightIncrement);
        } else {
          setWeightValue((prevWeight) =>
            typeof prevWeight === "string"
              ? parseFloat(prevWeight) + currentUserData.defaultWeightIncrement
              : prevWeight + currentUserData.defaultWeightIncrement
          );
        }
        break;
      case "reps":
        setRepsValue((prevReps) => prevReps + 1); // Convert the result to a string
        break;
      default:
        break;
    }
  };

  const handleSubtractButtonClick = (measurement: string) => {
    switch (measurement.toLocaleLowerCase()) {
      case "weight":
        if (weightValue === "" || weightValue === null) {
          // Handle the case where weightValue is empty or null
        } else {
          setWeightValue((prevWeight) => {
            // Ensure prevWeight is a number
            let numericPrevWeight =
              typeof prevWeight === "string"
                ? parseFloat(prevWeight)
                : prevWeight;

            // Calculate the new weight
            let updatedWeight =
              numericPrevWeight - currentUserData.defaultWeightIncrement;

            // Check if the new weight is less than 0, if so, set it to 0
            if (updatedWeight < 0) {
              return 0;
            } else {
              // Otherwise, fix to two decimal places and return
              return parseFloat(updatedWeight.toFixed(2));
            }
          });
        }
        break;

      case "reps":
        setRepsValue((prevReps) =>
          typeof prevReps === "string"
            ? parseInt(prevReps, 10) > 0
              ? parseInt(prevReps, 10) - 1
              : 0
            : prevReps > 0
            ? prevReps - 1
            : 0
        );
        break;

      default:
        break;
    }
  };

  function handleClearButtonClick() {
    if (editingExercise) {
      setEditingExercise(false);
    } else {
      setWeightValue("");
      setRepsValue(0);
      setDistanceValue(0);
      setTimeValue(0);
    }
  }

  const handleTimeFieldsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let inputValue = Number(value);

    if (inputValue < 0) {
      inputValue = 0; // Set negative values to 0
    }

    if (id === "hh") {
      setTimeValue((prevTimeValue) => {
        const minutes = Math.floor((prevTimeValue % 3600) / 60);
        const remainingSeconds = prevTimeValue % 60;
        return inputValue * 3600 + minutes * 60 + remainingSeconds;
      });
    } else if (id === "mm") {
      setTimeValue((prevTimeValue) => {
        const hours = Math.floor(prevTimeValue / 3600);
        const remainingSeconds = prevTimeValue % 60;
        return hours * 3600 + inputValue * 60 + remainingSeconds;
      });
    } else if (id === "ss") {
      setTimeValue((prevTimeValue) => {
        const hours = Math.floor(prevTimeValue / 3600);
        const minutes = Math.floor((prevTimeValue % 3600) / 60);
        return hours * 3600 + minutes * 60 + inputValue;
      });
    }
  };

  if (userExercisesLibrary.length === 0 || exerciseSelected === null) {
    return (
      <LoadingScreenCircle text="Waiting for Frieza to finish his monologue about ruling the universe..." />
    );
  }

  const handleNewWorkout = () => {
    const navigationUrl = `/home/workout/preset-workouts/new-preset-workout`;

    // Navigate to the new URL with the search parameters
    navigate(navigationUrl);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      maxWidth="md"
    >
      <ValidationAlert showAlert={showAlert} />
      <CommentModal
        openCommentModal={openCommentModal}
        setOpenCommentModal={setOpenCommentModal}
        commentValue={commentValue}
        setCommentValue={setCommentValue}
        setIsDropset={setIsDropset}
        isDropset={isDropset}
        idExerciseUpdate={idExerciseUpdate}
        setDropsetRenderTrigger={setDropsetRenderTrigger}
        databaseSelection="user-preset-workouts"
        setIsAMRAP={setIsAMRAP}
        isAMRAP={isAMRAP}
      />

      <Typography
        sx={{
          padding: {
            xs: "0.25rem", // Padding for extra small screens
            sm: "0.5rem", // Padding for small screens
            md: "0.75rem", // Padding for medium screens
            lg: "1.25rem", // Padding for large screens
          },
          textAlign: "center",
        }}
        variant="h6"
      >
        {exerciseSelected.name.toLocaleUpperCase()}
      </Typography>

      <AppBar
        elevation={2}
        position="fixed"
        style={{
          top: 0,
          height: "56px",
          background:
            "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            {/* 
            <EditNoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
             */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Add Preset Exercise
            </Typography>
            {/*  
            <EditNoteIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,

                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Add Preset Exercise
            </Typography>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleNewWorkout}
                >
                  <AddHomeIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Divider sx={{ width: "100vw" }} />

      {exerciseSelected.measurement.map(
        (measurement: string, index: number) => {
          if (measurement === "distance") {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                  width: "100%",
                }}
              >
                <Typography
                  key={index}
                  sx={{
                    width: "100%",
                    fontSize: "larger",
                    margin: "0.15rem",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {measurement.toLocaleUpperCase()}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <TextField
                    id={measurement}
                    value={distanceValue}
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      style: {
                        fontSize: "1.5rem",
                        textAlign: "center",
                        padding: "10px",
                        fontStyle: editingExercise ? "italic" : "normal",
                      },
                    }}
                    sx={{ textAlign: "center", width: "100%" }}
                    variant="filled"
                    onChange={handleTextFieldChange}
                  />

                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={distanceUnit.toString()}
                    options={["m", "km", "ft", "mi"]}
                    onChange={(event, newValue) => {
                      setDistanceUnit(newValue || "m");
                    }}
                    disableClearable
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Box>
              </Box>
            );
          }

          if (measurement === "time") {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                }}
              >
                <Typography
                  key={index}
                  sx={{
                    width: "100%",
                    fontSize: "larger",
                    margin: "0.15rem",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {measurement.toLocaleUpperCase()}
                </Typography>

                <Box sx={{ display: "flex", gap: "8px" }}>
                  <TextField
                    id="hh"
                    value={Math.floor(timeValue / 3600)}
                    label="hh"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      style: {
                        fontSize: "1.5rem",
                        textAlign: "center",
                        padding: "8px",
                        fontStyle: editingExercise ? "italic" : "normal",
                      },
                    }}
                    sx={{ textAlign: "center" }}
                    variant="filled"
                    onChange={handleTimeFieldsChange}
                  />
                  <TextField
                    id="mm"
                    value={Math.floor((timeValue % 3600) / 60)}
                    label="mm"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      style: {
                        fontSize: "1.5rem",
                        textAlign: "center",
                        padding: "8px",
                        fontStyle: editingExercise ? "italic" : "normal",
                      },
                    }}
                    sx={{ textAlign: "center" }}
                    variant="filled"
                    onChange={handleTimeFieldsChange}
                  />
                  <TextField
                    id="ss"
                    value={timeValue % 60}
                    label="ss"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      style: {
                        fontSize: "1.5rem",
                        textAlign: "center",
                        padding: "8px",
                        fontStyle: editingExercise ? "italic" : "normal",
                      },
                    }}
                    sx={{ textAlign: "center" }}
                    variant="filled"
                    onChange={handleTimeFieldsChange}
                  />
                </Box>
              </Box>
            );
          }

          // Render for "weight" and/or "reps" measurement types
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
              }}
            >
              <Typography
                key={index}
                sx={{
                  width: "100%",
                  fontSize: "larger",
                  margin: "0.15rem",
                  cursor: "pointer",
                  textAlign: "center",
                  fontStyle: editingExercise ? "italic" : "normal",
                }}
              >
                {measurement.toLocaleUpperCase()}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Button
                  sx={{ backgroundColor: "white" }}
                  variant="outlined"
                  onClick={() => handleSubtractButtonClick(measurement)}
                >
                  <RemoveIcon />
                </Button>

                <TextField
                  type={measurement === "weight" ? "text" : "number"}
                  id={measurement}
                  variant="filled"
                  inputProps={{
                    style: {
                      fontSize: "1.5rem",
                      textAlign: "center",
                      height: "100%",
                      padding: "8px",
                      fontStyle: editingExercise ? "italic" : "normal",
                    },
                    inputMode: "decimal",
                  }}
                  value={measurement === "weight" ? weightValue : repsValue}
                  onChange={handleTextFieldChange}
                />

                <Button
                  sx={{ backgroundColor: "white" }}
                  variant="outlined"
                  onClick={() => handleAddButtonClick(measurement)}
                >
                  <AddIcon />
                </Button>
              </Box>
            </Box>
          );
        }
      )}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          paddingTop: "0.5rem",
        }}
      >
        <Button
          variant={editingExercise ? "dbz_mini" : "dbz_save"}
          sx={{ width: "75%", margin: "0.25rem", fontWeight: "bold" }}
          onClick={handleSaveExerciseEntry}
        >
          {editingExercise ? "UPDATE" : "SAVE"}
        </Button>

        <Button
          variant={editingExercise ? "dbz_mini" : "dbz_save"}
          sx={{ width: "75%", margin: "0.25rem", fontWeight: "bold" }}
          onClick={handleClearButtonClick}
        >
          {editingExercise ? "CANCEL" : "CLEAR"}
        </Button>
      </Box>

      <Box>
        {existingExercises.map((exercise, index) => (
          <Container
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr 1fr",
              alignItems: "center",
              width: "100vw",
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => handleModalVisibility(exercise.id)}
              >
                <BorderColorIcon
                  sx={{
                    zIndex: 0,
                  }}
                />
              </IconButton>

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
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                justifyItems: "center",
                justifyContent: "center",
                borderLeft: exercise.dropset
                  ? "5px solid red"
                  : "5px solid transparent",
              }}
              onClick={() =>
                handleUpdateExerciseSelection(
                  exercise.id,
                  exercise.reps,
                  exercise.weight,
                  exercise.distance,
                  exercise.time,
                  exercise.distance_unit
                )
              }
            >
              {exercise.weight !== 0 && (
                <Typography
                  fontStyle={
                    editingExercise && idExerciseUpdate === exercise.id
                      ? "italic"
                      : "normal"
                  }
                >
                  {`${exercise.weight.toFixed(2)} ${
                    currentUserData.unitsSystem === "metric" ? "kg" : "lbs"
                  }`}
                </Typography>
              )}
              {exercise.reps !== 0 && (
                <Typography
                  fontStyle={
                    editingExercise && idExerciseUpdate === exercise.id
                      ? "italic"
                      : "normal"
                  }
                >
                  {exercise.reps}
                  {exercise.amrap && "+"} reps
                </Typography>
              )}

              {exercise.distance !== 0 && (
                <Typography
                  fontStyle={
                    editingExercise && idExerciseUpdate === exercise.id
                      ? "italic"
                      : "normal"
                  }
                >{`${exercise.distance} ${exercise.distance_unit}`}</Typography>
              )}

              {exercise.time !== 0 && (
                <Typography
                  fontStyle={
                    editingExercise && idExerciseUpdate === exercise.id
                      ? "italic"
                      : "normal"
                  }
                >
                  {exercise.time !== 0 ? formatTime(exercise.time) : ""}
                </Typography>
              )}
            </Box>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => deleteEntry(exercise.id, exercise.exercise)}
            >
              <DeleteIcon
                sx={{
                  zIndex: 0,
                }}
              />
            </IconButton>
          </Container>
        ))}
      </Box>
    </Container>
  );
}

export default StandaloneWorkoutExercise;
