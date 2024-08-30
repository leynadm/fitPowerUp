import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  MouseEvent,
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
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import Fab from "@mui/material/Fab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { UserTrainingDataContext } from "../../context/UserTrainingData";
import { IWorkoutData } from "../../utils/interfaces/IUserTrainingData";
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
import { AuthContext } from "../../context/Auth";
import formatDateForTextField from "../../utils/formatDateForTextfield";
import { Rating } from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DataBadge from "../../components/ui/DataBadge";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SettingsIcon from "@mui/icons-material/Settings";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoadingScreen from "../../components/ui/LoadingScreen";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteCompletedWorkout from "../../components/ui/DeleteCompletedWorkoutModal";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

function CompletedWorkouts() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { userTrainingData, dateForWorkout, setDateForWorkout } = useContext(
    UserTrainingDataContext
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDeleteCompletedWorkout, setOpenDeleteCompletedWorkout] =
    useState(false);

  const { currentUserData } = useContext(AuthContext);

  const [filteredUserTrainingData, setFilteredUserTrainingData] = useState<IWorkoutData[]>(
    () => filterUserTrainingsPerDay(dateForWorkout, userTrainingData)
  );
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
    const filteredUserTrainingDataArr = filterUserTrainingsPerDay(
      dateForWorkout,
      userTrainingData,
    );

    setFilteredUserTrainingData(filteredUserTrainingDataArr)

  }, [userTrainingData, dateForWorkout]);

  const containerRef = useRef<HTMLElement>(null);

  const workoutId = () => {
    if (filteredUserTrainingData.length > 0) {
      return filteredUserTrainingData[0].id;
    } else {
      return null;
    }
  };

  function handleOpenDeleteCompletedWorkout() {
    handleClose();
    setOpenDeleteCompletedWorkout(!openDeleteCompletedWorkout);
  }

  const handleLeftArrowClick = () => {
    const newDate = convertStringToDate(dateForWorkout);
    newDate.setDate(newDate.getDate() - 1);
    const convertedDate = formatDateForTextField(newDate);
    setDateForWorkout(convertedDate);

    const filteredUserTrainingDataArr = filterUserTrainingsPerDay(
      convertedDate,
      userTrainingData,
    );

    setFilteredUserTrainingData(filteredUserTrainingDataArr)
  };

  const handleRightArrowClick = () => {
    const newDate = convertStringToDate(dateForWorkout);
    newDate.setDate(newDate.getDate() + 1);
    const convertedDate = formatDateForTextField(newDate);
    setDateForWorkout(convertedDate);
    const filteredUserTrainingDataArr = filterUserTrainingsPerDay(
      convertedDate,
      userTrainingData,
    );

    setFilteredUserTrainingData(filteredUserTrainingDataArr)
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
      sx={{  width: "100%", height:"100%" }}
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

      <DeleteCompletedWorkout
        setOpenDeleteCompletedWorkout={setOpenDeleteCompletedWorkout}
        openDeleteCompletedWorkout={openDeleteCompletedWorkout}
        workoutId={workoutId()}
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
            {/* <FitnessCenterIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            /> */}

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
                    fontFamily: "Acme",
                    fontWeight: "400",                    
                  }}
                >
                  <Typography>{page}</Typography>
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
                <ListItemText primaryTypographyProps={{color:"text.secondary"}}>Analysis</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => handlePageClick("Preset Workouts")}>
                <ListItemIcon>
                  <FormatListNumberedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{color:"text.secondary"}}>Workouts & Routines</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => handlePageClick("Body Tracker")}>
                <ListItemIcon>
                  <AccessibilityIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{color:"text.secondary"}}>Body Tracker</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handlePageClick("Settings")}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{color:"text.secondary"}}>Settings</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handlePageClick("Sign Out")}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{color:"text.secondary"}}>Log Out</ListItemText>
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

      <Box
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "column",
          height:"100%"
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

                  <Accordion sx={{ borderRadius: "4px", padding: 0 }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        alignItems: "center",
                        margin: 0,
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
                    <AccordionDetails sx={{ pb: 0, pt: 0 }}>
                      <Typography>"{entry.wEval.comment}"</Typography>
                      <Box>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox checked={entry.wEval.trainHarder} />
                            }
                            label="I trained harder than last time"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox checked={entry.wEval.warmStretch} />
                            }
                            label="I stretched and warmed up properly"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox checked={entry.wEval.feelPain} />
                            }
                            label="I didn't feel unusual or unwanted pain"
                          />
                        </FormGroup>
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
                      <Box
                        width="100%"
                        display="flex"
                        flexDirection="row-reverse"
                      >
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleClick}
                          sx={{ p: 0 }}
                        >
                          <MoreHorizIcon
                            sx={{ alignSelf: "flex-end" }}
                            fontSize="small"
                          />
                        </IconButton>

                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem>
                            <IconButton
                              size="large"
                              aria-label="account of current user"
                              aria-controls="menu-appbar"
                              aria-haspopup="true"
                              sx={{ p: 0, m: 0 }}
                              onClick={handleOpenDeleteCompletedWorkout}
                            >
                              <DeleteForeverIcon
                                sx={{
                                  zIndex: 0,
                                }}
                              />
                              <ListItemText>Delete workout</ListItemText>
                            </IconButton>
                          </MenuItem>
                        </Menu>
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
                        <Button
                          sx={{
                            textAlign: "center",
                            fontSize: "large",
                            background:
                              "radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(204,136,10,1) 100%)",
                            width: "100%",
                            padding: 0,
                          }}
                          onClick={() =>
                            handleSelectCompletedExercise(
                              exercise.name.toLocaleUpperCase()
                            )
                          }
                        >
                          {exercise.name.toLocaleUpperCase()}
                        </Button>

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
                                  <Typography>
                                    {exercise.reps}
                                    {exercise.amrap && "+"} reps
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
                    flexGrow:1,
                    height:"100%"
                  }}
                >
                  <img
                    src="/svg/goku.svg"
                    alt="son goku"
                    width={128}
                    height={128}
                  />
                  <Typography
                    textAlign="center"
                    fontSize="2rem"
                    color="#1c4595"
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
    return filteredUserTrainingDataArr.length > 0 ? filteredUserTrainingDataArr : [];
  }
  return [];
}

