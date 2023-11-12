

function getTrainingVolumeByExercise(
    groupedData: {
        exerciseName: string;
        summedWeight: number;
        summedReps: number;
        summedDistance: number;
        summedTime: number;
        count: number;
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
        }) => {
          const exerciseNameReps = exercise.summedReps;
          const exerciseNameWeight = exercise.summedWeight
          const exerciseName = exercise.exerciseName;
          const exerciseCount = exercise.count
          if (exerciseNameReps > 0) {
            const value = parseFloat(((exerciseNameReps * exerciseNameWeight)/exerciseCount).toFixed(1));
            exerciseData.push({ exerciseName , value });
          }
        }
      );
  
      return exerciseData;


}

export default getTrainingVolumeByExercise