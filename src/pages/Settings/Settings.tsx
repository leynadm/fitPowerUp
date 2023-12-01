import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import VerifiedIcon from "@mui/icons-material/Verified";
import RedditIcon from "@mui/icons-material/Reddit";
import { TrainingDataContext } from "../../context/TrainingData";
import { useContext } from "react";
import updateUnitSystemPreference from "../../utils/firebaseDataFunctions/updateUnitSystemPreference";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { AuthContext } from "../../context/Auth";
import fetchCurrentUserData from "../../utils/fetchCurrentUserData";
import { fetchUserBodyTrackerData } from "../../context/TrainingData";
import { useNavigate } from "react-router-dom";
import updateDefaultWeightIncrement from "../../utils/firebaseDataFunctions/updateDefaultWeightIncrement";
import { fetchUserTrainingData } from "../../context/TrainingData";
import { CSVLink, CSVDownload } from "react-csv";
import getFlattenedExercisesForExport from "../../utils/progressFunctions/getFlattenedExercisesForExport";
import getFlattenedWorkoutsForExport from "../../utils/progressFunctions/getFlattenedWorkoutsForExport";
function Settings() {
  const {
    userTrainingData,
    userBodyTrackerData,
    setUserTrainingData,
    setUserBodyTrackerData,
  } = useContext(TrainingDataContext);
  const { currentUser, currentUserData, setCurrentUserData } =
    useContext(AuthContext);

  const [updatedDefaultWeightIncrement, setUpdatedDefaultWeightIncrement] =
    useState(currentUserData.defaultWeightIncrement);
  const [updatedUnitsSystem, setUpdatedUnitsSystem] = useState(
    currentUserData.unitsSystem
  );

  const navigate = useNavigate();
  
  const [shouldDownload, setShouldDownload] = useState(false);

    // Function to handle button click
    const handleDownloadClick = () => {
      setShouldDownload(true);
    };

  const handleDefaultWeightIncrementChange = (event: SelectChangeEvent) => {
    setUpdatedDefaultWeightIncrement(event.target.value);
  };

  const handleUnitSystemChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdatedUnitsSystem(event.target.value);
  };

  async function handleDefaultWeightIncrementUpdate() {
    await updateDefaultWeightIncrement(
      currentUser.uid,
      updatedDefaultWeightIncrement
    );
    await fetchCurrentUserData(currentUser, setCurrentUserData);
  }
 
  async function handleUpdateUnitsSystemChange() {
    await updateUnitSystemPreference(
      userTrainingData,
      userBodyTrackerData,
      updatedUnitsSystem,
      currentUserData.unitsSystem,
      currentUser.uid
    );
    await fetchCurrentUserData(currentUser, setCurrentUserData);
    await fetchUserBodyTrackerData(currentUser, setUserBodyTrackerData);
    await fetchUserTrainingData(currentUser, setUserTrainingData);
  }


  const flattenedExerciseData = getFlattenedExercisesForExport(userTrainingData)
  const flattenedWorkoutData = getFlattenedWorkoutsForExport(userTrainingData)
  flattenExerciseDataForExport()

  function flattenExerciseDataForExport(){

  
    console.log(flattenedExerciseData)

  }


  function exportFitPowerUpData(){




  }

  return (
    <Container
      maxWidth="md"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            <SettingsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
              Settings
            </Typography>

            <SettingsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

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
              Settings
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Box display="flex" flexDirection="column" gap={1} pb="64px">
        <Typography variant="subtitle1">Preferences</Typography>
        <Divider />
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Unit System
            </Typography>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={updatedUnitsSystem}
                name="radio-buttons-group"
                row
                onChange={handleUnitSystemChange}
              >
                <FormControlLabel
                  value="metric"
                  control={<Radio />}
                  label="Metric"
                />
                <FormControlLabel
                  value="imperial"
                  control={<Radio />}
                  label="Imperial"
                />
              </RadioGroup>
            </FormControl>
            <Typography variant="body2">
              Select here your preferred measurement system.
              <br></br>
              The app uses the metric system by default. If you choose to switch
              your unit system to imperial, all your weight data will be
              converted to pounds, and length data to inches.
            </Typography>
            <Box pt="8px" height="2rem">
              {updatedUnitsSystem === "imperial" &&
              currentUserData.unitsSystem === "metric" ? (
                <Button
                  variant="dbz_mini"
                  onClick={handleUpdateUnitsSystemChange}
                >
                  Convert To Imperial
                </Button>
              ) : updatedUnitsSystem === "metric" &&
                currentUserData.unitsSystem === "imperial" ? (
                <Button
                  variant="dbz_mini"
                  onClick={handleUpdateUnitsSystemChange}
                >
                  Convert To Metric
                </Button>
              ) : updatedUnitsSystem === "metric" &&
                currentUserData.unitsSystem === "metric" ? (
                <Typography>You're using the metric system.</Typography>
              ) : updatedUnitsSystem === "imperial" &&
                currentUserData.unitsSystem === "imperial" ? (
                <Typography>You're using the imperial system.</Typography>
              ) : null}
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Default Weight Increment
            </Typography>

            <Typography variant="body2">
              Select here the amount of weight to be increased while using the
              utility buttons.
            </Typography>

            <FormControl fullWidth sx={{ mt: 2, pt: 1.5 }}>
              <InputLabel id="demo-simple-select-label">
                Weight Increase
              </InputLabel>
              <Select
                value={updatedDefaultWeightIncrement}
                onChange={handleDefaultWeightIncrementChange}
                labelId="demo-simple-select-label"
              >
                <MenuItem value={0.25}>0.25</MenuItem>
                <MenuItem value={0.5}>0.5</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={1.25}>1.25</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={2.5}>2.5</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
            {updatedDefaultWeightIncrement !==
            currentUserData.defaultWeightIncrement ? (
              <Box pt="8px">
                <Button
                  variant="dbz_mini"
                  onClick={handleDefaultWeightIncrementUpdate}
                >
                  Update Increment
                </Button>
              </Box>
            ) : null}
          </CardContent>
        </Card>

        <Typography variant="subtitle1">Data</Typography>
        <Divider />

        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Export Your Data
            </Typography>
            <Typography variant="body2">
              Export your training logs as a .csv file so you can view them in
              your preferred spreadsheet application.
              <br></br>
            </Typography>
            <Box pt="8px" display="flex" flexDirection="column" gap={2}>
              <Typography variant="body2">
                The Export Exercises performs a minimalist export containing
                only exercise data, including specific KPI values (weight, reps,
                etc.) together with exercise comments and metadata.
                {/* 
                 When uploading previously exported data to fitPowerUp, you can choose to import only the exercise value, although workout metadata values like workout comments, workout rating, etc. will NOT be included.
               */}
                 </Typography>
              <Button variant="dbz_mini" style={{ width: "15rem" }}>
                <CSVLink
                  data={flattenedExerciseData}
                  filename="fitPowerUp_Export.csv"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  Export Exercises
                </CSVLink>
              </Button>

              <Typography variant="body2">
                The Export Workouts function performs an export of workout level data, specifically workout comments, workout rating, as well as KPIs.                
                {/* 
                 When uploading previously exported data to fitPowerUp, you can choose to import only the exercise value, although workout metadata values like workout comments, workout rating, etc. will NOT be included.
               */}
                 </Typography>
              <Button variant="dbz_mini" style={{ width: "15rem" }}>
                <CSVLink
                  data={flattenedWorkoutData}
                  filename="fitPowerUp_Workouts_Export.csv"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  Export Workouts
                </CSVLink>
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Import Data
            </Typography>

            <Typography variant="body2">
              Import a compatible dataset to fitPowerUp.
            </Typography>
            <Box pt="8px">
              <Button variant="dbz_mini"
              onClick={()=>navigate("import-data")}
              >Go To Import</Button>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Delete Your Account
            </Typography>

            <Typography variant="body2">
              Delete all your account data! This includes your training data,
              body tracker data as well as personal data - including photos,
              posts, power level, feats, etc. Your registered email address will
              be removed from all fitPowerUp systems and you will be logged out
              from your account.
              <br />
              This process is{" "}
              <strong>
                permanent and irreversible, and no data can be recovered
                afterwards!
              </strong>
            </Typography>
            <Box pt="8px">
              <Button variant="dbz_mini">Delete Account</Button>
            </Box>
          </CardContent>
        </Card>

        <Typography variant="subtitle1">Other</Typography>
        <Divider />
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Feedback
            </Typography>

            <Typography variant="body2">
              You can send an email with your thoughts, comments and suggestions
              about the app by pressing the button below.
            </Typography>
            <Box pt="8px">
              <Button variant="dbz_mini" href="mailto: fitpowerupapp@gmail.com">
                Send Feedback
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Reddit Community
              <RedditIcon fontSize="small" />
            </Typography>

            <Typography variant="body2">
              Join the fitPowerUp community on Reddit!
            </Typography>

            <Box pt="8px">
              <Button variant="dbz_mini" href="https://reddit.com/r/fitpowerup">
                Go To Reddit{" "}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Terms And Conditions
            </Typography>

            <Typography variant="body2">
              Check the terms and conditions for using the app.
            </Typography>

            <Box pt="8px">
              <Button
                variant="dbz_mini"
                onClick={() => navigate("terms-and-conditions")}
              >
                Check Terms & Conditions
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Development Log
            </Typography>

            <Typography variant="body2">
              Check out the features list implemented with each version of the
              app.
            </Typography>

            <Box pt="8px"
            
            >
              <Button variant="dbz_mini"
              onClick={()=>navigate("development-log")}
              >SEE DEVELOPMENT LOG</Button>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography
              color="text.secondary"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              Buy Me A Coffee (or Protein Shake)
              <VerifiedIcon
                sx={{ color: "#3f51b5", width: "1rem", height: "1rem" }}
              />
            </Typography>

            <Typography variant="body2">
              Hey there, Daniel here!
              <br />
              <strong>fitPowerUp</strong> is a passion project I developed in my
              spare time as a hobby, mainly due to my enjoyment of weightlifting
              and Dragon Ball Z. The app always was and always will be free. No
              payment is required in order to use the app. Now, in case you{" "}
              <em>absolutely voluntarily</em> choose to support me as an
              independent developer, you can buy me a coffee (or a protein
              shake) here.
            </Typography>

            <Box pt="8px">
              <Button variant="dbz_mini"
              href="https://www.buymeacoffee.com/danielmatei" target="_blank"
              >Buy Me A Coffee</Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Settings;
