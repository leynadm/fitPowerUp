import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedMuscleGroupData from "../../utility/getFlattenedMuscleGroupData";
import groupDataByTimePeriodSummed from "../../utility/groupDataByTimePeriodSummed";
import getTotalRepsForMuscleGroup from "../getTotalRepsForMuscleGroup";

export function handleGetTotalRepsForMuscleGroup(
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
      ? getTotalRepsForMuscleGroup(groupedData)
      : [];

    return modeledData;
  }