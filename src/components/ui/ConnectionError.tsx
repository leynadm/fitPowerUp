import React from "react";
import Box from '@mui/material/Box';
import ErrorIcon from '@mui/icons-material/Error';
function ConnectionError(){

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
            padding:"1rem"
        }}
      >
        <ErrorIcon />
        We couldn't connect right now.<br></br>
        <br></br>
        Please refresh the app, and if the issue persists then try later.
        <br></br>
        <br></br>

        Error Code: Undefined User Data(0)
      </Box>
    );

}

export default ConnectionError