import calculateDOTS from "../../utils/progressFunctions/calculateDOTS";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

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
import { IconButton, Paper } from "@mui/material";
import { BodyTrackerDataContext } from "../../context/BodyTrackerData";
import { UserExercisesLibraryContext } from "../../context/UserExercisesLibrary";
import LoadingScreenCircle from "../../components/ui/LoadingScreenCircle";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactComponent as StrengthIcon } from "../../assets/strength.svg";
import { ReactComponent as ExperienceIcon } from "../../assets/gym.svg";
import { ReactComponent as PowerLevelIcon } from "../../assets/powerlevel.svg";

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

  const todayTimestamp = new Date();
  const yesterdayTimestamp = new Date(
    todayTimestamp.getTime() - 24 * 60 * 60 * 1000
  );

  const firebaseTimestamp =
    currentUserData && currentUserData.lastUpdateTimestamp !== null
      ? new Date(currentUserData.lastUpdateTimestamp.toMillis())
      : yesterdayTimestamp;

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

  function isSameDay(d1: Date, d2: Date) {
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

      const firstExerciseFound = () =>
        userExercisesLibrary[0].exercises.find(
          (exercise: IUserExercisesLibrary) =>
            exercise.name.toUpperCase() ===
            currentUserData.firstPowerExercise.toUpperCase()
        );

      setFirstExerciseSelected(firstExerciseFound());

      const secondExerciseFound = () =>
        userExercisesLibrary[0].exercises.find(
          (exercise: IUserExercisesLibrary) =>
            exercise.name.toUpperCase() ===
            currentUserData.secondPowerExercise.toUpperCase()
        );

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
      Strength: currentUserData ? currentUserData.strengthLevel : 0,
      Experience: currentUserData ? currentUserData.experienceLevel : 0,
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

    toast.success(`Your power level is ${maximumPowerLevel}`, {
      duration: 5000,
      style: {
        fontFamily: "LuckiestGuy",
      },
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
      //await fetchCurrentUserData(currentUser, setCurrentUserData);
      toast.success("Your power level was updated!");
    } catch (error) {
      console.error(error);
      toast.error("Oops, we could save your new power level!");
    }
  }

  function handleDiscardNewPL() {
    setCalculatedMaximumExperienceLevel(0);
    setCalculatedMaximumPowerLevel(0);
    setCalculatedMaximumStrengthLevel(0);
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
        pb: 1,
        gap: 2,
      }}
      maxWidth="md"
    >
      <Card
        variant="outlined"
        sx={{padding:1}}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginTop="0.25rem"
          marginBottom="0.25rem"
        >
          <Typography color="text.primary" variant="h3" fontWeight="500">
            {currentUserData.powerLevel}
          </Typography>
          <Typography
            color="text.secondary"
            variant="subtitle1"
            fontWeight="500"
            p={0}
            m={0}
          >
            Your Current Power Level
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
            <YAxis
              fontFamily="LuckiestGuy"
              dataKey="name"
              type="category"
              fontSize={15}
            />
            <Tooltip />
            <Legend
              align="center"
              verticalAlign="bottom"
              iconType="star"
              iconSize={16}
              wrapperStyle={{ fontFamily: "LuckiestGuy", fontSize: "1.25rem" }}
            />
            <Bar dataKey="Strength" stackId="a" fill="#2955DC">
              <LabelList
                dataKey="Strength"
                fontFamily="LuckiestGuy"
                fontSize="1.5rem"
                position="top"
              />
            </Bar>
            <Bar dataKey="Experience" stackId="a" fill="#FFA500">
              <LabelList
                dataKey="Experience"
                fontFamily="LuckiestGuy"
                fontSize="1.5rem"
                position="top"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {userExercisesLibrary.length > 0 && (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography
              color="text.secondary"
              variant="subtitle1"
              textAlign="center"
            >
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

        {calculatedMaximumPowerLevel !== 0 && (
          <Paper variant="outlined" sx={{ width: "100%", mt: 1 }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              padding={1}
            >
              <Box
                display="flex"
                justifyContent="space-evenly"
                width="100%"
                flexDirection="column"
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  align="left"
                  width="100%"
                >
                  New Power Level
                </Typography>

                <Box display="flex" width="100%" justifyContent="space-evenly">
                  <Typography
                    color="text.secondary"
                    fontSize="1.25rem"
                    fontWeight="normal"
                    display="flex"
                    gap={1}
                    alignItems="center"
                  >
                    <PowerLevelIcon width="1rem" height="1rem" />{" "}
                    {calculatedMaximumPowerLevel}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    fontSize="1.25rem"
                    fontWeight="normal"
                    display="flex"
                    gap={1}
                    alignItems="center"
                  >
                    <StrengthIcon width="1rem" height="1rem" />
                    {calculatedMaximumStrengthLevel}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    fontSize="1.25rem"
                    fontWeight="normal"
                    display="flex"
                    gap={1}
                    alignItems="center"
                  >
                    <ExperienceIcon width="1rem" height="1rem" />
                    {calculatedMaximumExperienceLevel}
                  </Typography>
                </Box>
              </Box>

              {isToday ? (
                <Typography
                  align="center"
                  color="text.secondary"
                  fontWeight="400"
                >
                  You already updated your Power Level today.
                </Typography>
              ) : (
                <Box display="flex" justifyContent="space-around" width="100%">
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    sx={{ p: 0, display: "flex", flexDirection: "column" }}
                    onClick={handlePublishPowerLevel}
                  >
                    <SaveAsIcon sx={{ p: 0, m: 0 }} />
                    <Typography variant="caption">Save New PL</Typography>
                  </IconButton>

                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    sx={{ p: 0, display: "flex", flexDirection: "column" }}
                    onClick={handleDiscardNewPL}
                  >
                    <DeleteIcon sx={{ p: 0, m: 0 }} />
                    <Typography variant="caption">Discard New PL</Typography>
                  </IconButton>
                </Box>
              )}
            </Box>
          </Paper>
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
              fontSize: "1rem",
            }}
            onClick={handleCalculatePowerLevel}
          >
            CALCULATE
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default ProgressLevel;
