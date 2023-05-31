import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import getWorkoutDates from "../../utils/CRUDFunctions/getWorkoutDates";
import CalendarWorkoutModal from "../../components/ui/CalendarWorkoutModal";
interface WorkoutProps {
  todayDate: Date | undefined;
}

function WorkoutCalendar({todayDate}:WorkoutProps) {
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [initialValue, setInitialValue] = useState(dayjs(todayDate));

  useEffect(() => {
    getWorkoutDates()
      .then((dates) => {
        console.log(dates);
        setUniqueDates(dates as string[]);
      })
      .catch((error) => {
        console.error("Error retrieving unique dates from IndexedDB:", error);
      });
  }, []);

  function ServerDay(props: PickersDayProps<Dayjs>) {
    const { day } = props;

    const isUniqueDate = uniqueDates.includes(day.format("YYYY-MM-DD"));

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isUniqueDate ? "✔️" : undefined}
      >
        <PickersDay {...props} 
          onClick={() => handleDayClick(day)}
        />
      </Badge>
    );
  }

  const handleDayClick = (clickedDate: Dayjs) => {
    console.log("Clicked date:", clickedDate.format("YYYY-MM-DD"));
  };
  
  return (
    <Box>
      <AppBar position="fixed" style={{ top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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

            <CalendarMonthIcon
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
              Calendar
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={initialValue}
          slots={{
            day: ServerDay,
          }}
        />
      </LocalizationProvider>

      <CalendarWorkoutModal/>
    </Box>
  );
}
export default WorkoutCalendar