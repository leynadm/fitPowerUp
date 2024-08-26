import { Exercise } from "./IUserTrainingData";

interface IPresetRoutineData {
    id: string;
    rName:string,
    del:boolean,
    rDesc:string,
    rBy:string;
    rLink:string;
    rWorkouts:Exercise[];
    multi:boolean;
    rImg:string;
  }

  export default IPresetRoutineData