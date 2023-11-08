function get1RepMaxForExercise(
    groupedData: {
      date: string;
      averageWeight: number;
      averageReps: number;
      averageDistance: number;
      averageTime: number;
      count: number;
    }[]
  ) {
    const exerciseData: { exerciseDate: string; value: number }[] = [];

    groupedData.forEach(
      (exercise: {
        date: string;
        averageWeight: number;
        averageReps: number;
        averageDistance: number;
        averageTime: number;
        count: number;
      }) => {
        const avgReps = exercise.averageReps;
        const avgWeight = exercise.averageWeight;
        const exerciseDate = exercise.date;

        if (avgReps > 0 && avgWeight > 0) {
          const value = parseFloat(
            (avgWeight * (1 + 0.0333 * avgReps)).toFixed(1)
          );
          exerciseData.push({ exerciseDate, value });
        }
      }
    );

    return exerciseData;
  }

  export default get1RepMaxForExercise