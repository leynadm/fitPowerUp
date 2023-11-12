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
interface CompletedWorkoutsProps {
  todayDate: Date | undefined;
  setTodayDate: Dispatch<SetStateAction<Date | undefined>>;
}

function CompletedWorkouts({
  todayDate,
  setTodayDate,
}: CompletedWorkoutsProps) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { userTrainingData, dateForWorkout, setDateForWorkout } =
    useContext(TrainingDataContext);
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
        (entry: IWorkoutData, index: number) =>
          entry.workoutDate === convertedDate
      );

      setFilteredUserTrainingData(filteredUserTrainingDataArr);
    }
  }

  function convertStringToDate(dateString: string) {
    const newDate = new Date(dateString);
    return newDate;
  }

  const pages = ["Settings", "Body Tracker", "Analysis", "Sign Out"];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleDesktopBtnClick = (page: string) => {
    handleCloseNavMenu();

    // Handle logic based on the clicked page
    if (page === "Settings") {
      // Handle Settings page click
      navigate("settings");
    } else if (page === "Evaluate Workout") {
    } else if (page === "Body Tracker") {
      navigate("bodytracker");
    } else if (page === "Analysis") {
      navigate("analysis");
    } else if (page === "Sign Out") {
      auth.signOut();
      // ...
    }
  };

  const handlePageClick = (page: string) => {
    handleCloseNavMenu();

    // Handle logic based on the clicked page
    if (page === "Settings") {
      // Handle Settings page click
      navigate("settings");
    } else if (page === "Evaluate Workout") {
    } else if (page === "Body Tracker") {
      navigate("bodytracker");
    } else if (page === "Analysis") {
      navigate("analysis");
    } else if (page === "Sign Out") {
      auth.signOut();
      // ...
    }
  };

  const handleCalendar = () => {
    navigate("calendar");
  };

  const handleNewWorkout = () => {
    navigate("new");
  };

  if (userTrainingData === undefined) {
    return <>Getting the data...</>;
  }

  if (filteredUserTrainingData === undefined) {
    return <>Getting the filtered data...</>;
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
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <ViewCommentModal
          openViewCommentModal={openViewCommentModal}
          setOpenViewCommentModal={setOpenViewCommentModal}
          exerciseComment={exerciseComment}
        />

        <Box position="fixed" sx={{ width: "100%" }}>
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
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={() => handlePageClick(page)}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
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
                    {pages.map((page) => (
                      <MenuItem
                        key={page}
                        onClick={() => handlePageClick(page)}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
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
                /*background:"radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(204,136,10,1) 100%)", */ color:
                  "black",
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

            {/*         
            <IconButton
              aria-label="left arrow"
              onClick={handleLeftArrowClick}
              sx={{ fontFamily: "Kanit" }}
              
            >
              <p>{dateForWorkout}</p>
            </IconButton>
  */}
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
            <Container
              maxWidth="md"
              sx={{
                height: "calc(100vh - 112px)",
                overflow: "scroll",
                paddingBottom: "56px",
                gap: 4,
              }}
            >
              {filteredUserTrainingData.length > 0 &&
                filteredUserTrainingData.map(
                  (entry: IWorkoutData, index: number) => (
                    <Box
                      className="exercises"
                      display="flex"
                      flexDirection="column"
                      gap={1}
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
                            value={entry.workoutEvaluation.workoutValue}
                            icon={<StarsIcon fontSize="inherit" />}
                          />
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            "{entry.workoutEvaluation.workoutComment}"
                          </Typography>
                          <Box>
                            <FormControlLabel
                              control={<Switch />}
                              label="Trained better than the last time?"
                              checked={entry.workoutEvaluation.trainHarderCheck}
                            />
                            <FormControlLabel
                              control={<Switch />}
                              label="Warmed up & stretched properly?"
                              checked={entry.workoutEvaluation.warmStretchCheck}
                            />
                            <FormControlLabel
                              control={<Switch />}
                              label="Any discomfort/pain?"
                              checked={entry.workoutEvaluation.feelPainCheck}
                            />
                          </Box>
                          <Box display="flex" justifyContent="space-around">
                            <DataBadge
                              dataValue={entry.workoutSessionPowerLevel}
                              dataLabel="PL"
                            />
                            <DataBadge
                              dataValue={entry.workoutStats.totalReps}
                              dataLabel="reps"
                            />
                            <DataBadge
                              dataValue={entry.workoutStats.totalWeight}
                              dataLabel={
                                currentUserData.unitsSystem === "metric"
                                  ? "kgs"
                                  : "lbs"
                              }
                            />
                            <DataBadge
                              dataValue={entry.workoutStats.totalLoad}
                              dataLabel="BW"
                            />
                          </Box>
                        </AccordionDetails>
                      </Accordion>

                      {entry.workoutExercises.map(
                        (
                          exercise: { name: string; exercises: Exercise[] },
                          index: number
                        ) => (
                          <Box
                            key={index}
                            sx={{
                              borderRadius: "4px",
                              boxShadow: 2,
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
                                          currentUserData.unitsSystem ===
                                          "metric"
                                            ? "kgs"
                                            : "lbs"
                                        }`}
                                      </Typography>
                                    )}

                                    {exercise.reps !== 0 && (
                                      <Typography>
                                        {exercise.reps} reps
                                      </Typography>
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
                <Paper elevation={1} sx={{ height: "100%" }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    gap={0}
                  >
                    <SearchIcon fontSize="large" />
                    <Typography textAlign="center" fontSize="1rem">
                      Workout log empty for this date.
                    </Typography>
                  </Box>
                </Paper>
              )}
            </Container>
          </Zoom>
        </Box>
      </Box>
    </>
  );
}

export default CompletedWorkouts;
