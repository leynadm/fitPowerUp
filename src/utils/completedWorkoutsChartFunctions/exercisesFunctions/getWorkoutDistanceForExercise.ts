function getWorkoutDistanceForExercise(
    groupedData: {
      date: string;
      summedWeight: number;
      summedReps: number;
      summedDistance: number;
      summedTime: number;
      count: number;
    }[]
  ) {
    const exerciseData: { exerciseDate: string; value: number }[] = [];

    groupedData.forEach(
      (exercise: {
        date: string;
        summedWeight: number;
        summedReps: number;
        summedDistance: number;
        summedTime: number;
        count: number;
      }) => {
        const totalDistance = exercise.summedDistance;
        const exerciseDate = exercise.date;

        if (totalDistance > 0) {
          const value = parseFloat(totalDistance.toFixed(1));
          exerciseData.push({ exerciseDate, value });
        }
      }
    );

    return exerciseData;
  }

  export default getWorkoutDistanceForExercise