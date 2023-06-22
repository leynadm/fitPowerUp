import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

interface SelectedTracksProps{
    profileUploadAlert:boolean
}

function SuccessfulProfilePowerUploadAlert({profileUploadAlert}:SelectedTracksProps) {

  return (
    <Stack sx={{ width: "100%"  }} spacing={2}>
      <Collapse in={profileUploadAlert}>
        <Alert severity="success" sx={{backgroundColor:"lightgreen",marginTop:"8px"}}>Your power level was added to your profile!!</Alert>
      </Collapse>
    </Stack>
  );
}

export default SuccessfulProfilePowerUploadAlert;
