import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, MouseEvent } from "react";

function FitWorldBoard() {
  const [selectedZenkai, setSelectedZenkai] = useState("in progress"); // default value

  const navigate = useNavigate();

  const handleZenkai = (
    event: MouseEvent<HTMLElement>,
    newCategory: string | null
  ) => {
    // Ensure that if newCategory is null, it defaults to a specific value
    if (newCategory === "in progress") {
      setSelectedZenkai(newCategory || "complete"); // default to 'routines' for example
    } else if (newCategory === "complete") {
      setSelectedZenkai(newCategory || "in progress"); // default to 'routines' for example
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100svh - 112px)",
      }}
    >
      <ToggleButtonGroup
        value={selectedZenkai}
        onChange={handleZenkai}
        aria-label="text alignment"
        sx={{ p: 1 }}
        fullWidth
        size="small"
        exclusive
      >
        <ToggleButton value="in progress" aria-label="left aligned" fullWidth>
          In progress
        </ToggleButton>
        <ToggleButton value="complete" aria-label="centered" fullWidth>
          Complete
        </ToggleButton>
      </ToggleButtonGroup>
      
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography align="center">
          Here you can create your own unique<br></br> Zenkai Challenges!
        </Typography>
        <IconButton
          aria-label="add workout"
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "column",
          }}
          onClick={() => navigate("new-z-fighter-challenge")}
        >
          <AddCircleIcon fontSize="medium" />
          <Typography fontSize="1rem">Create Zenkai challenge</Typography>
        </IconButton>
      </Box>
    </Box>
  );
}

export default FitWorldBoard;
