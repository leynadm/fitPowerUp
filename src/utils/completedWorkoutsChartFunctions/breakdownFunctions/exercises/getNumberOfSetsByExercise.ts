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
      const exerciseNameSets = exercise.count;
      const exerciseName = exercise.exerciseName;

      if (exerciseNameSets > 0) {
        const value = parseFloat(exerciseNameSets.toFixed(1));
        exerciseData.push({ exerciseName, value });
      }
    }
  );

  return exerciseData;
}

export default getNumberOfSetsByExercise;
