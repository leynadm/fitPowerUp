import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedMuscleGroupData from "../../utility/getFlattenedMuscleGroupData";
import groupDataByTimePeriodSummed from "../../utility/groupDataByTimePeriodSummed";
import getTotalVolumeForMuscleGroup from "../getTotalVolumeForMuscleGroup";

export function handleGetTotalVolumeForMuscleGroup(
    userTrainingData: IWorkoutData[],
    muscleGroup: string,
    timeframe: string,
    dataGroup: string
  ) {
    const flattenedData = getFlattenedMuscleGroupData(
      userTrainingData,
      muscleGroup,
      timeframe
    );
    const groupedData = flattenedData
      ? groupDataByTimePeriodSummed(flattenedData, dataGroup)
      : [];
    const modeledData = groupedData
      ? getTotalVolumeForMuscleGroup(groupedData)
      : [];

    return modeledData;
  }