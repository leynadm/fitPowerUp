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

  return (
    <Box

    >
      <AppBar
        elevation={2}
        position="sticky"
        style={{
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
          height: "calc(100% - 56px)",
        }}
      >
        <InstallInstructionsModal
          openInstallInstructionsModal={openInstallInstructionsModal}
          setOpenInstallInstructionsModal={setOpenInstallInstructionsModal}
        />

        <Box
          height="100svh"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Zoom in={true}>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                fontSize: "1.75rem",
                paddingTop: "1rem",
              }}
            >
              The most{" "}
              <span style={{ color: "black", fontWeight: "bold" }}>
                complete
              </span>
              ,{" "}
              <span style={{ color: "#FF8C00", fontWeight: "bold" }}>
                intuitive
              </span>{" "}
              and also <span style={{ fontWeight: "bold" }}>100% FREE</span>{" "}
              workout tracking experience.
            </Typography>
          </Zoom>
          <img
            src={fitImageLogo}
            alt="fit person"
            style={{
              height: "auto",
              width: "90%",
              maxWidth: "400px", // Adjust the max width for desktop and mobile
            }}
          />

          <Button
            onClick={getStartedClick}
            variant="dbz"
            sx={{
              width: "50%",

              fontWeight: "bold",
            }}
          >
            Get Started
          </Button>
        </Box>

        <Box
          height="100svh"
          width="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          sx={{ backgroundColor: "#18c2e6" }}
        ></Box>

        <Box
          height="100svh"
          width="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          sx={{ backgroundColor: "#f3b932" }}
        ></Box>

        <Box
          height="100svh"
          width="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          sx={{ backgroundColor: "#520975" }}
        ></Box>

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
