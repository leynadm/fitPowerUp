import TextField from "@mui/material/TextField";
import { Box, Container } from "@mui/material";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import PercentIcon from "@mui/icons-material/Percent";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { AuthContext } from "../../context/Auth";
import { ChangeEvent, useContext, useState } from "react";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import saveBodyTrackerEntry from "../../utils/firebaseDataFunctions/saveBodyTrackerEntry";
import { BodyTrackerDataContext } from "../../context/BodyTrackerData";
import toast from "react-hot-toast";
import { IUserBodyTrackerDataEntry } from "../../utils/interfaces/IBodyTracker";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import HotelIcon from "@mui/icons-material/Hotel";
function BodyTrackerTrack() {
  const { currentUser, currentUserData } = useContext(AuthContext);

  const { userBodyTrackerData, refetchUserBodyTrackerData } = useContext(
    BodyTrackerDataContext
  );

  const isOnline = useOnlineStatus();

  const userBodyTrackerDataSize = userBodyTrackerData.length;
  const [saveButtonText, setSaveButtonText] = useState("save");
  const [bodyKPIDataObj, setBodyKPIDataObj] = useState({
    date: "",
    weight: "",
    bodyFat: "",
    caloricIntake: "",
    hoursOfSleep: "",
    neck: "",
    shoulders: "",
    chest: "",
    leftBicep: "",
    rightBicep: "",
    leftForearm: "",
    rightForearm: "",
    waist: "",
    hips: "",
    leftThigh: "",
    rightThigh: "",
    leftCalf: "",
    rightCalf: "",
  });

  const handleKPIChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const elementId = event.target.id;

    // Check if the input value is an empty string
    if (inputValue === "") {
      setBodyKPIDataObj((prevState) => ({
        ...prevState,
        [elementId]: "", // Set the value to an empty string to avoid a NaN
      }));
    } else if (/^\d*\.?\d*$/.test(inputValue)) {
      // If it's a valid number, update the state with the parsed float value
      setBodyKPIDataObj((prevState) => ({
        ...prevState,
        [elementId]: parseFloat(inputValue),
      }));
    }
  };

  async function handleSaveBodyTrackerEntry() {
    let checkIfAtLeastOneValueIsAdded = false;

    for (const [key, value] of Object.entries(bodyKPIDataObj)) {
      if (parseFloat(value) !== 0 && value !== "" && key !== "date") {
        checkIfAtLeastOneValueIsAdded = true;
      }
    }

    if (bodyKPIDataObj.date.trim() === "") {
      toast.error("Date is required!");
      return; // Exit the function if the date is not provided
    }

    if (checkIfAtLeastOneValueIsAdded) {
      await saveBodyTrackerEntry(
        currentUser.uid,
        bodyKPIDataObj,
        saveButtonText,
        userBodyTrackerDataSize
      );
      await refetchUserBodyTrackerData();
    } else {
      toast.error("You need to add data to at least one field!");
    }
  }

  const handleOnChangeForDate = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newDate = event.target.value;

    const userBodyTrackerDataJSON = JSON.stringify(userBodyTrackerData);
    const userBodyTrackerDataArr = JSON.parse(userBodyTrackerDataJSON);

    const matchedEntry = userBodyTrackerDataArr.find(
      (item: IUserBodyTrackerDataEntry) => item.date === newDate
    );

    if (matchedEntry) {
      setSaveButtonText("Update");
      setBodyKPIDataObj({
        date: matchedEntry.date,
        weight: String(matchedEntry.weight),
        bodyFat: String(matchedEntry.bodyFat),
        caloricIntake: String(matchedEntry.caloricIntake),
        hoursOfSleep: String(matchedEntry.hoursOfSleep),
        neck: String(matchedEntry.neck),
        shoulders: String(matchedEntry.shoulders),
        chest: String(matchedEntry.chest),
        leftBicep: String(matchedEntry.leftBicep),
        rightBicep: String(matchedEntry.rightBicep),
        leftForearm: String(matchedEntry.leftForearm),
        rightForearm: String(matchedEntry.rightForearm),
        waist: String(matchedEntry.waist),
        hips: String(matchedEntry.hips),
        leftThigh: String(matchedEntry.leftThigh),
        rightThigh: String(matchedEntry.rightThigh),
        leftCalf: String(matchedEntry.leftCalf),
        rightCalf: String(matchedEntry.rightCalf),
      });
    } else {
      setBodyKPIDataObj({
        date: event.target.value,
        weight: "",
        bodyFat: "",
        caloricIntake: "",
        hoursOfSleep: "",
        neck: "",
        shoulders: "",
        chest: "",
        leftBicep: "",
        rightBicep: "",
        leftForearm: "",
        rightForearm: "",
        waist: "",
        hips: "",
        leftThigh: "",
        rightThigh: "",
        leftCalf: "",
        rightCalf: "",
      });

      setSaveButtonText("Save");
    }
    /* 
    setBodyKPIDataObj((prevState) => ({
      ...prevState,
      date: event.target.value,
    }));
 */
  };

  const handleClearButton = () => {
    setBodyKPIDataObj((prevState) => ({
      ...prevState,
      weight: "",
      bodyFat: "",
      caloricIntake: "",
      neck: "",
      shoulders: "",
      chest: "",
      leftBicep: "",
      rightBicep: "",
      leftForearm: "",
      rightForearm: "",
      waist: "",
      hips: "",
      leftThigh: "",
      rightThigh: "",
      leftCalf: "",
      rightCalf: "",
    }));
  };

  return (
    <Container maxWidth="md" sx={{ paddingBottom: "80px" }}>
      <Box
        display="flex"
        paddingTop="0.5rem"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="100%"
      >
        <InsertInvitationIcon fontSize="large" />
        <Box display="flex" flexDirection="column" width="100%">
          <TextField
            id="filled-basic"
            size="small"
            variant="filled"
            type="date"
            fullWidth
            onChange={(event) => handleOnChangeForDate(event)}
          />
          {saveButtonText === "Update" && (
            <Typography>You've already added data for this date.</Typography>
          )}
        </Box>
      </Box>

      <Box
        display="flex"
        paddingTop="0.5rem"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="100%"
      >
        <MonitorWeightIcon fontSize="large" />
        <TextField
          id="weight"
          label={`${
            currentUserData.unitsSystem === "metric"
              ? "Weight (kgs)"
              : "Weight (lbs)"
          }`}
          size="small"
          variant="filled"
          fullWidth
          type="number"
          onChange={handleKPIChange}
          value={bodyKPIDataObj.weight}
        />
      </Box>
      <Box
        display="flex"
        paddingTop="0.5rem"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="100%"
      >
        <PercentIcon fontSize="large" />
        <TextField
          id="bodyFat"
          label="Body Fat"
          size="small"
          variant="filled"
          type="number"
          fullWidth
          onChange={handleKPIChange}
          value={bodyKPIDataObj.bodyFat}
        />
      </Box>
      <Box
        display="flex"
        paddingTop="0.5rem"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="100%"
      >
        <RestaurantIcon fontSize="large" />
        <TextField
          id="caloricIntake"
          label="Caloric Intake"
          size="small"
          variant="filled"
          fullWidth
          type="number"
          onChange={handleKPIChange}
          value={bodyKPIDataObj.caloricIntake}
        />
      </Box>

      <Box
        display="flex"
        paddingTop="0.5rem"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="100%"
      >
        <HotelIcon fontSize="large" />
        <TextField
          id="hoursOfSleep"
          label="Hours of sleep"
          size="small"
          variant="filled"
          fullWidth
          type="number"
          onChange={handleKPIChange}
          value={bodyKPIDataObj.hoursOfSleep}
        />
      </Box>

      <Accordion sx={{ marginTop: "0.5rem", borderRadius: "3px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Additional Body Measurements</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ marginTop: 0, paddingTop: 0, marginBottom: 0 }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Neck ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="neck"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.neck}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Shoulders ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="shoulders"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.shoulders}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Chest ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="chest"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.chest}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Left Bicep ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="leftBicep"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.leftBicep}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Right Bicep ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="rightBicep"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.rightBicep}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Left Forearm ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="leftForearm"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.leftForearm}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Right Forearm ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="rightForearm"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.rightForearm}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Waist ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="waist"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.waist}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Hips ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="hips"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.hips}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Left Thigh ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="leftThigh"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.leftThigh}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Right Thigh ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="rightThigh"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.rightThigh}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Left Calf ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="leftCalf"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.leftCalf}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            paddingTop="0.5rem"
            width="100%"
          >
            <TextField
              label={`Right Calf ${
                currentUserData.unitsSystem === "metric" ? "(cm)" : "(in)"
              }`}
              size="small"
              variant="filled"
              fullWidth
              id="rightCalf"
              onChange={handleKPIChange}
              type="number"
              value={bodyKPIDataObj.rightCalf}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          paddingTop: "0.5rem",
        }}
      >
        <Button
          variant="dbz_save"
          sx={{ width: "75%", margin: "0.25rem", fontWeight: "bold" }}
          onClick={handleSaveBodyTrackerEntry}
          disabled={!isOnline}
        >
          {isOnline ? saveButtonText : "Reconecting..."}
        </Button>

        <Button
          variant="dbz_clear"
          sx={{ width: "75%", margin: "0.25rem", fontWeight: "bold" }}
          onClick={handleClearButton}
        >
          CLEAR
        </Button>
      </Box>
    </Container>
  );
}

export default BodyTrackerTrack;
