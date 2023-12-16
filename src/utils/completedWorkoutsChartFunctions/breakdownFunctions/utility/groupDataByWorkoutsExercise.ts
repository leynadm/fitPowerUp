import { format, getISOWeek } from "date-fns";
import Exercise from "../../../interfaces/Exercise";

function groupDataByWorkoutsExercise(flattenedData: Exercise[]) {
  const groupedData: {
    summedWeight: number;
    summedReps: number;
    summedDistance: number;
    summedTime: number;
    count: number;
    exerciseName: string;
    workouts: number;
  }[] = [];

  flattenedData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // First, sort by date
    const dateComparison = dateA.getTime() - dateB.getTime();
    if (dateComparison !== 0) {
      return dateComparison;
    }

    // If dates are equal, sort by category
    const categoryA = a.group;
    const categoryB = b.group;
    return categoryA.localeCompare(categoryB);
  });

  let trackDate = "";
  let currentExerciseName = ""
  flattenedData.forEach((exercise: Exercise, index: number) => {
    let groupedExercise = groupedData.find(
      (group) => group.exerciseName === exercise.exercise
    );

    if (!groupedExercise) {
      groupedExercise = {
        summedWeight: 0,
        summedReps: 0,
        summedDistance: 0,
        summedTime: 0,
        count: 0,
        workouts: 0,
        exerciseName: exercise.exercise,
      };
      groupedData.push(groupedExercise);
    }

    if (trackDate !== exercise.date || currentExerciseName!==exercise.exercise) {
      groupedExercise.workouts++;
    }
    // Increment counts and summed the exercise properties
    groupedExercise.count++;
    groupedExercise.summedWeight += exercise.weight;
    groupedExercise.summedReps += exercise.reps;
    groupedExercise.summedDistance += exercise.distance;
    groupedExercise.summedTime += exercise.time;

    trackDate = exercise.date;
    currentExerciseName=exercise.exercise
  });

  return groupedData;
}

export default groupDataByWorkoutsExercise;
