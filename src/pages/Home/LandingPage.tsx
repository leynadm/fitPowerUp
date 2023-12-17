import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import fitImageLogo from "../../assets/fitPowerUpLogoV3.jpg";
import { useNavigate } from "react-router-dom";
import InstallInstructionsModal from "../../components/ui/InstallInstructionsModal";
import Zoom from "@mui/material/Zoom";
import Fade from "@mui/material/Fade";
import { Translate } from "@mui/icons-material";
import "../Home/styles/animation.css"
function LandingPage() {
  const navigate = useNavigate();

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [openInstallInstructionsModal, setOpenInstallInstructionsModal] =
    useState(false);

  useEffect(() => {
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
    const handleMediaQueryChange = (event: any) => {
      setShowInstallButton(!event.matches);
    };

    mediaQueryList.addEventListener("change", handleMediaQueryChange);
    setShowInstallButton(!mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  function handleInstallClick() {
    if (deferredPrompt === null) {
      setOpenInstallInstructionsModal(!openInstallInstructionsModal);
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        /* 
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the installation prompt");
        } else {
          console.log("User dismissed the installation prompt");
        } */
      });
    }
  }



  function getStartedClick() {
    navigate("/login");
  }

  const outlineStyleBlueBlack = {
    color: "blue", // Interior color
    WebkitTextStrokeWidth: "3px",
    WebkitTextStrokeColor: "black",
  };

  const outlineStyleOrangeBlack = {
    color: "orange", // Interior color
    WebkitTextStrokeWidth: "2px",
    WebkitTextStrokeColor: "black",
  };

  const orangeColorSpan = {
    color:"#FFA500"
  }

  const blueColorSpan = {
    color:"#520975"
  }
/* 
  const textToDisplayArr = [
    "WELCOME TO THE #1 DBZ-INSPIRED FAN-MADE",
    "FITNESS APP. AND MOST PROBABBLY THE ONLY ONE.",
  ];

  const myFunction = () => {
    console.log(`Hello world!`);
};

setInterval(myFunction, 10000);
 */
  return (
    <Box>
      <AppBar
        elevation={2}
        position="sticky"
        style={{
          height: "56px",
          top: 0,
          background:
            "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
          width: "100%",
        }}
      >
        <Container maxWidth="md">
          <Toolbar
            disableGutters
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" sx={{ color: "#FF8C00" }}>
              fit<span style={{ color: "white" }}>PowerUp</span>
            </Typography>

            <Button
              variant="dbz"
              sx={{
                fontSize: "0.75rem",
                padding: 0,
                boxShadow: 0,
                lineHeight: "25px",
              }}
              onClick={handleInstallClick}
            >
              Install
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InstallInstructionsModal
          openInstallInstructionsModal={openInstallInstructionsModal}
          setOpenInstallInstructionsModal={setOpenInstallInstructionsModal}
        />

        <Box
          height="calc(100svh - 56px)"
          display="grid"
          alignItems="center"
          gridTemplateRows="4.5fr 1fr 4.5fr 1fr"
          width="100%"
          position="relative"
        >
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-1.png?alt=media&token=72301215-e8b0-422c-8edd-bc80bda1bb05"
              alt="fit person"
              style={{
                maxWidth: "300px",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>

          <Box
            width="100%"
            sx={{
              maxWidth: "100%", // Limit the width of the box
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                transform: "translateX(100%)",
                animation: "my-animation 72s linear infinite",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                display: "inline-block",
                fontSize: "2rem",
              }}
            >
              WELCOME TO THE{" "}
              <span style={orangeColorSpan}>#1 DBZ-INSPIRED</span>{" "}
              <span style={blueColorSpan}>FAN-MADE</span> FITNESS APP. ACTUALLY,
              IT'S MOST PROBABLY THE ONLY ONE OUT THERE... THIS APP IS PACKED
              WITH FEATURES, BUT BEFORE I TELL YOU MORE, YOU SHOULD KNOW IT'S
              100% FREE. EXACTLY!!!
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...NO,
              I'M NOT KIDDING! ANYWAY, I CAN'T BELIEVE YOU'RE STILL HERE READING
              THIS. SCROLL BELOW SO YOU CAN FIND OUT MORE ABOUT THE APP! IF YOU
              LIKE WHAT YOU SEE THEN FEEL FREE TO JOIN!
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundImage:
                'URL("https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Fsplash-picture.jpeg?alt=media&token=ee5cc75f-96e2-4698-9c60-32cbe3d12f21")',
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            display="flex"
            flexDirection="column"
            width="100%"
            position="relative"
            height="100%"
          ></Box>

          {/* 
          <Box             sx={{
              position: "absolute",
              top: '50%', // Center vertically
              left: '50%', // Center horizontally
              transform: 'translate(-50%, -50%)', // Adjust for precise centering
              fontWeight: "bold",
              fontSize:"1.25rem"
            }}>
            THE #1
          </Box>*/}
          <Box width="100%" display="flex" justifyContent="center">
            <Button onClick={getStartedClick} variant="dbz_mini">
              Get Started
            </Button>
          </Box>
        </Box>

        <Box
          height="100svh"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          flexDirection="column"
          sx={{ backgroundColor: "#18c2e6" }}
        >
          <Box
            width="100%"
            display="flex"

            justifyContent="center"
            alignItems="center"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-2.png?alt=media&token=4f6cc1bc-60c2-47ae-8b5c-ace8d37fa13d"
              alt="fit person"
              style={{
                maxWidth: "300px",
                width: "100%",
                height: "100%",
              }}
            />
            <Box display="flex" flexDirection="column" >
            <Typography align="center" fontWeight="bold" color="white" fontSize="1.75rem">
              1000+
            </Typography>
            <Typography align="center" fontWeight="bold" color="white">
              EXERCISES
            </Typography>
            
            </Box>
          </Box>
          <Box>
            <Typography>
              Let's start with the basics.
            </Typography>
          </Box>
        </Box>

        <Box
          height="100svh"
          width="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          sx={{ backgroundColor: "#f3b932" }}
          justifyContent="space-around"
        >
      <Box
            width="100%"
            display="flex"

            justifyContent="center"
            alignItems="center"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-3.png?alt=media&token=57c21713-ebab-4893-ac0a-d2e43dc6e8d3"
              alt="fit person"
              style={{
                maxWidth: "300px",
                width: "100%",
                height: "100%",
              }}
            />
            <Box display="flex" flexDirection="column" >
            <Typography align="center" fontWeight="bold" color="white" fontSize="1.75rem">
              1000+
            </Typography>
            <Typography align="center" fontWeight="bold" color="white">
              EXERCISES
            </Typography>
            
            </Box>
          </Box>
          <Box>
            <Typography>
              Let's start with the basics.
            </Typography>
          </Box>

        </Box>

        <Box
          height="100svh"
          width="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          sx={{ backgroundColor: "#520975" }}
          justifyContent="space-around"
        >

<Box
            width="100%"
            display="flex"

            justifyContent="center"
            alignItems="center"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-3.png?alt=media&token=57c21713-ebab-4893-ac0a-d2e43dc6e8d3"
              alt="fit person"
              style={{
                maxWidth: "300px",
                width: "100%",
                height: "100%",
              }}
            />
            <Box display="flex" flexDirection="column" >
            <Typography align="center" fontWeight="bold" color="white" fontSize="1.75rem">
              1000+
            </Typography>
            <Typography align="center" fontWeight="bold" color="white">
              EXERCISES
            </Typography>
            
            </Box>
          </Box>
          <Box>
            <Typography>
              Let's start with the basics.
            </Typography>
          </Box>


        </Box>

        <Box
          height="100svh"
          width="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          sx={{ backgroundColor: "#000000" }}
        ></Box>
      </Box>
    </Box>
  );
}

export default LandingPage;
