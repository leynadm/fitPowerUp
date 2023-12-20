import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedOverallExerciseData from "./getFlattenedOverallExerciseData";
import groupDataByExercise from "./groupDataByExercise";
import getNumberOfRepsByExercise from "../exercises/getNumberOfRepsByExercise";

function handleGetNumberOfRepsByExercise(
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

  const groupedData = flattenedData ? groupDataByExercise(flattenedData) : [];

  const modeledData = groupedData ? getNumberOfRepsByExercise(groupedData) : [];

  if (modeledData) {
    modeledData.sort((a, b) => b.value - a.value);
  }

  return modeledData;
}

export default handleGetNumberOfRepsByExercise;
