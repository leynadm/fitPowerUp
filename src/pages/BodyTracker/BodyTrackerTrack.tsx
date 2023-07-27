import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import saveBodyTrackerEntry from "../../utils/CRUDFunctions/saveBodyTrackerEntry";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import toast from "react-hot-toast";

interface BodyTrackerProps {
  todayDate: Date | undefined;
  unitsSystem: string;
}

function BodyTrackerTrack({ todayDate, unitsSystem }: BodyTrackerProps) {
  const measurementOptions = ["Bodyweight", "Body Fat"];

  const [selectedOption, setSelectedOption] = useState<string>("Bodyweight");

  const [value, setValue] = useState(0);

  const [bodyweightData, setBodyweightData] = useState([]);

  useEffect(() => {
    getBodyweightData("Bodyweight");
  }, []);

  function handleSubtractButtonClick() {
    if (value === 0) {
      return; // Don't allow the value to go below 0
    }
    setValue((prevValue) => prevValue - 1);
  }

  const handleSaveButtonClick = async () => {
    try {
      await saveBodyTrackerEntry(selectedOption, value, todayDate);
      getBodyweightData(selectedOption);
    } catch (error) {
      toast.error("Oops, failed to save entry in saveBodyTrackerEntry!")
      console.error("Failed to save the record");
    }
  };

  function handleAddButtonClick() {
    setValue((prevValue) => prevValue + 1);
  }

  function getBodyweightData(typeOfData: string) {
    if (!todayDate) {
      return;
    }

    const request = indexedDB.open("fitScouterDb", 1);

    request.onsuccess = function () {
      const db = request.result;

      const userEntryTransaction = db.transaction(
        "user-body-tracker",
         "readonly"
      );

      const userEntryTransactionStore =
        userEntryTransaction.objectStore("user-body-tracker");

      const bodyTrackerNameAndDateIndex = userEntryTransactionStore.index(
        "bodytracker_name_and_date"
      );

      const range = IDBKeyRange.bound(
        [typeOfData, todayDate],
        [typeOfData, todayDate] // Use the same date for both bounds
      );

      const exercisesRequest = bodyTrackerNameAndDateIndex.openCursor(range);

      const tempBodyweightData: any = [];

      exercisesRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          tempBodyweightData.push(cursor.value);
          cursor.continue();
        } else {
          setBodyweightData(tempBodyweightData);
        }
      };

      exercisesRequest.onerror = function () {
        toast.error("Oops, getBodyweightData has an error!")
        console.error("Error retrieving existing exercises");
      };

      userEntryTransaction.oncomplete = function () {
        db.close();
      };
    };

    request.onerror = function () {
      toast.error("Oops, couldn't open the database in getBodyweightData!")
      console.log("Error opening database");
    };
  }

  async function deleteEntry(entryId: string) {
    try {
      const request = indexedDB.open("fitScouterDb", 1);
  
      request.onsuccess = function () {
        const db = request.result;
  
        const userEntryTransaction = db.transaction(
          "user-body-tracker",
          "readwrite"
        );
  
        const userEntryTransactionStore =
          userEntryTransaction.objectStore("user-body-tracker");
  
        const deleteRequest = userEntryTransactionStore.delete(entryId);
  
        deleteRequest.onsuccess = function () {
          console.log("Entry deleted successfully");
          getBodyweightData(selectedOption);
        };
  
        deleteRequest.onerror = function () {
          toast.error("Oops, deleteEntry has an error!")
          console.error("Failed to delete the entry");
        };
  
        userEntryTransaction.oncomplete = function () {
          db.close();
        };
      };
  
      request.onerror = function () {
        toast.error("Oops, couldn't open the database in deleteEntry!")
        console.log("Error opening database");
      };
    } catch (error) {
      toast.error("Oops, failed to delete the entry in deleteEntry!")
      console.error("Failed to delete the entry");
    }
  }
  

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Measurement
          </InputLabel>

          <Select
            label="Category Filter"
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedOption}
            sx={{ width: "100%" }}
            onChange={(event) => {
              const selectedOption = event.target.value;
              setSelectedOption(selectedOption);
              getBodyweightData(selectedOption);
            }}
          >
            {measurementOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          sx={{ width: "100%" }}
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
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
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
        <Button variant="contained" sx={{ width: "100%", margin: "0.25rem" }}>
          CLEAR
        </Button>
      </Box>

      {bodyweightData.map((entry: any, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>{entry.date.toDateString()}</div>

          <div>{entry.value}</div>

          {selectedOption === "Bodyweight" && (
            <div>{unitsSystem === "metric" ? "kgs" : "lbs"}</div>
          )}
          {selectedOption === "Body Fat" && <div>%</div>}

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => deleteEntry(entry.id)} 
          >
            <DeleteIcon
              sx={{
                zIndex: 0,
              }}
            />
          </IconButton>
        </Box>
      ))}
    </Container>
  );
}

export default BodyTrackerTrack;
