import { IUpdatedUserExercisesLibrary } from "../../../pages/Friends/CreateFitWorlGoal";
import { Exercise } from "../../interfaces/IUserTrainingData";
import IChallengeObj from "../../interfaces/IChallengeObj";
import { IWorkoutData } from "../../interfaces/IUserTrainingData";
import getFlattenedExerciseData from "../../completedWorkoutsChartFunctions/utility/getFlattenedExerciseData";
function calculateChallengeExercises(
  challengeObj: IChallengeObj,
  userTrainingData: IWorkoutData[],
  exerciseName: string
) {
  const startDate = new Date(challengeObj.startDate);
  const endDate = new Date(challengeObj.endDate);

  const flattenedUserWorkoutExercisesArr = getFlattenedExerciseData(
    userTrainingData,
    exerciseName,
    "all"
  );

  const validWorkoutExercisesArr = flattenedUserWorkoutExercisesArr.filter(
    (item: Exercise) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    }
  );

  const filteredChallengeExercisesArr = challengeObj.goals.gravityChamberGains.exercises.filter(
    (item: IUpdatedUserExercisesLibrary) => item.name === exerciseName
  );

  let exerciseGoalMet = false;

  filteredChallengeExercisesArr.forEach((challengeExercise:IUpdatedUserExercisesLibrary) => {
    validWorkoutExercisesArr.forEach((workoutExercise:Exercise) => {
      if (isGoalMet(challengeExercise, workoutExercise)) {
        exerciseGoalMet = true;
      }
    });
  });

  return exerciseGoalMet;
}

function isGoalMet(challengeExercise: IUpdatedUserExercisesLibrary, workoutExercise: Exercise) {
  let goalMet = true;

  if (challengeExercise.distance !== undefined) {
    goalMet = goalMet && workoutExercise.distance >= challengeExercise.distance;
  }
  if (challengeExercise.reps !== undefined) {
    goalMet = goalMet && workoutExercise.reps >= challengeExercise.reps;
  }
  if (challengeExercise.weight !== undefined) {
    goalMet = goalMet && workoutExercise.weight >= challengeExercise.weight;
  }
  if (challengeExercise.time !== undefined) {
    goalMet = goalMet && workoutExercise.time >= challengeExercise.time;
  }

  return goalMet;
}


export default calculateChallengeExercises;
