import { useParams } from "react-router-dom";
import { useContext } from "react";
import { TrainingDataContext } from "../../context/TrainingData";
import { IUserSelectedExercises } from "../../context/TrainingData";
import Container from "@mui/material/Container";
import { Typography, Box } from "@mui/material";
import Replay10Icon from "@mui/icons-material/Replay10";
import ScaleIcon from "@mui/icons-material/Scale";
import TimesOneMobiledataIcon from "@mui/icons-material/TimesOneMobiledata";
import { IWorkoutData } from "../../utils/firebaseDataFunctions/completeWorkout";
import ViewListIcon from "@mui/icons-material/ViewList";
import Exercise from "../../utils/interfaces/Exercise";
import LuggageIcon from "@mui/icons-material/Luggage";
import FunctionsIcon from "@mui/icons-material/Functions";
import ExerciseCompletedStatTile from "../../components/ui/ExerciseCompletedStatTile";

function CompletedDetailsOverview() {
  const { exerciseName } = useParams();
  const { userTrainingData, userSelectedExercises, dateForWorkout } =
    useContext(TrainingDataContext);

  const historicStats = getHistoricWorkoutStatsForExercise();
  const workoutStatus = getWorkoutStatsForExercise();

  function getWorkoutStatsForExercise() {
    if (!userTrainingData || !exerciseName) {
      return;
    }

    let workoutStats = {
      totalSeries: 0,
      totalReps: 0,
      totalWeight: 0,
      totalDistance: 0,
      totalTime: 0,
      totalSets: 0,
      avgRepsPerSet: 0,
      loadVolume: 0,
    };

    userTrainingData.forEach((workoutEntry: IWorkoutData) => {
      workoutEntry.workoutExercises.forEach(
        (exerciseEntry: { name: string; exercises: Exercise[] }) => {
          const completedExerciseName = exerciseEntry.name.toUpperCase();
          const exercises = exerciseEntry.exercises;

          if (
            completedExerciseName === exerciseName.toUpperCase() &&
            workoutEntry.workoutDate === dateForWorkout
          ) {
            workoutStats.totalSets += 1;
            workoutStats.totalSeries += exercises.length;
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
          }
        }
      );
    });

    workoutStats.avgRepsPerSet =
      workoutStats.totalSets > 0
        ? workoutStats.totalReps / workoutStats.totalSets
        : 0;
    workoutStats.loadVolume = workoutStats.totalWeight * workoutStats.totalReps;

    return workoutStats;
  }

  function getHistoricWorkoutStatsForExercise() {
    if (!userTrainingData || !exerciseName) {
      return;
    }

    let historicStats = {
      totalSeries: 0,
      totalReps: 0,
      totalWeight: 0,
      totalDistance: 0,
      totalTime: 0,
      totalSets: 0,
      avgRepsPerSet: 0,
      loadVolume: 0,
    };

    userTrainingData.forEach((workoutEntry: IWorkoutData) => {
      workoutEntry.workoutExercises.forEach(
        (exerciseEntry: { name: string; exercises: Exercise[] }) => {
          const completedExerciseName = exerciseEntry.name.toUpperCase();
          const exercises = exerciseEntry.exercises;

          if (completedExerciseName === exerciseName.toUpperCase()) {
            historicStats.totalSets += 1;
            historicStats.totalSeries += exercises.length;
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
          }
        }
      );
    });

    historicStats.avgRepsPerSet =
      historicStats.totalSets > 0
        ? historicStats.totalReps / historicStats.totalSets
        : 0;
    historicStats.loadVolume =
      (historicStats.totalWeight * historicStats.totalReps) / 1000;

    return historicStats;
  }

  const exerciseSelected: IUserSelectedExercises =
    userSelectedExercises[0].exercises.find(
      (exercise: IUserSelectedExercises) =>
        exercise.name.toUpperCase() === exerciseName?.toUpperCase()
    );

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
        <div
          style={{
            minHeight: "300px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={exerciseSelected.imageURL}
            width="75%"
            height="75%"
            style={{ maxWidth: "512px" }}
            alt=""
          ></img>
        </div>

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
              statName="WEIGHT"
              statIcon={<ScaleIcon fontSize="small" />}
              statValue={workoutStatus?.totalWeight || 0}
              statDetail="kgs"
              statColor="#FFA500"
              statTextColor="black"
            />
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
              statName="SERIES"
              statIcon={<TimesOneMobiledataIcon fontSize="small" />}
              statDetail="X"
              statValue={workoutStatus?.totalSeries || 0}
              statColor="#FFA500"
              statTextColor="black"
            />
            <ExerciseCompletedStatTile
              statName="AVG. REP PER SET"
              statIcon={<FunctionsIcon fontSize="small" />}
              statValue={workoutStatus?.avgRepsPerSet.toFixed(1) || 0}
              statDetail="sets"
              statColor="#FFA500"
              statTextColor="black"
            />
            <ExerciseCompletedStatTile
              statName="LOAD VOLUME"
              statIcon={<LuggageIcon fontSize="small" />}
              statDetail="kg"
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
              statName="TOTAL WEIGHT"
              statIcon={<ScaleIcon fontSize="small" />}
              statValue={historicStats?.totalWeight || 0}
              statDetail="kgs"
              statColor="#520975"
              statTextColor="white"
            />
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
              statName="TOTAL SERIES"
              statIcon={<TimesOneMobiledataIcon fontSize="small" />}
              statDetail="X"
              statValue={historicStats?.totalSeries || 0}
              statColor="#520975"
              statTextColor="white"
            />
            <ExerciseCompletedStatTile
              statName="AVG. REP PER SET"
              statIcon={<FunctionsIcon fontSize="small" />}
              statValue={historicStats?.avgRepsPerSet.toFixed(1) || 0}
              statDetail="sets"
              statColor="#520975"
              statTextColor="white"
            />
            <ExerciseCompletedStatTile
              statName="LOAD VOLUME"
              statIcon={<LuggageIcon fontSize="small" />}
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