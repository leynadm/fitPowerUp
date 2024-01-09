function getTotalVolumeForMuscleGroup(
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
      const sumWeight = exercise.summedWeight;
      const exerciseDate = exercise.date;

      if (sumReps > 0 && sumWeight > 0) {
        const value = parseFloat(
          ((sumWeight * sumReps) / exercise.count).toFixed(1)
        );
        muscleGroupData.push({ exerciseDate, value });
      }
    }
  );

  return muscleGroupData;

}

export default getTotalVolumeForMuscleGroup;
