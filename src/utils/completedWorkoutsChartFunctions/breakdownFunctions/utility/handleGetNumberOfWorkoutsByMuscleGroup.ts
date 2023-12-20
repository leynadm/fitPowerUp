import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedOverallMuscleGroupData from "./getFlattenedOverallMuscleGroupData";
import groupDataByWorkoutsMuscleGroup from "./groupDataByWorkoutsMuscleGroups";
import getNumberOfWorkoutsByMuscleGroup from "../muscleGroups/getNumberOfWorkoutsByMuscleGroup";

function handleGetNumberOfWorkoutsByMuscleGroup(
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
    ? groupDataByWorkoutsMuscleGroup(flattenedData)
    : [];

  const modeledData = groupedData
    ? getNumberOfWorkoutsByMuscleGroup(groupedData)
    : [];

  return modeledData;
}

export default handleGetNumberOfWorkoutsByMuscleGroup;
