import React, { useState, SetStateAction, Dispatch } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import toast from "react-hot-toast";
interface ParentProps {
  exercisesCategories: string[];
  openAddNewExerciseModal: boolean;
  setOpenAddNewExerciseModal: React.Dispatch<React.SetStateAction<boolean>>;
  setExercisesCategories: Dispatch<SetStateAction<string[]>>;
  setSelectedCategoryExercises: Dispatch<
    SetStateAction<
      {
        category: string;
        name: string;
        measurement: any[];
        favorite?: boolean;
      }[]
    >
  >;
  selectedCategoryExercises: {
    category: string;
    name: string;
    measurement: any[];
  }[];
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
  setExercisesCategories,
  setSelectedCategoryExercises,
  selectedCategoryExercises,
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

 
  const isFormValid = () => {
    if (exerciseName.trim() === "") {
      return false;
    }

    if (selectedRadio === "existing" && category === "") {
      return false;
    }

    if (selectedRadio === "new" && category.trim() === "") {
      return false;
    }

    if (
      !measurement ||
      measurement.label === "" ||
      measurement.value.length === 0
    ) {
      return false;
    }

    return true;
  };

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

              disabled={!isFormValid}
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

export default AddNewExerciseModal;
