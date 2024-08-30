import { Exercise } from "./IUserTrainingData";
interface IPresetStandaloneWorkout {

    wName:string;
    del:boolean;
    wDesc:string;
    wOvr:string[];
    wBy:string;
    wLink:string;
    wImg:string;
    wEx: { name: string; exercises: Exercise[] }[];

}
export default IPresetStandaloneWorkout;
