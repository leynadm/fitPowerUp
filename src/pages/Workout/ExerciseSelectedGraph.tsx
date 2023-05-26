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

// Function to call the appropriate chart function based on the selected option
const callChartFunction = (
  selectedOption: string,
  setInitialRawData: React.Dispatch<React.SetStateAction<ChartData<"line"> | null>>,
  selectedExercise: { category: string; name: string; measurement: any[] },
) => {
  switch (selectedOption) {
    case "Max Weight":
      getMaxWeight(setInitialRawData, selectedExercise);
      break;
    case "Max Reps":
      getMaxReps(setInitialRawData, selectedExercise);
      break;
    case "Max Volume":
      getMaxVolume(setInitialRawData, selectedExercise);
      break;
    case "Estimated 1RM":
      getMax1RM(setInitialRawData, selectedExercise);
      break;
    case "Workout Reps":
      getTotalReps(setInitialRawData, selectedExercise);
      break;
    case "Workout Volume":
      getTotalVolume(setInitialRawData, selectedExercise);
      break;
    case "Max Weight for Reps":
      getMaxWeightForReps(setInitialRawData, selectedExercise, [5, 8, 12]);
      break;
    default:
      break;
  }
};

function ExerciseSelectedGraph({ selectedExercise }: ParentComponentProps) {
  const [initialRawData, setInitialRawData] = useState<ChartData<"line"> | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m"); // Initial timeframe is set to 1 month
  useEffect(() => {
    callChartFunction("Max Weight", setInitialRawData,  selectedExercise);
  }, [selectedExercise]);

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
    { label: "Workout Reps" },
    { label: "Personal Records" },
  ];

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
            callChartFunction(selectedOption, setInitialRawData, selectedExercise);
          }
        }}
        renderInput={(params) => <TextField {...params} label="Graph" />}
      />
      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
        sx={{ width: "100%", display: "flex", padding: "8px" }}
      >
        <Button style={{ flexGrow: 1, fontWeight: "bolder" }}>1m</Button>
        <Button style={{ flexGrow: 1, fontWeight: "bolder" }}>3m</Button>
        <Button style={{ flexGrow: 1, fontWeight: "bolder" }}>6m</Button>
        <Button style={{ flexGrow: 1, fontWeight: "bolder" }}>1y</Button>
        <Button style={{ flexGrow: 1, fontWeight: "bolder" }}>All</Button>
      </ButtonGroup>
      <Box sx={{ width: "100%", height: "100%" }}>
        {initialRawData && <Line data={initialRawData} />}
      </Box>
    </Box>
  );
}

export default ExerciseSelectedGraph;
