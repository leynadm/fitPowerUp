import { Exercise } from "./IUserTrainingData";
interface IPresetWorkoutData {
  wExercises: { name: string; exercises: Exercise[] }[];
  id: string;
  delete: boolean;
  workoutName: string;
  workoutDescription: string;
  exercisesinRoutine: string[];

  workoutBy: string;
  [key: string]: any;
}
export default IPresetWorkoutData;
