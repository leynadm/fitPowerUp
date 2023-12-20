import getFlattenedOverallExerciseData from "./getFlattenedOverallExerciseData";
import groupDataByWorkoutsExercise from "./groupDataByWorkoutsExercise";
import getNumberOfWorkoutsByExercise from "../exercises/getNumberOfWorkoutsByExercise";
import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
function handleGetNumberOfWorkoutsByExercise(
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
    ? groupDataByWorkoutsExercise(flattenedData)
    : [];

  const modeledData = groupedData
    ? getNumberOfWorkoutsByExercise(groupedData)
    : [];

  if (modeledData) {
    modeledData.sort((a, b) => b.value - a.value);
  }

  return modeledData;
}

export default handleGetNumberOfWorkoutsByExercise;
