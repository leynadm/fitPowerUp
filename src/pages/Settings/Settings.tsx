import React, { useState, Dispatch, SetStateAction, useRef } from "react";
import Box from "@mui/material/Box";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import exportData from "../../utils/exportData";
import * as XLSX from "xlsx";
interface WorkoutProps {
  unitsSystem: string;
  setUnitsSystem: Dispatch<SetStateAction<string>>;
  weightIncrementPreference: number;
  setWeightIncrementPreference: Dispatch<SetStateAction<number>>;
}

function Settings({
  unitsSystem,
  setUnitsSystem,
  weightIncrementPreference,
  setWeightIncrementPreference,
}: WorkoutProps) {
  const [enabled, setEnabled] = useState(unitsSystem === "imperial");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSource, setFileSource] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const updateToImperial = () => {
    const request = indexedDB.open("fitScouterDb", 1);

    request.onsuccess = function () {
      const db = request.result;

      // Update unitsSystem to "imperial"
      const preferenceTransaction = db.transaction(
        "user-data-preferences",
        "readwrite"
      );
      const preferenceStore = preferenceTransaction.objectStore(
        "user-data-preferences"
      );
      const preferenceRequest = preferenceStore.get(1);

      preferenceRequest.onsuccess = function (event) {
        const preferenceRecord = (event.target as IDBRequest).result;

        if (preferenceRecord) {
          preferenceRecord.unitsSystem = "imperial";

          const updatePreferenceRequest = preferenceStore.put(preferenceRecord);

          updatePreferenceRequest.onsuccess = function () {
            setUnitsSystem("imperial");
            console.log("Units system updated successfully");
          };

          updatePreferenceRequest.onerror = function () {
            console.error("Error updating units system");
          };
        }
      };

      // Update weight to imperial
      const weightTransaction = db.transaction(
        "user-exercises-entries",
        "readwrite"
      );
      const weightStore = weightTransaction.objectStore(
        "user-exercises-entries"
      );
      const weightCursor = weightStore.openCursor();

      weightCursor.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          const updatedRecord = cursor.value;
          updatedRecord.weight *= 2.2;

          const updateRequest = cursor.update(updatedRecord);

          updateRequest.onsuccess = function () {
            console.log("Weight updated successfully");
            cursor.continue();
          };

          updateRequest.onerror = function () {
            console.error("Error updating weight");
            cursor.continue();
          };
        }
      };

      // Commit the transactions
      preferenceTransaction.oncomplete = function () {
        console.log("Preference transaction completed");
      };

      preferenceTransaction.onerror = function () {
        console.error("Error in preference transaction");
      };

      weightTransaction.oncomplete = function () {
        console.log("Weight transaction completed");
      };

      weightTransaction.onerror = function () {
        console.error("Error in weight transaction");
      };
    };

    request.onerror = function () {
      console.error("Error opening database");
    };
  };

  const updateToMetric = () => {
    const request = indexedDB.open("fitScouterDb", 1);

    request.onsuccess = function () {
      const db = request.result;

      // Update unitsSystem to "metric"
      const preferenceTransaction = db.transaction(
        "user-data-preferences",
        "readwrite"
      );
      const preferenceStore = preferenceTransaction.objectStore(
        "user-data-preferences"
      );
      const preferenceRequest = preferenceStore.get(1);

      preferenceRequest.onsuccess = function (event) {
        const preferenceRecord = (event.target as IDBRequest).result;

        if (preferenceRecord) {
          preferenceRecord.unitsSystem = "metric";

          const updatePreferenceRequest = preferenceStore.put(preferenceRecord);

          updatePreferenceRequest.onsuccess = function () {
            setUnitsSystem("metric");
            console.log("Units system updated successfully");
          };

          updatePreferenceRequest.onerror = function () {
            console.error("Error updating units system");
          };
        }
      };

      // Update weight to imperial
      const weightTransaction = db.transaction(
        "user-exercises-entries",
        "readwrite"
      );
      const weightStore = weightTransaction.objectStore(
        "user-exercises-entries"
      );
      const weightCursor = weightStore.openCursor();

      weightCursor.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          const updatedRecord = cursor.value;
          updatedRecord.weight /= 2.2;

          const updateRequest = cursor.update(updatedRecord);

          updateRequest.onsuccess = function () {
            console.log("Weight updated successfully");
            cursor.continue();
          };

          updateRequest.onerror = function () {
            console.error("Error updating weight");
            cursor.continue();
          };
        }
      };

      // Commit the transactions
      preferenceTransaction.oncomplete = function () {
        console.log("Preference transaction completed");
      };

      preferenceTransaction.onerror = function () {
        console.error("Error in preference transaction");
      };

      weightTransaction.oncomplete = function () {
        console.log("Weight transaction completed");
      };

      weightTransaction.onerror = function () {
        console.error("Error in weight transaction");
      };
    };

    request.onerror = function () {
      console.error("Error opening database");
    };
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(event.target.checked);

    if (event.target.checked) {
      updateToImperial();
    } else {
      updateToMetric();
    }
  };

  function updateDefaultWeightIncrement(selectedValue: number) {
    const dbName = "fitScouterDb";
    const objectStoreName = "user-data-preferences";
    const objectStoreKeyPath = "id";

    const request = window.indexedDB.open(dbName);

    request.onerror = (event) => {
      console.error("Database error:", request.error);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;

      // Create the object store if it doesn't exist
      if (!db.objectStoreNames.contains(objectStoreName)) {
        const objectStore = db.createObjectStore(objectStoreName, {
          keyPath: objectStoreKeyPath,
        });
        objectStore.createIndex("id", "id", { unique: true });
      }
    };

    request.onsuccess = (event) => {
      const db = request.result;

      const transaction = db.transaction(objectStoreName, "readwrite");
      const objectStore = transaction.objectStore(objectStoreName);

      const getRequest = objectStore.get(1);

      getRequest.onerror = (event) => {
        console.error("Error getting entry:", getRequest.error);
      };

      getRequest.onsuccess = (event) => {
        const entry = getRequest.result;
        console.log("loggin entry:");
        console.log(entry);
        entry.defaultWeightIncrement = selectedValue;

        const updateRequest = objectStore.put(entry);

        updateRequest.onerror = (event) => {
          console.error("Error updating entry:", updateRequest.error);
        };

        updateRequest.onsuccess = (event) => {
          console.log("Default weight increment updated successfully!");

          // Commit the transaction
          transaction.oncomplete = () => {
            console.log("Transaction completed.");

            // Close the database connection
            db.close();
          };
        };
      };
    };
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const fileSource = e.target?.result as string;
        setFileSource(fileSource);
      };
    }
  }

  function handleImportFileSelection() {
    fileInputRef.current?.click();
    importData();
  }

  const weightIncrementOptions = [0.25, 0.5, 1.0, 1.25, 2.0, 2.5, 5.0, 10.0];

  function importData() {
    const reader = new FileReader();

    console.log("inside import data:");

    reader.onload = (e) => {
      console.log(e.target);
      console.log(e.target?.result);
      if (e.target && e.target.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        console.log({ workbook });
        const sheetName = workbook.SheetNames[0];
        console.log({ sheetName });
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const request = indexedDB.open("fitScouterDb");
        request.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction(
            "user-exercises-entries",
            "readwrite"
          );
          const objectStore = transaction.objectStore("user-exercises-entries");
          console.log("preparing to loop:");
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i] as unknown[];
            const serialDate = row[0] as number;
            const excelEpoch = new Date(Date.UTC(1899, 11, 30));
            const millisecondsPerDay = 24 * 60 * 60 * 1000;
            const offsetMilliseconds = serialDate * millisecondsPerDay;
            const date = new Date(excelEpoch.getTime() + offsetMilliseconds);
            // Set time portion to midnight
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);

            let distanceRow = row[5];
            let distance_unitRow = row[6]
            let timeRow=row[7]

            if(distanceRow===undefined){
              distanceRow=0
            } else if(distance_unitRow===undefined){
              distance_unitRow="m"
            } else if(timeRow===undefined){
              timeRow=0
            }

            const entry = {
              // Map the appropriate properties from the Excel file to your object structure
              // For example:
              date: date, // Convert the serial date to a Date object with time set to midnight
              exercise: row[1] as string,
              category: row[2] as string,
              weight: row[3] as number,
              reps: row[4] as number,
              distance: /*  row[5] as number */ distanceRow as number,
              distance_unit: /* row[6] as string */ distance_unitRow as string,
              time:/*  row[7] as string */ timeRow as number,
              is_pr: row[8] as boolean,
            };
            /* 
            console.log('logging the entry:');
            console.log(entry);
 */
            if (row[3] !== undefined && row[4] !== undefined)
              objectStore.add(entry);
          }

          transaction.oncomplete = () => {
            console.log("Data imported successfully.");
          };
        };
      }
    };

    if (selectedFile) {
      reader.readAsArrayBuffer(selectedFile);
    } else {
      console.log("No file selected.");
    }
  }
  const handleWeightIncrementChange = (event:any) => {
    const selectedValue = Number(event.target.value);
    setWeightIncrementPreference(selectedValue);
    updateDefaultWeightIncrement(selectedValue);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AppBar position="fixed" elevation={0} style={{ top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <SettingsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Settings
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        sx={{
          width: "100%",
          alignSelf: "center",
          justifySelf: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={enabled} onChange={handleSwitchChange} />}
            label={enabled ? "Imperial" : "Metric"}
          />
        </FormGroup>
      </Box>

      <Box sx={{ width: "100%" }}>
        <FormControl variant="outlined" sx={{ width: "100%" }}>
          <InputLabel id="weight-increment-label">Weight Increment</InputLabel>
          <Select
            labelId="weight-increment-label"
            id="weight-increment"
            value={weightIncrementPreference}
            onChange={handleWeightIncrementChange}
            label="Weight Increment"
            sx={{ width: "100%" }}
          >
            {weightIncrementOptions.map((option) => (
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
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "90%", marginTop: "8px" }}
          onClick={exportData}
        >
          Export Data
        </Button>

        <Button
          variant="contained"
          sx={{ width: "90%", marginTop: "8px" }}
          onClick={handleImportFileSelection}
        >
          Import Data
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  );
}

export default Settings;
