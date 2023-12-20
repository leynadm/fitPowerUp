import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from '@mui/material/LinearProgress';

interface LoadingScreenProps{
  text:string
}
function LoadingScreen({text}:LoadingScreenProps){

    return (

      <Box height="calc(100vh - 112px)" display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
        <LinearProgress sx={{width:"50%"}}/>
        <Typography>{text}</Typography>
      </Box>
    );
}

export default LoadingScreen