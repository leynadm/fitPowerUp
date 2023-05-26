import React, { useState,SetStateAction,Dispatch } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
interface ParentProps {
  exercisesCategories: string[];
  openAddNewExerciseModal: boolean;
  setOpenAddNewExerciseModal: React.Dispatch<React.SetStateAction<boolean>>;
  setExercisesCategories:Dispatch<
  SetStateAction<string[]>>
}

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

function AddNewExerciseModal({
  exercisesCategories,
  openAddNewExerciseModal,
  setOpenAddNewExerciseModal,
  setExercisesCategories
}: ParentProps) {
  const [exerciseName, setExerciseName] = useState("");
  const [category, setCategory] = useState("");

  const [selectedRadio, setSelectedRadio] = useState("existing");

  const handleClose = () => setOpenAddNewExerciseModal(false);

  const typeOptions = [
    { label: "Weight and Reps", value: ["weight", "reps"] },
    { label: "Weight and Distance", value: ["weight", "distance"] },
    { label: "Weight and Time", value: ["weight", "time"] },
    { label: "Reps and Distance", value: ["reps", "distance"] },
    { label: "Reps and Time", value: ["reps", "time"] },
    { label: "Distance and Time", value: ["distance", "time"] },
    { label: "Weight", value: ["weight"] },
    { label: "Reps", value: ["reps"] },
    { label: "Distance", value: ["distance"] },
    { label: "Time", value: ["time"] },
  ];
  const [measurement, setMeasurement] = useState<{
    label: string;
    value: string[];
  } | null>(null);
  const saveNewExercise = () => {
    const measurementValue = measurement ? measurement.value : [];
    const newExercise = {
      name: exerciseName,
      category,
      measurement: measurementValue,
    };

    // Open a connection to the IndexedDB database
    const request = indexedDB.open("fitScouterDb", 1);

    request.onerror = (event) => {
      console.log("Error opening IndexedDB:", request.error);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;

      // Start a new transaction
      const transaction = db.transaction("preselected-exercises", "readwrite");

      // Retrieve the object store
      const store = transaction.objectStore("preselected-exercises");

      // Add the new exercise to the object store
      const request = store.add(newExercise);

      request.onsuccess = () => {
        console.log("New exercise saved successfully!");

        // Close the transaction and the database connection

        db.close();
        updateExerciseCategories()
        // Close the modal after saving
        handleClose();
      };

      request.onerror = () => {
        console.log("Error saving new exercise:", request.error);

        // Close the transaction and the database connection

        db.close();
      };
    };
  };


  function updateExerciseCategories(){

    const request = indexedDB.open("fitScouterDb", 1);

    if(!request){
        console.log('request value:')
        console.log(request)
       return
      }
    
          // Check if there are any error while opening the Db
    request.onerror = function (event) {
        console.error("And error occured with IndexedDb");
        console.error(event);
      };

          // Check if there are any error while opening the Db
    request.onerror = function (event) {
        console.error("And error occured with IndexedDb");
        console.error(event);
      };
  
      request.onupgradeneeded = function () {
        const db = request.result; // Result of our open request
  
      };

      request.onsuccess = function (event) {

        const db = request.result;
        const defaultRecord = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction("preselected-exercises", "readwrite");
        const store = transaction.objectStore("preselected-exercises");
        const exerciseCategoryIndex = store.index("exercise_category");

        const categoryQuery = exerciseCategoryIndex.openKeyCursor();
        const uniqueCategories = new Set<string>(); // Specify string type for the Set
  
        categoryQuery.onsuccess = function (event) {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            const category: string = cursor.key; // Specify string type for the category
            uniqueCategories.add(category);
            cursor.continue();
          } else {
            const categories: string[] = Array.from(uniqueCategories); // Specify string[] type
            console.log("Categories:", categories);
  
            console.log("categories");
  
            setExercisesCategories(categories);
  
            console.log(categories);
          }
        };
  
        transaction.oncomplete = function () {
          db.close()
        };
      };
}

  return (
    <Box>
      <Modal
        open={openAddNewExerciseModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            required
            id="filled-required"
            label="New Exercise Name"
            variant="filled"
            sx={{
              width: "100%",
            }}
            onChange={(e) => setExerciseName(e.target.value)}
          />

          <FormControl sx={{ display: "flex", marginTop: "8px" }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={selectedRadio}
              name="radio-buttons-group"
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "start",
              }}
              onChange={(e) => setSelectedRadio(e.target.value)}
            >
              <FormControlLabel
                value="existing"
                control={<Radio />}
                label="Existing Category"
                key="existing" // Unique key for the "new" option
              />
              <FormControlLabel
                value="new"
                control={<Radio />}
                label="New Category"
                key="new" // Unique key for the "new" option
              />
            </RadioGroup>
          </FormControl>

          {selectedRadio === "existing" ? (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={["", ...exercisesCategories]}
              sx={{ width: "100%", marginTop: "1rem" }}
              value={category}
              onChange={(event, newValue: string | null) =>
                setCategory(newValue || "")
              }
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
          ) : (
            <TextField
              required
              id="filled-required"
              label="New Category"
              variant="filled"
              sx={{
                width: "100%",
              }}
              // Add the necessary logic to update the category state for the Textfield
              onChange={(e) => setCategory(e.target.value)}
            />
          )}

          <Autocomplete
            disablePortal
            id="measurement-input"
            sx={{ width: "100%", marginTop: "1rem" }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Measurement options" />
            )}
            options={[{ label: "", value: [] }, ...typeOptions]}
            value={measurement}
            onChange={(event, newValue) => {
              if (newValue) {
                const selectedValue = newValue as {
                  label: string;
                  value: string[];
                };
                setMeasurement(selectedValue);
              } else {
                setMeasurement(null);
              }
            }}
            isOptionEqualToValue={(option, value) => {
              if (value === null) {
                return option.label === "" && option.value.length === 0;
              }
              return (
                value.label === option.label &&
                value.value.length === option.value.length
              );
            }}
          />

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
              onClick={saveNewExercise}
            >
              Save
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default AddNewExerciseModal;
