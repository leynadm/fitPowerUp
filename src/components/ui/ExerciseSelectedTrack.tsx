import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


interface ExerciseSelectionProps {
    selectedExercise: { category: string; name: string };
  }

function ExerciseSelectedTrack({
    selectedExercise
  }: ExerciseSelectionProps){

    return(

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100vw",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            padding: {
              xs: "0.5rem", // Padding for extra small screens
              sm: "0.75rem", // Padding for small screens
              md: "1rem", // Padding for medium screens
              lg: "1.5rem", // Padding for large screens
            },
          }}
        >
          {selectedExercise.name.toLocaleUpperCase()}
        </Typography>

        <Box
          sx={{
            width: "100vw",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ width: "100%", margin: "0.25rem" }}
          >
            SAVE
          </Button>
          <Button variant="contained" sx={{ width: "100%", margin: "0.25rem" }}>
            CLEAR
          </Button>
        </Box>
      </Box>
    )
}

export default ExerciseSelectedTrack