import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { ChartOptions } from "chart.js";
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import getBodyTrackerKPIValues from "../../utils/chartFunctions/getBodyTrackerKPIValues";
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
  setInitialRawData: React.Dispatch<
    React.SetStateAction<ChartData<"line"> | null>
  >
) => {
  switch (selectedOption) {
    case "Bodyweight":
      getBodyTrackerKPIValues("Bodyweight", selectedTimeframe, setInitialRawData);
      break;
    case "Body Fat":
      getBodyTrackerKPIValues("Body Fat", selectedTimeframe, setInitialRawData);
      break;

    default:
      break;
  }
};

function BodyTrackerGraph() {
  const measurementOptions = [{ label: "Bodyweight" }, { label: "Body Fat" }];
  const [selectedMeasurement, setSelectedMeasurement] = useState<{
    label: string;
  }>(measurementOptions[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m"); // Initial timeframe is set to 1 month
  const [selectedOption, setSelectedOption] = useState(
    measurementOptions[0].label
  );

  const [initialRawData, setInitialRawData] =
    useState<ChartData<"line"> | null>(null);

  const timeframeOptions = [
    { label: "1m", value: "1m" },
    { label: "3m", value: "3m" },
    { label: "6m", value: "6m" },
    { label: "1y", value: "1y" },
    { label: "All", value: "all" },
  ];

  useEffect(() => {
    // Call the chart function when the selected exercise changes or the timeframe changes
    callChartFunction(
      selectedOption,
      selectedTimeframe,
      setInitialRawData,
    );
    console.log('loading second use effect')
  }, [selectedTimeframe, selectedOption]);

  useEffect(() => {
    console.log("logging initial Raw Data");
    console.log(initialRawData);
    console.log('loading third use effect')
  }, [initialRawData]);

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
            size: 12, // y-axis tick font size
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

  return (
    <Box>

<Select

  id="combo-box-demo"
  value={selectedOption}
  onChange={(event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
    callChartFunction(
      selectedOption,
      selectedTimeframe,
      setInitialRawData
    );
  }}
  sx={{
    width: "100%",
    marginTop: "16px", 
  }}
>
  {measurementOptions.map((option) => (
    <MenuItem key={option.label} value={option.label}>
      {option.label}
    </MenuItem>
  ))}
</Select>

{/* 

 
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={measurementOptions}

        value={{ label: selectedOption }}
        defaultValue={{ label: selectedOption }}
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
            setSelectedOption(selectedOption); // Update selecteed option
            callChartFunction(
              selectedOption,
              selectedTimeframe,
              setInitialRawData
            );
          }
        }}
        renderInput={(params) => <TextField {...params} label="Graph" />}
      />
  */}

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
        callChartFunction(selectedOption, option.value, setInitialRawData); // Call chart function with updated timeframe
      }}
    >
      {option.label}
    </Button>
  ))}
</ButtonGroup>
      <Box
        sx={{
          width: "100vw",
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
    </Box>
  );
}

export default BodyTrackerGraph;
