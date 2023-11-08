function getTotalSeriesForMuscleGroup(
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
      const series = exercise.count
      if (sumReps > 0) {
        const value = parseFloat((series).toFixed(1));
        muscleGroupData.push({ exerciseDate, value });
      }
    }
  );

  return muscleGroupData;

}

export default getTotalSeriesForMuscleGroup;
