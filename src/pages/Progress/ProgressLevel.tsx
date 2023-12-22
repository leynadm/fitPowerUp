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
import { UserTrainingDataContext } from "../../context/UserTrainingData";
import { IUserExercisesLibrary } from "../../utils/interfaces/IUserExercisesLibrary";
import { AuthContext } from "../../context/Auth";
import Button from "@mui/material/Button";
import getFlattenedExerciseData from "../../utils/completedWorkoutsChartFunctions/utility/getFlattenedExerciseData";
import { Exercise } from "../../utils/interfaces/IUserTrainingData";
import updatePowerLevelInFirestore from "../../utils/progressFunctions/firebaseFunctions/updatePowerLevelInFirestore";
import toast from "react-hot-toast";
import getUserWeight from "../../utils/getUserWeight";
import capitalizeWords from "../../utils/capitalizeWords";
import { useEffect } from "react";
import { Paper } from "@mui/material";
import { BodyTrackerDataContext } from "../../context/BodyTrackerData";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
function ProgressLevel() {
  const { userTrainingData, refetchUserTrainingData } = useContext(
    UserTrainingDataContext
  );
  const { userExercisesLibrary, refetchUserExercisesLibrary } = useContext(
    UserExercisesLibraryContext
  );

  const { userBodyTrackerData, refetchUserBodyTrackerData } = useContext(
    BodyTrackerDataContext
  );

  const { currentUser, currentUserData, setCurrentUserData } =
    useContext(AuthContext);

  const firebaseTimestamp = new Date(
    currentUserData.lastUpdateTimestamp.toMillis()
  );
  const currentDate = new Date();

  const [calculatedMaximumPowerLevel, setCalculatedMaximumPowerLevel] =
    useState(0);
  const [calculatedMaximumStrengthLevel, setCalculatedMaximumStrengthLevel] =
    useState(0);
  const [
    calculatedMaximumExperienceLevel,
    setCalculatedMaximumExperienceLevel,
  ] = useState(0);
  const isToday = isSameDay(firebaseTimestamp, currentDate);

  console.log({ isToday });

  function isSameDay(d1: Date, d2: Date) {
    console.log(d1);
    console.log(d2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  const findDeadlift = findExerciseByName("barbell deadlift");
  const findBenchPress = findExerciseByName("flat barbell bench press");
  const findSquat = findExerciseByName("barbell squat");

  const [userExercisesLibraryStrArr, setUserExercisesLibraryStrArr] = useState<
    string[]
  >([]);

  const [firstExerciseSelected, setFirstExerciseSelected] = useState(
    userExercisesLibrary.length > 0
      ? userExercisesLibrary[0].exercises.find(
          (exercise: IUserExercisesLibrary) =>
            exercise.name.toUpperCase() ===
            currentUserData.firstPowerExercise.toUpperCase()
        )
      : findBenchPress
  );

  const [secondExerciseSelected, setSecondExerciseSelected] = useState(
    userExercisesLibrary.length > 0
      ? userExercisesLibrary[0].exercises.find(
          (exercise: IUserExercisesLibrary) =>
            exercise.name.toUpperCase() ===
            currentUserData.secondPowerExercise.toUpperCase()
        )
      : findSquat
  );

  const [thirdExerciseSelected, setThirdExerciseSelected] = useState(
    userExercisesLibrary.length > 0
      ? userExercisesLibrary[0].exercises.find(
          (exercise: IUserExercisesLibrary) =>
            exercise.name.toUpperCase() ===
            currentUserData.thirdPowerExercise.toUpperCase()
        )
      : findDeadlift
  );

  useEffect(() => {
    if (userExercisesLibrary.length === 0) {
      const fetchData = async () => {
        await refetchUserExercisesLibrary();
        await refetchUserTrainingData();
        await refetchUserBodyTrackerData();
      };
      fetchData();
    } else {
      const userSelectedExercisesStrArr = userExercisesLibrary[0].exercises
        .map((userExercise: IUserExercisesLibrary) =>
          capitalizeWords(userExercise.name)
        )
        .sort((a: string, b: string) =>
          a.localeCompare(b, undefined, { sensitivity: "base" })
        );

      setUserExercisesLibraryStrArr(userSelectedExercisesStrArr);

      console.log(userExercisesLibrary);
      const firstExerciseFound = () =>
        userExercisesLibrary[0].exercises.find(
          (exercise: IUserExercisesLibrary) =>
            exercise.name.toUpperCase() ===
            currentUserData.firstPowerExercise.toUpperCase()
        );
      console.log("found first:");
      console.log(firstExerciseFound());

      setFirstExerciseSelected(firstExerciseFound());

      const secondExerciseFound = () =>
        userExercisesLibrary[0].exercises.find(
          (exercise: IUserExercisesLibrary) =>
            exercise.name.toUpperCase() ===
            currentUserData.secondPowerExercise.toUpperCase()
        );

      console.log(secondExerciseFound());
      setSecondExerciseSelected(secondExerciseFound());

      const thirdExerciseFound = () =>
        userExercisesLibrary[0].exercises.find(
          (exercise: IUserExercisesLibrary) =>
            exercise.name.toUpperCase() ===
            currentUserData.thirdPowerExercise.toUpperCase()
        );

      setThirdExerciseSelected(thirdExerciseFound());
    }
  }, [userExercisesLibrary]);

  function findExerciseByName(name: string) {
    if (userExercisesLibrary.length === 0) {
      return "";
    }

    return userExercisesLibrary[0].exercises.find(
      (exercise: IUserExercisesLibrary) =>
        exercise.name.toLocaleUpperCase() === name.toLocaleUpperCase()
    );
  }

  const data = [
    {
      name: "PL",
      Strength: currentUserData.strengthLevel,
      Experience: currentUserData.experienceLevel,
    },
  ];

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
    const userWeight = getUserWeight(userBodyTrackerData);
    const totalLiftedWeight = calculatePowerLevel();
    const isFemale = () => {
      return currentUserData.sex === "female";
    };

    const strengthLevel = calculateDOTS(
      userWeight,
      totalLiftedWeight,
      isFemale()
    );

    const userWorkouts = userTrainingData.length;
    const userWorkoutGrade = Math.floor(userWorkouts / 100) * 100;
    const pendingWorkouts = userWorkouts % 100;
    const userWorkoutIncrease = Math.ceil(userWorkoutGrade / 100);
    let experiencePoints = 0;

    if (userWorkouts < 100) {
      experiencePoints = userWorkouts * 10;
    } else {
      for (let index = 1; index <= userWorkoutIncrease; index++) {
        if (index === 1) {
          experiencePoints = experiencePoints + 10 * 100;
        } else if (index === 2) {
          experiencePoints = experiencePoints + 9 * 100;
        } else if (index === 3) {
          experiencePoints = experiencePoints + 8 * 100;
        } else if (index === 4) {
          experiencePoints = experiencePoints + 7 * 100;
        } else if (index === 5) {
          experiencePoints = experiencePoints + 6 * 100;
        } else if (index > 5) {
          experiencePoints = experiencePoints + 5 * 100;
        }
      }
    }

    // Calculate the multiplier for the pending workouts
    let pendingMultiplier = 0;
    if (userWorkoutIncrease >= 1 && userWorkoutIncrease <= 5) {
      pendingMultiplier = 10 - userWorkoutIncrease;
    } else {
      pendingMultiplier = 5; // For userWorkoutIncrease > 5
    }

    // Multiply the pending workouts by the appropriate multiplier
    experiencePoints += pendingWorkouts * pendingMultiplier;

    const maximumPowerLevel = strengthLevel + experiencePoints;

    toast.success(`These exercises give you a PL of ${maximumPowerLevel}`, {
      duration: 5000,
    });

    setCalculatedMaximumPowerLevel(maximumPowerLevel);
    setCalculatedMaximumStrengthLevel(strengthLevel);
    setCalculatedMaximumExperienceLevel(experiencePoints);
  }

  async function handlePublishPowerLevel() {
    if (isToday) {
      toast.error("You can only update your Power Level once a day");
      return;
    }

    try {
      await updatePowerLevelInFirestore(
        currentUser.uid,
        firstExerciseSelected.name,
        secondExerciseSelected.name,
        thirdExerciseSelected.name,
        calculatedMaximumPowerLevel,
        calculatedMaximumStrengthLevel,
        calculatedMaximumExperienceLevel
      );
      await fetchCurrentUserData(currentUser, setCurrentUserData);
      toast.error("Your power level was updated!");
    } catch (error) {
      console.log(error);
      console.error(error);
      toast.error("Oops, we could save your new power level!");
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

  /* 
  function calculateScaledImageSize(
    containerWidth: number,
    containerHeight: number,
    imageOriginalWidth: number,
    imageOriginalHeight: number
  ) {
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
  } */

  if (userExercisesLibrary.length === 0) {
    return (
      <LoadingScreenCircle text="Please wait, Krillin is being resurected..." />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "64px",
        gap: 2,
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
          flexDirection="column"
          marginTop="0.25rem"
          marginBottom="0.25rem"
        >
          <Typography variant="h3" fontWeight="500">
            {currentUserData.powerLevel}
          </Typography>
          <Typography variant="subtitle1" fontWeight="500" p={0} m={0}>
            Your Saved Power Level
          </Typography>
        </Box>

        <ResponsiveContainer width="100%" height={175}>
          <BarChart
            width={500}
            height={200}
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
            <XAxis
              fontSize={15}
              type="number"
              tick={false}
              domain={[0, "dataMax + 50"]}
            />
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

        {userExercisesLibrary.length > 0 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="subtitle1" textAlign="center">
              Select your strongest lifts to calculate your maximum Power Level
            </Typography>

            <Autocomplete
              disableClearable
              fullWidth
              options={userExercisesLibraryStrArr}
              value={
                firstExerciseSelected
                  ? capitalizeWords(firstExerciseSelected.name)
                  : undefined
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="First Exercise"
                  variant="outlined"
                />
              )}
              onChange={(event, value) =>
                handleAutocompleteChange(value, "first")
              }
            />

            <Autocomplete
              disableClearable
              fullWidth
              options={userExercisesLibraryStrArr}
              value={
                secondExerciseSelected
                  ? capitalizeWords(secondExerciseSelected.name)
                  : undefined
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Second Exercise"
                  variant="outlined"
                />
              )}
              onChange={(event, value) =>
                handleAutocompleteChange(value, "second")
              }
            />

            <Autocomplete
              disableClearable
              fullWidth
              options={userExercisesLibraryStrArr}
              value={
                thirdExerciseSelected
                  ? capitalizeWords(thirdExerciseSelected.name)
                  : undefined
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Third Exercise"
                  variant="outlined"
                />
              )}
              onChange={(event, value) =>
                handleAutocompleteChange(value, "third")
              }
            />
          </Box>
        )}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "16px",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button
            variant="dbz_mini"
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

      {calculatedMaximumPowerLevel !== 0 && (
        <Paper sx={{ width: "100%", height: "100%", padding: "8px" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            gap={1}
          >
            <Box display="flex" justifyContent="space-evenly" width="100%">
              <Typography>
                New PL: <strong>{calculatedMaximumPowerLevel}</strong>
              </Typography>
              <Typography>
                New Str: <strong>{calculatedMaximumStrengthLevel}</strong>
              </Typography>
              <Typography>
                New Exp: <strong>{calculatedMaximumExperienceLevel}</strong>
              </Typography>
            </Box>

            {isToday ? (
              <Typography align="center">
                You already updated your Power Level today.
              </Typography>
            ) : (
              <Button
                variant="dbz_mini"
                sx={{ borderRadius: "25px" }}
                onClick={handlePublishPowerLevel}
              >
                Save New Power Level
              </Button>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default ProgressLevel;
