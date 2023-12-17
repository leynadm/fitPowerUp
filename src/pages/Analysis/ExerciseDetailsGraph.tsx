import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { TrainingDataContext } from "../../context/TrainingData";
import Container from "@mui/material/Container";
import { IUserSelectedExercises } from "../../context/TrainingData";
import { Select, MenuItem } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
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
import getMaxDistanceForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getMaxDistanceForExercise";
import getWorkoutDistanceForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getWorkoutDistanceForExercise";
import getMaxTimeForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getMaxTimeForExercise";
import getWorkoutTimeForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getWorkoutTimeForExercise";
import getMaxSpeedForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getMaxSpeedForExercise";
import getMaxPaceForExercise from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getMaxPaceForExercise";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import capitalizeWords from "../../utils/capitalizeWords";
import NoAvailableDataBox from "../../components/ui/NoAvailableDataBox";
import { AuthContext } from "../../context/Auth";
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
  const {currentUserData} = useContext(AuthContext)
  const { userTrainingData, userSelectedExercises } =
    useContext(TrainingDataContext);

  const userSelectedExercisesStrArr = userSelectedExercises[0].exercises
    .map((userExercise: IUserSelectedExercises) =>
      capitalizeWords(userExercise.name)
    )
    .sort((a: string, b: string) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

  console.log(userSelectedExercisesStrArr);

  const [exerciseSelected, setExerciseSelected] = useState(() => {
    if (exerciseName) {
      return userSelectedExercises[0].exercises.find(
        (exercise: IUserSelectedExercises) =>
          exercise.name.toLocaleUpperCase() === exerciseName.toLocaleUpperCase()
      );
    } else {
      return userSelectedExercises[0].exercises[0];
    }
  });

  const [statisticsOptions, setStatisticsOptions] = useState(() => {
    return getStatisticOptions(exerciseSelected) || [];
  });

  const [selectedKPI, setSelectedKPI] = useState(
    statisticsOptions && statisticsOptions[0].label
  );

  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const [selectedDataGroup, setSelectedDataGroup] = useState("day");

  useEffect(() => {
    setModeledData(
      fetchModeledData(
        userTrainingData,
        exerciseSelected.name,
        selectedKPI,
        selectedTimeframe,
        selectedDataGroup
      )
    );
  }, []);

  const [modeledData, setModeledData] = useState<
    { exerciseDate: string; value: number }[] | undefined
  >([]);
  const [weightForRepsModeledData, setWeightForRepsModeledData] = useState<
    { date: string; reps6: number; reps8: number; reps12: number }[]
  >([{ date: "2023-11-7", reps6: 20, reps8: 15, reps12: 10 }]);

  const handleAutocompleteChange = (newValue: string | null) => {
    if (newValue) {
      const exercise = findExerciseByName(newValue);
      const newStatisticOptions = getStatisticOptions(exercise);
      setStatisticsOptions(newStatisticOptions);
      const newStatisticKPI = newStatisticOptions[0].label;
      setSelectedKPI(newStatisticKPI);

      setExerciseSelected(exercise);

      setModeledData(
        fetchModeledData(
          userTrainingData,
          newValue,
          newStatisticKPI,
          selectedTimeframe,
          selectedDataGroup
        )
      );
    }
  };

  const handleKPISelectChange = (event: SelectChangeEvent<string>) => {
    const clickedKPI = event.target.value;
    setSelectedKPI(clickedKPI);
    setModeledData(
      fetchModeledData(
        userTrainingData,
        exerciseSelected.name,
        clickedKPI,
        selectedTimeframe,
        selectedDataGroup
      )
    );
  };

  const valueToDisplay = (clickedKPI: string) => {
    const unitBasedKPIs = ['Estimated 1RM', 'Max Weight', 'Max Volume', 'Max Weight For Reps', 'Workout Volume','Max Weight for Reps'];
    const repBasedKPIs = ['Max Reps', 'Workout Reps'];
  
    if (unitBasedKPIs.includes(clickedKPI)) {
      return currentUserData.unitsSystem === "metric" ? "kg" : "lbs";
    } else if (repBasedKPIs.includes(clickedKPI)) {
      return "reps";
    }
  }
  
  
  const handleStandardTimeframeChange = (option: any) => {
    const clickedTimeframe = option;
    setSelectedTimeframe(clickedTimeframe); // Update the selected timeframe
    setModeledData(
      fetchModeledData(
        userTrainingData,
        exerciseSelected.name,
        selectedKPI,
        clickedTimeframe,
        selectedDataGroup
      )
    );
  };

  const handleSelectedDataGroupChange = (option: any) => {
    const clickedDataGroup = option;
    setSelectedDataGroup(clickedDataGroup); // Update the selected timeframe
    setModeledData(
      fetchModeledData(
        userTrainingData,
        exerciseSelected.name,
        selectedKPI,
        selectedTimeframe,
        clickedDataGroup
      )
    );
  };

  function getStatisticOptions(exerciseSelected: any) {
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

  const fetchModeledData = (
    userTrainingData: IWorkoutData[],
    userExerciseName: string,
    kpi: string,
    timeframe: string,
    dataGroup: string
  ) => {
    if (!exerciseSelected) {
      return;
    }

    let data;
    let weightRepsModeledData;

    switch (kpi) {
      case "Estimated 1RM":
        data = handleGet1RepMaxForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;
      case "Max Weight":
        data = handleGetMaxWeightForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;
      case "Max Reps":
        data = handleGetMaxRepsForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;
      case "Max Distance":
        data = handleGetMaxDistanceForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;

      case "Max Time":
        data = handleGetMaxTimeForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;

      case "Max Speed":
        data = handleGetMaxSpeedForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;

      case "Max Pace":
        data = handleGetMaxPaceForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;

      case "Max Volume":
        data = handleGetMaxVolumeForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;
      case "Max Weight for Reps":
        weightRepsModeledData = handleGetMaxWeightForReps(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        if (weightRepsModeledData) {
          setWeightForRepsModeledData(weightRepsModeledData);
        }
        break;
      case "Workout Volume":
        data = handleGetWorkoutVolumeForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;
      case "Workout Time":
        data = handleGetWorkoutTimeForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;

      case "Workout Reps":
        data = handleGetWorkoutRepsForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;

      case "Workout Distance":
        data = handleGetWorkoutDistanceForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        break;

      default:
        break;
    }

    return data;
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
      : [];
    const modeledData = groupedData ? get1RepMaxForExercise(groupedData) : [];
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
      : [];
    const modeledData = groupedData ? getMaxWeightForExercise(groupedData) : [];
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
    const groupedData = flattenedData
      ? groupDataByTimePeriodMax(flattenedData, dataGroup)
      : [];

    const modeledData = groupedData ? getMaxRepsForExercise(groupedData) : [];
    return modeledData;
  }

  function handleGetMaxDistanceForExercise(
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
      : [];

    const modeledData = groupedData
      ? getMaxDistanceForExercise(groupedData)
      : [];
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
      : [];
    const modeledData = groupedData ? getMaxVolumeForExercise(groupedData) : [];
    return modeledData;
  }

  function handleGetMaxTimeForExercise(
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
      : [];
    const modeledData = groupedData ? getMaxTimeForExercise(groupedData) : [];
    return modeledData;
  }

  function handleGetMaxSpeedForExercise(
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
      : [];
    const modeledData = groupedData ? getMaxSpeedForExercise(groupedData) : [];
    return modeledData;
  }

  function handleGetMaxPaceForExercise(
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
      : [];
    const modeledData = groupedData ? getMaxPaceForExercise(groupedData) : [];
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
      : [];
    const modeledData = groupedData
      ? getWorkoutVolumeForExercise(groupedData)
      : [];
    return modeledData;
  }

  function handleGetWorkoutTimeForExercise(
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
      : [];
    const modeledData = groupedData
      ? getWorkoutTimeForExercise(groupedData)
      : [];
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
      : [];
    const modeledData = groupedData
      ? getWorkoutRepsForExercise(groupedData)
      : [];
    return modeledData;
  }

  function handleGetWorkoutDistanceForExercise(
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
      : [];
    const modeledData = groupedData
      ? getWorkoutDistanceForExercise(groupedData)
      : [];
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
      : [];
    const modeledData = groupedData ? getMaxWeightForReps(groupedData) : [];
    return modeledData;
  }

  const findExerciseByName = (name: string) => {
    return userSelectedExercises[0].exercises.find(
      (exercise: IUserSelectedExercises) =>
        exercise.name.toLocaleUpperCase() === name.toLocaleUpperCase()
    );
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
            value={
              exerciseSelected
                ? capitalizeWords(exerciseSelected.name)
                : undefined
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Exercise Filter"
                variant="outlined"
              />
            )}
            onChange={(event, value) => handleAutocompleteChange(value)}
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

        <Typography variant="subtitle1">Select timeframe</Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          fullWidth={true}
        >
          {timeframeOptions.map((option) => (
            <Button
              key={option.label}
              style={{ flexGrow: 1 }}
              onClick={() => handleStandardTimeframeChange(option.value)}
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
              onClick={() => handleSelectedDataGroupChange(option.value)}
              sx={{ backgroundColor: "#FFA500" }}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {modeledData?.length === 0 ? (
        <Box
          display="flex"
          minHeight="500px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <NoAvailableDataBox />
        </Box>
      ) : selectedKPI !== "Max Weight for Reps" ? (
        <ResponsiveContainer minHeight="500px">
          <LineChart
            width={500}
            height={500}
            data={modeledData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 1,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="exerciseDate" 
            />
            <YAxis
              width={25}
              fontSize={12}
              label={{
                value: valueToDisplay(selectedKPI),
                angle:-90,
                position: "insideBottomLeft",
              }}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
            />
            <Tooltip
            />
            
            <Line
              type="monotone"
              dataKey="value"
              stroke="#520975"
              strokeWidth="4"
              dot={{ fill: "#2e4355", stroke: "#520975", strokeWidth: 2, r: 4 }}
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
              left:10,
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
              label={{
                value: valueToDisplay(selectedKPI),
                angle:-90,
                position: "insideBottomLeft"
              }}
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
