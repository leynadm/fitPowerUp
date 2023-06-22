import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

interface SelectedTracksProps{
    showAlert:boolean
}

function ValidationAlert({showAlert}:SelectedTracksProps) {

  return (
    <Stack sx={{ width: "100%"  }} spacing={2}>
      <Collapse in={showAlert}>
        <Alert severity="error" sx={{backgroundColor:"orange",marginTop:"8px"}}>Please enter the values for this set!</Alert>
      </Collapse>
    </Stack>
  );
}

export default ValidationAlert;
