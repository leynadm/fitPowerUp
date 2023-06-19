import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();

  function getStartedClick() {
    navigate("/login");
  }
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <AppBar
        elevation={0}
        position="sticky"
        style={{ top: 0, backgroundColor: "black", width: "100%" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ width: "100%" }}>
            <Typography variant="h4" sx={{ color: "orange",fontFamily:"Dosis",fontWeight:500 }}>
              fit
            </Typography>
            <Typography variant="h4" sx={{ fontFamily:"Voltaire" }}>
              PowerUp
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          width: "100%",
          height:"100%",
          flexGrow:1,
          backgroundColor:"#F0F2F5"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            width: "100%",
            textAlign: "center",
            fontFamily: "lato",
            fontWeight: 700,
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          Workout.<br></br> Post. Level Up!
        </Typography>

        <Typography variant="body1" sx={{ textAlign: "center",fontFamily:"lato" }}>
          Welcome to fitPowerApp! Experience the power of our comprehensive
          fitness app. Share workouts, track progress, and connect with
          like-minded fitness enthusiasts. Join us and power up your fitness
          journey today!
        </Typography>

        <Button
          onClick={getStartedClick}
          variant="contained"
          sx={{
            width: "50%",
            marginTop: "16px",
            marginRight: "8px",
            bgcolor: "black",
            color: "#FF8C00",
            fontWeight: "bold",
          }}
        >
          Get Started
        </Button>
      </Container>

      <Box sx={{backgroundColor:"white"}}>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
          Welcome to fitPowerApp! Experience the power of our comprehensive
          fitness app. Share workouts, track progress, and connect with
          like-minded fitness enthusiasts. Join us and power up your fitness
          journey today!
        </Typography>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Welcome to fitPowerApp! Experience the power of our comprehensive
          fitness app. Share workouts, track progress, and connect with
          like-minded fitness enthusiasts. Join us and power up your fitness
          journey today!
        </Typography>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Welcome to fitPowerApp! Experience the power of our comprehensive
          fitness app. Share workouts, track progress, and connect with
          like-minded fitness enthusiasts. Join us and power up your fitness
          journey today!
        </Typography>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Welcome to fitPowerApp! Experience the power of our comprehensive
          fitness app. Share workouts, track progress, and connect with
          like-minded fitness enthusiasts. Join us and power up your fitness
          journey today!
        </Typography>


        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Welcome to fitPowerApp! Experience the power of our comprehensive
          fitness app. Share workouts, track progress, and connect with
          like-minded fitness enthusiasts. Join us and power up your fitness
          journey today!
        </Typography>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Welcome to fitPowerApp! Experience the power of our comprehensive
          fitness app. Share workouts, track progress, and connect with
          like-minded fitness enthusiasts. Join us and power up your fitness
          journey today!
        </Typography>


        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Welcome to fitPowerApp! Experience the power of our comprehensive
          fitness app. Share workouts, track progress, and connect with
          like-minded fitness enthusiasts. Join us and power up your fitness
          journey today!
        </Typography>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Welcome to fitPowerApp! Experience the power of our comprehensive
          fitness app. Share workouts, track progress, and connect with
          like-minded fitness enthusiasts. Join us and power up your fitness
          journey today!
        </Typography>

      </Box>
    </Box>
  );
}

export default LandingPage;
