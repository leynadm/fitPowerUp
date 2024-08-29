import { Exercise } from "./IUserTrainingData";
interface IPresetWorkoutDataForRoutine {
  wEx: { name: string; exercises: Exercise[] }[];
  del: boolean;
  wName: string;
  wDesc: string;
  wOvr: string[];
  wBy: string;
  wLink:string;
  wInt:number;
}
export default IPresetWorkoutDataForRoutine;
