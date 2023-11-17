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
import Container from "@mui/material/Container";
import { useContext } from "react";
import { TrainingDataContext } from "../../context/TrainingData";
import { IUserBodyTrackerDataEntry } from "../../context/TrainingData";
import { Select, MenuItem } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { timeframeOptions } from "../../utils/completedWorkoutsChartFunctions/statisticsOptions";
import { useState } from "react";
import {
  statisticsOptionsBodyTracker,
  intervalOptions,
} from "../../utils/completedWorkoutsChartFunctions/statisticsOptions";

function BodyTrackerGraph() {
  const { userBodyTrackerData } = useContext(TrainingDataContext);

  const [selectedDataGroup, setSelectedDataGroup] = useState("day");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");

  const userBodyTrackerDataArr = userBodyTrackerData[0].bodyTrackerData;

  userBodyTrackerDataArr.sort(
    (a: IUserBodyTrackerDataEntry, b: IUserBodyTrackerDataEntry) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB.getTime() - dateA.getTime();
    }
  );

  const handleStandardTimeframeChange = (option: any) => {
    const clickedTimeframe = option;
    setSelectedTimeframe(clickedTimeframe); // Update the selected timeframe

    //setModeledData(fetchModeledData(userTrainingData, selectedMuscleGroup, selectedKPI, clickedTimeframe, selectedDataGroup));
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
          /* 
          onChange={handleMuscleGroupSelectChange}
          value={selectedMuscleGroup}
         */
        >
          {/* 
          {exercisesMuscleGroupsArr &&
            exercisesMuscleGroupsArr.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))} */}
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
          height={400}
          data={userBodyTrackerDataArr}
          margin={{
            top: 10,
            bottom: 1,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" scale="band" />
          <YAxis
            fontSize={12}
            yAxisId="left"
            type="number"
            dataKey="weight"
            name="weight"
            unit="kg"
            stroke="#8884d8"
          />
          <YAxis
            fontSize={12}
            yAxisId="right"
            type="number"
            dataKey="caloricIntake"
            name="caloricIntake"
            stroke="#8884d8"
            orientation="right"
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
            yAxisId="left"
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="caloricIntake"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default BodyTrackerGraph;
