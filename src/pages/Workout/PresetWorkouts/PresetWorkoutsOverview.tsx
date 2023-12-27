import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { UserPresetWorkoutsDataContext } from "../../../context/UserPresetWorkouts";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { MouseEvent } from "react";
import IPresetWorkoutData from "../../../utils/interfaces/IPresetWorkoutsData";
import RoutineCard from "./RoutineCard";
import { useEffect } from "react";
import StandaloneWorkoutCard from "./StandaloneWorkoutCard";
import { Button } from "@mui/material";
// This is the type for the accumulator
interface IPresetWorkoutAccumulator {
  [key: string]: IPresetWorkoutGroup;
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
  workoutBy?:string
  workoutLinkReference?:string
}

function PresetWorkoutsOverview() {


  const { presetWorkoutsData,refetchPresetWorkoutsData } = useContext(UserPresetWorkoutsDataContext);
  
  const jsonString = JSON.stringify(presetWorkoutsData, null, 2); // The '2' argument adds indentation for readability

  const blob = new Blob([jsonString], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = "myData.json"; // Filename for the downloaded file
  
  const [selectedCategory, setSelectedCategory] = useState("routines"); // default value

  const routines = getRoutines(presetWorkoutsData);

  const workouts = getWorkouts(presetWorkoutsData);

  const isRoutineEmptyCheck = isRoutineEmpty(routines);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching the data')
      if (presetWorkoutsData.length === 0) {
        await refetchPresetWorkoutsData();
        console.log('actually fetching')
      }
    };
    console.log('fetching the data')
    fetchData().catch(console.error); // Handle errors
  }, [refetchPresetWorkoutsData]);

  function isRoutineEmpty(obj: IPresetWorkoutAccumulator) {
    if (routines) {
      return Object.keys(obj).length === 0;
    }
  }

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
      <Box position="fixed" sx={{ width: "100%",zIndex:1 }}>
        <AppBar
          elevation={2}
          style={{
            top: 0,
            width: "100%",
            height: "56px",
            background:
              "radial-gradient(circle, rgba(80,80,80,1) 0%, rgba(0,0,0,1) 100%)",
          }}
        >
          <Container maxWidth="md">
            <Toolbar disableGutters>
              <FormatListNumberedIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />

              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Preset Workouts
              </Typography>

              <FormatListNumberedIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />

              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Preset Workouts
              </Typography>

              <Box sx={{ flexGrow: 1, display: "flex" }}>
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

      {selectedCategory === "routines" && !isRoutineEmptyCheck ? (
        <Box display="flex" flexDirection="column" gap={2} pb="64px">
          {presetWorkoutsData.length > 0 &&
            Object.entries(routines).map(([key, value]) => {
              const groupData = value as IPresetWorkoutGroup; // Type assertion

              return (
                <RoutineCard
                  key={key}
                  routineName={key}
                  groupData={groupData}
                />
              );
            })}
        </Box>
      ) : selectedCategory === "routines" && isRoutineEmptyCheck ? (
        <Box
          display="flex"
          height="calc(100svh - 112px)"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>We couldn't find any routines.</Typography>
        </Box>
      ) : null}

      {selectedCategory === "workouts" && workouts.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={2} pb="64px">
          {workouts.map((workout: IPresetWorkoutData, index: number) => (
            <StandaloneWorkoutCard key={index} workoutData={workout} />
          ))}
        </Box>
      ) : selectedCategory === "workouts" && workouts.length === 0 ? (
        <Box
          display="flex"
          height="calc(100svh - 112px)"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>We couldn't find any stand-alone workouts.</Typography>
        </Box>
      ) : null}
    </Box>
  );
}

export default PresetWorkoutsOverview;

export function getWorkouts(presetWorkoutsData: IPresetWorkoutData[]) {
  const tempWorkoutsArr = [];

  if (presetWorkoutsData.length > 0) {
    for (let index = 0; index < presetWorkoutsData.length; index++) {
      const workoutElement = presetWorkoutsData[index];

      if (workoutElement.routineName === "") {
        tempWorkoutsArr.push(workoutElement);
      }
    }
  }

  return tempWorkoutsArr;
}

export function getIndividualPresetWorkouts(
  presetWorkoutsData: IPresetWorkoutData[],
  routineName: string | undefined
) {
  const tempWorkoutsArr = [];

  if (!routineName) {
    return [];
  }

  if (presetWorkoutsData.length > 0 && routineName) {
    for (let index = 0; index < presetWorkoutsData.length; index++) {
      const workoutElement = presetWorkoutsData[index];

      if (workoutElement.routineName === routineName) {
        tempWorkoutsArr.push(workoutElement);
      }
    }
  }

  return tempWorkoutsArr;
}

export function getIndividualRoutine(
  presetWorkoutsData: IPresetWorkoutData[],
  routineName: string | undefined
) {
  const tempRoutinesArr: any = [];

  if (!routineName) {
    return [];
  }

  if (presetWorkoutsData.length > 0) {
    //const tempRoutinesArr: IPresetWorkoutData[] = presetWorkoutsData.filter((workout: IPresetWorkoutData) => workout.routineName !== "");

    for (let index = 0; index < presetWorkoutsData.length; index++) {
      const workoutElement = presetWorkoutsData[index];

      if (workoutElement.routineName === routineName) {
        tempRoutinesArr.push(workoutElement);
      }
    }

    const groupedByRoutineName = tempRoutinesArr.reduce(
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

        // Explicitly check and assign each known property
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
        if (currentObject.workoutBy && currentObject.workoutBy.trim() !== "") {
          accumulator[routineName].details.workoutBy = currentObject.workoutBy;
        }
        if (currentObject.workoutLinkReference && currentObject.workoutLinkReference.trim() !== "") {
          accumulator[routineName].details.workoutLinkReference = currentObject.workoutLinkReference;
        }

        accumulator[routineName].details.delete = currentObject.delete;

        return accumulator;
      },
      {}
    );

    return groupedByRoutineName;
  }
}

function getRoutines(presetWorkoutsData: IPresetWorkoutData[]) {
  const tempRoutinesArr: IPresetWorkoutData[] = [];

  for (let index = 0; index < presetWorkoutsData.length; index++) {
    const workoutElement = presetWorkoutsData[index];
    if (workoutElement.routineName !== "") {
      tempRoutinesArr.push(workoutElement);
    }
  }

  const groupedByRoutineName = tempRoutinesArr.reduce(
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

  return groupedByRoutineName;
}
