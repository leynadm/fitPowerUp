import React, { Dispatch, SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
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
import AdbIcon from "@mui/icons-material/Adb";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { auth } from "../../config/firebase";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CommentIcon from "@mui/icons-material/Comment";

import Exercise from "../../utils/interfaces/Exercise";

interface NewWorkoutProps {
  todayDate: Date | undefined;
  setTodayDate: Dispatch<SetStateAction<Date | undefined>>;

  existingExercises: { name: string; exercises: Exercise[] }[];

  unitsSystem: string;
}

function NewWorkout({
  todayDate,
  setTodayDate,
  existingExercises,
  unitsSystem,
}: NewWorkoutProps) {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [currentPage, setCurrentPage] = useState("");
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
    "Copy Workout",
    "Comment Workout",
    "Time Workout",
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

  const handlePageClick = (page: string) => {
    handleCloseNavMenu();

    // Handle logic based on the clicked page
    if (page === "Settings") {
      // Handle Settings page click
      navigate("settings");
    } else if (page === "Copy Workout") {
      // Handle Copy Workout page click
      // ...
    } else if (page === "Comment Workout") {
      // Handle Comment Workout page click
      // ...
    } else if (page === "Time Workout") {
      // Handle Time Workout page click
      // ...
    } else if (page === "Body Tracker") {
      // Handle Body Tracker page click
      // ...
    } else if (page === "Analysis") {
      // Handle Analysis page click
      // ...
    } else if (page === "Sign Out") {
      auth.signOut();
      // ...
    }
  };
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <AppBar position="fixed" style={{ top: 0 }}>
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
                >
                  <CalendarMonthIcon />
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleNewWorkout}
                >
                  <AddOutlinedIcon />
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
                  <MenuIcon />
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
          height: "4.5vh",
          backgroundColor: "#3f51b5",
          paddingTop: "8px",
          paddingBottom: "8px",
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

      <Box>
        {existingExercises.length === 0 ? (
          <Box>
            <Box
              sx={{
                height: "100%",
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
                <Box key={index}>
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    {group.name}
                  </Typography>

                  <Divider />
                  {group.exercises.map((exercise, exerciseIndex) => (
                    <Box
                      key={exerciseIndex}
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width: "100vw",
                      }}
                    >
                      {exercise.comment ? ( // Check if 'comment' property exists
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          color="inherit"
                        >
                          <CommentIcon />
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

                      <Box
                        sx={{
                          display: "flex",
                          width: "100vw",
                          justifyContent: "space-around",
                        }}
                      >
                        {exercise.weight !== 0 && (
                          <Typography>
                            {" "}
                            {exercise.weight.toFixed(2)}{" "}
                            {unitsSystem === "metric" ? "kgs" : "lbs"}{" "}
                          </Typography>
                        )}
                        {exercise.reps !== 0 && (
                          <Typography>{exercise.reps} reps</Typography>
                        )}
                        {exercise.distance !== 0 && (
                          <Typography>{exercise.distance}</Typography>
                        )}
                        {exercise.time !== 0 && (
                          <Typography>{exercise.time}</Typography>
                        )}
                      </Box>

                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <DeleteIcon />
                      </IconButton>
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
