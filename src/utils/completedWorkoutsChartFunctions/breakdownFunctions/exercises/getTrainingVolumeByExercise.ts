import capitalizeWords from "../../../capitalizeWords";

function getTrainingVolumeByExercise(
    groupedData: {
        exerciseName: string;
        summedWeight: number;
        summedReps: number;
        summedDistance: number;
        summedTime: number;
        count: number;
        summedVolume:number
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
          summedVolume:number;
        }) => {
          const name = capitalizeWords(exercise.exerciseName);
          const summedVolume = exercise.summedVolume; // Use the correct summed volume
      
          // Only add to exerciseData if summedVolume is greater than 0
          if (summedVolume > 0) {
            exerciseData.push({ name, value: summedVolume });
          }
        }
      );
  
      return exerciseData;

}

export default getTrainingVolumeByExercise