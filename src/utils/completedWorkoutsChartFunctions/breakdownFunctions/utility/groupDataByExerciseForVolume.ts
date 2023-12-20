import { Exercise } from "../../../interfaces/IUserTrainingData";
function groupDataByExerciseForVolume(flattenedData: Exercise[]) {
  const groupedData: {
    summedWeight: number;
    summedReps: number;
    summedVolume: number; // Added for volume calculation
    summedDistance: number;
    summedTime: number;
    count: number;
    exerciseName: string;
  }[] = [];

  flattenedData.forEach((exercise: Exercise) => {
    let groupedExercise = groupedData.find(
      (group) => group.exerciseName === exercise.exercise
    );

    if (!groupedExercise) {
      groupedExercise = {
        summedWeight: 0,
        summedReps: 0,
        summedVolume: 0, // Initialize the summedVolume
        summedDistance: 0,
        summedTime: 0,
        count: 0,
        exerciseName: exercise.exercise,
      };
      groupedData.push(groupedExercise);
    }

    // Increment counts and sum the exercise properties
    groupedExercise.count++;
    groupedExercise.summedWeight += exercise.weight;
    groupedExercise.summedReps += exercise.reps;
    groupedExercise.summedDistance += exercise.distance;
    groupedExercise.summedTime += exercise.time;
    // Calculate the volume (reps * weight) for this entry and add it to the summedVolume
    groupedExercise.summedVolume += exercise.reps * exercise.weight;
  });

  return groupedData;
}

export default groupDataByExerciseForVolume;
