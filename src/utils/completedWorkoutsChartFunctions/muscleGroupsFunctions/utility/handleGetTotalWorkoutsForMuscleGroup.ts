import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedMuscleGroupData from "../../utility/getFlattenedMuscleGroupData";
import groupDataByTimePeriodSets from "../../utility/groupDataByTimePeriodSets";
import getTotalWorkoutsForMuscleGroup from "../getTotalWorkoutsForMuscleGroup";

export function handleGetTotalWorkoutsForMuscleGroup(
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
      ? groupDataByTimePeriodSets(flattenedData, dataGroup)
      : [];
    const modeledData = groupedData
      ? getTotalWorkoutsForMuscleGroup(groupedData)
      : [];

    return modeledData;
  }