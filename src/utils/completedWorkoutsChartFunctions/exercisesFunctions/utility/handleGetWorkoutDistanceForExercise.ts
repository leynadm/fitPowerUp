import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedExerciseData from "../../utility/getFlattenedExerciseData";
import groupDataByTimePeriodSummed from "../../utility/groupDataByTimePeriodSummed";
import getWorkoutDistanceForExercise from "../getWorkoutDistanceForExercise";

function handleGetWorkoutDistanceForExercise(
  userTrainingData: IWorkoutData[],
  exerciseName: string,
  timeframe: string,
  dataGroup: string
) {
  const flattenedData = getFlattenedExerciseData(
    userTrainingData,
    exerciseName,
    timeframe
  );
  const groupedData = flattenedData
    ? groupDataByTimePeriodSummed(flattenedData, dataGroup)
    : [];
  const modeledData = groupedData
    ? getWorkoutDistanceForExercise(groupedData)
    : [];
  return modeledData;
}

export default handleGetWorkoutDistanceForExercise;
