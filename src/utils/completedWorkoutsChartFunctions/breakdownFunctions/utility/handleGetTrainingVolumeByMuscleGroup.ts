import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedOverallMuscleGroupData from "./getFlattenedOverallMuscleGroupData";
import groupDataByMuscleGForVolume from "./groupDataByMuscleGForVolume";
import getTrainingVolumeByMuscleGroup from "../muscleGroups/getTrainingVolumeByMuscleGroup";

function handleGetTrainingVolumeByMuscleGroup(
  userTrainingData: IWorkoutData[],
  timeframe: string,
  startDate: string,
  endDate: string
) {
  const flattenedData = getFlattenedOverallMuscleGroupData(
    userTrainingData,
    timeframe,
    startDate,
    endDate
  );

  const groupedData = flattenedData
    ? groupDataByMuscleGForVolume(flattenedData)
    : [];

  const modeledData = groupedData
    ? getTrainingVolumeByMuscleGroup(groupedData)
    : [];

  return modeledData;
}

export default handleGetTrainingVolumeByMuscleGroup;
