import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import { UserPresetWorkoutsDataContext } from "../../../context/UserPresetWorkouts";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { MouseEvent } from "react";
import IPresetWorkoutData from "../../../utils/interfaces/IPresetWorkoutsData";
import RoutineCard from "./RoutineCard";
import { useEffect } from "react";
import StandaloneWorkoutCard from "./StandaloneWorkoutCard";
import IPresetRoutineData from "../../../utils/interfaces/IPresetRoutineData";
import IPresetStandaloneWorkout from "../../../utils/interfaces/IPresetStandaloneWorkout";
import { Button } from "@mui/material";
import { getThemeMode } from "../../../theme";

export interface IPresetRoutine {
  routineName: string;
  routineDescription: string;
  routineBy: string;
  routineLinkReference: string;
  delete: boolean;
  id: string;
  routineImg: string;
  multiWeeks: boolean;
}

export interface IPresetWorkoutGroup {
  details: IPresetWorkoutDetails;
  workouts: IPresetWorkoutData[];
}

interface IPresetWorkoutDetails {
  routineDescription?: string;
  routineLinkReference?: string;
  routineBy?: string;
  delete?: boolean;
  workoutBy?: string;
  workoutLinkReference?: string;
}

function PresetWorkoutsOverview() {
  
  const isDarkModeEnabled = getThemeMode()
  const { presetWorkoutsData, presetRoutinesData, refetchPresetWorkoutsData } =
    useContext(UserPresetWorkoutsDataContext);
  useEffect(() => {
    const fetchData = async () => {
      if (presetWorkoutsData.length === 0) {
        await refetchPresetWorkoutsData();
      }
    };

    fetchData().catch(console.error); // Handle errors
  }, []);


  function handleDownload() {
    // Convert presetWorkoutsData to a JSON string
    const jsonString = JSON.stringify(presetWorkoutsData, null, 2); // Pretty print with indentation
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    // Create and click a download link for workouts
    const link = document.createElement("a");
    link.href = url;
    link.download = "workout.json"; // Filename for the workouts file
    document.body.appendChild(link);
    link.click(); // Programmatically click the link to start the download
    document.body.removeChild(link); // Clean up the DOM
    URL.revokeObjectURL(url); // Release the memory
  
    // Convert presetRoutinesData to a JSON string
    const jsonStringRoutines = JSON.stringify(presetRoutinesData, null, 2); // Pretty print with indentation
    const blobRoutines = new Blob([jsonStringRoutines], { type: "application/json" });
    const urlRoutines = URL.createObjectURL(blobRoutines);
  
    // Create and click a download link for routines
    const linkRoutines = document.createElement("a");
    linkRoutines.href = urlRoutines;
    linkRoutines.download = "routines.json"; // Filename for the routines file
    document.body.appendChild(linkRoutines);
    linkRoutines.click(); // Programmatically click the link to start the download
    document.body.removeChild(linkRoutines); // Clean up the DOM
    URL.revokeObjectURL(urlRoutines); // Release the memory
  }
  
  // In your React component
  <Button onClick={handleDownload}>Test Download</Button>
  

  const [selectedCategory, setSelectedCategory] = useState("routines"); // default value

  console.log({ selectedCategory });
  const workouts = getWorkouts(presetWorkoutsData);

  const handleAlignment = (
    event: MouseEvent<HTMLElement>,
    newCategory: string | null
  ) => {
    // Ensure that if newCategory is null, it defaults to a specific value
    if (newCategory === "routines") {
      setSelectedCategory(newCategory || "routines"); // default to 'routines' for example
    } else if (newCategory === "workouts") {
      setSelectedCategory(newCategory || "workouts"); // default to 'routines' for example
    }
  };

  const navigate = useNavigate();

  function handleNewPresetRoutine() {
    navigate("new-preset-routine");
  }

  function handleNewPresetWorkout() {
    navigate("new-preset-workout");
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box position="fixed" sx={{ width: "100%", zIndex: 1 }}>
        <AppBar
          style={{
            top: 0,
            width: "100%",
            height: "56px"
          }}
        >
          <Container maxWidth="md">
            <Toolbar disableGutters>
              {/* 
              <FormatListNumberedIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              /> */}

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: ".3rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                Routines & Workouts
              </Typography>
              {/* 
              <FormatListNumberedIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              /> */}

              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  letterSpacing: ".0rem",
                color:"#FFA500",
                  textDecoration: "none",
                }}
              >
                Routines & Workouts
              </Typography>

              <Box sx={{ flexGrow: 1, display: "flex" }}>
                {selectedCategory === "routines" ? (
                  <Box sx={{ marginLeft: "auto" }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={handleNewPresetRoutine}
                    >
                      <AddBoxIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Box>
                ) : (
                  <Box sx={{ marginLeft: "auto" }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={handleNewPresetWorkout}
                    >
                      <AddOutlinedIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <ToggleButtonGroup
        value={selectedCategory}
        onChange={handleAlignment}
        aria-label="text alignment"
        sx={{ p: 1 }}
        fullWidth
        size="small"
        exclusive
      >
        <ToggleButton value="routines" aria-label="left aligned" fullWidth>
          Routines
          {/* <FormatAlignLeftIcon /> */}
        </ToggleButton>
        <ToggleButton value="workouts" aria-label="centered" fullWidth>
          Workouts
          {/* 
        <FormatAlignCenterIcon /> */}
        </ToggleButton>
      </ToggleButtonGroup>

      {selectedCategory === "routines" && presetRoutinesData.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={2} pb="8px">
          {presetRoutinesData.length > 0 &&
            presetRoutinesData.map(
              (routine: IPresetRoutineData, index: number) => {
                return <RoutineCard key={index} routine={routine} />;
              }
            )}
        </Box>
      ) : selectedCategory === "routines" ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img 
                              src={isDarkModeEnabled==='light'?'/svg/vegeta.svg':'/svg/vegeta-orange.svg'}

          alt="son goku" width={128} height={128} />
          <Typography textAlign="center" fontSize="2rem" color="#1c4595">
            We couldn't find
            <br />
            any routines
          </Typography>
        </Box>
      ) : null}

      {selectedCategory === "workouts" && presetWorkoutsData.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={2} pb="8px">
          {presetWorkoutsData.map(
            (workout: IPresetStandaloneWorkout, index: number) => (
              <StandaloneWorkoutCard key={index} workoutData={workout} />
            )
          )}
        </Box>
      ) : selectedCategory === "workouts" && workouts.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img 
          
          src={isDarkModeEnabled==='light'?'/svg/vegeta.svg':'/svg/vegeta-orange.svg'}

          alt="son goku" width={128} height={128} />
          <Typography textAlign="center" fontSize="2rem" color="#1c4595">
            We couldn't find
            <br />
            any workouts
          </Typography>
        </Box>
      ) : null}

{/*       <Button onClick={handleDownload}>Test Download</Button> */}
    </Box>
  );
}

export default PresetWorkoutsOverview;

export function getWorkouts(presetWorkoutsData: IPresetWorkoutData[]) {
  return [];
}

export function getIndividualPresetWorkouts(
  presetWorkoutsData: IPresetWorkoutData[],
  routineName: string | undefined
) {
  return [];
}

function getRoutines(presetWorkoutsData: IPresetWorkoutData[]) {
  console.log(presetWorkoutsData);

  return [];

  /*   const tempRoutinesArr: IPresetWorkoutData = presetWorkoutsData[0];

  if(!presetWorkoutsData) return

  for (let index = 0; index < presetWorkoutsData.length; index++) {
    const workoutElement = presetWorkoutsData[index];
    if (workoutElement.routineName !== "") {
      tempRoutinesArr.push(workoutElement);
      console.log('doesnt equal:')
      console.log({workoutElement})
      console.log(workoutElement.routineName)
      
    }
  }


  if(tempRoutinesArr.length<1) return {}

  const groupedByRoutineName = tempRoutinesArr[0].reduce(
    (
      accumulator: IPresetWorkoutAccumulator,
      currentObject: IPresetWorkoutData
    ) => {

      const routineName = currentObject.routineName;

      if (!accumulator[routineName]) {
        accumulator[routineName] = {
          workouts: [],
          details: {},
        };
      }

      accumulator[routineName].workouts.push(currentObject);

      if (
        currentObject.routineDescription &&
        currentObject.routineDescription.trim() !== ""
      ) {
        accumulator[routineName].details.routineDescription =
          currentObject.routineDescription;
      }
      if (
        currentObject.routineLinkReference &&
        currentObject.routineLinkReference.trim() !== ""
      ) {
        accumulator[routineName].details.routineLinkReference =
          currentObject.routineLinkReference;
      }
      if (currentObject.routineBy && currentObject.routineBy.trim() !== "") {
        accumulator[routineName].details.routineBy = currentObject.routineBy;
      }

      return accumulator;
    },
    {}
  );

  console.log(groupedByRoutineName)
  return groupedByRoutineName; */
}
