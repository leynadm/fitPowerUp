import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { TrainingDataContext } from "../../context/TrainingData";
import { IUserSelectedExercises } from "../../context/TrainingData";
import Container from "@mui/material/Container";
import { Typography, Box } from "@mui/material";
import Replay10Icon from "@mui/icons-material/Replay10";
import ScaleIcon from "@mui/icons-material/Scale";
import TimesOneMobiledataIcon from "@mui/icons-material/TimesOneMobiledata";
import LuggageIcon from "@mui/icons-material/Luggage";
import FunctionsIcon from "@mui/icons-material/Functions";
import ViewListIcon from "@mui/icons-material/ViewList";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/completeWorkout";
import Exercise from "../../utils/interfaces/Exercise";
import ExerciseCompletedStatTile from "../../components/ui/ExerciseCompletedStatTile";
import { AuthContext } from "../../context/Auth";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

function CompletedDetailsOverview() {
  const { exerciseName } = useParams();
  const { userTrainingData, dateForWorkout } =
    useContext(TrainingDataContext);
  const { currentUserData } = useContext(AuthContext);
  const historicStats = getHistoricWorkoutStatsForExercise();
  const workoutStatus = getWorkoutStatsForExercise();
  const [exerciseImgURL, setExerciseImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(true); // New state for loading status

  console.log(exerciseName?.replaceAll(" ", "-"));

  useEffect(() => {
    const fetchImageURL = async () => {
      const exerciseImageRef = ref(
        storage,
        `assets/exercises-assets/${exerciseName
          ?.replaceAll(" ", "-")
          .toLocaleLowerCase()}.jpg`
      );
      try {
        const url = await getDownloadURL(exerciseImageRef);
        setExerciseImageURL(url);
      } catch (error) {
        toast.error("Oops, there was an error fetching the image!");
        console.error("Error fetching image:", error);
      } finally {
        setIsLoading(false); // Stop loading whether there was an error or not
      }
    };

    fetchImageURL();
  }, []); // Dependency array includes index and userExercise

  function getWorkoutStatsForExercise() {
    if (!userTrainingData || !exerciseName) {
      return;
    }

    let workoutStats = {
      totalSets: 0,
      totalReps: 0,
      totalWeight: 0,
      totalDistance: 0,
      totalTime: 0,
      totalWorkouts: 0,
      avgRepsPerSet: 0,
      loadVolume: 0,
      count: 0,
    };

    userTrainingData.forEach((workoutEntry: IWorkoutData) => {
      workoutEntry.wExercises.forEach(
        (exerciseEntry: { name: string; exercises: Exercise[] }) => {
          const completedExerciseName = exerciseEntry.name.toUpperCase();
          const exercises = exerciseEntry.exercises;

          if (
            completedExerciseName === exerciseName.toUpperCase() &&
            workoutEntry.date === dateForWorkout
          ) {
            workoutStats.totalWorkouts += 1;
            workoutStats.totalSets += exercises.length;
            workoutStats.totalDistance += exercises.reduce(
              (acc, exercise) => acc + (exercise.distance || 0),
              0
            );
            workoutStats.totalReps += exercises.reduce(
              (acc, exercise) => acc + (exercise.reps || 0),
              0
            );
            workoutStats.totalWeight += exercises.reduce(
              (acc, exercise) => acc + (exercise.weight || 0),
              0
            );
            workoutStats.totalTime += exercises.reduce(
              (acc, exercise) => acc + (exercise.time || 0),
              0
            );
            workoutStats.count += 1;
          }
        }
      );
    });

    workoutStats.avgRepsPerSet = parseFloat(
      (workoutStats.totalWorkouts > 0
        ? workoutStats.totalReps / workoutStats.totalSets
        : 0
      ).toFixed(1)
    );

    workoutStats.loadVolume = parseFloat(
      (
        (workoutStats.totalWeight * workoutStats.totalReps) /
        workoutStats.totalSets
      ).toFixed(1)
    );

    return workoutStats;
  }

  function getHistoricWorkoutStatsForExercise() {
    if (!userTrainingData || !exerciseName) {
      return;
    }

    let historicStats = {
      totalSets: 0,
      totalReps: 0,
      totalWeight: 0,
      totalDistance: 0,
      totalTime: 0,
      totalWorkouts: 0,
      avgRepsPerSet: 0,
      loadVolume: 0,
      count: 0,
    };

    userTrainingData.forEach((workoutEntry: IWorkoutData) => {
      workoutEntry.wExercises.forEach(
        (exerciseEntry: { name: string; exercises: Exercise[] }) => {
          const completedExerciseName = exerciseEntry.name.toUpperCase();
          const exercises = exerciseEntry.exercises;

          if (completedExerciseName === exerciseName.toUpperCase()) {
            historicStats.totalWorkouts += 1;
            historicStats.totalSets += exercises.length;
            historicStats.totalDistance += exercises.reduce(
              (acc, exercise) => acc + (exercise.distance || 0),
              0
            );
            historicStats.totalReps += exercises.reduce(
              (acc, exercise) => acc + (exercise.reps || 0),
              0
            );
            historicStats.totalWeight += exercises.reduce(
              (acc, exercise) => acc + (exercise.weight || 0),
              0
            );
            historicStats.totalTime += exercises.reduce(
              (acc, exercise) => acc + (exercise.time || 0),
              0
            );
            historicStats.count += 1;
          }
        }
      );
    });

    historicStats.avgRepsPerSet = parseFloat(
      (historicStats.totalWorkouts > 0
        ? historicStats.totalReps / historicStats.totalSets
        : 0
      ).toFixed(1)
    );

    historicStats.loadVolume = parseFloat(
      (
        (historicStats.totalWeight * historicStats.totalReps) /
        1000 /
        historicStats.totalSets
      ).toFixed(1)
    );

    return historicStats;
  }


  /* 
  const exerciseSelected: IUserSelectedExercises =
    userSelectedExercises[0].exercises.find(
      (exercise: IUserSelectedExercises) =>
        exercise.name.toUpperCase() === exerciseName?.toUpperCase()
    ); */

  return (
    <Container maxWidth="md" sx={{ paddingBottom: "80px" }}>
      <Typography
        sx={{
          padding: {
            xs: "0.25rem", // Padding for extra small screens
            sm: "0.5rem", // Padding for small screens
            md: "0.75rem", // Padding for medium screens
            lg: "1.25rem", // Padding for large screens
          },
          textAlign: "center",
        }}
        variant="h6"
      >
        {exerciseName && exerciseName.toLocaleUpperCase()}
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            maxHeight: "540px",
            minHeight: "270px", // Default minHeight for mobile
          }}
        >
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <Box
            
            >
              <img
                src={exerciseImgURL}
                style={{ minHeight: "100%", objectFit: "cover",
              
              }}
                width="100%"
                height="100%"
                alt=""
              ></img>
            </Box>
          )}
        </Box>

        <Box display="flex" flexDirection="column" gap={1} width="100%">
          <Typography variant="subtitle1" textAlign="center">
            WORKOUT STATS {dateForWorkout}
          </Typography>

          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            gap={3}
          >
            <ExerciseCompletedStatTile
              statName="REPS"
              statIcon={<Replay10Icon fontSize="medium" />}
              statDetail="reps"
              statValue={workoutStatus?.totalReps || 0}
              statColor="#FFA500"
              statTextColor="black"
            />
            <ExerciseCompletedStatTile
              statName="SETS"
              statIcon={<ViewListIcon fontSize="small" />}
              statValue={workoutStatus?.totalSets || 0}
              statDetail="sets"
              statColor="#FFA500"
              statTextColor="black"
            />

            <ExerciseCompletedStatTile
              statName="AVG. REP/SET"
              statIcon={<FunctionsIcon fontSize="small" />}
              statValue={workoutStatus?.avgRepsPerSet.toFixed(1) || 0}
              statDetail="sets"
              statColor="#FFA500"
              statTextColor="black"
            />
            <ExerciseCompletedStatTile
              statName="TOTAL VOLUME"
              statIcon={<ScaleIcon fontSize="small" />}
              statDetail={
                currentUserData.unitsSystem === "metric" ? "kg" : "lbs"
              }
              statValue={workoutStatus?.loadVolume || 0}
              statColor="#FFA500"
              statTextColor="black"
            />
          </Box>

          <Typography variant="subtitle1" textAlign="center">
            HISTORIC STATS
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            gap={3}
          >
            <ExerciseCompletedStatTile
              statName="TOTAL REPS"
              statIcon={<Replay10Icon fontSize="medium" />}
              statDetail="reps"
              statValue={historicStats?.totalReps || 0}
              statColor="#520975"
              statTextColor="white"
            />
            <ExerciseCompletedStatTile
              statName="TOTAL SETS"
              statIcon={<ViewListIcon fontSize="small" />}
              statValue={historicStats?.totalSets || 0}
              statDetail="sets"
              statColor="#520975"
              statTextColor="white"
            />
            <ExerciseCompletedStatTile
              statName="AVG. REP/SET"
              statIcon={<FunctionsIcon fontSize="small" />}
              statValue={historicStats?.avgRepsPerSet.toFixed(1) || 0}
              statDetail="sets"
              statColor="#520975"
              statTextColor="white"
            />
            <ExerciseCompletedStatTile
              statName="TOTAL VOLUME"
              statIcon={<ScaleIcon fontSize="small" />}
              statDetail="t"
              statValue={historicStats?.loadVolume || 0}
              statColor="#520975"
              statTextColor="white"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default CompletedDetailsOverview;
