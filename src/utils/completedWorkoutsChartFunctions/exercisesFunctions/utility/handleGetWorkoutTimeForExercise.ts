import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedExerciseData from "../../utility/getFlattenedExerciseData";
import groupDataByTimePeriodSummed from "../../utility/groupDataByTimePeriodSummed";
import getWorkoutTimeForExercise from "../getWorkoutTimeForExercise";

function handleGetWorkoutTimeForExercise(
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
  const modeledData = groupedData ? getWorkoutTimeForExercise(groupedData) : [];
  return modeledData;
}

export default handleGetWorkoutTimeForExercise;
