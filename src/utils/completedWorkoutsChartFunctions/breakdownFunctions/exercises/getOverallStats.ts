import groupDataOverall from "../utility/groupDataOverall";
import getFlattenedOverallExerciseData from "../utility/getFlattenedOverallExerciseData";
import { IWorkoutData } from "../../../firebaseDataFunctions/completeWorkout";

function getOverallStats(userTrainingData:IWorkoutData[]) {

    const flattenedData = getFlattenedOverallExerciseData(
      userTrainingData,
      "all",
      "",
      ""
    );

    const groupedData = groupDataOverall(flattenedData);
    return groupedData;
  }

  export default getOverallStats