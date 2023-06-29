import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import fitImageLogo from "../../assets/fitPowerUpLogoV3.jpg";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  useEffect(() => {
      console.log('waiting for the listener')
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  function handleBeforeInstallPrompt(event: any) {
    event.preventDefault();
    setDeferredPrompt(event);
  }

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(display-mode: standalone)");
    const handleMediaQueryChange = (event:any) => {
      setShowInstallButton(!event.matches);
    };

    mediaQueryList.addEventListener("change", handleMediaQueryChange);
    setShowInstallButton(!mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  
  function handleInstallClick() {
    console.log("handling the install click:");
    console.log({ deferredPrompt });

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the installation prompt");
        } else {
          console.log("User dismissed the installation prompt");
        }
        setDeferredPrompt(null);
      });
    }
  }

  function getStartedClick() {
    navigate("/login");
  }

  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      <AppBar
        elevation={0}
        position="sticky"
        style={{ top: 0, backgroundColor: "black", width: "100%" }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#FF8C00", fontFamily: "Voltaire" }}
            >
              fit<span style={{ color: "white" }}>PowerUp!</span>
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                fontWeight: "bold",
                color: "black",
              }}
              onClick={handleInstallClick}
            >
              Install
            </Button>

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
          height: "calc(100% - 56px)",
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
          sx={{
            textAlign: "center",
            fontFamily: "Voltaire",
            fontSize: "1.5rem",
          }}
        >
          The most{" "}
          <span style={{ color: "black", fontWeight: "bold" }}>complete</span>,{" "}
          <span style={{ color: "#FF8C00", fontWeight: "bold" }}>
            intuitive
          </span>{" "}
          and also <span style={{ fontWeight: "bold" }}>100% FREE</span> workout
          tracking experience.
        </Typography>

        <img src={fitImageLogo} alt="fit person" height="auto" width="90%" />
        <Button
          onClick={getStartedClick}
          variant="contained"
          sx={{
            width: "50%",
            marginTop: "16px",
            marginRight: "8px",
            bgcolor: "black",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Get Started
        </Button>
      </Container>

      <Box sx={{ backgroundColor: "white" }}></Box>
    </Box>
  );
}

export default LandingPage;
