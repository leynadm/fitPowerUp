function getTotalWorkoutsForMuscleGroup(
  groupedData: {
    date: string;
    summedWeight: number;
    summedReps: number;
    summedDistance: number;
    summedTime: number;
    count: number;
    sets: number;
  }[]
) {
  const muscleGroupData: { exerciseDate: string; value: number }[] = [];
  groupedData.forEach(
    (exercise: {
      date: string;
      summedWeight: number;
      summedReps: number;
      summedDistance: number;
      summedTime: number;
      count: number;
      sets: number;
    }) => {
      const sumReps = exercise.summedReps;
      const exerciseDate = exercise.date;
      const sets = exercise.sets;
      if (sumReps > 0) {
        const value = parseFloat(sets.toFixed(1));
        muscleGroupData.push({ exerciseDate, value });
      }
    }
  );
  return muscleGroupData;
}

export default getTotalWorkoutsForMuscleGroup;
