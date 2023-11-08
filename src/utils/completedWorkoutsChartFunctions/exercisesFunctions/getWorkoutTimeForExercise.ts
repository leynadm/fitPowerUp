function getWorkoutTimeForExercise(
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
        const totalTime = exercise.summedTime;
        const exerciseDate = exercise.date;

        if (totalTime > 0) {
          const value = parseFloat(totalTime.toFixed(1));
          exerciseData.push({ exerciseDate, value });
        }
      }
    );

    return exerciseData;
  }

  export default getWorkoutTimeForExercise