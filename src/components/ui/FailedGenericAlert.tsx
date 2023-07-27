import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

interface ParentProps {
  genericFailedAlert: boolean;
  genericFailedAlertText: string;
}

function FailedGenericAlert({
  genericFailedAlert,
  genericFailedAlertText,
}: ParentProps) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Collapse in={genericFailedAlert}>
        <Alert
          severity="error"
          sx={{ backgroundColor: "pink", marginTop: "8px" }}
        >
          {genericFailedAlertText}
        </Alert>
      </Collapse>
    </Stack>
  );
}

export default FailedGenericAlert;
