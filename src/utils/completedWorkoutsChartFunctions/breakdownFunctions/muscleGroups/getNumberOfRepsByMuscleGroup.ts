

function getNumberOfRepsByMuscleGroup(
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
          const muscleGroupReps = exercise.summedReps;
          const exerciseMuscleGroup = exercise.muscleGroup;
  
          if (muscleGroupReps > 0) {
            const value = parseFloat(muscleGroupReps.toFixed(1));
            exerciseData.push({ exerciseMuscleGroup , value });
          }
        }
      );
  
      return exerciseData;


}

export default getNumberOfRepsByMuscleGroup