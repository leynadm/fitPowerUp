import { IWorkoutData } from "../../../interfaces/IUserTrainingData";
import handleGetNumberOfRepsByMuscleGroup from "./handleGetNumberOfRepsByMuscleGroup";
import handleGetNumberOfRepsByExercise from "./handleGetNumberOfRepsByExercise";
import handleGetNumberOfWorkoutsByExercise from "./handleGetNumberOfWorkoutsByExercise";
import handleGetNumberOfWorkoutsByMuscleGroup from "./handleGetNumberOfWorkoutsByMuscleGroup";
import handleGetTrainingVolumeByExercise from "./handleGetTrainingVolumeByExercise";
import handleGetTrainingVolumeByMuscleGroup from "./handleGetTrainingVolumeByMuscleGroup";
import handleGetNumberOfSetsByMuscleGroup from "./handleGetNumberOfSetsByMuscleGroup";
import handleGetNumberOfSetsByExercise from "./handleGetNumberOfSetsByExercise";

const fetchModeledDataBreakdown = (
    userTrainingData: IWorkoutData[],
    kpi: string,
    timeframe: string,
    startDate: string,
    endDate: string,

  ) => {
    let standardData;
    let data;
    switch (kpi) {
      case "Number of Reps by Muscle Group":
        standardData = handleGetNumberOfRepsByMuscleGroup(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        data = { muscleGroupChartCheck: true, standardData };
        break;

      case "Number of Workouts by Muscle Group":
        standardData = handleGetNumberOfWorkoutsByMuscleGroup(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        data = { muscleGroupChartCheck: true, standardData };
        break;

      case "Training Volume by Muscle Group":
        standardData = handleGetTrainingVolumeByMuscleGroup(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        data = { muscleGroupChartCheck: true, standardData };
        break;

      case "Number of Sets by Muscle Group":
        standardData = handleGetNumberOfSetsByMuscleGroup(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        data = { muscleGroupChartCheck: true, standardData };
        break;
      case "Number of Reps by Exercise":
        standardData = handleGetNumberOfRepsByExercise(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        data = { muscleGroupChartCheck: false, standardData };
        break;

      case "Number of Workouts by Exercise":
        standardData = handleGetNumberOfWorkoutsByExercise(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        data = { muscleGroupChartCheck: false, standardData };
        break;

      case "Training Volume by Exercise":
        standardData = handleGetTrainingVolumeByExercise(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        data = { muscleGroupChartCheck: false, standardData };
        break;

      case "Number of Sets by Exercise":
        standardData = handleGetNumberOfSetsByExercise(
          userTrainingData,
          timeframe,
          startDate,
          endDate
        );
        data = { muscleGroupChartCheck: false, standardData };
        break;

      default:
        break;
    }

    return data;
  };

export default fetchModeledDataBreakdown