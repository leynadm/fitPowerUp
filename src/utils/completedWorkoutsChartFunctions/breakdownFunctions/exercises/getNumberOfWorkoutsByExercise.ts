import capitalizeWords from "../../../capitalizeWords";

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
      const exerciseData: { name: string; value: number }[] = [];
  
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
          const name = capitalizeWords(exercise.exerciseName);
  
          if (exerciseNameWorkouts > 0) {
            const value = parseFloat(exerciseNameWorkouts.toFixed(1));
            exerciseData.push({ name , value });
          }
        }
      );
  
      return exerciseData;


}

export default getNumberOfWorkoutsByExercise