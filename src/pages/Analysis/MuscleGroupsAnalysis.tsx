import { useContext, useEffect } from "react";
import { TrainingDataContext } from "../../context/TrainingData";
import Container from "@mui/material/Container";
import { Select, MenuItem } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  timeframeOptions,
  intervalOptions,
  statisticsOptionsMuscleGroups,
} from "../../utils/completedWorkoutsChartFunctions/statisticsOptions";
import getExercisesMuscleGroups from "../../utils/firebaseDataFunctions/getExercisesMuscleGroups";
import { SelectChangeEvent } from "@mui/material";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/completeWorkout";
import getTotalRepsForMuscleGroup from "../../utils/completedWorkoutsChartFunctions/muscleGroupsFunctions/getTotalRepsForMuscleGroup";
import getTotalSetsForMuscleGroup from "../../utils/completedWorkoutsChartFunctions/muscleGroupsFunctions/getTotalSetsForMuscleGroup";
import getTotalWeightForMuscleGroup from "../../utils/completedWorkoutsChartFunctions/muscleGroupsFunctions/getTotalWeightForMuscleGroup";
import getTotalVolumeForMuscleGroup from "../../utils/completedWorkoutsChartFunctions/muscleGroupsFunctions/getTotalVolumeForMuscleGroup";
import getFlattenedMuscleGroupData from "../../utils/completedWorkoutsChartFunctions/utility/getFlattenedMuscleGroupData";
import groupDataByTimePeriodSummed from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByTimePeriodSummed";
import groupDataByTimePeriodSets from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByTimePeriodSets";
import getTotalSeriesForMuscleGroup from "../../utils/completedWorkoutsChartFunctions/muscleGroupsFunctions/getTotalSeriesForMuscleGroup";
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

function MuscleGroupsAnalysis() {
  const { userTrainingData, userSelectedExercises } =
    useContext(TrainingDataContext);

  const exercisesMuscleGroupsArr = getExercisesMuscleGroups(
    userSelectedExercises
  );

  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(
    exercisesMuscleGroupsArr[0]
  );
  const [selectedKPI, setSelectedKPI] = useState(
    statisticsOptionsMuscleGroups[0].label
  );
  const [selectedDataGroup, setSelectedDataGroup] = useState("day");
  const [modeledData, setModeledData] = useState<
    { exerciseDate: string; value: number }[]
  >([{ exerciseDate: "2023-11-7", value: 20 }]);

  const handleMuscleGroupSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedMuscleGroup = event.target.value;
    setSelectedMuscleGroup(selectedMuscleGroup);
  };

  const handleKPISelectChange = (event: SelectChangeEvent<string>) => {
    const selectedKPI = event.target.value;
    setSelectedKPI(selectedKPI);
  };


  function handleGetTotalRepsForMuscleGroup(
    userTrainingData: IWorkoutData[],
    muscleGroup: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedMuscleGroupData(
      userTrainingData,
      muscleGroup,
      timeframe
    );
    const groupedData = flattenedData
      ? groupDataByTimePeriodSummed(flattenedData, dataGroup)
      : null;
    const modeledData = groupedData
      ? getTotalRepsForMuscleGroup(groupedData)
      : null;

    return modeledData;
  }

  function handleGetTotalWeightForMuscleGroup(
    userTrainingData: IWorkoutData[],
    muscleGroup: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedMuscleGroupData(
      userTrainingData,
      muscleGroup,
      timeframe
    );
    const groupedData = flattenedData
      ? groupDataByTimePeriodSummed(flattenedData, dataGroup)
      : null;
    const modeledData = groupedData
      ? getTotalWeightForMuscleGroup(groupedData)
      : null;

    return modeledData;
  }

  function handleGetTotalVolumeForMuscleGroup(
    userTrainingData: IWorkoutData[],
    muscleGroup: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedMuscleGroupData(
        userTrainingData,
        muscleGroup,
        timeframe
      );
    const groupedData = flattenedData
      ? groupDataByTimePeriodSummed(flattenedData, dataGroup)
      : null;
    const modeledData = groupedData
      ? getTotalVolumeForMuscleGroup(groupedData)
      : null;

    return modeledData;

  }

  function handleGetTotalSeriesForMuscleGroup(
    userTrainingData: IWorkoutData[],
    muscleGroup: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedMuscleGroupData(
        userTrainingData,
        muscleGroup,
        timeframe
      );
    const groupedData = flattenedData
      ? groupDataByTimePeriodSummed(flattenedData, dataGroup)
      : null;
    const modeledData = groupedData
      ? getTotalSeriesForMuscleGroup(groupedData)
      : null;

    return modeledData;

  }

  function handleGetTotalSetsForMuscleGroup(
    userTrainingData: IWorkoutData[],
    muscleGroup: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedMuscleGroupData(
        userTrainingData,
        muscleGroup,
        timeframe
      );
    const groupedData = flattenedData
      ? groupDataByTimePeriodSets(flattenedData, dataGroup)
      : null;
    const modeledData = groupedData
      ? getTotalSetsForMuscleGroup(groupedData)
      : null;

    return modeledData;

  }

  const fetchModeledData = () => {
    if (!selectedMuscleGroup) {
      return;
    }

    let data;
    switch (selectedKPI) {
      case "Total Reps":
        data = handleGetTotalRepsForMuscleGroup(
          userTrainingData,
          selectedMuscleGroup,
          selectedTimeframe,
          selectedDataGroup
        );
        break;

      case "Total Weight":
        data = handleGetTotalWeightForMuscleGroup(
          userTrainingData,
          selectedMuscleGroup,
          selectedTimeframe,
          selectedDataGroup
        );
        break;
      
        case "Total Series":
        data = handleGetTotalSeriesForMuscleGroup(
          userTrainingData,
          selectedMuscleGroup,
          selectedTimeframe,
          selectedDataGroup
        );
        break;
        case "Total Sets":
        data = handleGetTotalSetsForMuscleGroup(
            userTrainingData,
            selectedMuscleGroup,
            selectedTimeframe,
            selectedDataGroup
        );
        break;
        case "Total Volume":
        data = handleGetTotalVolumeForMuscleGroup(
          userTrainingData,
          selectedMuscleGroup,
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

  useEffect(() => {
    fetchModeledData();
  }, [selectedKPI, selectedTimeframe, selectedDataGroup, selectedMuscleGroup]);

  return (
    <Container
    maxWidth="md"
    sx={{ height: "100%", width: "100%", paddingBottom: "64px" }}
    >
      <Box paddingBottom="16px" display="flex" flexDirection="column">
        <Select
          sx={{
            width: "100%",
            marginTop: "8px",
          }}
          onChange={handleMuscleGroupSelectChange}
          value={selectedMuscleGroup}
        >
          {exercisesMuscleGroupsArr &&
            exercisesMuscleGroupsArr.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
        </Select>

        <Select
          sx={{
            width: "100%",
            marginTop: "8px",
          }}
          onChange={handleKPISelectChange}
          value={selectedKPI}
        >
          {statisticsOptionsMuscleGroups &&
            statisticsOptionsMuscleGroups.map((option: { label: string }) => (
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

      <ResponsiveContainer minHeight="500px">
        <LineChart
          width={500}
          height={500}
          data={modeledData}
          margin={{
            top: 10,
            right: 10,
            left: 5,
            bottom: 1,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="exerciseDate" fontSize={12} />
          <YAxis width={30} fontSize={12} 
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
    </Container>
  );
}

export default MuscleGroupsAnalysis;
