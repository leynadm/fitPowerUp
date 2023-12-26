import { Exercise } from "./IUserTrainingData";
interface IPresetWorkoutData {
    wExercises: { name: string; exercises: Exercise[] }[];
    id: string;
    routineName:string,
    delete:boolean,
    routineDescription:string,
    workoutName:string,
    workoutDescription:string,
    exercisesinRoutine:string[],
    routineBy:string;
    workoutBy:string;
    routineLinkReference:string;
    workoutLinkReference:string;
    [key: string]: any;
  }

  export default IPresetWorkoutData