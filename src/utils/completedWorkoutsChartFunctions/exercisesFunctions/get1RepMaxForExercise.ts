function get1RepMaxForExercise(
  groupedData: {
    date: string;
    weight: number;
    reps: number;
    distance: number;
    time: number;
    count: number;
  }[]
) {
  const exerciseData: { exerciseDate: string; value: number }[] = [];

  groupedData.forEach(
    (exercise: {
      date: string;
      weight: number;
      reps: number;
      distance: number;
      time: number;
      count: number;
    }) => {
      const reps = exercise.reps;
      const weight = exercise.weight;
      const exerciseDate = exercise.date;

      if (reps > 0 && weight > 0) {
        // Calculate the 1RM using the Brzycki formula and format to one decimal place
        const value = parseFloat(
          (weight / (1.0278 - 0.0278 * reps)).toFixed(1)
        );
        exerciseData.push({ exerciseDate, value });
      }
    }
  );

  return exerciseData;
}

export default get1RepMaxForExercise;
