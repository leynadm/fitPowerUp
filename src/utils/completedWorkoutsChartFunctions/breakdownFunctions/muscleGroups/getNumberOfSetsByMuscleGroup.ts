

function getNumberOfSetsByMuscleGroup(
    groupedData: {
        muscleGroup: string;
        summedWeight: number;
        summedReps: number;
        summedDistance: number;
        summedTime: number;
        count: number;
      }[]
    ) {
      const exerciseData: { exerciseMuscleGroup: string; value: number }[] = [];
  
      groupedData.forEach(
        (exercise: {
          muscleGroup: string;
          summedWeight: number;
          summedReps: number;
          summedDistance: number;
          summedTime: number;
          count: number;
        }) => {
          const muscleGroupSets = exercise.count;
          const exerciseMuscleGroup = exercise.muscleGroup;
  
          if (muscleGroupSets > 0) {
            const value = parseFloat(muscleGroupSets.toFixed(1));
            exerciseData.push({ exerciseMuscleGroup , value });
          }
        }
      );
  
      return exerciseData;


}

export default getNumberOfSetsByMuscleGroup