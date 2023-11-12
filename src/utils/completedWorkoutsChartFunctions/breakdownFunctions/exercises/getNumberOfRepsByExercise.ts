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
  const exerciseData: { exerciseName: string; value: number }[] = [];

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
      const exerciseName = exercise.exerciseName;

      if (exerciseReps > 0) {
        const value = parseFloat(exerciseReps.toFixed(1));
        exerciseData.push({ exerciseName, value });
      }
    }
  );

  return exerciseData;
}

export default getNumberOfRepsByExercise;
