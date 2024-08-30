import IPresetWorkoutData from "./IPresetWorkoutsData";
interface IPresetRoutineData {  
    rName:string,
    del:boolean,
    rDesc:string,
    rBy:string;
    rLink:string;
    rWorkouts:IPresetWorkoutData[];
    multi:boolean;
    rImg:string;
  }

  export default IPresetRoutineData