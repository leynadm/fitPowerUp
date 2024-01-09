import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedMuscleGroupData from "../../utility/getFlattenedMuscleGroupData";
import groupDataByTimePeriodSummed from "../../utility/groupDataByTimePeriodSummed";
import getTotalSetsForMuscleGroup from "../getTotalSetsForMuscleGroup";
import getFlattenedAllMuscleGroupData from "../../utility/getFlattenedAllMuscleGroupData";
export function handleGetTotalSetsForMuscleGroup(
    userTrainingData: IWorkoutData[],
    muscleGroup: string,
    timeframe: string,
    dataGroup: string
  ) {
    let flattenedData;
    
    if(muscleGroup==="Total"){
      flattenedData= getFlattenedAllMuscleGroupData(
        userTrainingData,
        timeframe
      );
    } else {
      flattenedData= getFlattenedMuscleGroupData(
        userTrainingData,
        muscleGroup,
        timeframe
      );
    }
    
    const groupedData = flattenedData
      ? groupDataByTimePeriodSummed(flattenedData, dataGroup)
      : [];
    const modeledData = groupedData
      ? getTotalSetsForMuscleGroup(groupedData)
      : [];

    return modeledData;
  }