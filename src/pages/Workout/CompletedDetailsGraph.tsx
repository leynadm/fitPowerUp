import { useParams } from "react-router-dom";
import { useContext } from "react";
import { TrainingDataContext } from "../../context/TrainingData";
import Container from "@mui/material/Container";
import { Select, MenuItem, TextField } from "@mui/material";
import { IUserSelectedExercises } from "../../context/TrainingData";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from "@mui/material/Button";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/completeWorkout";
import Exercise from "../../utils/interfaces/Exercise";
import { format, getISOWeek, parseISO } from 'date-fns';

function CompletedDetailsGraph() {
  const { exerciseName } = useParams();
  const { userTrainingData, userSelectedExercises, dateForWorkout } =
    useContext(TrainingDataContext);

  const exerciseSelected = userSelectedExercises[0].exercises.find(
    (exercise: IUserSelectedExercises) =>
      exercise.name.toUpperCase() === exerciseName?.toUpperCase()
  );

  let statisticsOptions;

  const statisticsOptionsWeightAndReps = [
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

  const intervalOptions = [
    { label: "day", value: "day" },
    { label: "week", value: "week" },
    { label: "month", value: "month" },
    { label: "qtr", value: "Quarter" },
    { label: "Year", value: "Year" },
  ];

  if (
    exerciseSelected.measurement.includes("weight") &&
    exerciseSelected.measurement.includes("reps")
  ) {
    statisticsOptions = statisticsOptionsWeightAndReps;
  } else if (
    exerciseSelected.measurement.includes("weight") &&
    exerciseSelected.measurement.includes("distance")
  ) {
    statisticsOptions = statisticsOptionsWeightAndDistance;
  } else if (
    exerciseSelected.measurement.includes("weight") &&
    exerciseSelected.measurement.includes("time")
  ) {
    statisticsOptions = statisticsOptionsWeightAndTime;
  } else if (
    exerciseSelected.measurement.includes("reps") &&
    exerciseSelected.measurement.includes("distance")
  ) {
    statisticsOptions = statisticsOptionsRepsAndDistance;
  } else if (
    exerciseSelected.measurement.includes("reps") &&
    exerciseSelected.measurement.includes("time")
  ) {
    statisticsOptions = statisticsOptionsRepsAndTime;
  } else if (
    exerciseSelected.measurement.includes("distance") &&
    exerciseSelected.measurement.includes("time")
  ) {
    statisticsOptions = statisticsOptionsDistanceAndTime;
  } else if (exerciseSelected.measurement.includes("weight")) {
    statisticsOptions = statisticsOptionsWeight;
  } else if (exerciseSelected.measurement.includes("reps")) {
    statisticsOptions = statisticsOptionsReps;
  } else if (exerciseSelected.measurement.includes("distance")) {
    statisticsOptions = statisticsOptionsDistance;
  } else if (exerciseSelected.measurement.includes("time")) {
    statisticsOptions = statisticsOptionsTime;
  }

  if (!statisticsOptions) {
    return <>Cannot find the graph right now</>;
  }

  const handleKPISelectChange =()=>{
    console.log('handling')
  }


  const flattenedData = getFlattenedExerciseData()
  const groupedData = groupDataByTimePeriod(flattenedData,"day")
  //console.log(groupedData)
  const modeledData = get1RepMaxForExercise(groupedData)
  console.log(modeledData)

  function getFlattenedExerciseData() {
    if (!exerciseName) {
      return;
    }

    const flattenedExerciseData = userTrainingData
      .flatMap((workoutEntry: IWorkoutData) =>
        workoutEntry.workoutExercises
          .filter(
            (exerciseEntry: { name: string; exercises: Exercise[] }) =>
              exerciseEntry.name.toUpperCase() === exerciseName
          )
          .map(
            (exerciseEntry: { name: string; exercises: Exercise[] }) =>
              exerciseEntry.exercises
          )
      )
      .flat();

    return flattenedExerciseData;
  }

  function groupDataByTimePeriod(
    flattenedData: Exercise[],
    timePeriod: string
  ) {
    const groupedData: { date: string, averageWeight: number, averageReps: number, averageDistance: number, averageTime: number,count:number }[] = [];
  
    flattenedData.forEach((exercise: Exercise, index: number) => {
      const date = new Date(exercise.date);
      let key: string = "";
  
      if (timePeriod === "week") {
        const weekNumber = getISOWeek(date);
        key = `WK${weekNumber}-${format(date, "yyyy")}`;
      } else if (timePeriod === "month") {
        key = date.toLocaleString("en-us", { month: "short", year: "2-digit" });
      } else if (timePeriod === "quarter") {
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        key = `Q${quarter}-${date.getFullYear().toString().slice(-2)}`;
      } else if (timePeriod === "year") {
        key = date.getFullYear().toString();
      } else if (timePeriod === "day") {
        const customDateKey = format(date, "yyyy-MM-dd");
        key = customDateKey;
      }
  
      let groupedExercise = groupedData.find((group) => group.date === key);
  
      if (!groupedExercise) {
        groupedExercise = {
          date: key,
          averageWeight: 0,
          averageReps: 0,
          averageDistance: 0,
          averageTime: 0,
          count:0
        };
        groupedData.push(groupedExercise);
      }
  
      // Increment counts and sum the exercise properties
      const count = groupedExercise.count || 0;
      groupedExercise.count = count + 1;
      groupedExercise.averageWeight = (groupedExercise.averageWeight * count + exercise.weight) / (count + 1);
      groupedExercise.averageReps = (groupedExercise.averageReps * count + exercise.reps) / (count + 1);
      groupedExercise.averageDistance = (groupedExercise.averageDistance * count + exercise.distance) / (count + 1);
      groupedExercise.averageTime = (groupedExercise.averageTime * count + exercise.time) / (count + 1);
    });
  
    return groupedData;
  }
  


function get1RepMaxForExercise(groupedData:{ date: string, averageWeight: number, averageReps: number, averageDistance: number, averageTime: number,count:number }[]){

    const exerciseData:{exerciseDate:string,weight:number}[] =[]

    groupedData.forEach((exercise:{ date: string, averageWeight: number, averageReps: number, averageDistance: number, averageTime: number,count:number }) => {
        
        const avgReps = exercise.averageReps;
        const avgWeight = exercise.averageWeight;
        const exerciseDate = exercise.date;
    
        if (avgReps > 0 && avgWeight > 0) {
            const weight = parseFloat((avgWeight * (1 + 0.0333 * avgReps)).toFixed(1));
          exerciseData.push({ exerciseDate, weight });
        }
    
      });
 
      return exerciseData
}



  return (
    <>
    
    <Container maxWidth="lg" sx={{paddingBottom:"64px", height:"calc(100% - 64px)"}}  
    
    >
    <Box paddingBottom="8px" display="flex" flexDirection="column">
    <Select
            sx={{
              width: "100%",
              marginTop: "8px",
            }}
            onChange={()=>handleKPISelectChange}
            defaultValue={statisticsOptions[0].label}
          >
            {statisticsOptions &&
              statisticsOptions.map((option: { label: string }) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
          </Select>

          <Typography variant="subtitle1">
            Choose a standard timeframe
          </Typography>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
            fullWidth={true}
          >
            {timeframeOptions.map((option) => (
              <Button key={option.label} style={{ flexGrow: 1 }}>
                {option.label}
              </Button>
            ))}
          </ButtonGroup>
          <Typography variant="subtitle1">Choose a custom timeframe</Typography>
          <Box display="flex" gap={1}>
            <TextField type="date"></TextField>
            <TextField type="date"></TextField>
          </Box>

          <Typography variant="subtitle1">Group your data by interval</Typography>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
            fullWidth={true}
          >
            {intervalOptions.map((option) => (
              <Button key={option.label} style={{ flexGrow: 1 }}>
                {option.label}
              </Button>
            ))}
          </ButtonGroup>
          </Box>
{/* 

    <Accordion>
        <AccordionSummary
        
          expandIcon={<FilterAltIcon />}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            {}
        </AccordionSummary>
        <AccordionDetails
          sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
        
        </AccordionDetails>
      </Accordion>
 */}
      <ResponsiveContainer aspect={1}>
        <LineChart

          height={400}
          data={modeledData}
          margin={{
            top: 1,
            right: 1,
            left: 1,
            bottom: 1,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="exerciseDate" />
          <YAxis width={25} />
          <Tooltip />
          <Legend />
        <Line type="monotone" dataKey="weight" stroke="#520975" strokeWidth="4" dot={{fill:"#2e4355",stroke:"#520975",strokeWidth: 2,r:5}} activeDot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 5,r:10}} />
       

        </LineChart>
        </ResponsiveContainer>
        
    </Container>



    </>
  );
}

export default CompletedDetailsGraph;
