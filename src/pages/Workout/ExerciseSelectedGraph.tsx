import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import getMaxWeight from "../../utils/chartFunctions/getMaxWeight";
import getMaxReps from "../../utils/chartFunctions/getMaxReps";
import getMaxVolume from "../../utils/chartFunctions/getMaxVolume";
import getMax1RM from "../../utils/chartFunctions/getMax1RM";
import getTotalReps from "../../utils/chartFunctions/getTotalReps";
import getTotalVolume from "../../utils/chartFunctions/getTotalVolume";
import getMaxWeightForReps from "../../utils/chartFunctions/getMaxWeightForReps";
import getMaxDistance from "../../utils/chartFunctions/getMaxDistance";
import getTotalDistance from "../../utils/chartFunctions/getTotalDistance";
import getMaxTime from "../../utils/chartFunctions/getMaxTime";
import getTotalTime from "../../utils/chartFunctions/getTotalTime";
import getMaxSpeed from "../../utils/chartFunctions/getMaxSpeed";
import getMaxPace from "../../utils/chartFunctions/getMaxPace";
import { ChartOptions } from "chart.js";
import { Select, MenuItem } from "@mui/material";
import Container from "@mui/material/Container";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

interface ParentComponentProps {
  selectedExercise: { category: string; name: string; measurement: any[] };
}

// Function to call the appropriate chart function based on the selected option and timeframe
const callChartFunction = (
  selectedOption: string,
  selectedTimeframe: string,
  setInitialRawData: React.Dispatch<
    React.SetStateAction<ChartData<"line"> | null>
  >,
  selectedExercise: { category: string; name: string; measurement: any[] }
) => {
  switch (selectedOption) {
    case "Max Weight":
      getMaxWeight(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    case "Max Reps":
      getMaxReps(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    case "Max Volume":
      getMaxVolume(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    case "Estimated 1RM":
      getMax1RM(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    case "Workout Reps":
      getTotalReps(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    case "Workout Volume":
      getTotalVolume(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    case "Max Weight for Reps":
      getMaxWeightForReps(
        setInitialRawData,
        selectedExercise,
        [8, 10, 12],
        selectedTimeframe
      );
      break;
    case "Max Distance":
      getMaxDistance(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    case "Workout Distance":
      getTotalDistance(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    case "Max Time":
      getMaxTime(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    case "Workout Time":
      getTotalTime(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    case "Max Speed":
      getMaxSpeed(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    case "Max Pace":
      getMaxPace(setInitialRawData, selectedExercise, selectedTimeframe);
      break;
    default:
      break;
  }
};

interface IStatisticsOption {
  label: string;
}

interface CustomInputProps {
  label: string;
}

function ExerciseSelectedGraph({ selectedExercise }: ParentComponentProps) {
  const [initialRawData, setInitialRawData] =
    useState<ChartData<"line"> | null>(null);
  const [selectedOption, setSelectedOption] = useState(() => {
    if (
      selectedExercise.measurement.includes("weight") &&
      selectedExercise.measurement.includes("reps")
    ) {
      return "Estimated 1RM";
    } else if (
      selectedExercise.measurement.includes("weight") &&
      selectedExercise.measurement.includes("distance")
    ) {
      return "Max Weight";
    } else if (
      selectedExercise.measurement.includes("weight") &&
      selectedExercise.measurement.includes("time")
    ) {
      return "Max Weight";
    } else if (
      selectedExercise.measurement.includes("reps") &&
      selectedExercise.measurement.includes("distance")
    ) {
      return "Max Reps";
    } else if (
      selectedExercise.measurement.includes("reps") &&
      selectedExercise.measurement.includes("time")
    ) {
      return "Max Reps";
    } else if (
      selectedExercise.measurement.includes("distance") &&
      selectedExercise.measurement.includes("time")
    ) {
      return "Max Distance";
    } else if (selectedExercise.measurement.includes("weight")) {
      return "Max Weight";
    } else if (selectedExercise.measurement.includes("reps")) {
      return "Max Reps";
    } else if (selectedExercise.measurement.includes("distance")) {
      return "Max Distance";
    } else if (selectedExercise.measurement.includes("time")) {
      return "Max Time";
    } else {
      return "Estimated 1RM"; // Default value if no conditions match
    }
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState("1m"); // Initial timeframe is set to 1 month
  const [statisticsOptionsToUse, setStatisticsOptionsToUse] = useState<
    IStatisticsOption[]
  >([]);
  const [defaultOptionToLoad, setDefaultOptionToLoad] = useState<{
    label: string;
  }>({ label: "Estimated 1RM" });
  const textFieldRef = useRef(null); // Refer

  useEffect(() => {
    if (
      selectedExercise.measurement.includes("weight") &&
      selectedExercise.measurement.includes("reps")
    ) {
      setStatisticsOptionsToUse(statisticsOptions);
      setDefaultOptionToLoad({ label: "Estimated 1RM" });
    } else if (
      selectedExercise.measurement.includes("weight") &&
      selectedExercise.measurement.includes("distance")
    ) {
      setStatisticsOptionsToUse(statisticsOptionsWeightAndDistance);
      setDefaultOptionToLoad({ label: "Max Weight" });
    } else if (
      selectedExercise.measurement.includes("weight") &&
      selectedExercise.measurement.includes("time")
    ) {
      setStatisticsOptionsToUse(statisticsOptionsWeightAndTime);
    } else if (
      selectedExercise.measurement.includes("reps") &&
      selectedExercise.measurement.includes("distance")
    ) {
      setStatisticsOptionsToUse(statisticsOptionsRepsAndDistance);
    } else if (
      selectedExercise.measurement.includes("reps") &&
      selectedExercise.measurement.includes("time")
    ) {
      setStatisticsOptionsToUse(statisticsOptionsRepsAndTime);
    } else if (
      selectedExercise.measurement.includes("distance") &&
      selectedExercise.measurement.includes("time")
    ) {
      setStatisticsOptionsToUse(statisticsOptionsDistanceAndTime);
    } else if (selectedExercise.measurement.includes("weight")) {
      setStatisticsOptionsToUse(statisticsOptionsWeight);
    } else if (selectedExercise.measurement.includes("reps")) {
      setStatisticsOptionsToUse(statisticsOptionsReps);
    } else if (selectedExercise.measurement.includes("distance")) {
      setStatisticsOptionsToUse(statisticsOptionsDistance);
    } else if (selectedExercise.measurement.includes("time")) {
      setStatisticsOptionsToUse(statisticsOptionsTime);
    }

  }, []);

  useEffect(() => {
    // Call the chart function when the selected exercise changes or the timeframe changes
    callChartFunction(
      selectedOption,
      selectedTimeframe,
      setInitialRawData,
      selectedExercise
    );

  }, [selectedExercise, selectedTimeframe, selectedOption]);

  useEffect(() => {

  }, [initialRawData]);

  const statisticsOptions = [
    { label: "Estimated 1RM" },
    { label: "Max Weight" },
    { label: "Max Reps" },
    { label: "Max Volume" },
    { label: "Max Weight for Reps" },
    { label: "Workout Volume" },
    { label: "Workout Reps" },
  ];

  const statisticsOptionsReps = [
    { label: "Max Reps" },
    { label: "Workout Reps" },
  ];

  const statisticsOptionsWeight = [{ label: "Max Weight" }];

  const statisticsOptionsDistance = [
    { label: "Max Distance" },
    { label: "Workout Distance" },
  ];

  const statisticsOptionsTime = [
    { label: "Max Time" },
    { label: "Workout Time" },
  ];

  const statisticsOptionsWeightAndDistance = [
    { label: "Max Weight" },
    { label: "Max Distance" },
    { label: "Workout Distance" },
  ];

  const statisticsOptionsWeightAndTime = [
    { label: "Max Weight" },
    { label: "Max Time" },
    { label: "Workout Time" },
  ];

  const statisticsOptionsRepsAndDistance = [
    { label: "Max Reps" },
    { label: "Max Distance" },
    { label: "Workout Reps" },
    { label: "Workout Distance" },
  ];

  const statisticsOptionsRepsAndTime = [
    { label: "Max Reps" },
    { label: "Max Time" },
    { label: "Workout Reps" },
    { label: "Workout Time" },
  ];

  const statisticsOptionsDistanceAndTime = [
    { label: "Max Distance" },
    { label: "Max Time" },
    { label: "Max Speed" },
    { label: "Max Pace" },
    { label: "Workout Distance" },
    { label: "Workout Time" },
  ];

  const timeframeOptions = [
    { label: "1m", value: "1m" },
    { label: "3m", value: "3m" },
    { label: "6m", value: "6m" },
    { label: "1y", value: "1y" },
    { label: "All", value: "all" },
  ];

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Hide the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis gridlines
        },
        ticks: {
          color: "#999999", // x-axis tick color
          stepSize: 8, // Show every 5th label
          font: {
            size: 12, // x-axis tick font size
            weight: "bold", // x-axis tick font weight
          },
          autoSkip: true, // Enable automatic skipping of labels
          maxTicksLimit: 10, // Maximum number of visible tick labels
        },
      },
      y: {
        grid: {
          color: "#dddddd", // y-axis gridline color
        },
        ticks: {
          color: "#999999", // y-axis tick color
          stepSize: 8,
          font: {
            size: 10, // y-axis tick font size
            weight: "bold", // y-axis tick font weight
          },
          maxTicksLimit: 10, // Maximum number of visible tick labels
          autoSkip: true,
        },
      },
    },
    elements: {
      point: {
        radius: 3, // Hide data points
      },
      line: {
        tension: 0.2, // Adjust the curve of the lines
        borderWidth: 2, // Increase line width
        borderColor: "rgba(63,81,181,1)", // Line color
        backgroundColor: "rgba(63,81,181,0.2)", // Area under line color
      },
    },
    interaction: {
      mode: "index", // Display tooltip for the nearest data point
      intersect: false, // Allow hovering over multiple data points
    },
    animation: {
      duration: 500, // Animation duration in milliseconds
    },
  };

  const handleChange = (event: any) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
    callChartFunction(
      selectedOption,
      selectedTimeframe,
      setInitialRawData,
      selectedExercise
    );
  };

  return (
    <Container sx={{ width: "100%", height: "100%" }}>
      <Select
        value={selectedOption}
        onChange={(event) => {
          const selectedOption = event.target.value;
          setSelectedOption(selectedOption);
          callChartFunction(
            selectedOption,
            selectedTimeframe,
            setInitialRawData,
            selectedExercise
          );
        }}
        sx={{
          width: "100%",
          marginTop: "16px",
        }}
      >
        {statisticsOptionsToUse.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
        sx={{ width: "100%", display: "flex", padding: "8px" }}
      >
        {timeframeOptions.map((option) => (
          <Button
            key={option.label}
            style={{ flexGrow: 1, fontWeight: "bolder" }}
            onClick={() => setSelectedTimeframe(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 270.5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {initialRawData ? (
          initialRawData.labels && initialRawData.labels.length === 0 ? (
            <Typography>No data for this exercise yet.</Typography>
          ) : (
            <Line data={initialRawData} options={options as any} />
          )
        ) : null}
      </Box>
    </Container>
  );
}

export default ExerciseSelectedGraph;
