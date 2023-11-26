import { IWorkoutData } from "../../firebaseDataFunctions/completeWorkout";
import Exercise from "../../interfaces/Exercise";

function getFlattenedExerciseData(userTrainingData:IWorkoutData[],exerciseName:string,timeframe:string) {
    if (!exerciseName) {
      return;
    }
    const today = new Date();
    console.log('logging userTrainingData:')
    console.log(userTrainingData)
    const flattenedExerciseData = userTrainingData
      .flatMap((workoutEntry: IWorkoutData) =>
        workoutEntry.workoutExercises
          .filter(
            (exerciseEntry: { name: string; exercises: Exercise[] }) =>
              exerciseEntry.name.toUpperCase() === exerciseName.toUpperCase()
          )
          .map(
            (exerciseEntry: { name: string; exercises: Exercise[] }) =>
              exerciseEntry.exercises
          )
      )
      .flat();

    const filteredAndFlattenedExerciseData: Exercise[] = [];

    flattenedExerciseData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if(timeframe==="all"){
        return flattenedExerciseData
    }

    for (let index = 0; index < flattenedExerciseData.length; index++) {
      const exercise = flattenedExerciseData[index];

      const exerciseDate = new Date(exercise.date);
      const timeframeDate = new Date(today);

      if (timeframe === "1m") {
        timeframeDate.setMonth(today.getMonth() - 1);
      } else if (timeframe === "3m") {
        timeframeDate.setMonth(today.getMonth() - 3);
      } else if (timeframe === "6m") {
        timeframeDate.setMonth(today.getMonth() - 6);
      } else if (timeframe === "1y") {
        timeframeDate.setFullYear(today.getFullYear() - 1);
      } else {
        timeframeDate.setFullYear(today.getFullYear() - 100);
      }

      if (exerciseDate > timeframeDate) {
        filteredAndFlattenedExerciseData.push(exercise);
      }
    }
    filteredAndFlattenedExerciseData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return filteredAndFlattenedExerciseData;
  }

  export default getFlattenedExerciseData