import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from '@mui/material/LinearProgress';
function RetrievingYourData(){

    return (
      <Box height="calc(100svh - 56px)" display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
        <LinearProgress sx={{width:"50%"}}/>
        <Typography>Retrieving your data...</Typography>
      </Box>
    );
}

export default RetrievingYourData