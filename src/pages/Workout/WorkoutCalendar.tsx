import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarWorkoutModal from "../../components/ui/CalendarWorkoutModal";
import { TrainingDataContext } from "../../context/TrainingData";
import getWorkoutDates from "../../utils/firebaseUtilityFunctions/getWorkoutDates";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import formatTime from "../../utils/formatTime";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import Exercise from "../../utils/interfaces/Exercise";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/uploadImportedData";
import { AuthContext } from "../../context/Auth";
function WorkoutCalendar() {
  const { dateForWorkout, userTrainingData, setDateForWorkout } =
    useContext(TrainingDataContext);
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [calendarDateValue, setCalendarDateValue] = useState(
    dayjs(dateForWorkout)
  );
  const [calendarWorkoutModalVisibility, setCalendarWorkoutModalVisibility] =
    useState(false);

    const navigate = useNavigate()
    const {currentUserData} = useContext(AuthContext)

    const [workoutDateExercises, setWorkoutDateExercises] = useState<
    { name: string; exercises: Exercise[] }[]
  >([]);


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
    }

  }, [dateForWorkout]);

  if (!userTrainingData || !dateForWorkout) {
    return <>No Data</>;
  }

  function ServerDay(props: PickersDayProps<Dayjs>) {
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

  const handleDayClick = (clickedDate: Dayjs) => {

    const formattedDate = clickedDate.format("YYYY-MM-DD");

    setDateForWorkout(formattedDate);
/* 
    setCalendarWorkoutModalVisibility(true);
 */
  };

  return (
    <Container>
      <CalendarWorkoutModal
        calendarWorkoutModalVisibility={calendarWorkoutModalVisibility}
        setCalendarWorkoutModalVisibility={setCalendarWorkoutModalVisibility}
      />

      <AppBar
        elevation={3}
        position="fixed"
        style={{
          top: 0,
          height: "56px",
          background:
            "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <CalendarMonthIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="text"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Calendar
            </Typography>

            <CalendarMonthIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

            <Typography
              variant="h5"
              noWrap
              component="text"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,

                letterSpacing: ".3rem",
                color: "inherit",
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

      <Box >
          {workoutDateExercises.length > 0 ? (
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
            ))
          ) : (
            <Typography sx={{ textAlign: "center", margin: "16px" }}>
              There are no exercises for this date.
            </Typography>
          )}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%", marginTop: "8px", marginRight: "8px" }}
              onClick={() => navigate("/home/workout")}
            >
              Go To
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: "8px", marginLeft: "8px" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>

    </Container>
  );
}
export default WorkoutCalendar;
