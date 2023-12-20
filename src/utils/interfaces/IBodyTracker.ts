export interface IUserBodyTrackerDataEntry {
  date: string;
  weight: number;
  bodyFat: number;
  caloricIntake: number;
  neck: number;
  shoulders: number;
  chest: number;
  leftBicep: number;
  rightBicep: number;
  leftForearm: number;
  rightForearm: number;
  waist: number;
  hips: number;
  leftThigh: number;
  rightThigh: number;
  leftCalf: number;
  rightCalf: number;
}

export interface IUserBodyTrackerData {
    bodyTrackerData: IUserBodyTrackerDataEntry[];
    weight: number;
  }