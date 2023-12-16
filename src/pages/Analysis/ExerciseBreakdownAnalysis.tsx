import {
  Select,
  MenuItem,
  Container,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import { timeframeOptions } from "../../utils/completedWorkoutsChartFunctions/statisticsOptions";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/completeWorkout";
import groupDataByMuscleG from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/utility/groupDataByMuscleG";
import getNumberOfRepsByMuscleGroup from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/muscleGroups/getNumberOfRepsByMuscleGroup";
import getFlattenedOverallMuscleGroupData from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/utility/getFlattenedOverallMuscleGroupData";
import getTrainingVolumeByMuscleGroup from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/muscleGroups/getTrainingVolumeByMuscleGroup";
import groupDataByWorkoutsMuscleGroup from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/utility/groupDataByWorkoutsMuscleGroups";
import groupDataByWorkoutsExercise from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/utility/groupDataByWorkoutsExercise";
import getNumberOfSetsByMuscleGroup from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/muscleGroups/getNumberOfSetsByMuscleGroup";
import getNumberOfWorkoutsByMuscleGroup from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/muscleGroups/getNumberOfWorkoutsByMuscleGroup";
import getNumberOfRepsByExercise from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/exercises/getNumberOfRepsByExercise";
import getNumberOfSetsByExercise from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/exercises/getNumberOfSetsByExercise";
import getNumberOfWorkoutsByExercise from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/exercises/getNumberOfWorkoutsByExercise";
import getTrainingVolumeByExercise from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/exercises/getTrainingVolumeByExercise";
import groupDataOverall from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/utility/groupDataOverall";
import ExerciseCompletedStatTile from "../../components/ui/ExerciseCompletedStatTile";
import Replay10Icon from "@mui/icons-material/Replay10";
import ScaleIcon from "@mui/icons-material/Scale";
import ViewListIcon from "@mui/icons-material/ViewList";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import NoAvailableDataBox from "../../components/ui/NoAvailableDataBox";
import getMenuMaxHeight from "../../utils/miscelaneous/getMenuMaxHeight";
import getOverallStats from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/exercises/getOverallStats";
import groupDataByMuscleGForVolume from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/utility/groupDataByMuscleGForVolume";
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
} from "recharts";

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
import groupDataByExerciseForVolume from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/utility/groupDataByExerciseForVolume";
import groupDataByExercise from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/utility/groupDataByExercise";
import getFlattenedOverallExerciseData from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/utility/getFlattenedOverallExerciseData";

function ExerciseBreakdownAnalysis() {
  const { userTrainingData } = useContext(TrainingDataContext);

  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const [selectedKPI, setSelectedKPI] = useState(
    "Number of Reps by Muscle Group"
  );

  const { currentUserData } = useContext(AuthContext);
  const [muscleGroupChart, setMuscleGroupChart] = useState(true);

  const [modeledData, setModeledData] = useState<
    | { exerciseName?: string; exerciseMuscleGroup?: string; value: number }[]
    | null
    | undefined
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

  const overallStatsObj = getOverallStats(userTrainingData);

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

    const groupedData = flattenedData ? groupDataByMuscleG(flattenedData) : [];

    const modeledData = groupedData
      ? getNumberOfRepsByMuscleGroup(groupedData)
      : [];

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

    const groupedData = flattenedData ? groupDataByMuscleG(flattenedData) : [];

    const modeledData = groupedData
      ? getNumberOfSetsByMuscleGroup(groupedData)
      : [];

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
      : [];

    const modeledData = groupedData
      ? getNumberOfWorkoutsByMuscleGroup(groupedData)
      : [];

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
      ? groupDataByMuscleGForVolume(flattenedData)
      : [];

    const modeledData = groupedData
      ? getTrainingVolumeByMuscleGroup(groupedData)
      : [];

    return modeledData;
  }

  // EXERCISE GROUPS ONLY ONLY - 4 FUNCTIONS

  function handleGetNumberOfRepsByExercise(
    userTrainingData: IWorkoutData[],
    timeframe: string,
    startDate: string,
    endDate: string
  ) {
    const flattenedData = getFlattenedOverallExerciseData(
      userTrainingData,
      timeframe,
      startDate,
      endDate
    );

    const groupedData = flattenedData ? groupDataByExercise(flattenedData) : [];

    const modeledData = groupedData
      ? getNumberOfRepsByExercise(groupedData)
      : [];

    if (modeledData) {
      modeledData.sort((a, b) => b.value - a.value);
    }

    return modeledData;
  }

  function handleGetNumberOfWorkoutsByExercise(
    userTrainingData: IWorkoutData[],
    timeframe: string,
    startDate: string,
    endDate: string
  ) {
    const flattenedData = getFlattenedOverallExerciseData(
      userTrainingData,
      timeframe,
      startDate,
      endDate
    );
    const groupedData = flattenedData
      ? groupDataByWorkoutsExercise(flattenedData)
      : [];

    const modeledData = groupedData
      ? getNumberOfWorkoutsByExercise(groupedData)
      : [];

    if (modeledData) {
      modeledData.sort((a, b) => b.value - a.value);
    }

    return modeledData;
  }

  function handleGetTrainingVolumeByExercise(
    userTrainingData: IWorkoutData[],
    timeframe: string,
    startDate: string,
    endDate: string
  ) {
    const flattenedData = getFlattenedOverallExerciseData(
      userTrainingData,
      timeframe,
      startDate,
      endDate
    );

    const groupedData = flattenedData
      ? groupDataByExerciseForVolume(flattenedData)
      : [];

    const modeledData = groupedData
      ? getTrainingVolumeByExercise(groupedData)
      : [];

    if (modeledData) {
      modeledData.sort((a, b) => b.value - a.value);
    }
    return modeledData;
  }

  function handleGetNumberOfSetsByExercise(
    userTrainingData: IWorkoutData[],
    timeframe: string,
    startDate: string,
    endDate: string
  ) {
    const flattenedData = getFlattenedOverallExerciseData(
      userTrainingData,
      timeframe,
      startDate,
      endDate
    );

    const groupedData = flattenedData ? groupDataByExercise(flattenedData) : [];

    const modeledData = groupedData
      ? getNumberOfSetsByExercise(groupedData)
      : [];

    if (modeledData) {
      modeledData.sort((a, b) => b.value - a.value);
    }

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
        setMuscleGroupChart(true);
        break;

      case "Number of Workouts by Muscle Group":
        data = handleGetNumberOfWorkoutsByMuscleGroup(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(true);
        break;

      case "Training Volume by Muscle Group":
        data = handleGetTrainingVolumeByMuscleGroup(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(true);
        break;

      case "Number of Sets by Muscle Group":
        data = handleGetNumberOfSetsByMuscleGroup(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(true);
        break;
      case "Number of Reps by Exercise":
        data = handleGetNumberOfRepsByExercise(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(false);
        break;

      case "Number of Workouts by Exercise":
        data = handleGetNumberOfWorkoutsByExercise(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(false);
        break;

      case "Training Volume by Exercise":
        data = handleGetTrainingVolumeByExercise(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(false);
        break;

      case "Number of Sets by Exercise":
        data = handleGetNumberOfSetsByExercise(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        setMuscleGroupChart(false);
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

  function formatNumberWithComma(number: number) {
    return new Intl.NumberFormat("en-US").format(number);
  }

  return (
    <Container
      maxWidth="md"
      sx={{ height: "100%", width: "100%", paddingBottom: "64px" }}
    >
      <Box display="flex" flexDirection="column" gap={1}>
        <Select
          sx={{ marginTop: "8px" }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: getMenuMaxHeight(),
              },
            },
          }}
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

      {modeledData.length === 0 ? (
        <Box
          display="flex"
          minHeight="500px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <NoAvailableDataBox />
        </Box>
      ) : muscleGroupChart ? (
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
      ) : (
        <ResponsiveContainer minHeight="500px">
          <BarChart
            width={500}
            height={300}
            data={modeledData}
            margin={{
              top: 15,
              right: 0,
              left: 0,
              bottom: 5,
            }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis fontSize={12} dataKey="exerciseName" type="category" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="#520975"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            ></Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {modeledData.length > 0 && (
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
                      ? ((entry.value / totalValue) * 100).toFixed(0)
                      : 0;
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left">
                        {entry.exerciseMuscleGroup
                          ? entry.exerciseMuscleGroup.toLocaleUpperCase()
                          : entry.exerciseName.toLocaleUpperCase()}
                      </TableCell>

                      <TableCell align="right">
                        {formatNumberWithComma(entry.value)}
                      </TableCell>

                      <TableCell align="center">
                        {selectedKPI === "Training Volume by Muscle Group"
                          ? currentUserData.unitsSystem === "metric"
                            ? "kg"
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
                          : selectedKPI === "Number of Sets by Exercise"
                          ? "sets"
                          : selectedKPI === "Training Volume by Exercise"
                          ? "kg"
                          : "value"}
                      </TableCell>

                      <TableCell align="right">{percentage}%</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Typography variant="subtitle1" textAlign="center">
        HISTORIC STATS
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
        gap={3}
      >
        <ExerciseCompletedStatTile
          statName="TOTAL VOLUME"
          statIcon={<ScaleIcon fontSize="small" />}
          statValue={formatNumberWithComma(overallStatsObj.summedVolume || 0)}
          statDetail="kg"
          statColor="#520975"
          statTextColor="white"
        />
        <ExerciseCompletedStatTile
          statName="TOTAL REPS"
          statIcon={<Replay10Icon fontSize="medium" />}
          statDetail="reps"
          statValue={overallStatsObj.summedReps || 0}
          statColor="#520975"
          statTextColor="white"
        />
        <ExerciseCompletedStatTile
          statName="TOTAL SETS"
          statIcon={<ViewListIcon fontSize="small" />}
          statValue={overallStatsObj.count || 0}
          statDetail="sets"
          statColor="#520975"
          statTextColor="white"
        />
        <ExerciseCompletedStatTile
          statName="NO. WORKOUTS"
          statIcon={<FitnessCenterIcon fontSize="small" />}
          statValue={overallStatsObj.summedWorkouts || 0}
          statDetail="WO"
          statColor="#520975"
          statTextColor="white"
        />
      </Box>
    </Container>
  );
}

export default ExerciseBreakdownAnalysis;
