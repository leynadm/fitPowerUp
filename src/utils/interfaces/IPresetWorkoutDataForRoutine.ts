import { Exercise } from "./IUserTrainingData";
interface IPresetWorkoutDataForRoutine {
  wExercises: { name: string; exercises: Exercise[] }[];
  id: string;
  delete: boolean;
  workoutName: string;
  workoutDescription: string;
  exercisesinRoutine: string[];
  [key: string]: any;
}
export default IPresetWorkoutDataForRoutine;
