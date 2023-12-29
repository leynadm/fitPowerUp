import React, { useState, useEffect, useRef, useMemo } from "react";
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
import StarsIcon from "@mui/icons-material/Stars";
import InfoIcon from "@mui/icons-material/Info";
import "../Home/styles/animation.css";
import RedditIcon from "@mui/icons-material/Reddit";
import EmailIcon from "@mui/icons-material/Email";
import Link from "@mui/material/Link";
import FakeUserReviewCard from "../../components/ui/UserReviewCard";
function LandingPage() {
  const navigate = useNavigate();
  function useContainerRefs() {
    return [
      useRef<HTMLDivElement | null>(null),
      useRef<HTMLDivElement | null>(null),
      useRef<HTMLDivElement | null>(null),
      useRef<HTMLDivElement | null>(null),
      useRef<HTMLDivElement | null>(null),
      useRef<HTMLDivElement | null>(null),
      useRef<HTMLDivElement | null>(null),
      useRef<HTMLDivElement | null>(null),
    ];
  }

  const containerRefs = useContainerRefs();

  const [isVisible, setIsVisible] = useState<boolean[]>(
    containerRefs.map(() => false)
  );

  const [visibleCards, setVisibleCards] = useState([
    false,
    false,
    false,
    false,
  ]);
  const totalCards = visibleCards.length;

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [openInstallInstructionsModal, setOpenInstallInstructionsModal] =
    useState(false);

  const myEmailName = "fitpowerupapp";
  const emailClient = "gmail.com";
  const myWebsite = "https://mateidaniel.com";

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);

    containerRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.setAttribute("data-index", String(index)); // Set the index as a data attribute
        observer.observe(ref.current);
      }
    });

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    let currentCard = 0;
    let timeoutId: number | NodeJS.Timeout | null = null;

    const showNextCard = () => {
      setVisibleCards((visible) =>
        visible.map((_, index) => index <= currentCard)
      );
      currentCard++;

      if (currentCard < totalCards) {
        timeoutId = setTimeout(showNextCard, 5000); // Show next card after 1 second
      } else {
        timeoutId = setTimeout(
          () => setVisibleCards([false, false, false, false]),
          3000
        ); // Reset after 3 seconds
        currentCard = 0; // Reset the current card index
      }
    };

    // Start showing cards
    timeoutId = setTimeout(showNextCard, 5000);

    setShowInstallButton(!isAppInstalled());

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId as number);
      }

      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      containerRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const callbackFunction: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const index = Number(entry.target.getAttribute("data-index"));
      if (entry.isIntersecting) {
        setIsVisible((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });

        entry.target.classList.add("visible");
        entry.target.classList.remove("initial-position"); // Remove initial position class
      } else {
        entry.target.classList.remove("visible");
        entry.target.classList.add("initial-position"); // Add back initial position class
      }
    });
  };

  const options: IntersectionObserverInit = useMemo(() => {
    return {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
  }, []);

  function handleBeforeInstallPrompt(event: any) {
    event.preventDefault();
    setDeferredPrompt(event);
  }

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

  const isAppInstalled = () => {
    console.log('CHECKING IF APP IS INSTALLED')
    console.log(window.matchMedia("(display-mode: standalone)").matches)
    return window.matchMedia("(display-mode: standalone)").matches;
  };

  function getStartedClick() {
    navigate("/login");
  }

  const spanStyle: React.CSSProperties = {
    "--n": 56,
    width: "100%",
    textAlign: "center",
  } as React.CSSProperties;

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

            {showInstallButton && (
              <Button
                variant="dbz"
                sx={{
                  boxShadow: 0,
                  paddingTop: 0,
                  margin: 0,
                  lineHeight: 2.5,
                }}
                onClick={handleInstallClick}
              >
                Install
              </Button>
            )}
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
          gridTemplateRows="4fr 0.75fr 4fr 1.25fr"
          width="100%"
          position="relative"
        >
          {/* FIRST BOX */}

          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            sx={{
              "& img": {
                maxWidth: {
                  xs: "256px", // Full width on extra-small devices
                  sm: "256px", // Max width of 256px on small devices and above
                  md: "384px", // Max width of 256px on small devices and above
                  lg: "384px", // Max width of 256px on small devices and above
                },
              },
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-1.webp?alt=media&token=1afb003c-c99f-429c-82a8-dd554ec25234"
              alt=""
              style={{
                width: "100%",
                height: "100%",
              }}
              loading="lazy"
            />
          </Box>

          {/* */}
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                maxWidth: "100%", // Limit the width of the box
                overflow: "hidden",
                textAlign: "center", // Centers text horizontally in the box
                maxHeight: "100%",
                padding: 1,
              }}
            >
              <span className="type" style={spanStyle}>
                The #1 DBZ-inspired fan-made fitness app. And 100% FREE!
              </span>
            </Box>
            {/* 

            {visibleCards[3] && (
              <Box
                sx={{
                  position: "absolute",
                  top:"50%",
                  left:"50%",
                  zIndex: 4,
                  transform: "translate(8%, 10%)",
                  rotate: "-5deg",
                  maxWidth:"100%"
                }}
              >
                <FakeUserReviewCard
                  fakeUser="Bald Warrior"
                  starsRating={5}
                  avatarInitials="K"
                  reviewText="5 stars! With this app, I can track my workouts, my power level, and, yes, even my dea... I mean unexpected vacations!"
                />
              </Box>
            )}

            {visibleCards[2] && (
              <Box
                sx={{
                  position: "absolute",
                  top:"50%",
                  left:"50%",
                  zIndex: 3,
                  transform: "translate(5%, 5%)",
                  rotate: "-5deg",
                }}
              >
                <FakeUserReviewCard
                  fakeUser="Galactic Tyrant"
                  starsRating={4}
                  avatarInitials="F"
                  reviewText="Not bad, but a feature to track the downfall of enemies would be a nice addition..."
                />
              </Box>
            )}

            {visibleCards[1] && (
              <Box
                sx={{
                  position: "absolute",
                  top:"50%",
                  left:"50%",
                  zIndex: 2,
                  transform: "translate(5%, 40%)",
                  rotate: "0deg",
                }}
              >
                <FakeUserReviewCard
                  fakeUser="Prince of All Gym Lifters"
                  starsRating={3}
                  avatarInitials="V"
                  reviewText="I don't usually review, but this one is OK."
                />
              </Box>
            )}

            {visibleCards[0] && (
              <Box
                sx={{
                  position: "absolute",
                  top:"50%",
                  left:"50%",
                  zIndex: 1,
                  transform: "translate(5%, 40%)",
                  rotate: "4deg",
                }}
              >
                <FakeUserReviewCard
                  fakeUser="Time-Traveling Fighter"
                  starsRating={5}
                  avatarInitials="T"
                  reviewText="I've seen the future and, and this app is still the best out there!"
                />
              </Box>
            )}
             */}
          </Box>

          {/* THIRD BOX */}
          <Box
            sx={{
              backgroundImage:
                'URL("https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Fsplash-picture.webp?alt=media&token=fa44f1c1-a3f0-4aa8-91a0-ccb5a4330431")',
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              overflow: "hidden",
              /* 
              filter: "blur(2px)",
               */
              "& img": {
                maxWidth: {
                  xs: "256px", // Full width on extra-small devices
                  sm: "384px", // Max width of 256px on small devices and above
                  md: "384px", // Max width of 256px on small devices and above
                  lg: "384px", // Max width of 256px on small devices and above
                },
              },
              position: "relative",
            }}
            display="flex"
            flexDirection="column"
            width="100%"
            position="relative"
            height="100%"
          ></Box>
          <Box display="flex" justifyContent="center">
            <Button onClick={getStartedClick} variant="dbz">
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
          sx={{
            backgroundColor: "#18c2e6",
            background:
              "radial-gradient(circle, rgba(34,172,201,1) 0%, rgba(0,106,129,1) 100%)",
          }}
        >
          <Box
            ref={containerRefs[0]}
            className={`${
              isVisible[0] ? "visible slide-in-left" : "initial-position"
            }`}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
                height="100%"
                overflow="hidden"
                sx={{
                  "& img": {
                    maxWidth: {
                      xs: "256px", // Full width on extra-small devices
                      sm: "384px", // Max width of 256px on small devices and above
                      md: "384px", // Max width of 256px on small devices and above
                      lg: "384px", // Max width of 256px on small devices and above
                    },
                  },
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-2.webp?alt=media&token=49e609b6-56e6-4268-8b59-d74fbb087b13"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="center"
                  color="white"
                >
                  <Typography
                    align="center"
                    fontWeight="bold"
                    height="100%"
                    ref={containerRefs[1]}
                    className={`${
                      isVisible[1] ? "visible counter-library-exercises" : ""
                    }`}
                    minHeight="40px"
                  ></Typography>
                  <Typography
                    align="center"
                    fontWeight="bold"
                    fontSize="1.25rem"
                  >
                    EXERCISES
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box display="flex" justifyContent="center" width="100%">
              <Typography
                fontWeight="bold"
                fontSize="1.25rem"
                align="center"
                padding={1.5}
                color="white"
              >
                fitPowerUp offers you a library of more than one thousand
                exercises! <br />
                And you can add your own too!
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              padding={2}
            >
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
                height="100%"
                overflow="hidden"
                sx={{
                  "& img": {
                    maxWidth: {
                      xs: "256px", // Full width on extra-small devices
                      sm: "384px", // Max width of 256px on small devices and above
                      md: "384px", // Max width of 256px on small devices and above
                      lg: "384px", // Max width of 256px on small devices and above
                    },
                  },
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-2-1.webp?alt=media&token=3e8b16c8-39a7-4865-9535-4b4743404c45"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          height="100svh"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          flexDirection="column"
          sx={{
            backgroundColor: "#f3b932",
            background:
              "radial-gradient(circle, rgba(243,185,50,1) 0%, rgba(149,109,17,1) 100%)",
          }}
        >
          <Box
            ref={containerRefs[2]}
            className={`${
              isVisible[2] ? "visible fade-in" : "initial-position"
            }`}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
                height="100%"
                overflow="hidden"
                sx={{
                  "& img": {
                    maxWidth: {
                      xs: "256px", // Full width on extra-small devices
                      sm: "384px", // Max width of 256px on small devices and above
                      md: "384px", // Max width of 256px on small devices and above
                      lg: "384px", // Max width of 256px on small devices and above
                    },
                  },
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-3.webp?alt=media&token=2a79984a-6f4c-403e-88c1-ded808d5556f"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>

            <Box display="flex" justifyContent="center" width="100%">
              <Typography
                fontWeight="bold"
                fontSize="1.25rem"
                align="center"
                padding={1.5}
              >
                You can instantly access an in-depth breakdown analysis for
                every exercise!
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              padding={2}
            >
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
                height="100%"
                overflow="hidden"
                sx={{
                  "& img": {
                    maxWidth: {
                      xs: "256px", // Full width on extra-small devices
                      sm: "384px", // Max width of 256px on small devices and above
                      md: "384px", // Max width of 256px on small devices and above
                      lg: "384px", // Max width of 256px on small devices and above
                    },
                  },
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-3-1.webp?alt=media&token=81fc5f04-417c-40a6-beb9-5f19c6074ac4"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          height="100svh"
          width="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          sx={{
            backgroundColor: "#520975",
            background:
              "radial-gradient(circle, rgba(82,9,117,1) 0%, rgba(40,5,56,1) 100%)",
          }}
          justifyContent="space-around"
        >
          <Box
            ref={containerRefs[3]}
            className={`${
              isVisible[3] ? "visible slide-in-left" : "initial-position"
            }`}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
                height="100%"
                overflow="hidden"
                sx={{
                  "& img": {
                    maxWidth: {
                      xs: "256px", // Full width on extra-small devices
                      sm: "384px", // Max width of 256px on small devices and above
                      md: "384px", // Max width of 256px on small devices and above
                      lg: "384px", // Max width of 256px on small devices and above
                    },
                  },
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-4.webp?alt=media&token=511d72a1-1723-4304-9126-56574a142b69"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              color="white"
              width="100%"
            >
              <Typography
                fontWeight="bold"
                fontSize="1.25rem"
                align="center"
                padding={1.5}
              >
                You get a complete analysis, with breakdowns on your muscle
                groups, aggregated data and more!
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              padding={2}
            >
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
                height="100%"
                overflow="hidden"
                sx={{
                  "& img": {
                    maxWidth: {
                      xs: "256px", // Full width on extra-small devices
                      sm: "384px", // Max width of 256px on small devices and above
                      md: "384px", // Max width of 256px on small devices and above
                      lg: "384px", // Max width of 256px on small devices and above
                    },
                  },
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-4-1.webp?alt=media&token=88107327-146b-43b6-902f-38290795d1e0"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          height="100svh"
          width="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          sx={{
            backgroundColor: "#000000",
            background:
              "radial-gradient(circle, rgba(102,128,134,1) 0%, rgba(0,0,0,1) 100%)",
          }}
          justifyContent="space-around"
        >
          <Box
            ref={containerRefs[4]}
            className={`${isVisible[4] ? "visible grow" : "initial-position"}`}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
                height="100%"
                overflow="hidden"
                sx={{
                  "& img": {
                    maxWidth: {
                      xs: "256px", // Full width on extra-small devices
                      sm: "384px", // Max width of 256px on small devices and above
                      md: "384px", // Max width of 256px on small devices and above
                      lg: "384px", // Max width of 256px on small devices and above
                    },
                  },
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-5.webp?alt=media&token=179a5b29-a2ee-47b7-b0e5-2e5a0abd599a"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              color="white"
              width="100%"
            >
              <Typography
                fontWeight="bold"
                fontSize="1.25rem"
                align="center"
                padding={1.5}
              >
                Every workout you complete gives you a chance to increase your
                power level. <br />
                Why not getting stronger while having fun?
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              padding={2}
            >
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
                height="100%"
                overflow="hidden"
                sx={{
                  "& img": {
                    maxWidth: {
                      xs: "256px", // Full width on extra-small devices
                      sm: "384px", // Max width of 256px on small devices and above
                      md: "384px", // Max width of 256px on small devices and above
                      lg: "384px", // Max width of 256px on small devices and above
                    },
                  },
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-5-1.webp?alt=media&token=9bf050f9-a151-4dc7-b816-c096b2411b80"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          height="100svh"
          width="100%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          sx={{
            backgroundColor: "red",
            background:
              "radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(173,12,12,1) 100%)",
          }}
        >
          <Box
            ref={containerRefs[5]}
            className={`${
              isVisible[5] ? "visible fade-in" : "initial-position"
            }`}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
                height="100%"
                overflow="hidden"
                sx={{
                  "& img": {
                    maxWidth: {
                      xs: "256px", // Full width on extra-small devices
                      sm: "384px", // Max width of 256px on small devices and above
                      md: "384px", // Max width of 256px on small devices and above
                      lg: "384px", // Max width of 256px on small devices and above
                    },
                  },
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-6.webp?alt=media&token=f3aa35d0-c797-44b8-bc74-899187f6411f"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              color="white"
              width="100%"
            >
              <Typography
                fontWeight="bold"
                fontSize="1.25rem"
                align="center"
                padding={1.5}
              >
                Unlock DBZ heroes with the Path feature and reach new gym
                milestones in the Feats menu!
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
                height="100%"
                overflow="hidden"
                sx={{
                  "& img": {
                    maxWidth: {
                      xs: "256px", // Full width on extra-small devices
                      sm: "384px", // Max width of 256px on small devices and above
                      md: "384px", // Max width of 256px on small devices and above
                      lg: "384px", // Max width of 256px on small devices and above
                    },
                  },
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-6-1.webp?alt=media&token=67df5913-9ee9-4f22-94f4-ffaefee9a973"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        height="100svh"
        width="100%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        sx={{
          backgroundColor: "red",
          background:
            "radial-gradient(circle, rgba(102,128,134,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Box
          ref={containerRefs[6]}
          className={`${
            isVisible[6] ? "visible slide-in-left" : "initial-position"
          }`}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100%"
              height="100%"
              overflow="hidden"
              sx={{
                "& img": {
                  maxWidth: {
                    xs: "256px", // Full width on extra-small devices
                    sm: "384px", // Max width of 256px on small devices and above
                    md: "384px", // Max width of 256px on small devices and above
                    lg: "384px", // Max width of 256px on small devices and above
                  },
                },
              }}
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-7.webp?alt=media&token=83c35143-14c2-4683-ad01-504c3316d264"
                alt=""
                loading="lazy"
              />
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            color="white"
            width="100%"
          >
            <Typography
              fontWeight="bold"
              fontSize="1.25rem"
              align="center"
              padding={1.5}
            >
              Easy install & runs everywhere! fitPowerUp uses the PWA
              technology, <br />
              meaning it works seamlessly across all devices just like a native
              app!
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100%"
              height="100%"
              overflow="hidden"
              sx={{
                "& img": {
                  maxWidth: {
                    xs: "256px", // Full width on extra-small devices
                    sm: "384px", // Max width of 256px on small devices and above
                    md: "384px", // Max width of 256px on small devices and above
                    lg: "384px", // Max width of 256px on small devices and above
                  },
                },
              }}
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-7-1.webp?alt=media&token=0b398595-0642-496f-91ce-23e9c05a3141"
                alt=""
                loading="lazy"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        height="calc(100svh - 56px)"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        sx={{
          backgroundColor: "black",
        }}
        gap={1}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            sx={{
              fontSize: {
                sm: "1rem", // Max width of 256px on small devices and above
                md: "1rem", // Max width of 256px on small devices and above
                lg: "1.25rem", // Max width of 256px on small devices and above
              },
            }}
          >
            Disclaimer <InfoIcon fontSize="small" style={{ color: "white" }} />
          </Typography>

          <Typography
            color="white"
            variant="caption"
            align="center"
            padding={1.5}
            sx={{
              fontSize: {
                sm: "1rem", // Max width of 256px on small devices and above
                md: "1rem", // Max width of 256px on small devices and above
                lg: "1.25rem", // Max width of 256px on small devices and above
              },
            }}
          >
            This app is a fan-made creation, inspired by the Dragon Ball Z
            series, which is a property of FUNimation, Toei Animation, Fuji TV,
            and Akira Toriyama. All intellectual property rights for Dragon Ball
            Z are owned by their respective holders, and I, as an independent
            developer, claim no affiliation with or endorsement by them.
            <br />
            Some content within this app is generated using AI technology and is
            inspired by the themes, characters, and universe of Dragon Ball Z.
            This app is purely a passion project, created by a fan for fans,
            with the dual purpose of celebrating the series and promoting
            physical fitness and a healthy lifestyle. I encourage users to get
            active and visit the gym through engaging, DBZ-themed challenges and
            content.
            <br />
            There is no commercial intent or gain behind this project; it is
            entirely a labor of love dedicated to the Dragon Ball Z community.
            My aim is not only to celebrate the iconic Dragon Ball Z series but
            also to inspire fans to explore a healthier lifestyle and share
            their fitness journeys within this interactive and supportive
            community.
          </Typography>
        </Container>

        <Typography
          color="white"
          display="flex"
          alignItems="center"
          gap={1}
          variant="overline"
        >
          <RedditIcon />
          Join the
          <a
            href="https://reddit.com/r/fitpowerup"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            r/fitPowerUp
          </a>
          community!
        </Typography>

        <Typography
          color="white"
          display="flex"
          alignItems="center"
          gap={1}
          variant="overline"
        >
          <EmailIcon />
          Click
          <a
            href={`mailto:${myEmailName}@${emailClient}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            here
          </a>
          to contact me via email.
        </Typography>

        <Typography variant="body2" color="white" align="center">
          <Link color="inherit" href={myWebsite} target="_blank">
            Developed by Daniel Matei {new Date().getFullYear()}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;
