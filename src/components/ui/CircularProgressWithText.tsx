import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

function CircularProgressWithText({ text }: { text: string }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      p={2}
    >
      <CircularProgress />
      <Typography>{text}</Typography>
    </Box>
  );
}

export default CircularProgressWithText;
