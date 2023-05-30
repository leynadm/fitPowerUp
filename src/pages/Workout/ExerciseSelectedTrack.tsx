import React, { useState, useEffect, ChangeEvent } from "react";
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
import checkExercisePR from "../../utils/CRUDFunctions/checkExercisePR";
import updateExerciseIsPrToFalse from "../../utils/CRUDFunctions/updateExerciseIsPrToFalse";
import findMaxReps from "../../utils/CRUDFunctions/findMaxReps";
import findMaxWeight from "../../utils/CRUDFunctions/findMaxWeight";

interface ExerciseSelectionProps {
  selectedExercise: { category: string; name: string; measurement: any[] };
  todayDate: Date | undefined;
  unitsSystem: string;
  weightIncrementPreference: number;
}

interface ExerciseRecord {
  date: string;
  category: string;
  distance: number;
  distance_unit: string;
  exercise: string;
  id: number;
  reps: number;
  time: number;
  weight: number;
  is_pr: boolean;
}

function ExerciseSelectedTrack({
  selectedExercise,
  todayDate,
  unitsSystem,
  weightIncrementPreference,
}: ExerciseSelectionProps) {
  const [weightValue, setWeightValue] = useState(0);
  const [repsValue, setRepsValue] = useState(0);
  const [distanceValue, setDistanceValue] = useState(0);
  const [distanceUnit, setDistanceUnit] = useState("m");
  const [timeValue, setTimeValue] = useState(0);
  const [existingExercises, setExistingExercises] = useState<Exercise[]>([]);
  const [userDataInput, setUserDataInput] = useState(false);
  const [userUpdatedExerciseData, setUserUpdatedExerciseData] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [exerciseCommentId, setExerciseCommentId] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTimeoutId, setAlertTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );

  const [entryToSave, setEntryToSave] = useState({
    date: todayDate,
    exercise: selectedExercise.name,
    category: selectedExercise.category,
    weight: weightValue,
    reps: repsValue,
    distance: distanceValue,
    distance_unit: distanceUnit,
    time: timeValue,
    is_pr: false,
  });

  useEffect(() => {
    getExistingExercises();
  }, []);

  useEffect(() => {
    if (userUpdatedExerciseData) {
      return;
    }

    if (existingExercises.length > 0) {
      const lastExercise = existingExercises[existingExercises.length - 1];
      setWeightValue(lastExercise.weight);
      setRepsValue(lastExercise.reps);
      setDistanceValue(lastExercise.distance);
      setTimeValue(lastExercise.time);

      setUserUpdatedExerciseData(true);
    }
  }, [existingExercises]);

  useEffect(() => {
    setEntryToSave((prevState) => ({
      ...prevState,
      weight: weightValue,
      reps: repsValue,
      distance: distanceValue,
      time: timeValue,
      distance_unit: distanceUnit,
      is_pr: false,
    }));
  }, [weightValue, repsValue, distanceValue, timeValue, distanceUnit]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function getExistingExercises() {
    if (!todayDate) {
      return;
    }

    const request = indexedDB.open("fitScouterDb", 1);

    request.onsuccess = function () {
      const db = request.result;

      const userEntryTransaction = db.transaction(
        "user-exercises-entries",
        "readonly"
      );

      const userEntryTransactionStore = userEntryTransaction.objectStore(
        "user-exercises-entries"
      );

      const exerciseNameAndDateIndex = userEntryTransactionStore.index(
        "exercise_name_and_date"
      );

      const range = IDBKeyRange.bound(
        [selectedExercise.name, todayDate],
        [selectedExercise.name, todayDate] // Use the same date for both bounds
      );

      const exercisesRequest = exerciseNameAndDateIndex.openCursor(range);

      const tempExistingExercises:
        | any[]
        | ((prevState: Exercise[]) => Exercise[]) = [];
      exercisesRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          tempExistingExercises.push(cursor.value);
          cursor.continue();
        } else {
          console.log("logging existing exercises:");

          console.log(tempExistingExercises);

          setExistingExercises(tempExistingExercises);
        }
      };

      exercisesRequest.onerror = function () {
        console.error("Error retrieving existing exercises");
      };

      userEntryTransaction.oncomplete = function () {
        db.close();
      };
    };

    request.onerror = function () {
      console.log("Error opening database");
    };
  }

  function handleModalVisibility(exerciseId: number) {
    setExerciseCommentId(exerciseId);
    setOpenCommentModal(!openCommentModal);
  }

  function exerciseFieldValidation() {
    for (const element of selectedExercise.measurement) {
      if (element === "weight" && weightValue === 0) {
        return "invalid";
      }
      if (element === "reps" && repsValue === 0) {
        return "invalid";
      }
      if (element === "distance" && distanceValue === 0) {
        return "invalid";
      }

      if (element === "time" && timeValue === 0) {
        return "invalid";
      }
    }
  }

  async function saveExerciseEntry() {
    try {
      const prResult: any = await checkExercisePR(selectedExercise.name);
      console.log("logging promise result");
      console.log(prResult);

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

      const request = indexedDB.open("fitScouterDb", 1);

      request.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("user_exercises-entries")) {
          const userEntries = db.createObjectStore("user_exercises-entries", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };

      request.onsuccess = function () {
        const db = request.result;

        console.log(weightValue, repsValue, distanceValue, timeValue);
        const userEntryTransaction = db.transaction(
          "user-exercises-entries",
          "readwrite"
        );

        const userEntryTransactionStore = userEntryTransaction.objectStore(
          "user-exercises-entries"
        );

        if (prResult === null) {
          const transaction = db.transaction(
            "user-records-entries",
            "readwrite"
          );
          const objectStore = transaction.objectStore("user-records-entries");
          entryToSave.is_pr = true;
          userEntryTransactionStore.add(entryToSave);
          objectStore.add(entryToSave);
        } else {
          if (entryToSave.reps > prResult.reps && entryToSave.weight>prResult.weight) {
            prResult.reps = entryToSave.reps;
            entryToSave.is_pr = true;
            userEntryTransactionStore.add(entryToSave);

            const transaction = db.transaction(
              "user-records-entries",
              "readwrite"
            );
            const objectStore = transaction.objectStore("user-records-entries");
            const index = objectStore.index("exercise_name");
            updateExerciseIsPrToFalse(
              selectedExercise.name,
              entryToSave.weight,
              entryToSave.reps
            );
            const getRequest = index.get(selectedExercise.name);
            getRequest.onsuccess = function () {
              const existingRecord = getRequest.result;
              if (existingRecord) {
                existingRecord.reps = entryToSave.reps;
                existingRecord.weight = entryToSave.weight;
                const updateRequest = objectStore.put(existingRecord);
                updateRequest.onsuccess = function () {
                  console.log("PR updated successfully");
                };
                updateRequest.onerror = function () {
                  console.log("Failed to update PR");
                };
              }
            };
          } else if (entryToSave.reps > prResult.reps) {
            prResult.reps = entryToSave.reps;
            entryToSave.is_pr = true;
            userEntryTransactionStore.add(entryToSave);

            const transaction = db.transaction(
              "user-records-entries",
              "readwrite"
            );
            const objectStore = transaction.objectStore("user-records-entries");
            const index = objectStore.index("exercise_name");
            updateExerciseIsPrToFalse(
              selectedExercise.name,
              entryToSave.weight,
              entryToSave.reps
            );
            const getRequest = index.get(selectedExercise.name);
            getRequest.onsuccess = function () {
              const existingRecord = getRequest.result;
              if (existingRecord) {
                existingRecord.reps = entryToSave.reps;
                const updateRequest = objectStore.put(existingRecord);
                updateRequest.onsuccess = function () {
                  console.log("PR updated successfully");
                };
                updateRequest.onerror = function () {
                  console.log("Failed to update PR");
                };
              }
            };
          } else if (entryToSave.weight > prResult.weight) {
            prResult.weight = entryToSave.weight;
            entryToSave.is_pr = true;
            userEntryTransactionStore.add(entryToSave);
            console.log('currently checking if entryToSave.weight > prResult.weight')
            console.log(entryToSave.weight + " > " + prResult.weight)
            const transaction = db.transaction(
              "user-records-entries",
              "readwrite"
            );
            const objectStore = transaction.objectStore("user-records-entries");
            const index = objectStore.index("exercise_name");
            updateExerciseIsPrToFalse(
              selectedExercise.name,
              entryToSave.weight,
              entryToSave.reps
            );
            const getRequest = index.get(selectedExercise.name);
            getRequest.onsuccess = function () {
              const existingRecord = getRequest.result;
              if (existingRecord) {
                existingRecord.weight = entryToSave.weight;
                const updateRequest = objectStore.put(existingRecord);
                updateRequest.onsuccess = function () {
                  console.log("PR updated successfully");
                };
                updateRequest.onerror = function () {
                  console.log("Failed to update PR");
                };
              }
            };
        
          } else {
            entryToSave.is_pr = false;
            userEntryTransactionStore.add(entryToSave);
          }
        }

        userEntryTransaction.oncomplete = function () {
          db.close();
          getExistingExercises();
        };
      };

      request.onerror = function () {
        console.log("found error:");
      };
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteEntry(id: number, exerciseName: string) {
    try {
      const prResult: any = await checkExercisePR(selectedExercise.name);

      const weightResult = await findMaxWeight(selectedExercise.name, id);
      const maxWeightResult: any = weightResult.maxWeight;
      const weightEntryId: number = weightResult.id;

      const repsResult = await findMaxReps(selectedExercise.name, id);
      const maxRepsResult: any = repsResult.maxReps;
      const repsEntryId: number = repsResult.id;

      const request = indexedDB.open("fitScouterDb", 1);
      console.log("inside delete with async");

      console.log(maxWeightResult);
      console.log(maxRepsResult);

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

        getRecordRequest.onsuccess = function (event: any) {
          const record = (event.target as IDBRequest).result;
          console.log("Record before deleting:", record);

          // Access the properties of the record
          const weight = record.weight;
          const reps = record.reps;

          const userRecordTransaction = db.transaction(
            "user-records-entries",
            "readwrite"
          );
          const userRecordObjectStore = userRecordTransaction.objectStore(
            "user-records-entries"
          );

          const userRecordIndex = userRecordObjectStore.index("exercise_name");

          const getExerciseRecord = userRecordIndex.get(selectedExercise.name);

          getExerciseRecord.onsuccess = function () {
            const existingRecord = getExerciseRecord.result;
            if (existingRecord) {
              if (existingRecord.weight >= weight) {
                existingRecord.weight = maxWeightResult;
              }
              if (existingRecord.reps >= reps) {
                existingRecord.reps = maxRepsResult;
              }
              const updateRequest = userRecordObjectStore.put(existingRecord);
              updateRequest.onsuccess = function () {
                console.log("PR updated successfully");
              };
              updateRequest.onerror = function () {
                console.log("Failed to update PR");
              };
            }
          };

          const weightEntryRequest =
            userEntryTransactionStore.get(weightEntryId);
          const repsEntryRequest = userEntryTransactionStore.get(repsEntryId);

          console.log("logging the requests:");
          console.log(weightEntryRequest);
          console.log(repsEntryRequest);
          weightEntryRequest.onsuccess = function (event: any) {
            const weightEntry = (event.target as IDBRequest).result;

            if (weightEntry !== undefined && weightEntry.weight <= weight) {
              weightEntry.is_pr = true;
              const updateWeightEntryRequest =
                userEntryTransactionStore.put(weightEntry);
              updateWeightEntryRequest.onsuccess = function () {
                console.log("Weight Entry updated successfully");
              };
              updateWeightEntryRequest.onerror = function () {
                console.log("Failed to update Weight Entry");
              };
            }
          };

          repsEntryRequest.onsuccess = function (event: any) {
            const repsEntry = (event.target as IDBRequest).result;
            console.log("Reps Entry before updating:", repsEntry);

            if (repsEntry !== undefined && repsEntry.reps <= reps) {
              repsEntry.is_pr = true;
              const updateRepsEntryRequest =
                userEntryTransactionStore.put(repsEntry);
              updateRepsEntryRequest.onsuccess = function () {
                console.log("Reps Entry updated successfully");
              };
              updateRepsEntryRequest.onerror = function () {
                console.log("Failed to update Reps Entry");
              };
            }
          };

          Promise.all([weightEntryRequest, repsEntryRequest])
            .then(() => {
              const primaryKeyRequest = userEntryTransactionStore.delete(id);

              primaryKeyRequest.onsuccess = function () {
                getExistingExercises(); // Update the list of existing exercises
              };

              primaryKeyRequest.onerror = function () {
                console.log("Error deleting entry");
              };

              userEntryTransaction.oncomplete = function () {
                db.close();
              };
            })
            .catch((error) => {
              console.error("An error occurred:", error);
            });
        };

        request.onerror = function () {
          console.log("Error opening database");
        };
      };
    } catch (error) {
      console.error(error);
    }
  }
  
  function handleTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    if (id === "reps") {
      setRepsValue(parseInt(value, 10));
      setEntryToSave((prevState) => ({
        ...prevState,
        reps: parseInt(value, 10),
      }));
    } else if (id === "weight") {
      setWeightValue(parseFloat(value));
      setEntryToSave((prevState) => ({
        ...prevState,
        weight: parseFloat(value),
      }));
    } else if (id === "distance") {
      setDistanceValue(parseFloat(value));
      setEntryToSave((prevState) => ({
        ...prevState,
        distance: parseFloat(value),
      }));
    } else if (id === "time") {
      setTimeValue(parseFloat(value));
      setEntryToSave((prevState) => ({
        ...prevState,
        time: parseFloat(value),
      }));
    }
  }

  function handleAddButtonClick(index: number) {
    setUserDataInput(true);
    switch (selectedExercise.measurement[index]) {
      case "weight":
        setWeightValue((prevWeight) => prevWeight + weightIncrementPreference);
        break;
      case "reps":
        setRepsValue((prevReps) => prevReps + 1);
        break;
      default:
        break;
    }
  }

  function handleSubtractButtonClick(index: number) {
    setUserDataInput(true);
    switch (selectedExercise.measurement[index]) {
      case "weight":
        setWeightValue((prevWeight) =>
          prevWeight > 0 ? prevWeight - weightIncrementPreference : 0
        );
        break;
      case "reps":
        setRepsValue((prevReps) => (prevReps > 0 ? prevReps - 1 : 0));
        break;
      default:
        break;
    }
  }

  function handleClearButtonClick() {
    setWeightValue(0);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100vw",
        alignItems: "center",
      }}
    >
      <ValidationAlert showAlert={showAlert} />
      <CommentModal
        openCommentModal={openCommentModal}
        setOpenCommentModal={setOpenCommentModal}
        commentValue={commentValue}
        setCommentValue={setCommentValue}
        exerciseCommentId={exerciseCommentId}
      />

      <Typography
        sx={{
          padding: {
            xs: "0.5rem", // Padding for extra small screens
            sm: "0.75rem", // Padding for small screens
            md: "1rem", // Padding for medium screens
            lg: "1.5rem", // Padding for large screens
          },
          textAlign: "center",
        }}
      >
        {selectedExercise.name.toLocaleUpperCase()}
      </Typography>

      <Divider sx={{ width: "100vw" }}></Divider>

      {selectedExercise.measurement.map((exercise, index) => {
        const measurementType = selectedExercise.measurement[index];

        if (measurementType === "distance") {
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
                {measurementType.toLocaleUpperCase()}
              </Typography>

              <Box sx={{ display: "flex", gap: "8px", width: "100%" }}>
                <TextField
                  id={measurementType}
                  value={distanceValue}
                  label="Number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ textAlign: "center", width: "100%" }}
                  variant="filled"
                  onChange={handleTextFieldChange}
                />

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={distanceUnit}
                  options={["m", "km", "ft", "mi"]}
                  onChange={(event, newValue) => {
                    console.log("logging new value");
                    console.log(newValue);
                    setDistanceUnit(newValue || "m");
                  }}
                  disableClearable
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Box>
          );
        }

        if (measurementType === "time") {
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
                {measurementType.toLocaleUpperCase()}
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
              {measurementType.toLocaleUpperCase()}
            </Typography>

            <Box
              sx={{
                display: "flex",
              }}
            >
              <Button
                sx={{ backgroundColor: "white" }}
                variant="outlined"
                onClick={() => handleSubtractButtonClick(index)}
              >
                <RemoveIcon />
              </Button>

              <TextField
                type="number"
                id={measurementType}
                variant="filled"
                inputProps={{
                  style: { fontSize: "large", textAlign: "center" },
                }}
                value={
                  measurementType === "weight"
                    ? weightValue.toFixed(2)
                    : repsValue
                }
                onChange={handleTextFieldChange}
              />

              <Button
                sx={{ backgroundColor: "white" }}
                variant="outlined"
                onClick={() => handleAddButtonClick(index)}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box>
        );
      })}

      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          variant="contained"
          color="success"
          sx={{ width: "100%", margin: "0.25rem" }}
          onClick={saveExerciseEntry}
        >
          SAVE
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100%", margin: "0.25rem" }}
          onClick={handleClearButtonClick}
        >
          CLEAR
        </Button>
      </Box>

      <Box>
        {existingExercises.map((exercise, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr 1fr",
              alignItems: "center",
              width: "100vw",
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
              }}
            >
              {exercise.weight !== 0 && (
                <Typography>
                  {`${exercise.weight.toFixed(2)} ${
                    unitsSystem === "metric" ? "kgs" : "lbs"
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
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ExerciseSelectedTrack;
