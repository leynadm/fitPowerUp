import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";


import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ChartData, ArcElement } from "chart.js";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Doughnut } from "react-chartjs-2";
import calculateRepsByCategory from "../../utils/analysisFunctions/Breakdown/calculateRepsByCategory";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Paper from "@mui/material/Paper";

import calculateSetsByCategory from "../../utils/analysisFunctions/Breakdown/calculateSetsByCategory";
import calculateWorkoutsByCategory from "../../utils/analysisFunctions/Breakdown/calculateWorkoutsByCategory";
import calculateTrainingVolumeByCategory from "../../utils/analysisFunctions/Breakdown/calculateTrainingVolumeByCategory";
import calculateRepsByExercise from "../../utils/analysisFunctions/Breakdown/calculateRepsByExercise";
import calculateSetsByExercise from "../../utils/analysisFunctions/Breakdown/calculateSetsByExercise";
import calculateTrainingVolumeByExercise from "../../utils/analysisFunctions/Breakdown/calculateTrainingVolumeByExercise";
import calculateWorkoutsByExercise from "../../utils/analysisFunctions/Breakdown/calculateWorkoutsByExercise";
import calculateTotalTrainingVolume from "../../utils/analysisFunctions/Breakdown/calculateTotalTrainingVolume";
import calculateTotalTrainingReps from "../../utils/analysisFunctions/Breakdown/calculateTotalTrainingReps";
import calculateTotalTrainingSets from "../../utils/analysisFunctions/Breakdown/calculateTotalTrainingSets";
import calculateTotalTrainingWorkouts from "../../utils/analysisFunctions/Breakdown/calculateTotalWorkouts";
import { styled } from '@mui/material/styles';

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
);

// Function to call the appropriate chart function based on the selected option and timeframe
const callChartFunction = (
  setInitialRawData: React.Dispatch<
    React.SetStateAction<ChartData<"doughnut"> | null>
  >,
  selectedGraph: string,
  selectedTimeframe: string,
  selectedStartDate: any,
  selectedEndDate: any
) => {
  console.log("logging the selected graph");
  console.log({ selectedGraph });
  switch (selectedGraph) {
    case "Number of Sets by Category":
      console.log("calculating Sets By Category");
      calculateSetsByCategory(
        setInitialRawData,
        selectedTimeframe,
        selectedStartDate,
        selectedEndDate
      );

      break;

    case "Number of Reps by Category":
      console.log("calculating Sets By Category");
      calculateRepsByCategory(
        setInitialRawData,
        selectedTimeframe,
        selectedStartDate,
        selectedEndDate
      );

      break;

    case "Number of Workouts by Category":
      console.log("calculating Sets By Category");
      calculateWorkoutsByCategory(
        setInitialRawData,
        selectedTimeframe,
        selectedStartDate,
        selectedEndDate
      );

      break;

    case "Training Volume by Category":
        console.log('logging training volume by category:')
      calculateTrainingVolumeByCategory(
        setInitialRawData,
        selectedTimeframe,
        selectedStartDate,
        selectedEndDate
      );

      break;


      case "Number of Reps by Exercise":
        console.log("calculating Sets By Category");
        calculateRepsByExercise(
          setInitialRawData,
          selectedTimeframe,
          selectedStartDate,
          selectedEndDate
        );
  
        break;
  
        case "Number of Sets by Exercise":
            console.log("calculating Sets By Category");
            calculateSetsByExercise(
              setInitialRawData,
              selectedTimeframe,
              selectedStartDate,
              selectedEndDate
            );
      
            break;

            case "Training Volume by Exercise":
                console.log('logging training volume by category:')
              calculateTrainingVolumeByExercise(
                setInitialRawData,
                selectedTimeframe,
                selectedStartDate,
                selectedEndDate
              );
        
              break;

              case "Number of Workouts by Exercise":
                console.log("calculating Sets By Category");
                calculateWorkoutsByExercise(
                  setInitialRawData,
                  selectedTimeframe,
                  selectedStartDate,
                  selectedEndDate
                );
          
                break;
    default:
      break;
  }
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

function BreakdownAnalysis() {

  const [selectedStartDate, setselectedStartDate] =
    useState<dayjs.Dayjs | null>(null);
  const [selectedEndDate, setselectedEndDate] = useState<dayjs.Dayjs | null>(
    null
  );

  const [selectedTimeframe, setSelectedTimeframe] = useState("1m"); // Initial timeframe is set to 1 month
  const [totalTrainingVolume, setTotalTrainingVolume] = useState(0)
  const [totalTrainingReps, setTotalTrainingReps] = useState(0)
  const [totalTrainingSets, setTotalTrainingSets] = useState(0)
  const [totalTrainingWorkouts, setTotalTrainingWorkouts] = useState(0)
  const [selectedGraph, setSelectedGraph] = useState(
    "Number of Sets by Category"
  ); // Initial graph is set to Volume per Workout

  const [initialRawData, setInitialRawData] =
    useState<ChartData<"doughnut"> | null>(null);

  const timeframeOptions = [
    { label: "1m", value: "1m" },
    { label: "3m", value: "3m" },
    { label: "6m", value: "6m" },
    { label: "1y", value: "1y" },
    { label: "All", value: "all" },
  ];

  useEffect(()=>{
  },[])

  useEffect(() => {
    calculateTotalTrainingVolume(setTotalTrainingVolume,selectedTimeframe,selectedStartDate,selectedEndDate)
    calculateTotalTrainingReps(setTotalTrainingReps,selectedTimeframe,selectedStartDate,selectedEndDate)
    calculateTotalTrainingSets(setTotalTrainingSets,selectedTimeframe,selectedStartDate,selectedEndDate)
    calculateTotalTrainingWorkouts(setTotalTrainingWorkouts,selectedTimeframe,selectedStartDate,selectedEndDate)
    
    callChartFunction(
      setInitialRawData,
      selectedGraph,
      selectedTimeframe,
      selectedStartDate,
      selectedEndDate
    );
  }, [selectedTimeframe, selectedGraph, selectedStartDate, selectedEndDate]);

  

  useEffect(() => {
    console.log("logging start date and end date:");
    console.log({ selectedStartDate });
    console.log({ selectedEndDate });
  }, [selectedStartDate, selectedEndDate]);

  /* 
  const options = {
    plugins: {src/utils/analysisFunctions/Breakdown/calculateWorkoutsByCategory.tsx
   
    },
  
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    options:{
        plugins:[ChartDataLabels]
    }

  };

   */

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    /* 
    plugins: {        
      legend: {
        display: true, // Hide the legend
      },
      datalabels:{
        color:"black",
        font: {
            weight: 'bold', // Customize label font weight
          },
      },

    }, */
    elements: {
      // ...
      arc: {
        borderWidth: 0, // Remove border around arcs
      },
    },
    cutout: "65%", // Adjust the size of the inner circle
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column",alignItems:"center",padding:0,backgroundColor:"#F0F2F5" }}>
      <FormControl sx={{ width: "100%", marginTop: "8px" }}>
        <InputLabel htmlFor="grouped-select">Breakdown</InputLabel>
        <Select
          defaultValue="Number of Sets by Category"
          id="grouped-select"
          label="Grouping"
          onChange={(event) => {
            const selectedGraph = event.target.value;
            setSelectedGraph(selectedGraph);
            callChartFunction(
              setInitialRawData,
              selectedGraph,
              selectedTimeframe,
              selectedStartDate,
              selectedEndDate
            );
          }}
        >
          <ListSubheader>Category Breakdown</ListSubheader>
          <MenuItem value={"Number of Sets by Category"}>
            Number of Sets
          </MenuItem>
          <MenuItem value={"Number of Reps by Category"}>
            Number of Reps
          </MenuItem>
          <MenuItem value={"Number of Workouts by Category"}>
            Number of Workouts
          </MenuItem>
          <MenuItem value={"Training Volume by Category"}>
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
              setselectedStartDate(null);
              setselectedEndDate(null);
              setSelectedTimeframe(option.value); // Update selected timeframe
              callChartFunction(
                setInitialRawData,
                selectedGraph,
                selectedTimeframe,
                selectedStartDate,
                selectedEndDate
              ); // Call chart function with updated timeframe
            }}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>

      <Box sx={{ display: "flex",width:"100%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedStartDate}
            onChange={(date) => setselectedStartDate(date)}
            sx={{ width: "100%" }}
          />
          <DatePicker
            value={selectedEndDate}
            onChange={(date) => setselectedEndDate(date)}
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        {initialRawData ? (
          initialRawData.labels && initialRawData.labels.length === 0 ? (
            <Typography sx={{paddingTop:"8px"}}>No data available.</Typography>
          ) : (
            <div style={{ width: "100%", height: "100%" }}>
              <Doughnut data={initialRawData} options={options} />
            </div>
          )
        ) : null}
      </Box>

      <Box sx={{width:"100%"}}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead></TableHead>
            <TableBody>
              {initialRawData &&
                initialRawData.labels &&
                initialRawData.labels
                  .map((label: any, index: number) => ({
                    label,
                    value: initialRawData.datasets[0].data[index],
                  }))
                  .sort((a, b) => b.value - a.value) // Sort the array by value in descending order
                  .map(({ label, value }) => {
                    const total = initialRawData.datasets[0].data.reduce(
                      (acc: number, curr: number) => acc + curr,
                      0
                    );
                    const percentage = (value / total) * 100;

                    return (
                      <TableRow key={label}>
                        <TableCell align="left">{label}</TableCell>
                        <TableCell align="center">{value.toLocaleString()}</TableCell>
                        <TableCell align="center">
                          {percentage.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 2,
          margin: "16px",
          width:"100%",
          paddingBottom:"56px"
        }}
      >
        <Item>
          <Typography>Total Workouts</Typography>
          <Typography>{totalTrainingWorkouts}</Typography>
        </Item>
        <Item>
          <Typography>Total Sets</Typography>
          <Typography>{totalTrainingSets.toLocaleString()}</Typography>
        </Item>
        <Item>
          <Typography>Total Reps</Typography>
          <Typography>{totalTrainingReps.toLocaleString()}</Typography>
        </Item>
        <Item>
          <Typography>Total Volume</Typography>
          <Typography>{totalTrainingVolume.toLocaleString()}</Typography>
        </Item>
      </Box>
    </Container>
  );
}

export default BreakdownAnalysis;
