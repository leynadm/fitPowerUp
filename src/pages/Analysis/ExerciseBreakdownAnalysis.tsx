import {
  Select,
  MenuItem,
  Container,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListSubheader from "@mui/material/ListSubheader";
import { timeframeOptions } from "../../utils/completedWorkoutsChartFunctions/statisticsOptions";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/completeWorkout";
import groupDataByMuscleG from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByMuscleG";
import getNumberOfRepsByMuscleGroup from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getNumberOfRepsByMuscleGroup";
import getFlattenedOverallMuscleGroupData from "../../utils/completedWorkoutsChartFunctions/utility/getFlattenedOverallMuscleGroupData";
import getTrainingVolumeByMuscleGroup from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getTrainingVolumeByMuscleGroup";
import groupDataByWorkoutsMuscleGroup from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByWorkoutsMuscleGroups";
import groupDataByWorkoutsExercise from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByWorkoutsExercise";
import getNumberOfSetsByMuscleGroup from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getNumberOfSetsByMuscleGroup";
import getNumberOfWorkoutsByMuscleGroup from "../../utils/completedWorkoutsChartFunctions/exercisesFunctions/getNumberOfWorkoutsByMuscleGroup";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { ChangeEvent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";
import groupDataBySetsMuscleGroup from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByWorkoutsMuscleGroups";
import { useContext } from "react";
import { TrainingDataContext } from "../../context/TrainingData";
import { AuthContext } from "../../context/Auth";
import {
  Typography,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import groupDataByExercise from "../../utils/completedWorkoutsChartFunctions/utility/groupDataByExercise";

function ExerciseBreakdownAnalysis() {
  const { userTrainingData } = useContext(TrainingDataContext);

  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const [selectedKPI, setSelectedKPI] = useState(
    "Number of Reps by Muscle Group"
  );

  const { currentUserData } = useContext(AuthContext);
  const [muscleGroupChart, setMuscleGroupChart] = useState(true);
  const [modeledData, setModeledData] = useState<
    { exerciseMuscleGroup: string; value: number }[] | null | undefined
  >([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleKPISelectChange = (event: SelectChangeEvent<string>) => {
    const clickedKPi = event.target.value;
    setSelectedKPI(clickedKPi);

    setModeledData(
      fetchModeledData(
        userTrainingData,
        clickedKPi,
        selectedTimeframe,
        startDate,
        endDate
      )
    );
  };

  useEffect(() => {
    setModeledData(
      fetchModeledData(
        userTrainingData,
        selectedKPI,
        selectedTimeframe,
        startDate,
        endDate
      )
    );
  }, []);

  const handleStandardTimeframeChange = (option: any) => {
    const clickedTimeframe = option;
    setSelectedTimeframe(clickedTimeframe); // Update the selected timeframe
    setStartDate("");
    setEndDate("");
    setModeledData(
      fetchModeledData(userTrainingData, selectedKPI, clickedTimeframe, "", "")
    );
  };


    // MUSCLE GROUPS ONLY - 4 FUNCTIONS

  function handleGetNumberOfRepsByMuscleGroup(
    userTrainingData: IWorkoutData[],
    timeframe: string,
    startDate: string,
    endDate: string
  ) {
    const flattenedData = getFlattenedOverallMuscleGroupData(
      userTrainingData,
      timeframe,
      startDate,
      endDate
    );

    const groupedData = flattenedData
      ? groupDataByMuscleG(flattenedData)
      : null;

    const modeledData = groupedData
      ? getNumberOfRepsByMuscleGroup(groupedData)
      : null;

    return modeledData;
  }


  function handleGetNumberOfSetsByMuscleGroup(
    userTrainingData: IWorkoutData[],
    timeframe: string,
    startDate: string,
    endDate: string
  ) {
    const flattenedData = getFlattenedOverallMuscleGroupData(
      userTrainingData,
      timeframe,
      startDate,
      endDate
    );

    const groupedData = flattenedData
      ? groupDataByMuscleG(flattenedData)
      : null;

    const modeledData = groupedData
      ? getNumberOfSetsByMuscleGroup(groupedData)
      : null;

    return modeledData;
  }

  function handleGetNumberOfWorkoutsByMuscleGroup(
    userTrainingData: IWorkoutData[],
    timeframe: string,
    startDate: string,
    endDate: string
  ) {
    const flattenedData = getFlattenedOverallMuscleGroupData(
      userTrainingData,
      timeframe,
      startDate,
      endDate
    );
    const groupedData = flattenedData
      ? groupDataByWorkoutsMuscleGroup(flattenedData)
      : null;

    const modeledData = groupedData
      ? getNumberOfWorkoutsByMuscleGroup(groupedData)
      : null;

    return modeledData;
  }

  function handleGetTrainingVolumeByMuscleGroup(
    userTrainingData: IWorkoutData[],
    timeframe: string,
    startDate: string,
    endDate: string
  ) {
    const flattenedData = getFlattenedOverallMuscleGroupData(
      userTrainingData,
      timeframe,
      startDate,
      endDate
    );

    const groupedData = flattenedData
      ? groupDataByMuscleG(flattenedData)
      : null;

    const modeledData = groupedData
      ? getTrainingVolumeByMuscleGroup(groupedData)
      : null;

    return modeledData;
  }


  // EXERCISE GROUPS ONLY ONLY - 4 FUNCTIONS

  function handleGetNumberOfRepsByExercise(
    userTrainingData: IWorkoutData[],
    timeframe: string,
    startDate: string,
    endDate: string
  ) {
    const flattenedData = getFlattenedOverallMuscleGroupData(
      userTrainingData,
      timeframe,
      startDate,
      endDate
    );

    const groupedData = flattenedData
      ? groupDataByExercise(flattenedData)
      : null;

    const modeledData = groupedData
      ? getNumberOfRepsByMuscleGroup(groupedData)
      : null;

    return modeledData;
  }

  function handleGetNumberOfWorkoutsByExercise(
    userTrainingData: IWorkoutData[],
    timeframe: string,
    startDate: string,
    endDate: string
  ) {
    const flattenedData = getFlattenedOverallMuscleGroupData(
      userTrainingData,
      timeframe,
      startDate,
      endDate
    );
    const groupedData = flattenedData
      ? groupDataByWorkoutsExercise(flattenedData)
      : null;

    const modeledData = groupedData
      ? getNumberOfWorkoutsByMuscleGroup(groupedData)
      : null;

    return modeledData;
  }



  const fetchModeledData = (
    userTrainingData: IWorkoutData[],
    kpi: string,
    timeframe: string,
    startDate: string,
    endDate: string
  ) => {
    let data;
    switch (kpi) {
      case "Number of Reps by Muscle Group":
        data = handleGetNumberOfRepsByMuscleGroup(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(true)
        break;

      case "Number of Workouts by Muscle Group":
        data = handleGetNumberOfWorkoutsByMuscleGroup(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(true)
        break;

      case "Training Volume by Muscle Group":
        data = handleGetTrainingVolumeByMuscleGroup(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(true)
        break;

      case "Number of Sets by Muscle Group":
        data = handleGetNumberOfSetsByMuscleGroup(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(true)
        break;
      case "Number of Reps by Exercise":
        data = handleGetNumberOfRepsByExercise(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(false)
        break;

      case "Number of Workouts by Exercise":
        data = handleGetNumberOfWorkoutsByExercise(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(false)
        break;

      default:
        break;
    }

    return data;
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newStartDate = event.target.value;

    if (startDate > endDate) {
      alert("you cannot");
    } else {
      setStartDate(newStartDate);

      setModeledData(
        fetchModeledData(
          userTrainingData,
          selectedKPI,
          selectedTimeframe,
          newStartDate,
          endDate
        )
      );
    }
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newEndDate = event.target.value;
    if (newEndDate <= startDate || startDate === "") {
      alert("you cannot set it");
    } else {
      setEndDate(newEndDate);
      setModeledData(
        fetchModeledData(
          userTrainingData,
          selectedKPI,
          selectedTimeframe,
          startDate,
          newEndDate
        )
      );
    }
  };

  if (!modeledData) {
    return <>No Data</>;
  }

  return (
    <Container
      maxWidth="md"
      sx={{ height: "100%", width: "100%", paddingBottom: "64px" }}
    >
      <Box display="flex" flexDirection="column" gap={1}>
        <Select
          sx={{ marginTop: "8px" }}
          defaultValue="Number of Reps by Muscle Group"
          id="grouped-select"
          label="Grouping"
          onChange={(event) => handleKPISelectChange(event)}
        >
          <ListSubheader>Muscle Group Breakdown</ListSubheader>
          <MenuItem value={"Number of Sets by Muscle Group"}>
            Number of Sets
          </MenuItem>
          <MenuItem value={"Number of Reps by Muscle Group"}>
            Number of Reps
          </MenuItem>
          <MenuItem value={"Number of Workouts by Muscle Group"}>
            Number of Workouts
          </MenuItem>
          <MenuItem value={"Training Volume by Muscle Group"}>
            Training Volume
          </MenuItem>
          <ListSubheader>Exercise Breakdown</ListSubheader>
          <MenuItem value={"Number of Sets by Exercise"}>
            Number of Sets
          </MenuItem>
          <MenuItem value={"Number of Reps by Exercise"}>
            Number of Reps
          </MenuItem>
          <MenuItem value={"Number of Workouts by Exercise"}>
            Number of Workouts
          </MenuItem>
          <MenuItem value={"Training Volume by Exercise"}>
            Training Volume
          </MenuItem>
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

        <Box display="flex" justifyContent="space-evenly" gap={1} width="100%">
          <TextField
            type="date"
            fullWidth
            value={startDate}
            onChange={handleStartDateChange}
          ></TextField>
          <TextField
            type="date"
            fullWidth
            value={endDate}
            onChange={handleEndDateChange}
          ></TextField>
        </Box>
      </Box>

      {muscleGroupChart && (
        <ResponsiveContainer minHeight="500px">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={modeledData}>
            <PolarGrid />

            <PolarAngleAxis dataKey="exerciseMuscleGroup" fontSize={15} />
            <PolarRadiusAxis
              fontSize={20}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
            />
            <Radar
              name="Mike"
              dataKey="value"
              stroke="#8884d8"
              fill="#520975"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      )}

      {!muscleGroupChart && (
        <ResponsiveContainer minHeight="500px">
          <BarChart
            width={500}
            height={300}
            data={modeledData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              fontSize={12}
              dataKey="exerciseMuscleGroup"
              type="category"
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="#520975"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
              
              >               <LabelList dataKey="value" position="right" />

              </Bar>

          </BarChart>
        </ResponsiveContainer>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="center">Measure</TableCell>
              <TableCell align="right">%</TableCell> {/* New column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {modeledData
              .slice()
              .sort((a, b) => b.value - a.value)
              .map((entry: any, index: number) => {
                const totalValue = modeledData.reduce(
                  (total, e) => total + e.value,
                  0
                );
                const percentage =
                  totalValue !== 0
                    ? ((entry.value / totalValue) * 100).toFixed(2)
                    : 0;
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {entry.exerciseMuscleGroup}
                    </TableCell>
                    <TableCell align="right">{entry.value}</TableCell>
                    <TableCell align="center">
                      {selectedKPI === "Training Volume by Muscle Group"
                        ? currentUserData.unitsSystem === "metric"
                          ? "kgs"
                          : "lbs"
                        : selectedKPI === "Number of Reps by Muscle Group"
                        ? "reps"
                        : selectedKPI === "Number of Sets by Muscle Group"
                        ? "sets"
                        : selectedKPI === "Number of Workouts by Muscle Group"
                        ? "workouts"
                        : selectedKPI === "Number of Workouts by Exercise"
                        ? "workouts"
                        : selectedKPI === "Number of Reps by Exercise"
                        ? "reps"                      
                        : "DefaultFallbackValue"}
                    </TableCell>
                    <TableCell align="right">{percentage}%</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ExerciseBreakdownAnalysis;
