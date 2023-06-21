import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import fitImageLogo from "../../assets/LargeTile.scale-400.jpg"
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();

  function getStartedClick() {
    navigate("/login");
  }
  return (
    <Box
      sx={{
        width: "100vw"
      }}
    >
      <AppBar
        elevation={0}
        position="sticky"
        style={{ top: 0, backgroundColor: "black", width: "100%" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              sx={{ color: "orange", fontFamily: "Voltaire", fontWeight: 500 }}
            >
              fit
            </Typography>
            <Typography variant="h4" sx={{ fontFamily: "Voltaire" }}>
              PowerUp!
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
          height:"calc(100% - 56px)"
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h4"
            sx={{
              width: "100%",
              textAlign: "center",
              fontFamily: "Lato",
              fontWeight: 700,
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: "2.5rem" }}>Get</span>&nbsp;
            <span style={{ color: "#FF8C00", fontSize: "2.5rem" }}>fit</span>
            <span style={{ fontSize: "2.5rem" }}>,</span>&nbsp;<br></br>
            <span
              style={{
                backgroundColor: "black",
                color: "white",
                fontSize: "2.5rem",
              }}
            >
              Power Up!
            </span>{" "}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ textAlign: "center", fontFamily: "lato", fontSize: "1.5rem" }}
        >
          The most{" "}
          <span style={{ color: "black", fontWeight: "bold" }}>complete</span>,{" "}
          <span style={{ color: "#FF8C00", fontWeight: "bold" }}>
            intuitive
          </span>{" "}
          and also <span style={{ fontWeight: "bold" }}>100% FREE</span> workout
          tracking experience.
        </Typography>

        <img src={fitImageLogo} alt="fit person" height="auto" width="90%"/>
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

      <Box sx={{ backgroundColor: "white" }}>
        
      </Box>
    </Box>
  );
}

export default LandingPage;
