import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedOverallMuscleGroupData from "./getFlattenedOverallMuscleGroupData";
import groupDataByMuscleG from "./groupDataByMuscleG";
import getNumberOfRepsByMuscleGroup from "../muscleGroups/getNumberOfRepsByMuscleGroup";

function handleGetNumberOfRepsByMuscleGroup(
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
    ? getNumberOfRepsByMuscleGroup(groupedData)
    : [];

  return modeledData;
}

export default handleGetNumberOfRepsByMuscleGroup;
