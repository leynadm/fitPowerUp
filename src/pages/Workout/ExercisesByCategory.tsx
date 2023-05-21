import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import IconButton from "@mui/material/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
interface ExercisesCategoriesProps {
  todayDate: Date | undefined;
  selectedCategoryExercises: { category: string; name: string;measurement:any[] }[];
  setSelectedExercise: Dispatch<
    SetStateAction<{name:string,category:string,measurement:any[]}>
  >;
}

function ExercisesByCategory({
  todayDate,
  selectedCategoryExercises,
  setSelectedExercise
}: ExercisesCategoriesProps) {

  const navigate = useNavigate()
  const handleExerciseClick = (exercise: {category:string, name:string,measurement:any[]}) => {

    setSelectedExercise(exercise)
    navigate(`selected`)

  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
      }}
    >
      <AppBar position="fixed" style={{ top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Work
            </Typography>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => console.log("yes")}
                >
                  <AddOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <TextField
        id="standard-basic"
        label="Look for an exercise"
        variant="standard"
        sx={{
          width: "100%",
        }}
      />

      <Box>
        {selectedCategoryExercises.map((exercise, index) => (
          <Typography
            key={index}
            sx={{
              width: "100%",
              fontSize: "larger",
              margin: "0.15rem",
              cursor: "pointer",
            }}
            onClick={() => handleExerciseClick(exercise)}
          >
            {exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1)}
          </Typography>
        ))}
      </Box>
    </Container>
  );
}

export default ExercisesByCategory;
