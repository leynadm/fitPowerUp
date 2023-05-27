import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
import { ChartOptions } from "chart.js";
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

interface DataItem {
  date: Date;
  weight: number;
}

interface ParentComponentProps {
  selectedExercise: { category: string; name: string; measurement: any[] };
}

declare namespace Chart {
  interface ChartTooltipItem {
    datasetIndex?: number;
    index?: number;
    xLabel?: string;
    yLabel?: string;
  }

  interface ChartData {
    labels?: string[] | string[][];
    datasets?: ChartDataSets[];
  }

  interface ChartDataSets {
    label?: string;
    data?: number[] | ChartPoint[];
    // ...
  }

  interface ChartPoint {
    x?: number | string | Date;
    y?: number | string | Date;
    // ...
  }
}

// Function to call the appropriate chart function based on the selected option and timeframe
const callChartFunction = (
  selectedOption: string,
  selectedTimeframe: string,
  setInitialRawData: React.Dispatch<React.SetStateAction<ChartData<"line"> | null>>,
  selectedExercise: { category: string; name: string; measurement: any[] },
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
      getMaxWeightForReps(setInitialRawData, selectedExercise, [8, 10, 12], selectedTimeframe);
      break;
    default:
      break;
  }
};

function ExerciseSelectedGraph({ selectedExercise }: ParentComponentProps) {
  const [initialRawData, setInitialRawData] = useState<ChartData<"line"> | null>(null);
  const [selectedOption, setSelectedOption] = useState("Estimated 1RM"); // Initial selected option
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m"); // Initial timeframe is set to 1 month

  useEffect(() => {
    // Call the chart function when the selected exercise changes or the timeframe changes
    callChartFunction(selectedOption, selectedTimeframe, setInitialRawData, selectedExercise);
  }, [selectedExercise, selectedTimeframe, selectedOption]);

  useEffect(() => {
    console.log("logging initial Raw Data");
    console.log(initialRawData);
  }, [initialRawData]);

  const statisticsOptions = [
    { label: "Estimated 1RM" },
    { label: "Max Weight" },
    { label: "Max Reps" },
    { label: "Max Volume" },
    { label: "Max Weight for Reps" },
    { label: "Workout Volume" },
    { label: "Workout Reps" }
  ];

  const timeframeOptions = [
    { label: "1m", value: "1m" },
    { label: "3m", value: "3m" },
    { label: "6m", value: "6m" },
    { label: "1y", value: "1y" },
    { label: "All", value: "all" },
  ];
/* 
  const chartOptions = {
    // Other chart options...

    tooltips: {
      callbacks: {
        // Customize the tooltip label
        label: function (tooltipItem: any, data: Chart.ChartData) {
          const dataset = data.datasets?.[tooltipItem.datasetIndex];
          const label = dataset?.label || "";
          const value = tooltipItem.yLabel;

          return `${label}: ${value}`;
        },
      },
    },
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }; 

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
      elements:{
        line:{
          borderWidth:3
        }
      }
    },
  };*/

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis gridlines
        },
        ticks: {
          color: "#999999", // x-axis tick color
          stepSize: 5, // Show every 5th label
          font: {
            size: 12, // x-axis tick font size
            weight: "bold", // x-axis tick font weight
          },
          autoSkip: true, // Enable automatic skipping of labels
          maxTicksLimit: 5, // Maximum number of visible tick labels
        },
      },
      y: {
        grid: {
          color: "#dddddd", // y-axis gridline color
        },
        ticks: {
          color: "#999999", // y-axis tick color
          stepSize: 3,
          font: {
            size: 12, // y-axis tick font size
            weight: "bold", // y-axis tick font weight
          },
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
    <Box sx={{ width: "100%", height: "100%" }}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={statisticsOptions}
        defaultValue={statisticsOptions[0]}
        getOptionLabel={(option) => option.label}
        disableClearable
        isOptionEqualToValue={(option, value) => option.label === value.label} // Customize the equality test
        sx={{
          width: "100%",
          paddingTop: "16px",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
        onChange={(event, value) => {
          if (value) {
            const selectedOption = value.label;
            setSelectedOption(selectedOption); // Update selected option
            callChartFunction(selectedOption, selectedTimeframe, setInitialRawData, selectedExercise);
          }
        }}
        renderInput={(params) => <TextField {...params} label="Graph" />}
      />
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
      <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
        {initialRawData && <Line data={initialRawData} options={options as any}  />}
        {/* options={chartOptions} */}
      </Box>
    </Box>
  );
}

export default ExerciseSelectedGraph;