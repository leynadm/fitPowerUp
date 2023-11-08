function getTotalRepsForMuscleGroup(
  groupedData: {
    date: string;
    summedWeight: number;
    summedReps: number;
    summedDistance: number;
    summedTime: number;
    count: number;
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
    }) => {
      const avgReps = exercise.summedReps;
      const avgWeight = exercise.summedWeight;
      const exerciseDate = exercise.date;

      if (avgReps > 0 && avgWeight > 0) {
        const value = parseFloat(avgReps.toFixed(1));
        muscleGroupData.push({ exerciseDate, value });
      }
    }
  );

  return muscleGroupData;

}

export default getTotalRepsForMuscleGroup;
