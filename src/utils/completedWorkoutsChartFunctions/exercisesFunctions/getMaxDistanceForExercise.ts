function getMaxDistanceForExercise(
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
        const maximumDistance = exercise.maxDistance
        const exerciseDate = exercise.date;

        if (maximumDistance >0) {
          const value = parseFloat(maximumDistance.toFixed(1));
          exerciseData.push({ exerciseDate, value });
        }
      }
    );

    return exerciseData;
  }

  export default getMaxDistanceForExercise