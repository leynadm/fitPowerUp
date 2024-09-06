import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import getWorkoutDates from "../../utils/firebaseUtilityFunctions/getWorkoutDates";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import { UserTrainingDataContext } from "../../context/UserTrainingData";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/uploadImportedData";
import { AuthContext } from "../../context/Auth";
import Grow from "@mui/material/Grow";
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
function WorkoutCalendar() {
  const {
    dateForWorkout,
    userTrainingData,
    setDateForWorkout,
    refetchUserTrainingData,
  } = useContext(UserTrainingDataContext);
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [calendarDateValue, setCalendarDateValue] = useState(
    dayjs(dateForWorkout)
  );
  const navigate = useNavigate();

  const { currentUserData } = useContext(AuthContext);

  const [workoutDateExercises, setWorkoutDateExercises] = useState<
    { name: string; exercises: Exercise[] }[]
  >([]);

  const [key, setKey] = useState(0);

  useEffect(() => {
    if (userTrainingData && dateForWorkout) {
      const uniqueDatesArr = getWorkoutDates(userTrainingData);
      setUniqueDates(uniqueDatesArr);
    }

    const userTrainingDataArr: IWorkoutData[] = userTrainingData;
    const foundElement = userTrainingDataArr.find(
      (element) => element.date === dateForWorkout
    );

    if (foundElement) {
      setWorkoutDateExercises(foundElement?.wExercises);
    } else {
      setWorkoutDateExercises([]);
    }
  }, [userTrainingData]);

  if (!userTrainingData || !dateForWorkout) {
    return <p>No Data</p>;
  }

  function ServerDay(props: PickersDayProps<any>) {
    const { day } = props;

    const isUniqueDate = uniqueDates.includes(day.format("YYYY-MM-DD"));

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={
          isUniqueDate ? (
            <FitnessCenterIcon
              style={{ fontSize: "0.75rem" }}
              color="primary"
            />
          ) : undefined
        }
        showZero={false}
      >
        <PickersDay {...props} onClick={() => handleDayClick(day)} />
      </Badge>
    );
  }

  const handleDayClick = (clickedDate: any) => {
    const formattedDate = clickedDate.format("YYYY-MM-DD");

    setCalendarDateValue(clickedDate);

    const userTrainingDataArr: IWorkoutData[] = userTrainingData;
    const foundElement = userTrainingDataArr.find(
      (element) => element.date === formattedDate
    );

    if (foundElement) {
      setWorkoutDateExercises(foundElement?.wExercises);
    } else {
      setWorkoutDateExercises([]);
    }

    setKey((prevKey) => prevKey + 1);
  };

  async function handleCopyWorkout() {
    try {
      const request = indexedDB.open("fitPowerUpDb", 2);

      request.onsuccess = function () {
        const db = request.result;

        const userEntryTransaction = db.transaction(
          "user-exercises-entries",
          "readwrite"
        );

        const userEntryTransactionStore = userEntryTransaction.objectStore(
          "user-exercises-entries"
        );

        for (let index = 0; index < workoutDateExercises.length; index++) {
          const exercisesGroup = workoutDateExercises[index];

          for (
            let index = 0;
            index < exercisesGroup.exercises.length;
            index++
          ) {
            const exerciseEntry = exercisesGroup.exercises[index];

            const newEntryToSave = {
              date: new Date(),
              distance: exerciseEntry.distance,
              distance_unit: exerciseEntry.distance_unit,
              dropset: exerciseEntry.dropset,
              exercise: exerciseEntry.exercise,
              group: exerciseEntry.group,
              is_pr: false,
              reps: exerciseEntry.reps,
              time: exerciseEntry.time,
              weight: exerciseEntry.weight,
            };
            userEntryTransactionStore.add(newEntryToSave);
          }
        }
        userEntryTransaction.oncomplete = async function () {
          db.close();
          navigate("/home/workout/new");
          /* 
          await updateExercisesPRAfterAction(
            userTrainingData,
            exerciseSelected.name,
            newEntryToSave
          );
          await getExistingExercises();
         */
        };

        request.onerror = function () {
          toast.error("Oops, saveExerciseEntry has an error!");
        };
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleGoToDate() {
    const formattedDate = calendarDateValue.format("YYYY-MM-DD");

    setDateForWorkout(formattedDate);
    navigate("/home/workout");
  }
  return (
    <Container
    sx={{
      pb:"16px"
    }}
    >
      <AppBar
        position="fixed"
        style={{
          top: 0,
          height: "56px",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            {/* 
            <CalendarMonthIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            /> */}
            <Typography
              variant="h6"
              noWrap
              component="text"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                letterSpacing: ".3rem",
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              Calendar
            </Typography>
            {/* 
            <CalendarMonthIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            /> */}

            <Typography
              variant="h5"
              noWrap
              component="text"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,

                letterSpacing: ".0rem",
                color:"#FFA500",
                textDecoration: "none",
              }}
            >
              Calendar
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          defaultValue={calendarDateValue}
          slots={{
            day: ServerDay,
          }}
        />
      </LocalizationProvider>

      <Grow
        in={true}
        key={key}
        style={{ transformOrigin: "0 1 0" }}
        {...(true ? { timeout: 750 } : {})}
      >
        <Box
        
        >
          {workoutDateExercises.length > 0 &&
            workoutDateExercises.map((group, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: "4px",
                  boxShadow: 1,
                  margin: "16px",
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontSize: "medium",
                    background:
                      "radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(204,136,10,1) 100%)",
                    boxShadow: 2,
                    borderRadius: "4px",
                  }}
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
                    {exercise.comment ? (
                      // Check if 'comment' property exists
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        /* 
                        onClick={(event) =>
                          handleViewCommentModalVisibility(event, exercise.id)
                        } */
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
                          {exercise.time !== 0 ? formatTime(exercise.time) : ""}
                        </Typography>
                      )}
                    </Box>

                    <Divider />
                  </Box>
                ))}
              </Box>
            ))}

          {workoutDateExercises.length > 0 && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="dbz_mini"
                color="success"
                sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
                onClick={handleGoToDate}
              >
                Go To
              </Button>
              <Button
                variant="dbz_mini"
                sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
                onClick={handleCopyWorkout}
              >
                COPY
              </Button>
            </Box>
          )}
        </Box>
      </Grow>

      {workoutDateExercises.length === 0 && (
        <Typography sx={{ textAlign: "center", margin: "16px" }}>
          There are no exercises for this date.
        </Typography>
      )}
      
    </Container>
  );
}
export default WorkoutCalendar;
