import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedExerciseData from "../../utility/getFlattenedExerciseData";
import groupDataByTimePeriodMax from "../../utility/groupDataByTimePeriodMax";
import getMaxSpeedForExercise from "../getMaxSpeedForExercise";

function handleGetMaxSpeedForExercise(
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
    ? groupDataByTimePeriodMax(flattenedData, dataGroup)
    : [];
  const modeledData = groupedData ? getMaxSpeedForExercise(groupedData) : [];
  return modeledData;
}

export default handleGetMaxSpeedForExercise;
