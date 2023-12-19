import capitalizeWords from "../../../capitalizeWords";
function getNumberOfRepsByExercise(
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
      const exerciseReps = exercise.summedReps;
      const name = capitalizeWords(exercise.exerciseName);

      if (exerciseReps > 0) {
        const value = parseFloat(exerciseReps.toFixed(1));
        exerciseData.push({ name, value });
      }
    }
  );

  return exerciseData;
}

export default getNumberOfRepsByExercise;
