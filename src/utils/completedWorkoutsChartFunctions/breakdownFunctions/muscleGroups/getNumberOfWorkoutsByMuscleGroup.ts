

function getNumberOfWorkoutsByMuscleGroup(
    groupedData: {
        muscleGroup: string;
        summedWeight: number;
        summedReps: number;
        summedDistance: number;
        summedTime: number;
        count: number;
        workouts:number
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
          workouts:number
        }) => {
          const muscleGroupWorkouts = exercise.workouts;
          const exerciseMuscleGroup = exercise.muscleGroup;
  
          if (muscleGroupWorkouts > 0) {
            const value = parseFloat(muscleGroupWorkouts.toFixed(1));
            exerciseData.push({ exerciseMuscleGroup , value });
          }
        }
      );
  
      return exerciseData;


}

export default getNumberOfWorkoutsByMuscleGroup