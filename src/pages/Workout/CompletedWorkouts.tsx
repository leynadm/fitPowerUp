import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  MouseEvent,
} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { auth } from "../../config/firebase";

import { WorkoutSetCard } from "../../components/workouts/WorkoutSetCard";
import Fab from "@mui/material/Fab";

import PostAddIcon from "@mui/icons-material/PostAdd";
import { UserTrainingDataContext } from "../../context/UserTrainingData";
import { IWorkoutData } from "../../utils/interfaces/IUserTrainingData";
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
import formatDateForTextField from "../../utils/formatDateForTextfield";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SettingsIcon from "@mui/icons-material/Settings";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoadingScreen from "../../components/ui/LoadingScreen";
import { useMediaQuery } from "@mui/material";
import { CompletedWorkoutAccordion } from "../../components/workouts/CompletedWorkoutAccordion";
import { CompletedWorkoutNavArrows } from "../../components/workouts/CompletedWorkoutNavArrows";
import { getThemeMode } from "../../theme";
function CompletedWorkouts() {
  const isDarkModeEnabled = getThemeMode();
  
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { userTrainingData, dateForWorkout, setDateForWorkout } = useContext(
    UserTrainingDataContext
  );

  const [filteredUserTrainingData, setFilteredUserTrainingData] = useState<
    IWorkoutData[]
  >(() => filterUserTrainingsPerDay(dateForWorkout, userTrainingData));

  const [swipe, setSwipe] = useState<any>({
    moved: false,
    touchEnd: 0,
    touchStart: 0,
  });

  const { moved, touchEnd, touchStart } = swipe;

  const SENSITIVITY = 125;

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    let touchStartX = e.targetTouches[0].clientX;
    setSwipe((swipe: any) => ({ ...swipe, touchStart: touchStartX }));
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    let touchEndX = e.targetTouches[0].clientX;
    setSwipe((swipe: any) => ({ ...swipe, touchEnd: touchEndX, moved: true }));
  }

  function handleTouchEnd() {
    if (touchStart !== 0 && touchEnd !== 0) {
      const amountSwipe = swipe.touchEnd - swipe.touchStart;

      if (Math.abs(amountSwipe) > SENSITIVITY && swipe.moved) {
        if (amountSwipe < 0) {
          handleRightArrowClick();
        } else {
          handleLeftArrowClick();
        }
      }
    }

    setSwipe({ moved: false, touchEnd: 0, touchStart: 0 });
  }

  useEffect(() => {
    const filteredUserTrainingDataArr = filterUserTrainingsPerDay(
      dateForWorkout,
      userTrainingData
    );

    setFilteredUserTrainingData(filteredUserTrainingDataArr);
  }, [userTrainingData, dateForWorkout]);

  const containerRef = useRef<HTMLElement>(null);

  const handleLeftArrowClick = () => {
    const newDate = convertStringToDate(dateForWorkout);
    newDate.setDate(newDate.getDate() - 1);
    const convertedDate = formatDateForTextField(newDate);
    setDateForWorkout(convertedDate);

    const filteredUserTrainingDataArr = filterUserTrainingsPerDay(
      convertedDate,
      userTrainingData
    );

    setFilteredUserTrainingData(filteredUserTrainingDataArr);
  };

  const handleRightArrowClick = () => {
    const newDate = convertStringToDate(dateForWorkout);
    newDate.setDate(newDate.getDate() + 1);
    const convertedDate = formatDateForTextField(newDate);
    setDateForWorkout(convertedDate);
    const filteredUserTrainingDataArr = filterUserTrainingsPerDay(
      convertedDate,
      userTrainingData
    );

    setFilteredUserTrainingData(filteredUserTrainingDataArr);
  };

  function convertStringToDate(dateString: string) {
    const newDate = new Date(dateString);
    return newDate;
  }

  const pages = [
    "Analysis",
    "Workouts & Routines",
    "Body Tracker",
    "Settings",
    "Sign Out",
  ];

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleDesktopBtnClick = (page: string) => {
    handleCloseNavMenu();

    // Handle logic based on the clicked page
    if (page === "Analysis") {
      navigate("analysis");
    } else if (page === "Workouts & Routines") {
      navigate("preset-workouts");
    } else if (page === "Body Tracker") {
      navigate("bodytracker");
    } else if (page === "Settings") {
      navigate("settings");
    } else if (page === "Sign Out") {
      auth.signOut();
      // ...
    }
  };

  const handlePageClick = (page: string) => {
    handleCloseNavMenu();
    if (page === "Analysis") {
      navigate("analysis");
    } else if (page === "Preset Workouts") {
      navigate("preset-workouts");
    } else if (page === "Body Tracker") {
      navigate("bodytracker");
    } else if (page === "Settings") {
      navigate("settings");
    } else if (page === "Sign Out") {
      auth.signOut();
    }
  };

  const handleCalendar = () => {
    navigate("calendar");
  };

  const handleNewWorkout = () => {
    navigate("new");
  };

  if (userTrainingData === undefined) {
    return <LoadingScreen text="Retrieving your data..." />;
  }

  return (
    <Container
      sx={{ width: "100%", height: "100%" }}
      maxWidth="md"
      className="ThisIsTheBoxUnder"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <AppBar
        style={{
          top: 0,
          width: "100%",
          height: "56px"
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>


            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                letterSpacing: ".3rem",
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              Workouts
            </Typography>
            {/* 
            <FitnessCenterIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            /> */}

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                letterSpacing: ".0rem",
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              Workouts
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleDesktopBtnClick(page)}
                  sx={{
                    my: 2,
                    color: "white",

                    fontWeight: "400",
                  }}
                >
                  <Typography>{page}</Typography>
                </Button>
              ))}
            </Box>

            <Menu
              elevation={0}
                      
              
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              
              open={Boolean(anchorElNav)}
              
              onClose={handleCloseNavMenu}
                
              sx={{
                display: { xs: "block", md: "none" },               
              }}
            >
              <MenuItem  onClick={() => handlePageClick("Analysis")} >
                <ListItemIcon>
                  <InsertChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ color: "text.secondary" }}
                >
                  Analysis
                </ListItemText>
              </MenuItem>

              <MenuItem onClick={() => handlePageClick("Preset Workouts")}>
                <ListItemIcon>
                  <FormatListNumberedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ color: "text.secondary" }}
                >
                  Workouts & Routines
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handlePageClick("Body Tracker")}>
                <ListItemIcon>
                  <AccessibilityIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ color: "text.secondary" }}
                >
                  Body Tracker
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handlePageClick("Settings")}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ color: "text.secondary" }}
                >
                  Settings
                </ListItemText>
              </MenuItem>

              <MenuItem onClick={() => handlePageClick("Sign Out")}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ color: "text.secondary" }}
                >
                  Log Out
                </ListItemText>
              </MenuItem>
            </Menu>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"                  
                  onClick={handleCalendar}
                >
                  <CalendarMonthIcon sx={{color:"neutral.main"}}  />
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  sx={{ display: { md: "none" } ,color:"neutral.main"}}
                >
                  <MenuIcon  />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <CompletedWorkoutNavArrows
        handleLeftArrowClick={handleLeftArrowClick}
        handleRightArrowClick={handleRightArrowClick}
      />

      <Fab
        sx={{
          background:"#FFA500",
          position: "fixed",
          bottom: "75px",
          right: "15px",
          boxShadow:"none"
        }}
        
        size="medium"
        onClick={handleNewWorkout}
        aria-label="start-new-workout"
      >
        <PostAddIcon />
      </Fab>

      <Box
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "column",
        }}
        ref={containerRef}
      >
        {filteredUserTrainingData && filteredUserTrainingData.length > 0 ? (
          <>
            {filteredUserTrainingData.map(
              (entry: IWorkoutData, index: number) => (
                <Box
                  className="exercises"
                  display="flex"
                  flexDirection="column"
                  gap={0.75}
                  key={index}
                >
                  {filteredUserTrainingData.length > 1 && (
                    <Typography textAlign="center" variant="subtitle1">
                      Workout Session {index + 1}
                    </Typography>
                  )}

                  <CompletedWorkoutAccordion
                    entry={entry}
                    filteredUserTrainingData={filteredUserTrainingData}
                  />

                  {entry.wExercises.map(
                    (
                      exercise: { name: string; exercises: Exercise[] },
                      index: number
                    ) => (
                      <WorkoutSetCard
                        key={index}
                        exercise={exercise}
                        index={index}
                        handleExerciseSelect={() =>
                          navigate(`completed-details/${exercise.name}`)
                        }
                      />
                    )
                  )}
                </Box>
              )
            )}
          </>
        ) : (
          <>
            {filteredUserTrainingData &&
              filteredUserTrainingData.length === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1,
                    height: "calc(100svh - 168px)",
                  }}
                >
                  <img
                    src={isDarkModeEnabled==='light'?'/svg/goku.svg':'/svg/goku-orange.svg'}
                    alt="son goku"
                    width={128}
                    height={128}
                  />
                  <Typography
                    textAlign="center"
                    fontSize="2rem"
                    color="text.secondary"
                  >
                    Workout log <br />
                    is empty
                  </Typography>
                </Box>
              )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default CompletedWorkouts;

export function filterUserTrainingsPerDay(
  convertedDate: string,
  userTrainingData: IWorkoutData[]
): IWorkoutData[] {
  if (userTrainingData) {
    const filteredUserTrainingDataArr = userTrainingData.filter(
      (entry: IWorkoutData) => entry.date === convertedDate
    );
    return filteredUserTrainingDataArr.length > 0
      ? filteredUserTrainingDataArr
      : [];
  }
  return [];
}
