import calculateDOTS from "../../utils/progressFunctions/calculateDOTS";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import fetchCurrentUserData from "../../utils/fetchCurrentUserData";
import {
  BarChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useContext, useState } from "react";
import { TrainingDataContext } from "../../context/TrainingData";
import { AuthContext } from "../../context/Auth";
import { IUserSelectedExercises } from "../../context/TrainingData";
import Button from "@mui/material/Button";
import getFlattenedExerciseData from "../../utils/completedWorkoutsChartFunctions/utility/getFlattenedExerciseData";
import Exercise from "../../utils/interfaces/Exercise";
import updatePowerLevelInFirestore from "../../utils/progressFunctions/firebaseFunctions/updatePowerLevelInFirestore";
import toast from "react-hot-toast";
import getUserWeight from "../../utils/getUserWeight";
import ButtonGroup from '@mui/material/ButtonGroup';
import { useCallback,useEffect,useRef } from "react";

function ProgressLevel() {
  const { userTrainingData, userSelectedExercises,userBodyTrackerData } =
    useContext(TrainingDataContext);
  const { currentUser, currentUserData, setCurrentUserData } =
    useContext(AuthContext);
  
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const updateImageDimensions = useCallback(() => {
    const width = window.innerWidth; // Assuming full window for simplicity
    const height = window.innerHeight;
    // Here you would put the logic to calculate the image's actual dimensions
    // For this example, we'll just set it directly
    setImageDimensions({ width, height });
  }, []);

  console.log(imageDimensions)
  
  useEffect(() => {


   // Capture the current value of the ref in a variable
   const imgElement = imgRef.current;

   // Check if imgElement is not null
   if (imgElement) {
    
     const handleLoad = () => {
      const width = imgElement.offsetWidth
      const height = imgElement.offsetHeight
      setImageDimensions({width,height})
     };

     // Add event listener
     imgElement.addEventListener('load', handleLoad);

     // Cleanup function to remove the event listener
     return () => {
       imgElement.removeEventListener('load', handleLoad);
     };
   }

  }, []);
  
  const labelsData = [
    { id: "shoulders", top: (27/100)*imageDimensions.width, left: (35/100)*imageDimensions.width },
    { id: "biceps", top: "35%", left: "20%" },
    { id: "chest", top: "35%", left: "20%" },
    { id: "core", top: "35%", left: "20%" },
    { id: "forearms", top: "35%", left: "20%" },
    { id: "full body", top: "35%", left: "20%" },
    { id: "legs", top: "35%", left: "20%" },
    { id: "back", top: "35%", left: "20%" },
    { id: "triceps", top: "35%", left: "20%" },
  ];
  const shouldersData = labelsData.find(label => label.id === 'shoulders');
  console.log(shouldersData)
  const findDeadlift = findExerciseByName("barbell deadlift");
  const findBenchPress = findExerciseByName("flat barbell bench press");
  const findSquat = findExerciseByName("barbell squat");

  const [firstExerciseSelected, setFirstExerciseSelected] = useState(
    currentUserData.firstPowerExercise !== "No Exercise Selected Yet"
      ? userSelectedExercises[0].exercises.find(
          (exercise: IUserSelectedExercises) =>
            exercise.name.toUpperCase() ===
            currentUserData.firstPowerExercise.toUpperCase()
        )
      : findBenchPress
  );

  const [secondExerciseSelected, setSecondExerciseSelected] = useState(
    currentUserData.firstPowerExercise !== "No Exercise Selected Yet"
      ? userSelectedExercises[0].exercises.find(
          (exercise: IUserSelectedExercises) =>
            exercise.name.toUpperCase() ===
            currentUserData.secondPowerExercise.toUpperCase()
        )
      : findSquat
  );

  const [thirdExerciseSelected, setThirdExerciseSelected] = useState(
    currentUserData.firstPowerExercise !== "No Exercise Selected Yet"
      ? userSelectedExercises[0].exercises.find(
          (exercise: IUserSelectedExercises) =>
            exercise.name.toUpperCase() ===
            currentUserData.thirdPowerExercise.toUpperCase()
        )
      : findDeadlift
  );


  const data = [
    {
      name: "PL",
      Strength: currentUserData.strengthLevel,
      Experience: currentUserData.experiencePoints,
    },
  ];

  const userSelectedExercisesStrArr = userSelectedExercises[0].exercises
    .map((userExercise: IUserSelectedExercises) => userExercise.name)
    .sort((a: string, b: string) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );


  function findExerciseByName(name: string) {
    return userSelectedExercises[0].exercises.find(
      (exercise: IUserSelectedExercises) => exercise.name.toLocaleUpperCase() === name.toLocaleUpperCase()
    );
  }

  if (!userTrainingData) {
    return <>Updating...</>;
  }

  const handleAutocompleteChange = (newValue: string | null, order: string) => {
    if (newValue) {
      const exercise = findExerciseByName(newValue);
      
      if (order === "first") {
        setFirstExerciseSelected(exercise);
      } else if (order === "second") {
        setSecondExerciseSelected(exercise);
      } else if (order === "third") {
        setThirdExerciseSelected(exercise);
      }
    }
  };

  async function handleCalculatePowerLevel() {
    
    const userWeight = getUserWeight(userBodyTrackerData)
    const totalLiftedWeight = calculatePowerLevel();
    const isFemale = () => {
      return currentUserData.sex === "female";
    };

    const strengthLevel = calculateDOTS(
      userWeight,
      totalLiftedWeight,
      isFemale()
    );

    const experiencePoints = userTrainingData.length * 10;

    const maximumPowerLevel = strengthLevel + experiencePoints;

    if (maximumPowerLevel > currentUserData.powerLevel) {
      await updatePowerLevelInFirestore(
        currentUser.uid,
        firstExerciseSelected.name,
        secondExerciseSelected.name,
        thirdExerciseSelected.name,
        maximumPowerLevel,
        strengthLevel,
        experiencePoints
      );
      await fetchCurrentUserData(currentUser, setCurrentUserData);
    } else {
      toast.error(`Your power level would be lower - ${maximumPowerLevel}`);
    }
  }

  function calculatePowerLevel() {
    const flattenedFirstExercise = getFlattenedExerciseData(
      userTrainingData,
      firstExerciseSelected.name,
      "all"
    );
    const flattenedSecondExercise = getFlattenedExerciseData(
      userTrainingData,
      secondExerciseSelected.name,
      "all"
    );
    const flattenedThirdExercise = getFlattenedExerciseData(
      userTrainingData,
      thirdExerciseSelected.name,
      "all"
    );

    let firstExerciseMaxRM = 0;
    let secondExerciseMaxRM = 0;
    let thirdExerciseMaxRM = 0;

    if (flattenedFirstExercise) {
      firstExerciseMaxRM = getMaxRM(flattenedFirstExercise);
    }

    if (flattenedSecondExercise) {
      secondExerciseMaxRM = getMaxRM(flattenedSecondExercise);
    }
    if (flattenedThirdExercise) {
      thirdExerciseMaxRM = getMaxRM(flattenedThirdExercise);
    }

    const totalWeight =
      firstExerciseMaxRM + secondExerciseMaxRM + thirdExerciseMaxRM;

    return totalWeight;
  }

  function getMaxRM(exerciseArr: Exercise[]) {
    let maxRM = 0;

    for (let index = 0; index < exerciseArr.length; index++) {
      const currentExercise = exerciseArr[index];

      const currentMaxRem =
        currentExercise.weight * (1 + currentExercise.reps / 30);

      if (currentMaxRem > maxRM) {
        maxRM = currentMaxRem;
      }
    }

    return maxRM;
  }
  


  function calculateScaledImageSize(containerWidth:number, containerHeight:number, imageOriginalWidth:number, imageOriginalHeight:number) {
    const imageAspectRatio = imageOriginalWidth / imageOriginalHeight;
    const containerAspectRatio = containerWidth / containerHeight;
    let scaledWidth, scaledHeight;
  
    if (containerAspectRatio > imageAspectRatio) {
      // Container is wider in proportion to the image
      scaledHeight = containerHeight;
      scaledWidth = containerHeight * imageAspectRatio;
    } else {
      // Container is taller in proportion to the image
      scaledWidth = containerWidth;
      scaledHeight = containerWidth / imageAspectRatio;
    }
  
    return { scaledWidth, scaledHeight };
  }
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "64px",
      }}
      maxWidth="md"
    >
      <Box
        width="100%"
        boxShadow={2}
        padding="8px"
        marginTop="1rem"
        borderRadius="4px"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="0.25rem"
          marginBottom="0.25rem"
          gap={1}
        >
          {/* 
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Ficons%2FPowerLevelIcon_256.png?alt=media&token=a7b39274-159b-41e8-b0db-7dcb59263e95"
            alt=""
            style={{ minWidth: "3rem", minHeight: "3rem" }}
            width="3rem"
            height="3rem"
          ></img>
             */}
          <Typography variant="h3">{currentUserData.powerLevel}</Typography>
        </Box>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 0,
              left: -35,
              bottom: 5,
            }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis fontSize={15} type="number" tick={false} />
            <YAxis dataKey="name" type="category" fontSize={15} />
            <Tooltip />
            <Legend
              align="center"
              verticalAlign="bottom"
              iconType="star"
              iconSize={12}
            />
            <Bar dataKey="Strength" stackId="a" fill="#520975">
              <LabelList dataKey="Strength" position="top" />
            </Bar>
            <Bar dataKey="Experience" stackId="a" fill="#FFA500">
              <LabelList dataKey="Experience" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <Typography variant="subtitle1" textAlign="center">
          Select your strongest lifts to calculate your maximum Power Level
        </Typography>
        <Autocomplete
          sx={{ paddingTop: "8px" }}
          disableClearable
          fullWidth
          options={userSelectedExercisesStrArr}
          value={firstExerciseSelected ? firstExerciseSelected.name : null}
          renderInput={(params) => (
            <TextField {...params} label="First Exercise" variant="outlined" />
          )}
          onChange={(event, value) => handleAutocompleteChange(value, "first")}
        />

        <Autocomplete
          sx={{ paddingTop: "8px" }}
          disableClearable
          fullWidth
          options={userSelectedExercisesStrArr}
          value={secondExerciseSelected ? secondExerciseSelected.name : null}
          renderInput={(params) => (
            <TextField {...params} label="Second Exercise" variant="outlined" />
          )}
          onChange={(event, value) => handleAutocompleteChange(value, "second")}
        />

        <Autocomplete
          sx={{ paddingTop: "8px" }}
          disableClearable
          fullWidth
          options={userSelectedExercisesStrArr}
          value={thirdExerciseSelected ? thirdExerciseSelected.name : null}
          renderInput={(params) => (
            <TextField {...params} label="Third Exercise" variant="outlined" />
          )}
          onChange={(event, value) => handleAutocompleteChange(value, "third")}
        />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="dbz"
            sx={{
              width: "75%",
              margin: "0.25rem",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
            onClick={handleCalculatePowerLevel}
          >
            CALCULATE
          </Button>
        </Box>
      </Box>

  {/*
      <Box
        width="100%"
        marginTop="16px"
        gap={1}
        display="flex"
        flexDirection="column"
        boxShadow={2}
        borderRadius="4px"
        padding="8px"
      >
        <Typography align="center" variant="h6">
          WORKOUT MUSCLE CHART
        </Typography>
       
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          fullWidth
        >
          <Button>Sets</Button>
          <Button>Reps</Button>
          <Button>Volume</Button>
          <Button>1RM</Button>
        </ButtonGroup>

        <Box display="flex" justifyContent="space-evenly" gap={1} width="100%">
          <TextField type="date" fullWidth></TextField>
          <TextField type="date" fullWidth></TextField>
        </Box>
 
        <div

          style={{
            position:"relative",
            display:"block",
          }}

        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fitpowerup-2bbc8.appspot.com/o/assets%2Fchart-images%2Ffemale-saiyan-chart.jpg?alt=media&token=33f84156-70c8-4e60-9f1c-6ba80f49f578"
            alt=""
            height="100%"
            width="100%"
            ref={imgRef}
            style={{
              objectFit:"contain",
              objectPosition:"center"

            }}
          ></img>
         {/* 
          <p
          style={{
            position:"absolute",
            left:'32%',top:'25%'
          }}
            
          >
            23
          </p>
       
        </div>
      </Box>
    */}
    </Box>
  );
}

export default ProgressLevel;


