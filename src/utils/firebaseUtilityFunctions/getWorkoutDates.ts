import { IWorkoutData } from "../firebaseDataFunctions/uploadImportedData";
import getFlattenedAllExerciseData from "../completedWorkoutsChartFunctions/utility/getFlattenedAllExerciseData";
function getWorkoutDates(userTrainingData: IWorkoutData[]) {
  const flattenedDatesData = getFlattenedAllExerciseData(
    userTrainingData,
    "all"
  );

  const uniqueDates = Array.from(
    new Set(flattenedDatesData.map((item) => item.date))
  );

  return uniqueDates;
}

export default getWorkoutDates;
