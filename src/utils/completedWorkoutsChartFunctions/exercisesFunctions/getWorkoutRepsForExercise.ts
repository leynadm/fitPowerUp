function getWorkoutRepsForExercise(
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
        const exerciseDate = exercise.date;

        if (totalReps > 0) {
          const value = parseFloat(totalReps.toFixed(1));
          exerciseData.push({ exerciseDate, value });
        }
      }
    );

    return exerciseData;
  }

  export default getWorkoutRepsForExercise