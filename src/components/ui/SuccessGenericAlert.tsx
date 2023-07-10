import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

interface ParentProps{
    genericSuccessAlert:boolean
    genericSuccessAlertText:string
}

function SuccessGenericAlert({genericSuccessAlert,genericSuccessAlertText}:ParentProps) {

  return (
    <Stack sx={{ width: "100%"  }} spacing={2}>
      <Collapse in={genericSuccessAlert}>
        <Alert severity="success" sx={{backgroundColor:"lightgreen",marginTop:"8px"}}>{genericSuccessAlertText}</Alert>
      </Collapse>
    </Stack>
  );
}

export default SuccessGenericAlert;
 