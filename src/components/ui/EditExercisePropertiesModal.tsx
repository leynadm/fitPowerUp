import React, { useState, SetStateAction, Dispatch, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import handleCategoryClick from "../../utils/CRUDFunctions/handleCategoryClick";
import updateExerciseCategories from "../../utils/CRUDFunctions/updateExerciseCategories";
import updateExerciseCategory from "../../utils/CRUDFunctions/updateExerciseCategory";

interface ParentProps {
  exercisesCategories: string[];
  openEditExercisePropertiesModal: boolean;
  setOpenEditExercisePropertiesModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setExercisesCategories: Dispatch<SetStateAction<string[]>>;
  setSelectedCategoryExercises: Dispatch<
    SetStateAction<{ category: string; name: string; measurement: any[] }[]>
  >;
  selectedCategoryExercises: {
    category: string;
    name: string;
    measurement: any[];
  }[];
  selectedExerciseId: any;
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

function EditExercisePropertiesModal({
  exercisesCategories,
  openEditExercisePropertiesModal,
  setOpenEditExercisePropertiesModal,
  setExercisesCategories,
  setSelectedCategoryExercises,
  selectedCategoryExercises,
  selectedExerciseId,
}: ParentProps) {
  const [exerciseName, setExerciseName] = useState("");
  const [category, setCategory] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("existing");
  const handleClose = () => setOpenEditExercisePropertiesModal(false);
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

  useEffect(() => {
    getExerciseToUpdate();
  }, []);

  function getExerciseToUpdate() {
    // If selectedExerciseId is not available or empty, no need to fetch the record
    if (!selectedExerciseId) {
      return;
    }

    const request = indexedDB.open("fitScouterDb");

    request.onerror = (event) => {
      console.log("Error opening IndexedDB:", request.error);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;

      // Start a new transaction
      const transaction = db.transaction("preselected-exercises", "readonly");

      // Retrieve the object store
      const store = transaction.objectStore("preselected-exercises");

      // Get the exercise with the selectedExerciseId
      const getRequest = store.get(selectedExerciseId);

      getRequest.onsuccess = () => {
        const exercise = getRequest.result;

        // If the exercise record is found, update the state with the values
        if (exercise) {
          setExerciseName(exercise.name);
          setCategory(exercise.category || "");
          setMeasurement(exercise.measurement || null);
        }
      };

      getRequest.onerror = () => {
        console.log("Error fetching exercise:", getRequest.error);
      };

      // Close the transaction and the database connection
      transaction.oncomplete = () => {
        db.close();
      };
    };
  }

  const saveUpdatedExercise = () => {
    // Prepare the updated exercise object
    const updatedExercise = {
      id: selectedExerciseId,
      name: exerciseName,
      category: selectedRadio === "existing" ? category : category.trim(),
      measurement: measurement,
    };

    const request = indexedDB.open("fitScouterDb");

    request.onerror = (event) => {
      console.log("Error opening IndexedDB:", request.error);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;

      // Start a new transaction with readwrite access
      const transaction = db.transaction("preselected-exercises", "readwrite");

      // Retrieve the object store
      const store = transaction.objectStore("preselected-exercises");

      // Update the exercise record with the updatedExercise object
      const putRequest = store.put(updatedExercise);

      putRequest.onsuccess = () => {
        updateExerciseCategory(updatedExercise.name, updatedExercise.category);

        handleClose();
      };

      putRequest.onerror = () => {
        console.log("Error updating exercise:", putRequest.error);
      };

      // Close the transaction and the database connection
      transaction.oncomplete = () => {
        db.close();
      };
    };
  };

  return (
    <Box>
      <Modal
        open={openEditExercisePropertiesModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            required
            id="filled-required"
            variant="filled"
            value={exerciseName}
            sx={{
              width: "100%",
            }}
            onChange={(e) => setExerciseName(e.target.value)}
            disabled
          />

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

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
              onClick={saveUpdatedExercise}
            >
              Save
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default EditExercisePropertiesModal;
