

function getTrainingVolumeByMuscleGroup(
    groupedData: {
        muscleGroup: string;
        summedWeight: number;
        summedReps: number;
        summedDistance: number;
        summedTime: number;
        count: number;
        summedVolume:number
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
          summedVolume:number;
        }) => {
          const muscleGroupVolume = exercise.summedVolume;
          const exerciseMuscleGroup = exercise.muscleGroup;
          if (muscleGroupVolume > 0) {
            const value = muscleGroupVolume;
            exerciseData.push({ exerciseMuscleGroup , value });
          }
        }
      );
  
      return exerciseData;


}

export default getTrainingVolumeByMuscleGroup