function getMaxSpeedForExercise(
  groupedData: {
    date: string;
    maxWeight: number;
    maxReps: number;
    maxDistance: number;
    maxTime: number;
    count: number;
  }[]
) {
  const exerciseData: { exerciseDate: string; value: number }[] = [];

  groupedData.forEach(
    (exercise: {
      date: string;
      maxWeight: number;
      maxReps: number;
      maxDistance: number;
      maxTime: number;
      count: number;
    }) => {
      const maximumDistance = exercise.maxDistance;
      const maximumTime = exercise.maxTime;
      const exerciseDate = exercise.date;

      if (maximumDistance > 0 && maximumTime > 0) {
        // Calculate speed as distance / time
        const speed = maximumDistance / maximumTime;
        // Round to 1 decimal place
        const value = parseFloat(speed.toFixed(1));
        exerciseData.push({ exerciseDate, value });
      }
    }
  );

  return exerciseData;
}

export default getMaxSpeedForExercise;
