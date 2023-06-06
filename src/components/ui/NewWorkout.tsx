import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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
}: NewWorkoutProps) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [openViewCommentModal, setOpenViewCommentModal] = useState(false);
  const [exerciseCommentId, setExerciseCommentId] = useState(0);

  useEffect(() => {
    const handlePopstate = () => {
      // Logic to handle the effect when the user accesses the component via back button
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

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

  const subtractDays = () => {
    if (todayDate) {
      const newDate = new Date(todayDate);
      newDate.setDate(todayDate.getDate() - 1);
      setTodayDate(newDate);
    }
  };

  const addDays = () => {
    if (todayDate) {
      const newDate = new Date(todayDate);
      newDate.setDate(todayDate.getDate() + 1);
      setTodayDate(newDate);
    }
  };
  const pages = [
    "Settings",
    "Comment Workout",
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
    } else if (page === "Comment Workout") {
      // Handle Comment Workout page click
      // ...
    } else if (page === "Body Tracker") {
      navigate("bodytracker");
    } else if (page === "Analysis") {
      // Handle Analysis page click
      // ...
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
      }}
    >
      <ViewCommentModal
        openViewCommentModal={openViewCommentModal}
        setOpenViewCommentModal={setOpenViewCommentModal}
        exerciseCommentId={exerciseCommentId}
      />
      <AppBar position="fixed" elevation={0} style={{ top: 0, width: "100%" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <FitnessCenterIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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
              LOGO
            </Typography>

            <FitnessCenterIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
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
                  onClick={handleCloseNavMenu}
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
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "32px",
          backgroundColor: "#FF8C00",
          width: "100%",
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

      <Box sx={{ height: "calc(100% - 56px)" }}>
        {existingExercises.length === 0 ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
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

              <IconButton
                aria-label="copy workout"
                sx={{ mb: 2, display: "flex", flexDirection: "column" }}
              >
                <ContentCopyIcon />
                <Typography variant="body2">Copy Previous Workout</Typography>
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box>
            {existingExercises
              /* 
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              ) */
              .map((group, index) => (
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

                          gridTemplateColumns: "1fr 1fr",
                          alignItems: "center",
                          justifyItems: "center",
                          width: "100%",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {/* 
                        {exercise.weight !== 0 ? (
                          <Typography>
                            {exercise.weight.toFixed(2)}{" "}
                            {unitsSystem === "metric" ? "kgs" : "lbs"}
                          </Typography>
                        ) : (
                          <Typography></Typography>
                        )}

              
                        {exercise.reps !== 0 ? (
                          <Typography>
                            {exercise.reps}
                            
                          </Typography>
                        ) : (
                          <Typography></Typography>
                        )}
                         */}

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
                            {exercise.time !== 0
                              ? formatTime(exercise.time)
                              : ""}
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
      </Box>
    </Box>
  );
}

export default NewWorkout;
