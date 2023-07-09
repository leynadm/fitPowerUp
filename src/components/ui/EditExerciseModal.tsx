import React, { useEffect, useState,ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};

interface ParentComponentProps {
  openEditExerciseModal: boolean;
  setOpenEditExerciseModal: React.Dispatch<React.SetStateAction<boolean>>;
  exerciseCommentId: number;
  selectedExercise: { category: string; name: string; measurement: any[] };
  weightIncrementPreference: number;
  setUpdateRenderTrigger : React.Dispatch<React.SetStateAction<number>>;
}

function EditExerciseModal({
  openEditExerciseModal,
  setOpenEditExerciseModal,
  exerciseCommentId,
  selectedExercise,
  weightIncrementPreference,
  setUpdateRenderTrigger
}: ParentComponentProps) {


  const [weightValue, setWeightValue] = useState(0);
  const [repsValue, setRepsValue] = useState(0);
  const [distanceValue, setDistanceValue] = useState(0);
  const [distanceUnit, setDistanceUnit] = useState("m");
  const [timeValue, setTimeValue] = useState(0);

  const [entryToSave, setEntryToSave] = useState({
    
    exercise: selectedExercise.name,
    category: selectedExercise.category,
    weight: weightValue,
    reps: repsValue,
    distance: distanceValue,
    distance_unit: distanceUnit,
    time: timeValue,
    is_pr: false,
    dropset:false
  });
    
  
  useEffect(()=>{
    console.log('inside useeffect:')
    getEntryValues()
  },[openEditExerciseModal])

  const handleClose = () => setOpenEditExerciseModal(false);

  function getEntryValues(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("fitScouterDb");
  
      request.onerror = function (event) {
        reject(request.error);
      };
  
      request.onsuccess = function (event: any) {
        const db = event.target.result;
        const transaction = db.transaction(["user-exercises-entries"], "readonly");
        const objectStore = transaction.objectStore("user-exercises-entries");
        const getRequest = objectStore.get(exerciseCommentId);
  
        getRequest.onsuccess = function (event: any) {
          
          const entryData = event.target.result;
          
          if(entryData){
            setWeightValue(entryData.weight)
            setRepsValue(entryData.reps)
            setDistanceValue(entryData.distance)
            setDistanceUnit(entryData.distance_unit)
            setTimeValue(entryData.time)

          }

        }; 
  
        getRequest.onerror = function (event:any) {
          reject(getRequest.error);
        };
  
        transaction.oncomplete = function () {
          setUpdateRenderTrigger(prev => prev+1)
          db.close();
        };
      };
  
      request.onupgradeneeded = function (event) {
        reject(new Error("Database upgrade is needed."));
      };
    });

  }
  


  function saveUpdatedExercise() {

    const request = window.indexedDB.open("fitScouterDb");
    request.onsuccess = function (event: any) {
      const db = event.target.result;
      const transaction = db.transaction("user-exercises-entries", "readwrite");
      const objectStore = transaction.objectStore("user-exercises-entries");

      const getRequest = objectStore.get(exerciseCommentId);

      getRequest.onsuccess = function (event: any) {
        const entryData = event.target.result;
        if (entryData) {
          entryData.weight = weightValue;
          entryData.reps = repsValue; 
          entryData.distance = distanceValue;
          entryData.time = timeValue;
          entryData.distance_unit = distanceUnit
          
          const updateRequest = objectStore.put(entryData);
          updateRequest.onsuccess = function () {
            console.log("Record updated successfully");
          };
          updateRequest.onerror = function () {
            console.log("Error updating record");
          };
        } else {
          console.log("Record not found");
        }
      };

      transaction.oncomplete = function () {
        console.log("Transaction completed");

        setOpenEditExerciseModal(false);
      };
      transaction.onerror = function () {
        console.log("Transaction error");
      };
    };

    request.onerror = function () {
      console.log("Error opening database");
    };
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
    <div>
      <Modal
        open={openEditExerciseModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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

                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <TextField
                      id={measurementType}
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
                      style: {
                        fontSize: "1.5rem",
                        textAlign: "center",
                        height: "100%",
                        padding: "8px",
                      },
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
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%", margin: "0.25rem", fontWeight: "bold" }}
              onClick={saveUpdatedExercise}
            >
              SAVE
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100%", margin: "0.25rem", fontWeight: "bold" }}
              onClick={handleClose}
            >
              CANCEL
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default EditExerciseModal;
