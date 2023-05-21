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

function Settings() {
  const [enabled, setEnabled] = useState(true);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/home");
  };


  const updateWeightToImperial = () => {
    const request = indexedDB.open("fitScouterDb", 1);
  
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction("user-exercises-entries", "readwrite");
      const store = transaction.objectStore("user-exercises-entries");
  
      const updateCursor = store.openCursor();
  
      updateCursor.onsuccess = function (event: Event) {
        const cursor = (event.target as IDBRequest).result;
  
        if (cursor) {
          const updatedRecord = cursor.value;
          updatedRecord.weight *= 2.20;
  
          const updateRequest = cursor.update(updatedRecord);
          updateRequest.onsuccess = function () {
            console.log("Weight updated successfully");
          };
  
          updateRequest.onerror = function () {
            console.error("Error updating weight");
          };
  
          cursor.continue();
        }
      };
    };
  
    request.onerror = function () {
      console.error("Error opening database");
    };
  };

  const updateWeightToMetric = () => {
    const request = indexedDB.open("fitScouterDb", 1);
  
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction("user-exercises-entries", "readwrite");
      const store = transaction.objectStore("user-exercises-entries");
  
      const updateCursor = store.openCursor();
  
      updateCursor.onsuccess = function (event: Event) {
        const cursor = (event.target as IDBRequest).result;
  
        if (cursor) {
          const updatedRecord = cursor.value;
          updatedRecord.weight *= 2.20; // Divide by 2.20
  
          const updateRequest = cursor.update(updatedRecord);
          updateRequest.onsuccess = function () {
            console.log("Weight updated successfully");
          };
  
          updateRequest.onerror = function () {
            console.error("Error updating weight");
          };
  
          cursor.continue();
        }
      };
    };
  
    request.onerror = function () {
      console.error("Error opening database");
    };
  };
  

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(event.target.checked);

    if (event.target.checked) {
      updateWeightToImperial();
    } else {
      updateWeightToMetric();
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
