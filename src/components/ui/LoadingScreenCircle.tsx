import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
interface LoadingScreenCircleProps{
  text:string
}
function LoadingScreenCircle({text}:LoadingScreenCircleProps){

    return (

      <Box height="calc(100vh - 112px)" display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
        <CircularProgress sx={{width:"50%"}}/>
        <Typography padding={2} textAlign="center" color="text.secondary">{text}</Typography>
      </Box>
    );
}

export default LoadingScreenCircle