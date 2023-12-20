import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedExerciseData from "../../utility/getFlattenedExerciseData";
import groupDataByTimePeriodForReps from "../../utility/groupDataByTimePeriodReps";
import getMaxWeightForReps from "../getMaxWeightForReps";

function handleGetMaxWeightForReps(
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
      ? groupDataByTimePeriodForReps(flattenedData, dataGroup)
      : [];
    const modeledData = groupedData ? getMaxWeightForReps(groupedData) : [];
    return modeledData;
  }

export default handleGetMaxWeightForReps
