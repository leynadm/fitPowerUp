import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { ChartOptions } from "chart.js";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import calculateVolumePerWorkout from "../../utils/analysisFunctions/calculateVolumePerWorkout";
import calculateSetsPerWorkout from "../../utils/analysisFunctions/calculateSetsPerWorkout";
import calculateRepsPerWorkout from "../../utils/analysisFunctions/calculateRepsPerWorkout";
import calculateRepsPerWeek from "../../utils/analysisFunctions/calculateRepsPerWeek";
import calculateWorkoutsPerWeek from "../../utils/analysisFunctions/calculateWorkoutsPerWeek";
import calculateVolumePerWeek from "../../utils/analysisFunctions/calculateVolumePerWeek";
import calculateSetsPerWeek from "../../utils/analysisFunctions/calculateSetsPerWeek";
import calculateSetsPerMonth from "../../utils/analysisFunctions/calculateSetsPerMonth";
import calculateVolumePerMonth from "../../utils/analysisFunctions/calculateVolumePerMonth";
import calculateRepsPerMonth from "../../utils/analysisFunctions/calculateRepsPerMonth";
import calculateWorkoutsPerMonth from "../../utils/analysisFunctions/calculateWorkoutsPerMonth";
import calculateWorkoutsPerYear from "../../utils/analysisFunctions/calculateWorkoutsPerYear";
import calculateRepsPerYear from "../../utils/analysisFunctions/calculateRepsPerYear";
import calculateVolumePerYear from "../../utils/analysisFunctions/calculateVolumePerYear";
import calculateSetsPerYear from "../../utils/analysisFunctions/calculateSetsPerYear";
import populatePreselectedExercises from "../../utils/CRUDFunctions/populatePreselectedExercises";
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

// Function to call the appropriate chart function based on the selected option and timeframe
const callChartFunction = (
  selectedGraph: string,
  selectedOption: string,
  selectedTimeframe: string,
  setInitialRawData: React.Dispatch<
    React.SetStateAction<ChartData<"line"> | null>
  >,
  chartType:string
) => {
  console.log("inside chart function");
  switch (selectedGraph) {
    case "Volume per Workout":
      calculateVolumePerWorkout(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Sets per Workout":
      calculateSetsPerWorkout(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Reps per Workout":
      calculateRepsPerWorkout(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      
        );
      break;

    case "Reps per Week":
      calculateRepsPerWeek(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Workouts per Week":
      calculateWorkoutsPerWeek(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Volume per Week":
      calculateVolumePerWeek(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Sets per Week":
      calculateSetsPerWeek(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Sets per Month":
      calculateSetsPerMonth(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Volume per Month":
      calculateVolumePerMonth(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Reps per Month":
      calculateRepsPerMonth(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Workouts per Month":
      calculateWorkoutsPerMonth(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Workouts per Year":
      calculateWorkoutsPerYear(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Reps per Year":
      calculateRepsPerYear(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Volume per Year":
      calculateVolumePerYear(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    case "Sets per Year":
      calculateSetsPerYear(
        selectedGraph,
        selectedOption,
        selectedTimeframe,
        setInitialRawData,
        "category"
      );
      break;

    default:
      break;
  }
};

function CategoryAnalysis() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m"); // Initial timeframe is set to 1 month
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedGraph, setSelectedGraph] = useState("Volume per Workout"); // Initial graph is set to Volume per Workout

  const [initialRawData, setInitialRawData] =
    useState<ChartData<"line"> | null>(null);

  const [exercisesCategories, setExercisesCategories] = useState(["All"]);

  const timeframeOptions = [
    { label: "1m", value: "1m" },
    { label: "3m", value: "3m" },
    { label: "6m", value: "6m" },
    { label: "1y", value: "1y" },
    { label: "All", value: "all" },
  ];

  useEffect(() => {
    populatePreselectedExercises(setExercisesCategories);

    // Call the chart function when the selected exercise changes or the timeframe changes
    callChartFunction(
      selectedGraph,
      selectedOption,
      selectedTimeframe,
      setInitialRawData,
      "category"
    );
  }, [selectedTimeframe, selectedOption]);


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
          maxTicksLimit: 8, // Maximum number of visible tick labels
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
            size: 12, // y-axis tick font size
            weight: "bold", // y-axis tick font weight
          },
          maxTicksLimit: 8, // Maximum number of visible tick labels
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
 
  return (
    <Container sx={{ display: "flex", flexDirection: "column",alignItems:"center",padding:0 }}>
      
      <FormControl sx={{ width: "100%", marginTop: "8px" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Category Filter
        </InputLabel>

        <Select
          label="Category Filter"
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedOption}
          onChange={(event) => {
            const selectedOption = event.target.value;
            setSelectedOption(selectedOption);
            console.log("calling call chart function now:");
            callChartFunction(
              selectedGraph,
              selectedOption,
              selectedTimeframe,
              setInitialRawData,
              "category"
            );
          }}
        >
          {exercisesCategories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "100%", marginTop: "8px" }}>
        <InputLabel htmlFor="grouped-select">Graph</InputLabel>
        <Select
          defaultValue="Volume per Workout"
          id="grouped-select"
          label="Grouping"
          onChange={(event) => {
            const selectedGraph = event.target.value;
            setSelectedGraph(selectedGraph);
            callChartFunction(
              selectedGraph,
              selectedOption,
              selectedTimeframe,
              setInitialRawData,
              "category"
            );
          }}
        >
          <ListSubheader>Workout Graphs</ListSubheader>
          <MenuItem value={"Volume per Workout"}>Volume per Workout</MenuItem>
          <MenuItem value={"Sets per Workout"}>Sets per Workout</MenuItem>
          <MenuItem value={"Reps per Workout"}>Reps per Workout</MenuItem>
          <ListSubheader>Weekly Graphs</ListSubheader>
          <MenuItem value={"Workouts per Week"}>Workouts per Week</MenuItem>
          <MenuItem value={"Volume per Week"}>Volume per Week</MenuItem>
          <MenuItem value={"Sets per Week"}>Sets per Week</MenuItem>
          <MenuItem value={"Reps per Week"}>Reps per Week</MenuItem>
          <ListSubheader>Monthly Graphs</ListSubheader>
          <MenuItem value={"Workouts per Month"}>Workouts per Month</MenuItem>
          <MenuItem value={"Volume per Month"}>Volume per Month</MenuItem>
          <MenuItem value={"Sets per Month"}>Sets per Month</MenuItem>
          <MenuItem value={"Reps per Month"}>Reps per Month</MenuItem>=
          <ListSubheader>Yearly Graphs</ListSubheader>
          <MenuItem value={"Workouts per Year"}>Workouts per Year</MenuItem>
          <MenuItem value={"Volume per Year"}>Volume per Year</MenuItem>
          <MenuItem value={"Sets per Year"}>Sets per Year</MenuItem>
          <MenuItem value={"Reps per Year"} sx={{ marginBottom: "56px" }}>
            Reps per Year
          </MenuItem>
        </Select>
      </FormControl>

      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
        sx={{ width: "100%", display: "flex", padding: "8px" }}
      >
        {timeframeOptions.map((option) => (
          <Button
            key={option.label}
            style={{ flexGrow: 1, fontWeight: "bolder" }}
            onClick={() => {
              setSelectedTimeframe(option.value); // Update selected timeframe
              callChartFunction(
                selectedGraph,
                selectedOption,
                option.value,
                setInitialRawData,
                "category"
              ); // Call chart function with updated timeframe
            }}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 328.5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        {initialRawData ? (
          initialRawData.labels && initialRawData.labels.length === 0 ? (
            <Typography>No data available.</Typography>
          ) : (
            <Line data={initialRawData} options={options as any} />
          )
        ) : null}
      </Box>
    </Container>
  );
}

export default CategoryAnalysis;
