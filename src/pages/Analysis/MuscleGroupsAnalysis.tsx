import { useContext,useEffect } from "react";
import { TrainingDataContext } from "../../context/TrainingData";
import Container from "@mui/material/Container";
import { Select, MenuItem } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import NoAvailableDataBox from "../../components/ui/NoAvailableDataBox";
import {
  timeframeOptions,
  intervalOptions,
  statisticsOptionsMuscleGroups,
} from "../../utils/completedWorkoutsChartFunctions/statisticsOptions";
import getExercisesMuscleGroups from "../../utils/firebaseDataFunctions/getExercisesMuscleGroups";
import { SelectChangeEvent } from "@mui/material";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/completeWorkout";
import getTotalRepsForMuscleGroup from "../../utils/completedWorkoutsChartFunctions/muscleGroupsFunctions/getTotalRepsForMuscleGroup";
import getTotalWorkoutsForMuscleGroup from "../../utils/completedWorkoutsChartFunctions/muscleGroupsFunctions/getTotalWorkoutsForMuscleGroup";
import getTotalVolumeForMuscleGroup from "../../utils/completedWorkoutsChartFunctions/muscleGroupsFunctions/getTotalVolumeForMuscleGroup";
import getFlattenedMuscleGroupData from "../../utils/completedWorkoutsChartFunctions/utility/getFlattenedMuscleGroupData";
import groupDataByTimePeriodSummed from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByTimePeriodSummed";
import groupDataByTimePeriodSets from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByTimePeriodSets";
import getTotalSetsForMuscleGroup from "../../utils/completedWorkoutsChartFunctions/muscleGroupsFunctions/getTotalSetsForMuscleGroup";
import { Paper } from "@mui/material";
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
    { exerciseDate: string; value: number }[] | undefined | []
  >([]);

  const handleMuscleGroupSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedMuscleGroup = event.target.value;
    setSelectedMuscleGroup(selectedMuscleGroup);
    setModeledData(fetchModeledData(userTrainingData, selectedMuscleGroup, selectedKPI, selectedTimeframe, selectedDataGroup));
  };

  const handleKPISelectChange = (event: SelectChangeEvent<string>) => {
    const selectedKPI = event.target.value;
    setSelectedKPI(selectedKPI);
    setModeledData(fetchModeledData(userTrainingData, selectedMuscleGroup, selectedKPI, selectedTimeframe, selectedDataGroup));
  };

  const handleStandardTimeframeChange = (option:any) => {
    const clickedTimeframe = option; 
    setSelectedTimeframe(clickedTimeframe); // Update the selected timeframe
    setModeledData(fetchModeledData(userTrainingData, selectedMuscleGroup, selectedKPI, clickedTimeframe, selectedDataGroup));
  };

  const handleDataGroupChange = (option:any) => {
    const clickedDataGroup = option;
    setSelectedDataGroup(clickedDataGroup); // Update the selected timeframe
    setModeledData(fetchModeledData(userTrainingData, selectedMuscleGroup, selectedKPI, selectedTimeframe, clickedDataGroup));
  };

  useEffect(() => {
    setModeledData(
     fetchModeledData(
       userTrainingData,
       exercisesMuscleGroupsArr[0],
       selectedKPI,
       selectedTimeframe,
       selectedDataGroup
     )
   );
}, []);


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
      : [];
    const modeledData = groupedData
      ? getTotalRepsForMuscleGroup(groupedData)
      : [];

    
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
      : [];
    const modeledData = groupedData
      ? getTotalVolumeForMuscleGroup(groupedData)
      : [];

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
      ? groupDataByTimePeriodSummed(flattenedData, dataGroup)
      : [];
    const modeledData = groupedData
      ? getTotalSetsForMuscleGroup(groupedData)
      : [];

    return modeledData;

  }

  function handleGetTotalWorkoutsForMuscleGroup(
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
      : [];
    const modeledData = groupedData
      ? getTotalWorkoutsForMuscleGroup(groupedData)
      : [];

    return modeledData;

  }

  const fetchModeledData = (
    userTrainingData: IWorkoutData[],
    muscleGroup: string,
    kpi: string,
    timeframe: string,
    dataGroup: string
  ) => {
    if (!selectedMuscleGroup) {
      return;
    }

    let data;
    
    switch (kpi) {
      case "Total Reps":
        data = handleGetTotalRepsForMuscleGroup(
          userTrainingData,
          muscleGroup,
          timeframe,
          dataGroup
        );
        break;
      
        case "Total Sets":
        data = handleGetTotalSetsForMuscleGroup(
          userTrainingData,
          muscleGroup,
          timeframe,
          dataGroup
        );
        break;
        case "Total Workouts":
        data = handleGetTotalWorkoutsForMuscleGroup(
            userTrainingData,
            muscleGroup,
            timeframe,
            dataGroup
        );
        break;
        case "Total Volume":
        data = handleGetTotalVolumeForMuscleGroup(
          userTrainingData,
          muscleGroup,
          timeframe,
          dataGroup
        );
        break;
         
      default:
        break;
    }

    return data;

  };

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
              onClick={()=>handleStandardTimeframeChange(option.value)}
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
              onClick={() => handleDataGroupChange(option.value)}
              sx={{ backgroundColor: "#FFA500" }}
            >
              {option.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <ResponsiveContainer minHeight="500px">
        { modeledData && modeledData?.length>0?(
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
        ):(
          <Box       display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center">
          <NoAvailableDataBox/>
          </Box>
        )

        }
        
      </ResponsiveContainer>
    </Container>
  );
}

export default MuscleGroupsAnalysis;
