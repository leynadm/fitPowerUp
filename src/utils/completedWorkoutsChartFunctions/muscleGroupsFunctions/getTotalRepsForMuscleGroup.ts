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
      const sumReps = exercise.summedReps;
      const exerciseDate = exercise.date;

      if (sumReps > 0) {
        const value = parseFloat(sumReps.toFixed(1));
        muscleGroupData.push({ exerciseDate, value });
      }
    }
  );

  return muscleGroupData;

}

export default getTotalRepsForMuscleGroup;
