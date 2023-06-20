import React, { useState, Dispatch, SetStateAction } from "react";
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
import exportData from "../../utils/exportData";
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

  const weightIncrementOptions = [0.25, 0.5, 1.0, 1.25, 2.0, 2.5, 5.0, 10.0];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={weightIncrementOptions}
          defaultValue={weightIncrementPreference}
          sx={{ margin: "8px" }}
          getOptionLabel={(option) => `${option}`}
          disableClearable
          renderInput={(params) => (
            <TextField {...params} label="Weight Increment" />
          )}
          onChange={(event, value) => {
            if (value) {
              updateDefaultWeightIncrement(value);
            }
          }}
        />
      </Box>

      <Button
          variant="contained"
          sx={{ width: "100%", marginTop: "8px"}}
          onClick={exportData}
        >
          Export Data
        </Button>
    </Box>
  );
}

export default Settings;
