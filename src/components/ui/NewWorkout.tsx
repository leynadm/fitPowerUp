import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
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
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Divider from "@mui/material/Divider";
import { auth } from "../../config/firebase";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CommentIcon from "@mui/icons-material/Comment";
import ViewCommentModal from "./ViewCommentModal";
import Exercise from "../../utils/interfaces/Exercise";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import CommentWorkoutModal from "./CommentWorkoutModal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import getExercisesByDate from "../../utils/CRUDFunctions/getExercisesByDate";
import ViewCommentWorkoutModal from "./ViewCommentWorkoutModal";
interface Swipe {
  touchStart: number;
  touchEnd: number;
  moved: boolean;
}

interface NewWorkoutProps {
  todayDate: Date | undefined;
  setTodayDate: Dispatch<SetStateAction<Date | undefined>>;
  existingExercises: { name: string; exercises: Exercise[] }[];
  unitsSystem: string;
  selectedCategoryExercises: {
    category: string;
    name: string;
    measurement: any[];
  }[];
  setSelectedCategoryExercises: Dispatch<
    SetStateAction<{ category: string; name: string; measurement: any[] }[]>
  >;
  setSelectedExercise: Dispatch<
    SetStateAction<{ name: string; category: string; measurement: any[] }>
  >;
  selectedExercise: { category: string; name: string; measurement: any[] };

  setExistingExercises: Dispatch<
    SetStateAction<{ name: string; exercises: Exercise[] }[]>
  >;
}

function NewWorkout({
  todayDate,
  setTodayDate,
  existingExercises,
  unitsSystem,
  setSelectedCategoryExercises,
  selectedCategoryExercises,
  setSelectedExercise,
  selectedExercise,
  setExistingExercises,
}: NewWorkoutProps) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [openViewCommentModal, setOpenViewCommentModal] = useState(false);
  const [exerciseCommentId, setExerciseCommentId] = useState(0);
  const [openCommentWorkoutModal, setOpenCommentWorkoutModal] = useState(false);
  const [openViewCommentWorkoutModal, setOpenViewCommentWorkoutModal] = useState(false);
  const [workoutCommentRenderTrigger, setWorkoutCommentRenderTrigger] =
    useState(0);
    
  const [workoutEvaluationCheck, setWorkoutEvaluationCheck] = useState(false);

  const [swipe, setSwipe] = useState<any>({
    moved: false,
    touchEnd: 0,
    touchStart: 0,
  });

  const { moved, touchEnd, touchStart } = swipe;

  function getWorkoutEvaluation() {
    // Open IndexedDB database connection
    const request = window.indexedDB.open("fitScouterDb");

    request.onsuccess = function (event: any) {
      const db = event.target.result;

      // Open transaction to access the object store
      const transaction = db.transaction(["workout-evaluation"], "readonly");
      const objectStore = transaction.objectStore("workout-evaluation");

      const index = objectStore.index("workout_evaluation_date");
      const getRequest = index.get(todayDate);

      getRequest.onsuccess = function (event: any) {
        const existingEntry = getRequest.result;

        console.log(existingEntry);

        if (existingEntry) {
          setWorkoutEvaluationCheck(existingEntry);
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

  useEffect(() => {
    if (todayDate) {
      getExercisesByDate(todayDate, setExistingExercises);
      getWorkoutEvaluation();
    }
  }, [todayDate,workoutCommentRenderTrigger]);

  useEffect(() => {
 
    const handlePopstate = () => {
      // Logic to handle the effect when the user accesses the component via back button
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  const SENSITIVITY = 125;

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    let touchStartX = e.targetTouches[0].clientX;
    /* 
    console.log({touchStartX})
     */
    setSwipe((swipe: any) => ({ ...swipe, touchStart: touchStartX }));
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    let touchEndX = e.targetTouches[0].clientX;
    /* 
    console.log({touchEndX})
    */
    setSwipe((swipe: any) => ({ ...swipe, touchEnd: touchEndX, moved: true }));
  }

  function handleTouchEnd() {
    if (touchStart !== 0 && touchEnd !== 0) {
      const amountSwipe = swipe.touchEnd - swipe.touchStart;
      console.log({ amountSwipe });

      if (Math.abs(amountSwipe) > SENSITIVITY && swipe.moved) {
        if (amountSwipe < 0) {
          console.log("swiped right");
          addDays();
        } else {
          console.log("swiped left");
          subtractDays();
        }
      }
    }

    setSwipe({ moved: false, touchEnd: 0, touchStart: 0 });
  }

  const subtractDays = () => {
    if (todayDate) {
      const newDate = new Date(todayDate);
      newDate.setDate(todayDate.getDate() - 1);
      setTodayDate(newDate);
      console.log("logging date subtract:");
      console.log({ newDate });
    }
  };

  const addDays = () => {
    if (todayDate) {
      const newDate = new Date(todayDate);
      newDate.setDate(todayDate.getDate() + 1);
      setTodayDate(newDate);
      console.log("logging date add:");
      console.log({ newDate });
    }
  };

  const formatDate = (date: Date): string => {
    const today = new Date().setHours(0, 0, 0, 0);
    const passedDate = date.setHours(0, 0, 0, 0);

    if (passedDate === today) {
      return "TODAY";
    } else if (passedDate === today - 86400000) {
      // 86400000 milliseconds = 1 day
      return "YESTERDAY";
    } else if (passedDate === today + 86400000) {
      return "TOMORROW";
    } else {
      return date.toDateString();
    }
  };

  const pages = [
    "Settings",
    "Evaluate Workout",
    "Body Tracker",
    "Analysis",
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
    if (page === "Settings") {
      // Handle Settings page click
      navigate("settings");
    } else if (page === "Evaluate Workout") {
      handleCommentWorkoutModalVisibility();
    } else if (page === "Body Tracker") {
      navigate("bodytracker");
    } else if (page === "Analysis") {
      navigate("analysis");
    } else if (page === "Sign Out") {
      auth.signOut();
      // ...
    }
  };

  const handleNewWorkout = () => {
    navigate("workout_categories");
  };

  const handleCalendar = () => {
    navigate("calendar");
  };

  const handlePageClick = (page: string) => {
    handleCloseNavMenu();

    // Handle logic based on the clicked page
    if (page === "Settings") {
      // Handle Settings page click
      navigate("settings");
    } else if (page === "Evaluate Workout") {
      handleCommentWorkoutModalVisibility();
    } else if (page === "Body Tracker") {
      navigate("bodytracker");
    } else if (page === "Analysis") {
      navigate("analysis");
    } else if (page === "Sign Out") {
      auth.signOut();
      // ...
    }
  };

  function handleSetClick(groupName: string) {
    handleGroupNameClick(groupName);
  }

  function forwardToExerciseMenuClick(
    exerciseName: string,
    myExercise: {
      category: string;
      name: string;
      measurement: any[];
    }
  ) {
    const selectedState = {
      category: myExercise.category,
      name: myExercise.name,
      measurement: myExercise.measurement,
    };
    setSelectedExercise(myExercise);
    navigate(`workout_categories/exercises/selected`, {
      state: { todayDate, selectedExercise: selectedState, unitsSystem },
    });
  }

  function handleOpenViewCommentWorkoutModal(){
    setOpenViewCommentWorkoutModal(!openViewCommentWorkoutModal)

  }

  function handleGroupNameClick(category: string) {
    const request = indexedDB.open("fitScouterDb", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };

    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction("preselected-exercises", "readonly");
      const store = transaction.objectStore("preselected-exercises");
      const exerciseCategoryIndex = store.index("exercise_name");

      const categoryRange = IDBKeyRange.only(category);

      const categoryQuery = exerciseCategoryIndex.openCursor(categoryRange);
      const selectedCategoryExercises: {
        category: string;
        name: string;
        measurement: any[];
      }[] = [];

      categoryQuery.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          selectedCategoryExercises.push(cursor.value);
          cursor.continue();
        } else {
          setSelectedCategoryExercises(selectedCategoryExercises);

          forwardToExerciseMenuClick(category, selectedCategoryExercises[0]);
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

  function handleCommentWorkoutModalVisibility() {
    setOpenCommentWorkoutModal(!openCommentWorkoutModal);
  }

  function handleViewCommentModalVisibility(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    exerciseId: number
  ) {
    event.stopPropagation();
    setExerciseCommentId(exerciseId);
    setOpenViewCommentModal(!openViewCommentModal);
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#F0F2F5",
      }}
    >
      <ViewCommentModal
        openViewCommentModal={openViewCommentModal}
        setOpenViewCommentModal={setOpenViewCommentModal}
        exerciseCommentId={exerciseCommentId}
      />

      <ViewCommentWorkoutModal
        openViewCommentWorkoutModal={openViewCommentWorkoutModal}
        setOpenViewCommentWorkoutModal={setOpenViewCommentWorkoutModal}
        todayDate={todayDate}
        workoutCommentRenderTrigger={workoutCommentRenderTrigger}
      />

      <CommentWorkoutModal
        openCommentWorkoutModal={openCommentWorkoutModal}
        setOpenCommentWorkoutModal={setOpenCommentWorkoutModal}
        todayDate={todayDate}
        setWorkoutCommentRenderTrigger={setWorkoutCommentRenderTrigger}
        setWorkoutEvaluationCheck={setWorkoutEvaluationCheck}
      />

      <Box position="fixed" sx={{ width: "100%" }}>
        <AppBar elevation={0} style={{ top: 0, width: "100%", height: "56px" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <FitnessCenterIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />

              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Log
              </Typography>

              <FitnessCenterIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />

              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Log
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleDesktopBtnClick(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

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
                    color="inherit"
                    onClick={handleNewWorkout}
                  >
                    <AddOutlinedIcon sx={{ color: "white" }} />
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
                    <MenuItem key={page} onClick={() => handlePageClick(page)}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Box
          className="ClassCoveringBothStartNewAndCurrentExercises"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "32px",
            backgroundColor: "#FF8C00",

            /*     
          backgroundColor: "#3f51b5",
    */
            width: "100%",
            borderBottom: "2px black solid",
          }}
        >
          <IconButton aria-label="left arrow" onClick={subtractDays}>
            <KeyboardArrowLeftIcon
              sx={{
                color: "white",
              }}
            />
          </IconButton>

          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            {todayDate && formatDate(todayDate)}
          </Typography>

          <IconButton aria-label="left arrow" onClick={addDays}>
            <KeyboardArrowRightIcon
              sx={{
                color: "white",
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <Container
        sx={{ padding: 0, height: "calc(100vh - 112px)" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >

        
        {existingExercises.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "calc(100vh - 144px)",
              marginTop: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                height: "100%",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "large",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Typography>

              <IconButton
                aria-label="add workout"
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={handleNewWorkout}
              >
                <AddIcon />
                <Typography variant="body2">Start New Workout</Typography>
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              paddingTop: "32px",
              paddingBottom: "56px",
              backgroundColor: "#F0F2F5",
            }}
          >
            {workoutEvaluationCheck && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "4px",
                  boxShadow: 1,
                  margin: "16px",
                  backgroundColor: "white",
                }}
                onClick={handleOpenViewCommentWorkoutModal}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  disabled // Placeholder element
                >
                  <EditNoteIcon sx={{ zIndex: 0 }} />
                </IconButton>
              </Box>
            )}

            {existingExercises.map((group, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: "4px",
                  boxShadow: 1,
                  margin: "16px",
                  backgroundColor: "white",
                }}
                onClick={() => handleSetClick(group.name)}
              >
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", fontSize: "medium" }}
                >
                  {group.name.toLocaleUpperCase()}
                </Typography>

                <Divider sx={{ backgroundColor: "aliceblue" }} />
                {group.exercises.map((exercise, exerciseIndex) => (
                  <Box
                    key={exerciseIndex}
                    sx={{
                      display: "grid",
                      gridAutoFlow: "column",
                      gridTemplateColumns: "1fr 1fr 4fr",
                      justifyContent: "space-evenly",
                      justifyItems: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {exercise.comment ? ( // Check if 'comment' property exists
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={(event) =>
                          handleViewCommentModalVisibility(event, exercise.id)
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
                        <EmojiEventsIcon sx={{ zIndex: 0 }} />
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
                        <EmojiEventsIcon sx={{ opacity: 0, zIndex: 0 }} />
                      </IconButton>
                    )}

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(auto, 1fr))",
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
                            unitsSystem === "metric" ? "kgs" : "lbs"
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
                          {exercise.time !== 0 ? formatTime(exercise.time) : ""}
                        </Typography>
                      )}
                    </Box>

                    <Divider />
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default NewWorkout;
