import groupDataOverall from "../utility/groupDataOverall";
import getFlattenedOverallExerciseData from "../utility/getFlattenedOverallExerciseData";
import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
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