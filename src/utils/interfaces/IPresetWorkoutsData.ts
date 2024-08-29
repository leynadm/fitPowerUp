import { Exercise } from "./IUserTrainingData";
interface IPresetWorkoutData {
  wEx: { name: string; exercises: Exercise[] }[];
  del: boolean;
  wName: string;
  wDesc: string;
  wOvr: string[];
  wBy: string;
  wLink:string;
  wInt:number;
  id:string;
}
export default IPresetWorkoutData;
