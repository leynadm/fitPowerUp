import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import { handleGetTotalRepsForMuscleGroup } from "./handleGetTotalRepsForMuscleGroup";
import { handleGetTotalSetsForMuscleGroup } from "./handleGetTotalSetsForMuscleGroup";
import { handleGetTotalWorkoutsForMuscleGroup } from "./handleGetTotalWorkoutsForMuscleGroup";
import { handleGetTotalVolumeForMuscleGroup } from "./handleGetTotalVolumeForMuscleGroup";
const fetchModeledData = (
    userTrainingData: IWorkoutData[],
    muscleGroup: string,
    kpi: string,
    timeframe: string,
    dataGroup: string,
  ) => {

    if (!muscleGroup) {
      return;
    }

    let data;

    switch (kpi) {
      case "Total Reps":
        data = handleGetTotalRepsForMuscleGroup(
          userTrainingData,
          muscleGroup,
          timeframe,
          dataGroup
        );
        break;

      case "Total Sets":
        data = handleGetTotalSetsForMuscleGroup(
          userTrainingData,
          muscleGroup,
          timeframe,
          dataGroup
        );
        break;
      case "Total Workouts":
        data = handleGetTotalWorkoutsForMuscleGroup(
          userTrainingData,
          muscleGroup,
          timeframe,
          dataGroup
        );
        break;
      case "Total Volume":
        data = handleGetTotalVolumeForMuscleGroup(
          userTrainingData,
          muscleGroup,
          timeframe,
          dataGroup
        );
        break;

      default:
        break;
    }

    return data;
  };

export default fetchModeledData