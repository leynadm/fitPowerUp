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
import ExerciseCompletedStatTile from "../../components/ui/ExerciseCompletedStatTile";
import Replay10Icon from "@mui/icons-material/Replay10";
import ScaleIcon from "@mui/icons-material/Scale";
import ViewListIcon from "@mui/icons-material/ViewList";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import NoAvailableDataBox from "../../components/ui/NoAvailableDataBox";
import getMenuMaxHeight from "../../utils/miscelaneous/getMenuMaxHeight";
import getOverallStats from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/exercises/getOverallStats";
import capitalizeWords from "../../utils/capitalizeWords";
import Paper from "@mui/material/Paper";
import fetchModeledDataBreakdown from "../../utils/completedWorkoutsChartFunctions/breakdownFunctions/utility/fetchModeldDataBreakdown";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Treemap,
  Tooltip,
  TooltipProps,
} from "recharts";
import { ChangeEvent, useEffect, useState } from "react";

import { useContext } from "react";
import { UserTrainingDataContext } from "../../context/UserTrainingData";
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

interface TreemapNode {
  name: string;
  value: number;
}

function ExerciseBreakdownAnalysis() {
  const { userTrainingData } = useContext(UserTrainingDataContext);

  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const [selectedKPI, setSelectedKPI] = useState(
    "Number of Reps by Muscle Group"
  );

  const { currentUserData } = useContext(AuthContext);
  const [muscleGroupChart, setMuscleGroupChart] = useState(true);

  const [modeledData, setModeledData] = useState<
    | { name?: string; exerciseMuscleGroup?: string; value: number }[]
    | null
    | undefined
  >([]);

  const itemSize =()=>{
    if(window.innerWidth<=600){
      return "mobile"
    } else {
      return "desktop"
    }
  } 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleKPISelectChange = (event: SelectChangeEvent<string>) => {
    const clickedKPi = event.target.value;
    setSelectedKPI(clickedKPi);

    const modeledDataResult = fetchModeledDataBreakdown(
      userTrainingData,
      clickedKPi,
      selectedTimeframe,
      startDate,
      endDate
    );

    if (!modeledDataResult) {
      return;
    }

    // Check the dataType to determine how to handle the result
    if (
      modeledDataResult.muscleGroupChartCheck &&
      modeledDataResult?.standardData
    ) {
      setModeledData(modeledDataResult.standardData);
      setMuscleGroupChart(true);
    } else if (
      !modeledDataResult.muscleGroupChartCheck &&
      modeledDataResult?.standardData
    ) {
      setModeledData(modeledDataResult.standardData);
      setMuscleGroupChart(false);
    }
  };

  useEffect(() => {
    const modeledDataResult = fetchModeledDataBreakdown(
      userTrainingData,
      selectedKPI,
      selectedTimeframe,
      startDate,
      endDate
    );

    if (!modeledDataResult) {
      return;
    }

    // Check the dataType to determine how to handle the result
    if (
      modeledDataResult.muscleGroupChartCheck &&
      modeledDataResult?.standardData
    ) {
      setModeledData(modeledDataResult.standardData);
      setMuscleGroupChart(true);
    } else if (
      !modeledDataResult.muscleGroupChartCheck &&
      modeledDataResult?.standardData
    ) {
      setModeledData(modeledDataResult.standardData);
      setMuscleGroupChart(false);
    }
  }, []);

  const handleStandardTimeframeChange = (option: any) => {
    const clickedTimeframe = option;
    setSelectedTimeframe(clickedTimeframe); // Update the selected timeframe
    setStartDate("");
    setEndDate("");

    const modeledDataResult = fetchModeledDataBreakdown(
      userTrainingData,
      selectedKPI,
      clickedTimeframe,
      "",
      ""
    );

    if (!modeledDataResult) {
      return;
    }

    // Check the dataType to determine how to handle the result
    if (
      modeledDataResult.muscleGroupChartCheck &&
      modeledDataResult?.standardData
    ) {
      setModeledData(modeledDataResult.standardData);
      setMuscleGroupChart(true);
    } else if (
      !modeledDataResult.muscleGroupChartCheck &&
      modeledDataResult?.standardData
    ) {
      setModeledData(modeledDataResult.standardData);
      setMuscleGroupChart(false);
    }
  };

  const overallStatsObj = getOverallStats(userTrainingData);

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newStartDate = event.target.value;

    if (startDate > endDate && startDate !== "" && endDate !== "") {
      //toast.error('The end date has to be later than the starting date!')
    } else {
      setStartDate(newStartDate);

      const modeledDataResult = fetchModeledDataBreakdown(
        userTrainingData,
        selectedKPI,
        selectedTimeframe,
        newStartDate,
        endDate
      );

      if (!modeledDataResult) {
        return;
      }

      // Check the dataType to determine how to handle the result
      if (
        modeledDataResult.muscleGroupChartCheck &&
        modeledDataResult?.standardData
      ) {
        setModeledData(modeledDataResult.standardData);
        setMuscleGroupChart(true);
      } else if (
        !modeledDataResult.muscleGroupChartCheck &&
        modeledDataResult?.standardData
      ) {
        setModeledData(modeledDataResult.standardData);
        setMuscleGroupChart(false);
      }
    }
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newEndDate = event.target.value;
    if (newEndDate <= startDate || startDate === "") {
      //toast.error('The end date has to be later than the starting date!')
    } else {
      setEndDate(newEndDate);

      const modeledDataResult = fetchModeledDataBreakdown(
        userTrainingData,
        selectedKPI,
        selectedTimeframe,
        startDate,
        newEndDate
      );

      if (!modeledDataResult) {
        return;
      }

      // Check the dataType to determine how to handle the result
      if (
        modeledDataResult.muscleGroupChartCheck &&
        modeledDataResult?.standardData
      ) {
        setModeledData(modeledDataResult.standardData);
        setMuscleGroupChart(true);
      } else if (
        !modeledDataResult.muscleGroupChartCheck &&
        modeledDataResult?.standardData
      ) {
        setModeledData(modeledDataResult.standardData);
        setMuscleGroupChart(false);
      }
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

        <Typography variant="subtitle1">Select timeframe ({selectedTimeframe})</Typography>
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
            label={itemSize()==="mobile"?"Start Date":null}
            value={startDate}
            onChange={handleStartDateChange}
          ></TextField>
          <TextField
            type="date"
            fullWidth
            label={itemSize()==="mobile"?"Start Date":null}
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
            <PolarAngleAxis dataKey="exerciseMuscleGroup" fontSize={12} />
            <PolarRadiusAxis
              fontSize={14}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
            />
            <Radar
              dataKey="value"
              stroke="#8884d8"
              fill="#520975"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height="100%" minHeight="500px">
          <Treemap
            width={300}
            height={200}
            data={modeledData}
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            dataKey="value"
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
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
                          ? capitalizeWords(entry.exerciseMuscleGroup)
                          : capitalizeWords(entry.name)}
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

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as TreemapNode; // Cast to your data type
    return (
      <Paper
        className="custom-tooltip"
        style={{
          fontSize: "1rem",
          padding: "4px",
          background: "white",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <p>{`${data.name}: ${data.value}`}</p>
      </Paper>
    );
  }

  return null;
};
