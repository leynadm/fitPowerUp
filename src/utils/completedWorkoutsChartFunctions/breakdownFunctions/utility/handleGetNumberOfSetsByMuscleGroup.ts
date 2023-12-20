import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedOverallMuscleGroupData from "./getFlattenedOverallMuscleGroupData";
import groupDataByMuscleG from "./groupDataByMuscleG";
import getNumberOfSetsByMuscleGroup from "../muscleGroups/getNumberOfSetsByMuscleGroup";

function handleGetNumberOfSetsByMuscleGroup(
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

  const groupedData = flattenedData ? groupDataByMuscleG(flattenedData) : [];

  const modeledData = groupedData
    ? getNumberOfSetsByMuscleGroup(groupedData)
    : [];

  return modeledData;
}

export default handleGetNumberOfSetsByMuscleGroup;
