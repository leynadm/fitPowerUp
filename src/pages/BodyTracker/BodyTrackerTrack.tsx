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

function BodyTrackerTrack() {
  const { currentUserData } = useContext(AuthContext);

  const [bodyKPIDataObj, setBodyKPIDataObj] = useState({
    date: new Date().toISOString().substring(0, 16), // Initialize with current date in the correct format
    weight: 0,
    bodyFat: 0,
    caloricIntake: 0,
    neck: 0,
    shoulders: 0,
    chest: 0,
    leftBicep: 0,
    rightBicep: 0,
    leftForearm: 0,
    rightForearm: 0,
    waist: 0,
    hips: 0,
    leftThigh: 0,
    rightThigh: 0,
    leftCalf: 0,
    rightCalf: 0,
  });

  const handleKPIChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    //console.log(inputValue)
    const elementId = event.target.id;
    // Validate the input to allow only numeric values or an empty string
    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
      setBodyKPIDataObj((prevState) => ({
        ...prevState,
        [elementId]: parseFloat(inputValue) || 0,
      }));
    }
  };

  console.log(bodyKPIDataObj);

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
        <TextField
          id="filled-basic"
          size="small"
          variant="filled"
          type="datetime-local"
          fullWidth
          onChange={(event) =>
            setBodyKPIDataObj((prevState) => ({
              ...prevState,
              date: event.target.value,
            }))
          }
          value={bodyKPIDataObj.date}
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
        >
          SAVE
        </Button>

        <Button
          variant="dbz_clear"
          sx={{ width: "75%", margin: "0.25rem", fontWeight: "bold" }}
        >
          CLEAR
        </Button>
      </Box>
    </Container>
  );
}

export default BodyTrackerTrack;
