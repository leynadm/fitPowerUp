import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedExerciseData from "../../utility/getFlattenedExerciseData";
import groupDataByTimePeriodMax from "../../utility/groupDataByTimePeriodMax";
import getMaxWeightForExercise from "../getMaxWeightForExercise";

function handleGetMaxWeightForExercise(
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
    const modeledData = groupedData ? getMaxWeightForExercise(groupedData) : [];
    return modeledData;
  }

export default handleGetMaxWeightForExercise