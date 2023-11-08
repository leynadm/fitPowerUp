import { useParams } from "react-router-dom";
import { useContext } from "react";
import { TrainingDataContext } from "../../context/TrainingData";
import Container from "@mui/material/Container";
import { IUserSelectedExercises } from "../../context/TrainingData";
import { Select, MenuItem } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import getFlattenedExerciseData from "../../utils/completedWorkoutsChartFunctions/utility/getFlattenedExerciseData";
import groupDataByTimePeriodAverage from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByTimePeriodAverage";
import groupDataByTimePeriodMax from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByTimePeriodMax";
import groupDataByTimePeriodForReps from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByTimePeriodReps";
import get1RepMaxForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/get1RepMaxForExercise";
import getMaxWeightForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getMaxWeightForExercise";
import getMaxRepsForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getMaxRepsForExercise";
import getMaxVolumeForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getMaxVolumeForExercse";
import getWorkoutVolumeForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getWorkoutVolumeForExercise";
import getWorkoutRepsForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getWorkoutRepsForExercise";
import getMaxWeightForReps from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getMaxWeightForReps";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

import {
  statisticsOptionsWeightAndReps,
  statisticsOptionsReps,
  statisticsOptionsWeight,
  statisticsOptionsDistance,
  statisticsOptionsTime,
  statisticsOptionsWeightAndDistance,
  statisticsOptionsWeightAndTime,
  statisticsOptionsRepsAndDistance,
  statisticsOptionsRepsAndTime,
  statisticsOptionsDistanceAndTime,
  timeframeOptions,
  intervalOptions,
} from "../../utils/completedWorkoutsChartFunctions/statisticsOptions";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/completeWorkout";
import groupDataByTimePeriodSummed from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByTimePeriodSummed";

function ExerciseDetailsGraph() {
  const { exerciseName } = useParams();

  const { userTrainingData, userSelectedExercises } =
    useContext(TrainingDataContext);

  const userSelectedExercisesStrArr = userSelectedExercises[0].exercises
    .map((userExercise: IUserSelectedExercises) => userExercise.name)
    .sort((a: string, b: string) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

  const [exerciseSelected, setExerciseSelected] = useState(
    exerciseName
      ? userSelectedExercises[0].exercises.find(
          (exercise: IUserSelectedExercises) =>
            exercise.name.toUpperCase() === exerciseName.toUpperCase()
        )
      : userSelectedExercises[0].exercises[0] // Assign the first entry when exerciseName is empty
  );

  const [statisticsOptions, setStatisticsOptions] = useState(() => {
    return getStatisticOptions() || [];
  });

  const [selectedKPI, setSelectedKPI] = useState(
    statisticsOptions && statisticsOptions[0].label
  );

  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const [selectedDataGroup, setSelectedDataGroup] = useState("day");
  const [modeledData, setModeledData] = useState<
    { exerciseDate: string; value: number }[]
  >([{ exerciseDate: "2023-11-7", value: 20 }]);
  const [weightForRepsModeledData, setWeightForRepsModeledData] = useState<
    { date: string; reps6: number; reps8: number; reps12: number }[]
  >([{ date: "2023-11-7", reps6: 20, reps8: 15, reps12: 10 }]);

  const handleKPISelectChange = (event: SelectChangeEvent<string>) => {
    const selectedKPI = event.target.value;
    setSelectedKPI(selectedKPI);
  };

  useEffect(() => {
    fetchModeledData();

  }, [selectedKPI, selectedTimeframe, selectedDataGroup,statisticsOptions,exerciseSelected]);

  useEffect(() => {
    const newStatisticOptions = getStatisticOptions();
    setStatisticsOptions(newStatisticOptions);
   // Check if selectedKPI exists in the new options; if not, set the first option as selectedKPI
   if (!newStatisticOptions.some((option) => option.label === selectedKPI)) {
    setSelectedKPI(newStatisticOptions[0]?.label);
  }
  
  }, [exerciseSelected]);

  function getStatisticOptions() {
    let statisticsOptions;

    if (!exerciseSelected) {
      return [];
    }

    if (
      exerciseSelected.measurement.includes("weight") &&
      exerciseSelected.measurement.includes("reps")
    ) {
      statisticsOptions = statisticsOptionsWeightAndReps;
    } else if (
      exerciseSelected.measurement.includes("weight") &&
      exerciseSelected.measurement.includes("distance")
    ) {
      statisticsOptions = statisticsOptionsWeightAndDistance;
    } else if (
      exerciseSelected.measurement.includes("weight") &&
      exerciseSelected.measurement.includes("time")
    ) {
      statisticsOptions = statisticsOptionsWeightAndTime;
    } else if (
      exerciseSelected.measurement.includes("reps") &&
      exerciseSelected.measurement.includes("distance")
    ) {
      statisticsOptions = statisticsOptionsRepsAndDistance;
    } else if (
      exerciseSelected.measurement.includes("reps") &&
      exerciseSelected.measurement.includes("time")
    ) {
      statisticsOptions = statisticsOptionsRepsAndTime;
    } else if (
      exerciseSelected.measurement.includes("distance") &&
      exerciseSelected.measurement.includes("time")
    ) {
      statisticsOptions = statisticsOptionsDistanceAndTime;
    } else if (exerciseSelected.measurement.includes("weight")) {
      statisticsOptions = statisticsOptionsWeight;
    } else if (exerciseSelected.measurement.includes("reps")) {
      statisticsOptions = statisticsOptionsReps;
    } else if (exerciseSelected.measurement.includes("distance")) {
      statisticsOptions = statisticsOptionsDistance;
    } else if (exerciseSelected.measurement.includes("time")) {
      statisticsOptions = statisticsOptionsTime;
    }

    return statisticsOptions || [];
  }


  const fetchModeledData = () => {
    
    if (!exerciseSelected) {
      return;
    }
    let data;
    let weightRepsModeledData;

    switch (selectedKPI) {
      case "Estimated 1RM":
        data = handleGet1RepMaxForExercise(
          userTrainingData,
          exerciseSelected.name,
          selectedTimeframe,
          selectedDataGroup
        );
        break;
      case "Max Weight":
        data = handleGetMaxWeightForExercise(
          userTrainingData,
          exerciseSelected.name,
          selectedTimeframe,
          selectedDataGroup
        );
        break;
      case "Max Reps":
        data = handleGetMaxRepsForExercise(
          userTrainingData,
          exerciseSelected.name,
          selectedTimeframe,
          selectedDataGroup
        );
          console.log('logging max reps:')
          console.log(data)
        break;
      case "Max Volume":
        data = handleGetMaxVolumeForExercise(
          userTrainingData,
          exerciseSelected.name,
          selectedTimeframe,
          selectedDataGroup
        );
        break;
      case "Max Weight for Reps":
        weightRepsModeledData = handleGetMaxWeightForReps(
          userTrainingData,
          exerciseSelected.name,
          selectedTimeframe,
          selectedDataGroup
        );
        if (weightRepsModeledData) {
          setWeightForRepsModeledData(weightRepsModeledData);
        }
        break;
      case "Workout Volume":
        data = handleGetWorkoutVolumeForExercise(
          userTrainingData,
          exerciseSelected.name,
          selectedTimeframe,
          selectedDataGroup
        );
        break;
      case "Workout Reps":
        data = handleGetWorkoutRepsForExercise(
          userTrainingData,
          exerciseSelected.name,
          selectedTimeframe,
          selectedDataGroup
        );
        break;

      default:
        break;
    }
    if (data) {
      setModeledData(data);
    }
  };

  function handleGet1RepMaxForExercise(
    userTrainingData: IWorkoutData[],
    exerciseName: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedExerciseData(
      userTrainingData,
      exerciseName,
      timeframe
    );
    const groupedData = flattenedData
      ? groupDataByTimePeriodAverage(flattenedData, dataGroup)
      : null;
    const modeledData = groupedData ? get1RepMaxForExercise(groupedData) : null;
    return modeledData;
  }

  function handleGetMaxWeightForExercise(
    userTrainingData: IWorkoutData[],
    exerciseName: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedExerciseData(
      userTrainingData,
      exerciseName,
      timeframe
    );
    const groupedData = flattenedData
      ? groupDataByTimePeriodMax(flattenedData, dataGroup)
      : null;
    const modeledData = groupedData
      ? getMaxWeightForExercise(groupedData)
      : null;
    return modeledData;
  }

  function handleGetMaxRepsForExercise(
    userTrainingData: IWorkoutData[],
    exerciseName: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedExerciseData(
      userTrainingData,
      exerciseName,
      timeframe
    );
    console.log({flattenedData})
    const groupedData = flattenedData
      ? groupDataByTimePeriodMax(flattenedData, dataGroup)
      : null;
      console.log({groupedData})
    const modeledData = groupedData ? getMaxRepsForExercise(groupedData) : null;
    return modeledData;
  }

  function handleGetMaxVolumeForExercise(
    userTrainingData: IWorkoutData[],
    exerciseName: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedExerciseData(
      userTrainingData,
      exerciseName,
      timeframe
    );
    const groupedData = flattenedData
      ? groupDataByTimePeriodMax(flattenedData, dataGroup)
      : null;
    const modeledData = groupedData
      ? getMaxVolumeForExercise(groupedData)
      : null;
    return modeledData;
  }

  function handleGetWorkoutVolumeForExercise(
    userTrainingData: IWorkoutData[],
    exerciseName: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedExerciseData(
      userTrainingData,
      exerciseName,
      timeframe
    );
    const groupedData = flattenedData
      ? groupDataByTimePeriodSummed(flattenedData, dataGroup)
      : null;
    const modeledData = groupedData
      ? getWorkoutVolumeForExercise(groupedData)
      : null;
    return modeledData;
  }

  function handleGetWorkoutRepsForExercise(
    userTrainingData: IWorkoutData[],
    exerciseName: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedExerciseData(
      userTrainingData,
      exerciseName,
      timeframe
    );
    const groupedData = flattenedData
      ? groupDataByTimePeriodSummed(flattenedData, dataGroup)
      : null;
    const modeledData = groupedData
      ? getWorkoutRepsForExercise(groupedData)
      : null;
    return modeledData;
  }

  function handleGetMaxWeightForReps(
    userTrainingData: IWorkoutData[],
    exerciseName: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedExerciseData(
      userTrainingData,
      exerciseName,
      timeframe
    );
    const groupedData = flattenedData
      ? groupDataByTimePeriodForReps(flattenedData, dataGroup)
      : null;
    const modeledData = groupedData ? getMaxWeightForReps(groupedData) : null;
    return modeledData;
  }

  const findExerciseByName = (name: string) => {
    return userSelectedExercises[0].exercises.find(
      (exercise: IUserSelectedExercises) => exercise.name === name
    );
  };

  const handleAutocompleteChange = (
    event: ChangeEvent<any>,
    newValue: string
  ) => {
    if (newValue) {
      const exercise = findExerciseByName(newValue);
      setExerciseSelected(exercise);
    } else {
      setExerciseSelected(null);
    }
  };
  return (
    <Container
      maxWidth="md"
      sx={{ height: "100%", width: "100%", paddingBottom: "64px" }}
    >
      <Box paddingBottom="16px" display="flex" flexDirection="column">
        {!exerciseName && (
          <Autocomplete
            sx={{ paddingTop: "8px" }}
            disableClearable
            options={userSelectedExercisesStrArr}
            value={exerciseSelected ? exerciseSelected.name : null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Exercise Filter"
                variant="outlined"
              />
            )}
            onChange={handleAutocompleteChange}
          />
        )}

        <Select
          sx={{
            width: "100%",
            marginTop: "8px",
          }}
          onChange={handleKPISelectChange}
          value={selectedKPI}
        >
          {statisticsOptions &&
            statisticsOptions.map((option: { label: string }) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
        </Select>

        <Typography variant="subtitle1">Standard timeframe</Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          fullWidth={true}
        >
          {timeframeOptions.map((option) => (
            <Button
              key={option.label}
              style={{ flexGrow: 1 }}
              onClick={() => setSelectedTimeframe(option.value)}
              sx={{ backgroundColor: "#520975" }}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>

        <Typography variant="subtitle1">Interval grouped data</Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined secondary button group"
          fullWidth={true}
        >
          {intervalOptions.map((option) => (
            <Button
              key={option.label}
              style={{ flexGrow: 1 }}
              onClick={() => setSelectedDataGroup(option.value)}
              sx={{ backgroundColor: "#FFA500" }}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {selectedKPI !== "Max Weight for Reps" ? (
        <ResponsiveContainer minHeight="500px">
          <LineChart
            width={500}
            height={500}
            data={modeledData}
            margin={{
              top: 10,
              right: 10,
              left: 1,
              bottom: 1,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="exerciseDate" />
            <YAxis width={30} fontSize={12} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#520975"
              strokeWidth="4"
              dot={{ fill: "#2e4355", stroke: "#520975", strokeWidth: 2, r: 5 }}
              activeDot={{
                fill: "#2e4355",
                stroke: "#8884d8",
                strokeWidth: 5,
                r: 10,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer minHeight="500px">
          <LineChart
            width={500}
            height={500}
            data={weightForRepsModeledData}
            margin={{
              top: 10,
              right: 10,
              left: 5,
              bottom: 1,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              width={30}
              fontSize={12}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="reps6"
              stroke="#520975"
              strokeWidth="4"
              dot={{ fill: "#2e4355", stroke: "#520975", strokeWidth: 2, r: 5 }}
              activeDot={{
                fill: "#2e4355",
                stroke: "#8884d8",
                strokeWidth: 5,
                r: 10,
              }}
            />
            <Line
              type="monotone"
              dataKey="reps8"
              stroke="#000000"
              strokeWidth="4"
              dot={{ fill: "#2e4355", stroke: "#520975", strokeWidth: 2, r: 5 }}
              activeDot={{
                fill: "#2e4355",
                stroke: "#8884d8",
                strokeWidth: 5,
                r: 10,
              }}
            />
            <Line
              type="monotone"
              dataKey="reps12"
              stroke="#FFA500"
              strokeWidth="4"
              dot={{ fill: "#2e4355", stroke: "#520975", strokeWidth: 2, r: 5 }}
              activeDot={{
                fill: "#2e4355",
                stroke: "#8884d8",
                strokeWidth: 5,
                r: 10,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
}

export default ExerciseDetailsGraph;
