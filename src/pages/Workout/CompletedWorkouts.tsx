import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Divider from "@mui/material/Divider";
import { auth } from "../../config/firebase";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CommentIcon from "@mui/icons-material/Comment";
import ViewCommentModal from "../../components/ui/ViewCommentModal";
import Exercise from "../../utils/interfaces/Exercise";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { TrainingDataContext } from "../../context/TrainingData";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/completeWorkout";
import { AuthContext } from "../../context/Auth";
import formatDateForTextField from "../../utils/formatDateForTextfield";
import { Rating } from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DataBadge from "../../components/ui/DataBadge";
import { Paper } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import RetrievingYourData from "../../components/ui/RetrievingYourData";

function CompletedWorkouts() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const {
    userTrainingData,
    dateForWorkout,
    setDateForWorkout,
  } = useContext(TrainingDataContext);
  
  const { currentUserData } = useContext(AuthContext);

  const [filteredUserTrainingData, setFilteredUserTrainingData] = useState<
    IWorkoutData[]
  >([]);
  const [openViewCommentModal, setOpenViewCommentModal] = useState(false);
  const [exerciseComment, setExerciseComment] = useState("");

  const [swipe, setSwipe] = useState<any>({
    moved: false,
    touchEnd: 0,
    touchStart: 0,
  });

  //console.log(userTrainingData)
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
    filterUserTrainingsPerDay(dateForWorkout);
  }, [userTrainingData, dateForWorkout]);

  const handleLeftArrowClick = () => {
    const newDate = convertStringToDate(dateForWorkout);
    newDate.setDate(newDate.getDate() - 1);
    const convertedDate = formatDateForTextField(newDate);
    setDateForWorkout(convertedDate);
    filterUserTrainingsPerDay(convertedDate);
  };

  const handleRightArrowClick = () => {
    const newDate = convertStringToDate(dateForWorkout);
    newDate.setDate(newDate.getDate() + 1);
    const convertedDate = formatDateForTextField(newDate);
    setDateForWorkout(convertedDate);
    filterUserTrainingsPerDay(convertedDate);
  };

  function filterUserTrainingsPerDay(convertedDate: string) {
    if (userTrainingData) {
      const filteredUserTrainingDataArr = userTrainingData.filter(
        (entry: IWorkoutData, index: number) => entry.date === convertedDate
      );

      setFilteredUserTrainingData(filteredUserTrainingDataArr);
    }
  }

  function convertStringToDate(dateString: string) {
    const newDate = new Date(dateString);
    return newDate;
  }

  const pages = [
    "Analysis",
    "Preset Workouts",
    "Body Tracker",
    "Settings",
    "Sign Out",
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
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
    } else if (page === "Preset Workouts") {
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
    return <RetrievingYourData/>;
  }

  const handleSelectCompletedExercise = (exerciseName: string) => {
    navigate(`completed-details/${exerciseName}`);
  };

  function handleViewCommentModalVisibility(
    exerciseComment: string | undefined
  ) {
    if (exerciseComment) {
      setExerciseComment(exerciseComment);
      setOpenViewCommentModal(!openViewCommentModal);
    }
  }

  return (
    <Container
      sx={{ height: "calc(100dvh - 112px)", width: "100%" }}
      maxWidth="md"
      className="ThisIsTheBoxUnder"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <ViewCommentModal
        openViewCommentModal={openViewCommentModal}
        setOpenViewCommentModal={setOpenViewCommentModal}
        exerciseComment={exerciseComment}
      />

      <AppBar
        elevation={2}
        style={{
          top: 0,
          width: "100%",
          height: "56px",
          background:
            "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <FitnessCenterIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />

            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Workouts
            </Typography>

            <FitnessCenterIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                letterSpacing: ".3rem",
                color: "inherit",
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
                    fontFamily: "inherit",
                    fontWeight: "400",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Menu
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
              <MenuItem onClick={() => handlePageClick("Analysis")}>
                <ListItemIcon>
                  <InsertChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Analysis</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handlePageClick("Preset Workouts")}>
                <ListItemIcon>
                  <FormatListNumberedRtlIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Preset Workouts</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handlePageClick("Body Tracker")}>
                <ListItemIcon>
                  <AccessibilityIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Body Tracker</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handlePageClick("Settings")}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handlePageClick("Sign Out")}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </MenuItem>
            </Menu>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ marginLeft: "auto" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleCalendar}
                >
                  <CalendarMonthIcon sx={{ color: "white" }} />
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{ display: { md: "none" } }}
                >
                  <MenuIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        maxWidth="md"
        className="ThisIsTheWrappingContainerForTheFuncitionalDateBar"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          flexGrow: 1,
        }}
      >
        <IconButton aria-label="left arrow" onClick={handleLeftArrowClick}>
          <KeyboardArrowLeftIcon
            sx={{
              color: "black",
              fontSize: "2rem",
              backgroundColor: "#FFA500",
              borderRadius: "4px",
            }}
          />
        </IconButton>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            /* 
            background:"radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(204,136,10,1) 100%)", 
             */
            color: "black",
            padding: 0,
            fontSize: "1.25rem",
            fontWeight: "500",
          }}
          disableRipple
          disableFocusRipple
          disableTouchRipple
          disableElevation
        >
          {dateForWorkout}
        </Button>

        <IconButton aria-label="left arrow" onClick={handleRightArrowClick}>
          <KeyboardArrowRightIcon
            sx={{
              color: "black",
              fontSize: "2rem",
              backgroundColor: "#FFA500",
              borderRadius: "4px",
            }}
          />
        </IconButton>
      </Container>

      <Fab
        sx={{
          backgroundColor: "#FFA500",

          position: "fixed",
          bottom: "75px",
          right: "15px",
        }}
        size="medium"
        onClick={handleNewWorkout}
        aria-label="start-new-workout"
      >
        <PostAddIcon />
      </Fab>
      <Zoom in={true}>
        <Box
          className="AAAAThisIsPossiblyTheOtherThingThatWorks"
          sx={{
            paddingBottom: "64px",
            gap: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {filteredUserTrainingData.length > 0 &&
            filteredUserTrainingData.map(
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

                  <Accordion sx={{ borderRadius: "4px" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        readOnly
                        max={7}
                        size="large"
                        name="simple-controlled"
                        sx={{ color: "#FFA500" }}
                        value={entry.wEval.value}
                        icon={<StarsIcon fontSize="inherit" />}
                      />
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>"{entry.wEval.comment}"</Typography>
                      <Box>
                        <FormControlLabel
                          control={<Switch />}
                          label="Trained better than the last time?"
                          checked={entry.wEval.trainHarder}
                        />
                        <FormControlLabel
                          control={<Switch />}
                          label="Warmed up & stretched properly?"
                          checked={entry.wEval.warmStretch}
                        />
                        <FormControlLabel
                          control={<Switch />}
                          label="Any discomfort/pain?"
                          checked={entry.wEval.feelPain}
                        />
                      </Box>
                      <Box display="flex" justifyContent="space-around">
                        <DataBadge dataValue={entry.power} dataLabel="PL" />
                        <DataBadge
                          dataValue={entry.stats.reps}
                          dataLabel="reps"
                        />
                        <DataBadge
                          dataValue={entry.stats.sets}
                          dataLabel="sets"
                        />
                        <DataBadge
                          dataValue={entry.stats.vol}
                          dataLabel={
                            currentUserData.unitsSystem === "metric"
                              ? "kg"
                              : "lbs"
                          }
                        />
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  {entry.wExercises.map(
                    (
                      exercise: { name: string; exercises: Exercise[] },
                      index: number
                    ) => (
                      <Box
                        key={index}
                        sx={{
                          borderRadius: "4px",
                          boxShadow: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            textAlign: "center",
                            fontSize: "large",
                            background:
                              "radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(204,136,10,1) 100%)",
                            boxShadow: 2,
                            borderRadius: "4px",
                          }}
                          onClick={() =>
                            handleSelectCompletedExercise(
                              exercise.name.toLocaleUpperCase()
                            )
                          }
                        >
                          {exercise.name.toLocaleUpperCase()}
                        </Typography>

                        <Divider sx={{ backgroundColor: "aliceblue" }} />
                        {exercise.exercises.map(
                          (exercise: Exercise, exerciseIndex: number) => (
                            <Box
                              key={exerciseIndex}
                              sx={{
                                display: "grid",
                                gridAutoFlow: "column",
                                gridTemplateColumns: "1fr 1fr 4fr",
                                justifyContent: "space-evenly",
                                justifyItems: "center",
                                alignItems: "center",
                              }}
                            >
                              {exercise.comment ? ( // Check if 'comment' property exists
                                <IconButton
                                  size="large"
                                  aria-label="account of current user"
                                  aria-controls="menu-appbar"
                                  aria-haspopup="true"
                                  onClick={() =>
                                    handleViewCommentModalVisibility(
                                      exercise.comment
                                    )
                                  }
                                >
                                  <CommentIcon
                                    sx={{
                                      zIndex: 0,
                                    }}
                                  />
                                </IconButton>
                              ) : (
                                <IconButton
                                  size="large"
                                  aria-label="account of current user"
                                  aria-controls="menu-appbar"
                                  aria-haspopup="true"
                                  color="inherit"
                                  disabled // Placeholder element
                                >
                                  <CommentIcon style={{ opacity: 0 }} />
                                </IconButton>
                              )}

                              {exercise.is_pr ? (
                                <IconButton
                                  size="large"
                                  aria-label="account of current user"
                                  aria-controls="menu-appbar"
                                  aria-haspopup="true"
                                  color="inherit"
                                  disabled // Placeholder element
                                >
                                  <EmojiEventsIcon
                                    sx={{ zIndex: -1, color: "#520975" }}
                                  />
                                </IconButton>
                              ) : (
                                <IconButton
                                  size="large"
                                  aria-label="account of current user"
                                  aria-controls="menu-appbar"
                                  aria-haspopup="true"
                                  color="inherit"
                                  disabled // Placeholder element
                                >
                                  <EmojiEventsIcon
                                    sx={{ opacity: 0, zIndex: 0 }}
                                  />
                                </IconButton>
                              )}

                              <Box
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns:
                                    "repeat(2, minmax(auto, 1fr))",
                                  alignItems: "center",
                                  justifyItems: "center",
                                  width: "100%",
                                  justifyContent: "space-evenly",
                                  borderLeft: exercise.dropset
                                    ? "5px solid red"
                                    : "5px solid transparent",
                                }}
                              >
                                {exercise.weight !== 0 && (
                                  <Typography>
                                    {`${exercise.weight.toFixed(2)} ${
                                      currentUserData.unitsSystem === "metric"
                                        ? "kg"
                                        : "lbs"
                                    }`}
                                  </Typography>
                                )}

                                {exercise.reps !== 0 && (
                                  <Typography>{exercise.reps} reps</Typography>
                                )}

                                {exercise.distance !== 0 && (
                                  <Typography>{`${exercise.distance} ${exercise.distance_unit}`}</Typography>
                                )}

                                {exercise.time !== 0 && (
                                  <Typography>
                                    {exercise.time !== 0
                                      ? formatTime(exercise.time)
                                      : ""}
                                  </Typography>
                                )}
                              </Box>

                              <Divider />
                            </Box>
                          )
                        )}
                      </Box>
                    )
                  )}
                </Box>
              )
            )}

          {filteredUserTrainingData.length === 0 && (
            <Paper
              elevation={2}
              sx={{
                height: "calc(100dvh - 168px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SearchIcon fontSize="large" />
              <Typography textAlign="center" fontSize="1rem">
                Workout log empty for this date.
              </Typography>
            </Paper>
          )}
        </Box>
      </Zoom>
    </Container>
  );
}

export default CompletedWorkouts;
