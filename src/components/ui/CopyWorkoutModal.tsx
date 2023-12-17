import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import toast from "react-hot-toast";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import Badge from "@mui/material/Badge";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};

interface ParentComponentProps {
  openCopyWorkoutModal: boolean;
  setOpenCopyWorkoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}
 
function CopyWorkoutModal({
  openCopyWorkoutModal,
  setOpenCopyWorkoutModal,
}: ParentComponentProps) {

    const [initialValue, setInitialValue] = useState(dayjs());
    const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  function handleClose() {
    setOpenCopyWorkoutModal(false);
  }

  function ServerDay(props: PickersDayProps<Dayjs>) {
    const { day } = props;

    const isUniqueDate = uniqueDates.includes(day.format("YYYY-MM-DD"));

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isUniqueDate ? "✔️" : undefined}
        showZero={false}
      >
        <PickersDay {...props} onClick={() => handleDayClick(day)} />
      </Badge>
    );
  }

  const handleDayClick = (clickedDate: Dayjs) => {
  };


  return (
    <>
      <Modal
        open={openCopyWorkoutModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6} 
          defaultValue={initialValue}
          slots={{
            day: ServerDay,
          }}
        />
      </LocalizationProvider>

        </Box>
      </Modal>
    </>
  );
}

export default CopyWorkoutModal;
