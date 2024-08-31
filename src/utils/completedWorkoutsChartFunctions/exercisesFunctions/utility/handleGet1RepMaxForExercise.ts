import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedExerciseData from "../../utility/getFlattenedExerciseData";
import get1RepMaxForExercise from "../get1RepMaxForExercise";
import groupDataByTimePeriodMax1RM from "../../utility/groupDataByTimePeriodDefault";
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
      ? groupDataByTimePeriodMax1RM(flattenedData, dataGroup)
      : [];
    console.log({groupedData})
      const modeledData = groupedData ? get1RepMaxForExercise(groupedData) : [];
    return modeledData;
  }

export default handleGet1RepMaxForExercise