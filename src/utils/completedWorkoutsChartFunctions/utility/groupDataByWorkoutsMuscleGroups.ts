import { format, getISOWeek } from "date-fns";
import Exercise from "../../interfaces/Exercise";

function groupDataByWorkoutsMuscleGroup(flattenedData: Exercise[]) {
  const groupedData: {
    summedWeight: number;
    summedReps: number;
    summedDistance: number;
    summedTime: number;
    count: number;
    muscleGroup: string;
    workouts: number;
  }[] = [];

  flattenedData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  let trackDate = "";

  flattenedData.forEach((exercise: Exercise, index: number) => {
    let groupedExercise = groupedData.find(
      (group) => group.muscleGroup === exercise.category
    );

    if (!groupedExercise) {
      groupedExercise = {
        summedWeight: 0,
        summedReps: 0,
        summedDistance: 0,
        summedTime: 0,
        count: 0,
        workouts: 1,
        muscleGroup: exercise.category,
      };
      groupedData.push(groupedExercise);
    }

    if (trackDate !== exercise.date) {
      groupedExercise.workouts++;
    }
    // Increment counts and summed the exercise properties
    groupedExercise.count++;
    groupedExercise.summedWeight += exercise.weight;
    groupedExercise.summedReps += exercise.reps;
    groupedExercise.summedDistance += exercise.distance;
    groupedExercise.summedTime += exercise.time;

    trackDate = exercise.date;
  });

  return groupedData;
}

export default groupDataByWorkoutsMuscleGroup;
