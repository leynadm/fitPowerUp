import { useParams } from "react-router-dom";
import { useContext } from "react";
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

function CompletedDetailsOverview() {
  const { exerciseName } = useParams();
  const { userTrainingData, userSelectedExercises, dateForWorkout } =
    useContext(TrainingDataContext);

  const historicStats = getHistoricWorkoutStatsForExercise();
  const workoutStatus = getWorkoutStatsForExercise();
  console.log(historicStats)
  console.log(historicStats)
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
      count:0
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
            workoutStats.count +=1
          }
        }
      );
    });

    workoutStats.avgRepsPerSet =
      workoutStats.totalWorkouts > 0
        ? workoutStats.totalReps / workoutStats.totalWorkouts
        : 0;
    workoutStats.loadVolume = ((workoutStats.totalWeight * workoutStats.totalReps)/workoutStats.totalSets);

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
      count:0
    };

    userTrainingData.forEach((workoutEntry: IWorkoutData) => {
      workoutEntry.workoutExercises.forEach(
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
            historicStats.count+=1
          }
        }
      );
    });

    historicStats.avgRepsPerSet =
      historicStats.totalWorkouts > 0
        ? historicStats.totalReps / historicStats.totalWorkouts
        : 0;
    historicStats.loadVolume =
      (historicStats.totalWeight * historicStats.totalReps) / 1000/historicStats.totalSets;

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
              statName="AVG. REP PER SET"
              statIcon={<FunctionsIcon fontSize="small" />}
              statValue={workoutStatus?.avgRepsPerSet.toFixed(1) || 0}
              statDetail="sets"
              statColor="#FFA500"
              statTextColor="black"
            />
            <ExerciseCompletedStatTile
              statName="TOTAL VOLUME"
              statIcon={<ScaleIcon fontSize="small" />}
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
          >{/* 
            <ExerciseCompletedStatTile
              statName="TOTAL VOLUME"
              statIcon={<ScaleIcon fontSize="small" />}
              statValue={(historicStats?.totalWeight? || 0}
              statDetail="kgs"
              statColor="#520975"
              statTextColor="white"
            /> */}
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
              statName="AVG. REP PER SET"
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