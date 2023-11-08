function getWorkoutVolumeForExercise(
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
        const totalReps = exercise.summedReps;
        const totalWeight = exercise.summedWeight;
        const exerciseDate = exercise.date;

        if (totalReps > 0 && totalWeight > 0) {
          const value = parseFloat(
            ((totalWeight * totalReps) / exercise.count).toFixed(1)
          );
          exerciseData.push({ exerciseDate, value });
        }
      }
    );

    return exerciseData;
  }

  export default getWorkoutVolumeForExercise