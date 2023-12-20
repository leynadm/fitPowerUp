export interface Exercise {
  exercise: string;
  date: string;
  weight: number;
  reps: number;
  distance: number;
  distance_unit: string;
  time: number;
  group: string;
  comment?: string;
  weekday?: string;
  id: number;
  is_pr?: boolean;
  dropset: boolean;
}

export interface IWorkoutDataWorkoutStats {
  sets: number;
  reps: number;
  vol: number;
}

export interface IWorkoutData {
  date: string;
  wEval: IWorkoutEvaluationData;
  wExercises: { name: string; exercises: Exercise[] }[];
  id: string;
  power: number;
  stats: IWorkoutDataWorkoutStats;
}

export interface IWorkoutEvaluationData {
  comment: string;
  value: number;
  feelPain: boolean;
  warmStretch: boolean;
  trainHarder: boolean;
}

export interface IUserTrainingData {
    workoutSessions: IWorkoutData[];
  }