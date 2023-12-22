import User from "./User";
import { IWorkoutData } from "./IUserTrainingData";
interface SocialUser {
    id?:string
    fullname: [string,string,string];
    name: string;
    sex: string;
    surname: string;
    profileImage:string
    verified:boolean
    privateAccount:boolean
    blocked:[]
    hideProfile:boolean,
    hidePowerLevel:boolean,
    hideFollowers:boolean,
    hideFollowing:boolean,
    powerLevel:number,
    strengthLevel:number,
    experienceLevel:number,
    firstPowerExercise:string,
    secondPowerExercise:string,
    thirdPowerExercise:string,
    weight:number;
    lastUpdateTimestamp:Date
    appVersion:number;
    unitsSystem:string;
    defaultWeightIncrement:number
    trainingData:any[][]
}

export default SocialUser