import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import saveBodyTrackerEntry from "../../utils/CRUDFunctions/saveBodyTrackerEntry";

interface BodyTrackerProps {
  todayDate: Date | undefined;
}

function BodyTrackerTrack({ todayDate }: BodyTrackerProps) {
  const measurementOptions = [
    {label:"Bodyweight"} , 
    {label:"Body Fat"} 
  ];

  const [selectedMeasurement, setSelectedMeasurement] = useState<
    { label: string }
  >(measurementOptions[0]);
  const [value, setValue] = useState(0);

  function handleSubtractButtonClick() {
    if (value === 0) {
      return; // Don't allow the value to go below 0
    }
    setValue((prevValue) => prevValue - 1);
  }

  const handleSaveButtonClick = async () => {
    try {
      await saveBodyTrackerEntry(selectedMeasurement, value, todayDate);
      console.log("Record saved successfully");
    } catch (error) {
      console.error("Failed to save the record");
    }
  };

  function handleAddButtonClick() {
    setValue((prevValue) => prevValue + 1);
  }



  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: "8px", width: "100%" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={selectedMeasurement}
          options={measurementOptions}
          onChange={(event, newValue) => {
            if (newValue) {
              console.log(newValue.label); // Log the label
              setSelectedMeasurement(newValue);
            }
          }}
          sx={{
            width: "100%",
            paddingTop: "16px",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
          renderInput={(params) => <TextField {...params} label="Measurement" />}
          disableClearable
        />

      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          paddingTop: "16px",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
      >
        <Button
          sx={{ backgroundColor: "white" }}
          variant="outlined"
          onClick={handleSubtractButtonClick}
        >
          <RemoveIcon />
        </Button>

        <TextField
          type="number"
          variant="filled"
          inputProps={{
            style: { fontSize: "large", textAlign: "center" },
            step: 0.1, // Set the step to allow one decimal place
          }}
          value={value.toFixed(1)}
          onChange={(event) => setValue(Number(event.target.value))}
          sx={{width:"100%"}}
        />

        <Button
          sx={{ backgroundColor: "white" }}
          variant="outlined"
          onClick={handleAddButtonClick}
        >
          <AddIcon />
        </Button>
      </Box>

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
          onClick={handleSaveButtonClick}
        >
          SAVE
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100%", margin: "0.25rem" }}
        >
          CLEAR
        </Button>
      </Box>
    </Box>
  );
}

export default BodyTrackerTrack;
