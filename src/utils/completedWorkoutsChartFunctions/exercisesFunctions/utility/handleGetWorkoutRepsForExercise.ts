import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedExerciseData from "../../utility/getFlattenedExerciseData";
import groupDataByTimePeriodSummed from "../../utility/groupDataByTimePeriodSummed";
import getWorkoutRepsForExercise from "../getWorkoutRepsForExercise";
function handleGetWorkoutRepsForExercise(
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
  const modeledData = groupedData ? getWorkoutRepsForExercise(groupedData) : [];
  return modeledData;
}
export default handleGetWorkoutRepsForExercise;
