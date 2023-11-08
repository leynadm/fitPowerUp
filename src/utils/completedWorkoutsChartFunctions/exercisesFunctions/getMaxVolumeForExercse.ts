function getMaxVolumeForExercise(
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
        const avgReps = exercise.maxReps;
        const avgWeight = exercise.maxWeight;
        const exerciseDate = exercise.date;

        if (avgReps > 0 && avgWeight > 0) {
          const value = parseFloat((avgWeight * avgReps).toFixed(1));
          exerciseData.push({ exerciseDate, value });
        }
      }
    );

    return exerciseData;
  }

  export default getMaxVolumeForExercise