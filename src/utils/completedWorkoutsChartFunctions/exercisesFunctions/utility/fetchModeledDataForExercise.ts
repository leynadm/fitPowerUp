import handleGet1RepMaxForExercise from "./handleGet1RepMaxForExercise";
import handleGetMaxWeightForExercise from "./handleGetMaxWeightForExercise";
import handleGetMaxRepsForExercise from "./handleGetMaxRepsForExercise";
import handleGetMaxDistanceForExercise from "./handleGetMaxDistanceForExercise";
import handleGetMaxTimeForExercise from "./handleGetMaxTimeForExercise";
import handleGetMaxSpeedForExercise from "./handleGetMaxSpeedForExercise";
import handleGetMaxPaceForExercise from "./handleGetMaxPaceForExercise";
import handleGetMaxVolumeForExercise from "./handleGetMaxVolumeForExercise";
import handleGetMaxWeightForReps from "./handleGetMaxWeightForReps";
import handleGetWorkoutVolumeForExercise from "./handleGetWorkoutVolumeForExercise";
import handleGetWorkoutTimeForExercise from "./handleGetWorkoutTimeForExercise";
import handleGetWorkoutRepsForExercise from "./handleGetWorkoutRepsForExercise";
import handleGetWorkoutDistanceForExercise from "./handleGetWorkoutDistanceForExercise";
import { IWorkoutData } from "../../../interfaces/IUserTrainingData";


interface ModeledDataResult {
  dataType: 'default' | 'weightReps';
  standardData?: { exerciseDate: string; value: number }[]; // Replace SomeType with the actual type for 'data'
  weightRepsData?: { date: string; reps6: number; reps8: number; reps12: number }[]; // Replace SomeOtherType with the actual type for 'weightRepsModeledData'
}

const fetchModeledDataForExercise = (
    userTrainingData: IWorkoutData[],
    userExerciseName: string,
    kpi: string,
    timeframe: string,
    dataGroup: string,
  ) => {

    /* 
    if (!userExerciseName) {
      return [];
    } */

    let data;
    let standardData;
    switch (kpi) {
      case "Estimated 1RM":
        standardData = handleGet1RepMaxForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;
      case "Max Weight":
        standardData = handleGetMaxWeightForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;
      case "Max Reps":
        standardData = handleGetMaxRepsForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;
      case "Max Distance":
        standardData = handleGetMaxDistanceForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;

      case "Max Time":
        standardData = handleGetMaxTimeForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;

      case "Max Speed":
        standardData = handleGetMaxSpeedForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;

      case "Max Pace":
        standardData = handleGetMaxPaceForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;

      case "Max Volume":
        standardData = handleGetMaxVolumeForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;
      case "Max Weight for Reps":
        let weightRepsData = handleGetMaxWeightForReps(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'weightReps', weightRepsData };
        break
      case "Workout Volume":
        standardData = handleGetWorkoutVolumeForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;
      case "Workout Time":
        standardData = handleGetWorkoutTimeForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;

      case "Workout Reps":
        standardData = handleGetWorkoutRepsForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;

      case "Workout Distance":
        standardData = handleGetWorkoutDistanceForExercise(
          userTrainingData,
          userExerciseName,
          timeframe,
          dataGroup
        );
        data = { dataType: 'default', standardData };
        break;

      default:
        break;
    }

    return data;
  };

  export default fetchModeledDataForExercise