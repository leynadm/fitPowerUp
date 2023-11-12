

function getNumberOfWorkoutsByExercise(
    groupedData: {
        exerciseName: string;
        summedWeight: number;
        summedReps: number;
        summedDistance: number;
        summedTime: number;
        count: number;
        workouts:number
      }[]
    ) {
      const exerciseData: { exerciseName: string; value: number }[] = [];
  
      groupedData.forEach(
        (exercise: {
          exerciseName: string;
          summedWeight: number;
          summedReps: number;
          summedDistance: number;
          summedTime: number;
          count: number;
          workouts:number
        }) => {
          const exerciseNameWorkouts = exercise.workouts;
          const exerciseName = exercise.exerciseName;
  
          if (exerciseNameWorkouts > 0) {
            const value = parseFloat(exerciseNameWorkouts.toFixed(1));
            exerciseData.push({ exerciseName , value });
          }
        }
      );
  
      return exerciseData;


}

export default getNumberOfWorkoutsByExercise