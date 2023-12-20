import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedOverallExerciseData from "./getFlattenedOverallExerciseData";
import groupDataByExerciseForVolume from "./groupDataByExerciseForVolume";
import getTrainingVolumeByExercise from "../exercises/getTrainingVolumeByExercise";

function handleGetTrainingVolumeByExercise(
    userTrainingData: IWorkoutData[],
    timeframe: string,
    startDate: string,
    endDate: string
  ) {
    const flattenedData = getFlattenedOverallExerciseData(
      userTrainingData,
      timeframe,
      startDate,
      endDate
    );

    const groupedData = flattenedData
      ? groupDataByExerciseForVolume(flattenedData)
      : [];

    const modeledData = groupedData
      ? getTrainingVolumeByExercise(groupedData)
      : [];

    if (modeledData) {
      modeledData.sort((a, b) => b.value - a.value);
    }
    return modeledData;
  }

export default handleGetTrainingVolumeByExercise