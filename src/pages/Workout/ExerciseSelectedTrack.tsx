import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";
import Exercise from "../../utils/interfaces/Exercise";
import CommentModal from "../../components/ui/CommentModal";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ValidationAlert from "../../components/ui/ValidationAlert";
import Autocomplete from "@mui/material/Autocomplete";
import formatTime from "../../utils/formatTime";
import Container from "@mui/material/Container";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { TrainingDataContext } from "../../context/TrainingData";
import { IUserSelectedExercises } from "../../context/TrainingData";
import { AuthContext } from "../../context/Auth";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/completeWorkout";
import updateExercisesPRAfterAction from "../../utils/IndexedDbCRUDFunctions/updateExercisesPRAfterAction";

function ExerciseSelectedTrack() {
  const { exerciseName } = useParams();
  const { userSelectedExercises, userTrainingData } =
    useContext(TrainingDataContext);
  const { currentUserData } = useContext(AuthContext);
  const exerciseSelected = userSelectedExercises[0].exercises.find(
    (exercise: IUserSelectedExercises) => exercise.name === exerciseName
  );

  const [existingExercises, setExistingExercises] = useState<Exercise[]>([]);
  const lastExercise = getLastCompletedExerciseEntry();

  function getLastCompletedExerciseEntry() {
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
  const [exerciseCommentId, setExerciseCommentId] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isDropset, setIsDropset] = useState<boolean>(false);
  const [alertTimeoutId, setAlertTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );
  const [dropsetRenderTrigger, setDropsetRenderTrigger] = useState(0);
  //const [lastExercise, setLastExercise] = useState<Exercise | null>(null);

  const entryToSave = {
    date: new Date(),
    exercise: exerciseSelected.name,
    category: exerciseSelected.category,
    weight: weightValue,
    reps: repsValue,
    distance: distanceValue,
    distance_unit: distanceUnit,
    time: timeValue,
    is_pr: false,
    dropset: false,
  };

  useEffect(() => {
    const fetchData = async () => {
      await getExistingExercises();
    };
    fetchData();
  }, []);

  async function getExistingExercises() {
    const request = indexedDB.open("fitScouterDb", 2);

    request.onsuccess = function () {
      const db = request.result;

      const userEntryTransaction = db.transaction(
        "user-exercises-entries",
        "readonly"
      );

      const userEntryTransactionStore = userEntryTransaction.objectStore(
        "user-exercises-entries"
      );

      const exerciseNameIndex =
        userEntryTransactionStore.index("exercise_name");

      const range = IDBKeyRange.only(exerciseSelected.name);

      const exercisesRequest = exerciseNameIndex.openCursor(range);

      const tempExistingExercises:
        | any[]
        | ((prevState: Exercise[]) => Exercise[]) = [];
      exercisesRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          tempExistingExercises.push(cursor.value);
          cursor.continue();
        } else {
          setExistingExercises(tempExistingExercises);
        }
      };

      exercisesRequest.onerror = function () {
        toast.error("Oops, getExistingExercises has an error!");
        console.error("Error retrieving existing exercises");
      };

      userEntryTransaction.oncomplete = function () {
        db.close();
      };
    };

    request.onerror = function () {
      toast.error("Oops, couldn't open the database!");
      console.log("Error opening database");
    };
  }

  function getExistingComment(exerciseCommentId: number) {
    const request = window.indexedDB.open("fitScouterDb");
    request.onsuccess = function (event: any) {
      const db = event.target.result;
      const transaction = db.transaction("user-exercises-entries", "readwrite");
      const objectStore = transaction.objectStore("user-exercises-entries");

      const getRequest = objectStore.get(exerciseCommentId);

      getRequest.onsuccess = function (event: any) {
        const data = event.target.result;
        if (data) {
          if (data.comment === undefined) {
            setCommentValue("");
          } else {
            setCommentValue(data.comment);
          }
          setIsDropset(data.dropset);
        } else {
        }
      };

      transaction.oncomplete = function () {};
      transaction.onerror = function () {
        toast.error("Oops, getExistingComment has an error!");
        console.log("Transaction error");
      };
    };

    request.onerror = function () {
      toast.error("Oops, couldn't open the database!");
      console.log("Error opening the database in getExistingComment!");
    };
  }

  function handleModalVisibility(exerciseId: number) {
    setExerciseCommentId(exerciseId);
    getExistingComment(exerciseId);
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

  function safelyParseFloat(value: string | number): number | null {
    if (typeof value === "string") {
      // If it's a string, parse it to a float
      return parseFloat(value) || null; // Use null if parsing fails
    } else if (typeof value === "number") {
      // If it's already a number, return it
      return value;
    } else {
      // Handle other types (optional)
      console.error("Unsupported type");
      return null;
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

    let weightValueFloat: number | null;

    weightValueFloat = safelyParseFloat(entryToSave.weight);

    if (weightValueFloat === null) {
      return;
    }

    const updatedEntryToSave = {
      date: entryToSave.date,
      exercise: entryToSave.exercise,
      category: entryToSave.category,
      reps: entryToSave.reps,
      distance: entryToSave.distance,
      distance_unit: entryToSave.distance_unit,
      time: entryToSave.time,
      is_pr: entryToSave.is_pr,
      dropset: entryToSave.dropset,
      weight: 0,
    };
    updatedEntryToSave.weight = weightValueFloat;

    try {
      const request = indexedDB.open("fitScouterDb", 2);

      request.onsuccess = function () {
        const db = request.result;

        const userEntryTransaction = db.transaction(
          "user-exercises-entries",
          "readwrite"
        );

        const userEntryTransactionStore = userEntryTransaction.objectStore(
          "user-exercises-entries"
        );

        userEntryTransactionStore.add(updatedEntryToSave);

        userEntryTransaction.oncomplete = async function () {
          db.close();
          await updateExercisesPRAfterAction(
            userTrainingData,
            exerciseSelected.name,
            updatedEntryToSave
          );
          await getExistingExercises();
        };

        request.onerror = function () {
          toast.error("Oops, saveExerciseEntry has an error!");
          console.log("found error:");
        };
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function deleteEntry(id: number, exerciseName: string) {
    try {
      const request = indexedDB.open("fitScouterDb", 2);

      request.onsuccess = function (event) {
        const db = (event.target as IDBRequest).result;

        const userEntryTransaction = db.transaction(
          "user-exercises-entries",
          "readwrite"
        );

        const userEntryTransactionStore = userEntryTransaction.objectStore(
          "user-exercises-entries"
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
            await getExistingExercises();
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
    console.log({ value });

    if (/^-?\d*[\.,]?\d*$/.test(value) || value === "" || value === null) {
      if (id === "reps") {
        setRepsValue(parseInt(value, 10));
      } else if (id === "weight") {
        console.log(typeof value);
        setWeightValue(value);
      } else if (id === "distance") {
        setDistanceValue(parseFloat(value));
      } else if (id === "time") {
        setTimeValue(parseFloat(value));
      }
    }
  }

  const handleAddButtonClick = (measurement: string) => {
    console.log(weightValue);
    console.log(typeof weightValue);

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
        } else {
          setWeightValue((prevWeight) =>
            typeof prevWeight === "string"
              ? parseFloat(prevWeight) > 0
                ? parseFloat(prevWeight) -
                  currentUserData.defaultWeightIncrement
                : 0
              : prevWeight > 0
              ? prevWeight - currentUserData.defaultWeightIncrement
              : 0
          );
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
    setWeightValue("");
    setRepsValue(0);
    setDistanceValue(0);
    setTimeValue(0);
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

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "56px",
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
        exerciseCommentId={exerciseCommentId}
        setDropsetRenderTrigger={setDropsetRenderTrigger}
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

          // Render for "weight" or "reps" measurement types
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
          variant="dbz_save"
          sx={{ width: "75%", margin: "0.25rem", fontWeight: "bold" }}
          onClick={saveExerciseEntry}
        >
          SAVE
        </Button>

        <Button
          variant="dbz_clear"
          sx={{ width: "75%", margin: "0.25rem", fontWeight: "bold" }}
          onClick={handleClearButtonClick}
        >
          CLEAR
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
                <AddCommentIcon
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

export default ExerciseSelectedTrack;
