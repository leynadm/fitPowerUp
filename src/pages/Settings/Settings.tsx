import React, { useState } from "react";
import Box from "@mui/material/Box";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

interface WorkoutProps {
  unitsSystem:string
}


function Settings({unitsSystem}:WorkoutProps) {
  const [enabled, setEnabled] = useState(unitsSystem === "imperial");
  const navigate = useNavigate();
  
  /* 
  const handleGoBack = () => {
    navigate("/home");
  }; */


  const updateToImperial = () => {
    const request = indexedDB.open("fitScouterDb", 1);
  
    request.onsuccess = function () {
      const db = request.result;
  
      // Update unitsSystem to "imperial"
      const preferenceTransaction = db.transaction("user-data-preferences", "readwrite");
      const preferenceStore = preferenceTransaction.objectStore("user-data-preferences");
      const preferenceRequest = preferenceStore.get(1);
  
      preferenceRequest.onsuccess = function (event) {
        const preferenceRecord = (event.target as IDBRequest).result;
  
        if (preferenceRecord) {
          preferenceRecord.unitsSystem = "imperial";
  
          const updatePreferenceRequest = preferenceStore.put(preferenceRecord);
  
          updatePreferenceRequest.onsuccess = function () {
            console.log("Units system updated successfully");
          };
  
          updatePreferenceRequest.onerror = function () {
            console.error("Error updating units system");
          };
        }
      };
  
      // Update weight to imperial
      const weightTransaction = db.transaction("user-exercises-entries", "readwrite");
      const weightStore = weightTransaction.objectStore("user-exercises-entries");
      const weightCursor = weightStore.openCursor();
  
      weightCursor.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;
  
        if (cursor) {
          const updatedRecord = cursor.value;
          updatedRecord.weight *= 2.20;
  
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
  
      // Update unitsSystem to "imperial"
      const preferenceTransaction = db.transaction("user-data-preferences", "readwrite");
      const preferenceStore = preferenceTransaction.objectStore("user-data-preferences");
      const preferenceRequest = preferenceStore.get(1);
  
      preferenceRequest.onsuccess = function (event) {
        const preferenceRecord = (event.target as IDBRequest).result;
  
        if (preferenceRecord) {
          preferenceRecord.unitsSystem = "metric";
  
          const updatePreferenceRequest = preferenceStore.put(preferenceRecord);
  
          updatePreferenceRequest.onsuccess = function () {
            console.log("Units system updated successfully");
          };
  
          updatePreferenceRequest.onerror = function () {
            console.error("Error updating units system");
          };
        }
      };
  
      // Update weight to imperial
      const weightTransaction = db.transaction("user-exercises-entries", "readwrite");
      const weightStore = weightTransaction.objectStore("user-exercises-entries");
      const weightCursor = weightStore.openCursor();
  
      weightCursor.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;
  
        if (cursor) {
          const updatedRecord = cursor.value;
          updatedRecord.weight /= 2.20;
  
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

  return (
    <Box>
      <AppBar position="fixed" style={{ top: 0 }}>
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

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ marginLeft: "auto" }}>
                {/* 
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                   
                  onClick={handleGoBack}
               
                  >
                  <ArrowBackIcon />
                </IconButton>
              */}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <FormGroup>
      <FormControlLabel
        control={<Switch checked={enabled} onChange={handleSwitchChange} />}
        label={enabled ? "Imperial" : "Metric"}
      />
    </FormGroup>
    </Box>
  );
}

export default Settings;
