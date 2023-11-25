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

function ProgressLevel() {
  const { userTrainingData, userSelectedExercises } =
    useContext(TrainingDataContext);
  const { currentUser, currentUserData, setCurrentUserData } =
    useContext(AuthContext);

  const findDeadlift = findExerciseByName("Deadlift");
  const findBenchPress = findExerciseByName("Bench Press");
  const findSquat = findExerciseByName("Barbell Squat");

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
      (exercise: IUserSelectedExercises) => exercise.name === name
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
    const userWeight = currentUserData.weight;
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
      </Box>
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
    </Box>
  );
}

export default ProgressLevel;


