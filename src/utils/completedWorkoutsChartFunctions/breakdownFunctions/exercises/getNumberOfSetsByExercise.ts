import capitalizeWords from "../../../capitalizeWords";

function getNumberOfSetsByExercise(
  groupedData: {
    exerciseName: string;
    summedWeight: number;
    summedReps: number;
    summedDistance: number;
    summedTime: number;
    count: number;
  }[]
) {
  const exerciseData: { name: string; value: number }[] = [];

  groupedData.forEach(
    (exercise: {
      exerciseName: string;
      summedWeight: number;
      summedReps: number;
      summedDistance: number;
      summedTime: number;
      count: number;
    }) => {
      const exerciseNameSets = exercise.count;
      const name = capitalizeWords(exercise.exerciseName);

      if (exerciseNameSets > 0) {
        const value = parseFloat(exerciseNameSets.toFixed(1));
        exerciseData.push({ name, value });
      }
    }
  );

  return exerciseData;
}

export default getNumberOfSetsByExercise;
