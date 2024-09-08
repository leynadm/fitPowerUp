import React, { useState, useEffect, useRef, useMemo } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import InstallInstructionsModal from "../../components/ui/InstallInstructionsModal";
import InfoIcon from "@mui/icons-material/Info";
import "../Home/styles/animation.css";
import RedditIcon from "@mui/icons-material/Reddit";
import EmailIcon from "@mui/icons-material/Email";
import { DBZ } from "./LandingPage/DBZ";
import CustomLogo from "../../assets/fp-logo.png"
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
        position="sticky"
        style={{
          height: "56px",
          top: 0,
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
            <Box width={154}>
              <img
                src={CustomLogo}
                alt=""
                width="100%"
                height="100%"
              />
            </Box>

            {showInstallButton && (
              <Button
                variant="dbz"
                sx={{
                  boxShadow: 0,
                  paddingTop: 0,
                  margin: 0,
                  lineHeight: 1.75,
                }}
                onClick={handleInstallClick}
              >
                Install
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <DBZ />
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
          width="100%"
          sx={{
            backgroundColor: "#18c2e6",
            background:
              "radial-gradient(circle, rgba(34,172,201,1) 0%, rgba(0,106,129,1) 100%)",
          }}
        >
          <Box
            height="100svh"
            paddingTop={2}
            paddingBottom={2}
            display="grid"
            gridTemplateRows="4.5fr 1fr 4.5fr"
            ref={containerRefs[0]}
            className={`${
              isVisible[0] ? "visible slide-in-left" : "initial-position"
            }`}
          >
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr"
              overflow="hidden"
              position="relative"
            >
              <img
                src="/images/landing/lightning-blue.webp"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                }}
              ></img>
              <Box
                overflow="hidden"
                width="100%"
                justifyContent="flex-end"
                alignItems="flex-end"
                display="flex"
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-2.webp?alt=media&token=49e609b6-56e6-4268-8b59-d74fbb087b13"
                  alt=""
                  style={{
                    objectFit: "contain",
                    maxWidth: "100%",

                    height: "100%",
                  }}
                ></img>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                color="white"
                justifySelf="flex-start"
              >
                <Typography
                  align="center"
                  ref={containerRefs[1]}
                  className={`${
                    isVisible[1] ? "visible counter-library-exercises" : ""
                  }`}
                  minHeight="40px"
                ></Typography>
                <Typography align="center" fontSize="2rem" color="#1c4595">
                  EXERCISES
                </Typography>
              </Box>
            </Box>

            <Typography
              fontSize="1.25rem"
              align="center"
              padding={1.5}
              color="white"
            >
              fitPowerUp offers you a library of more than one thousand
              exercises! <br />
              And you can add your own too!
            </Typography>

            <Box overflow="hidden" height="100%" position="relative">
              <img
                src="/images/landing/electric-white.webp"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                }}
              ></img>

              <img
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-2-1.webp?alt=media&token=3e8b16c8-39a7-4865-9535-4b4743404c45"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
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
            height="100svh"
            width="100%"
            display="grid"
            gridTemplateRows="4.5fr 1fr 4.5fr"
          >
            <Box overflow="hidden" height="100%" position="relative">
              <img
                src="/images/landing/electric-white.webp"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                }}
              ></img>

              <img
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-3.webp?alt=media&token=2a79984a-6f4c-403e-88c1-ded808d5556f"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Box>

            <Typography
              fontSize="1.25rem"
              align="center"
              padding={1.5}
              sx={{ verticalAlign: "center" }}
            >
              You can instantly access an in-depth breakdown analysis for every
              exercise!
            </Typography>

            <Box overflow="hidden" height="100%" position="relative">
              <img
                src="/images/landing/electric-red.webp"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                }}
              ></img>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-3-1.webp?alt=media&token=81fc5f04-417c-40a6-beb9-5f19c6074ac4"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Box>
          </Box>
        </Box>

        <Box
          width="100%"
          sx={{
            backgroundColor: "#520975",
            background:
              "radial-gradient(circle, rgba(82,9,117,1) 0%, rgba(40,5,56,1) 100%)",
          }}
        >
          <Box
            ref={containerRefs[3]}
            className={`${
              isVisible[3] ? "visible slide-in-left" : "initial-position"
            }`}
            height="100svh"
            width="100%"
            display="grid"
            gridTemplateRows="4.5fr 1fr 4.5fr"
          >
            <Box overflow="hidden" height="100%" position="relative">
              <img
                src="/images/landing/power-blue.webp"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                }}
              ></img>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-4.webp?alt=media&token=511d72a1-1723-4304-9126-56574a142b69"
                alt=""
                width="auto"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Box>

            <Typography
              fontSize="1.25rem"
              align="center"
              padding={1.5}
              color="white"
            >
              You get a complete analysis, with breakdowns on your muscle
              groups, aggregated data and more!
            </Typography>

            <Box overflow="hidden" height="100%" position="relative">
              <img
                src="/images/landing/electric-red.webp"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                }}
              ></img>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-4-1.webp?alt=media&token=88107327-146b-43b6-902f-38290795d1e0"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Box>
          </Box>
        </Box>

        <Box
          width="100%"
          sx={{
            backgroundColor: "#000000",
            background:
              "radial-gradient(circle, rgba(102,128,134,1) 0%, rgba(0,0,0,1) 100%)",
          }}
        >
          <Box
            ref={containerRefs[4]}
            className={`${isVisible[4] ? "visible grow" : "initial-position"}`}
            height="100svh"
            display="grid"
            gridTemplateRows="4.5fr 1fr 4.5fr"
          >
            <Box overflow="hidden" height="100%" position="relative">
              <img
                src="/images/landing/electric-white.webp"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                }}
              ></img>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-5.webp?alt=media&token=179a5b29-a2ee-47b7-b0e5-2e5a0abd599a"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Box>

            <Typography
              fontSize="1.25rem"
              align="center"
              padding={1.5}
              color="white"
            >
              Every workout you complete gives you a chance to increase your
              power level. <br />
              Why not get stronger while having fun?
            </Typography>

            <Box overflow="hidden" height="100%" position="relative">
              <img
                src="/images/landing/electric-red.webp"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                }}
              ></img>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-5-1.webp?alt=media&token=9bf050f9-a151-4dc7-b816-c096b2411b80"
                alt=""
                width="auto"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Box>
          </Box>
        </Box>

        <Box
          width="100%"
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
            height="100svh"
            display="grid"
            gridTemplateRows="4.5fr 1fr 4.5fr"
          >
            <Box overflow="hidden" height="100%" position="relative">
              <img
                src="/images/landing/power-blue.webp"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                }}
              ></img>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-6.webp?alt=media&token=f3aa35d0-c797-44b8-bc74-899187f6411f"
                alt=""
                width="auto"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Box>

            <Typography
              fontSize="1.25rem"
              align="center"
              padding={1.5}
              color="white"
            >
              Unlock DBZ heroes with the Path feature, and reach new gym
              milestones using Feats!
            </Typography>

            <Box overflow="hidden" height="100%" position="relative">
              <img
                src="/images/landing/electric-white.webp"
                alt=""
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                }}
              ></img>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-6-1.webp?alt=media&token=67df5913-9ee9-4f22-94f4-ffaefee9a973"
                alt=""
                width="auto"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                }}
              ></img>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        width="100%"
        sx={{
          backgroundColor: "red",
          background:
            "radial-gradient(circle, rgba(102,128,134,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Box
          height="100svh"
          display="grid"
          gridTemplateRows="4.5fr 1fr 4.5fr"
          ref={containerRefs[6]}
          className={`${
            isVisible[6] ? "visible slide-in-left" : "initial-position"
          }`}
        >
          <Box overflow="hidden" height="100%" position="relative">
            <img
              src="/images/landing/power-blue.webp"
              alt=""
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
              }}
            ></img>

            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-7.webp?alt=media&token=83c35143-14c2-4683-ad01-504c3316d264"
              alt=""
              width="auto"
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                width: "100%",
                height: "100%",
              }}
            ></img>
          </Box>

          <Typography
            color="white"
            fontSize="1.25rem"
            align="center"
            padding={1.5}
          >
            Easy install & runs everywhere! fitPowerUp uses the PWA technology,{" "}
            <br />
            meaning it works seamlessly across all devices just like a native
            app!
          </Typography>

          <Box overflow="hidden" height="100%" position="relative">
            <img
              src="/images/landing/electric-red.webp"
              alt=""
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
              }}
            ></img>

            <img
              src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Flanding-page%2Flanding-page-7-1.webp?alt=media&token=0b398595-0642-496f-91ce-23e9c05a3141"
              alt=""
              width="auto"
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                width: "100%",
                height: "100%",
              }}
            ></img>
          </Box>
        </Box>
      </Box>

      <Box
        width="100%"
        display="grid"
        gridTemplateRows="9.25fr 0.75fr"
        sx={{
          backgroundColor: "black",
          placeItems: "center",
          alignItems: "center",
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Typography color="#FFA500" fontSize="1.75rem">
              Disclaimer
            </Typography>
            <InfoIcon fontSize="large" style={{ color: "#FFA500" }} />
          </Box>

          <Typography
            color="#FFA500"
            variant="caption"
            align="center"
            padding={1}
            lineHeight={1.25}
            fontSize="1.5rem"
          >
            This app is a fan-made creation, inspired by the Dragon Ball Z
            series, which is a property of FUNimation, Toei Animation, Fuji TV,
            and Akira Toriyama.
            <br />
            <br />
            All intellectual property rights for Dragon Ball Z are owned by
            their respective holders, and I, as an independent developer, claim
            no affiliation with or endorsement by them.
            <br />
            <br />
            Some content within this app is generated using AI technology and is
            inspired by the themes, characters, and universe of Dragon Ball Z.
            <br />
            <br />
            This app is purely a passion project, created by a fan for fans,
            with the dual purpose of celebrating the series and promoting
            physical fitness and a healthy lifestyle.
            <br />
            <br />
            I encourage users to get active and visit the gym through engaging,
            DBZ-themed challenges and content.
            <br />
            <br />
            There is no commercial intent or gain behind this project; it is
            entirely a labor of love dedicated to the Dragon Ball Z community.
            <br />
            <br />
            My aim is to celebrate the iconic Dragon Ball Z series, and
            to inspire fans to pursue a healthier lifestyle, sharing their
            fitness journeys within this interactive and supportive community.
          </Typography>
        </Container>

        <Box
          display="flex"
          height="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          gap={2}
        >
          <Typography
            color="white"
            display="flex"
            alignItems="center"
            gap={1}
            variant="body2"
          >
            <RedditIcon />
            Join the
            <a
              href="https://reddit.com/r/fitpowerup"
              target="_blank"
              rel="noopener noreferrer"
          style={{color:"white"}}
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
            variant="body2"
          >
            <EmailIcon />
            Click
            <a
              href={`mailto:${myEmailName}@${emailClient}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{color:"white"}}
            >
              here
            </a>
            to contact me via email.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default LandingPage;
