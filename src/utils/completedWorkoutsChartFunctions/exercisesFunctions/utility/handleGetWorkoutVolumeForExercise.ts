import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import getFlattenedExerciseData from "../../utility/getFlattenedExerciseData";
import groupDataByTimePeriodSummed from "../../utility/groupDataByTimePeriodSummed";
import getWorkoutVolumeForExercise from "../getWorkoutVolumeForExercise";

function handleGetWorkoutVolumeForExercise(
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
    ? getWorkoutVolumeForExercise(groupedData)
    : [];
  return modeledData;
}

export default handleGetWorkoutVolumeForExercise;
