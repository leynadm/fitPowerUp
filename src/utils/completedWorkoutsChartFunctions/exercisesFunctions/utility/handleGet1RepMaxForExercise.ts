import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedExerciseData from "../../utility/getFlattenedExerciseData";
import groupDataByTimePeriodAverage from "../../utility/groupDataByTimePeriodAverage";
import get1RepMaxForExercise from "../get1RepMaxForExercise";

function handleGet1RepMaxForExercise(
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
      ? groupDataByTimePeriodAverage(flattenedData, dataGroup)
      : [];
    const modeledData = groupedData ? get1RepMaxForExercise(groupedData) : [];
    return modeledData;
  }

export default handleGet1RepMaxForExercise