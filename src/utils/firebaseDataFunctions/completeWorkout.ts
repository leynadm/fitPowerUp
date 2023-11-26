import Exercise from "../interfaces/Exercise";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import IWorkoutEvaluationData from "../interfaces/WorkoutEvaluationData";
interface IWorkoutDataWorkoutStats{
  totalWeight: number;
  totalReps: number;
  totalLoad: number;
}

export interface IWorkoutData {
  workoutDate: string;
  workoutEvaluation: IWorkoutEvaluationData;
  workoutExercises: { name: string; exercises: Exercise[] }[];
  workoutId: string;
  workoutSessionPowerLevel:number;
  workoutStats:IWorkoutDataWorkoutStats;
}

async function completeWorkout(userId: string, workoutData: IWorkoutData) {
  
  const userDocRef = doc(db, "users", userId);

  const userTrainingDataDocRef = doc(userDocRef, "userCollection/userTrainingData/");

  await updateDoc(userTrainingDataDocRef, {
    workoutSessions: arrayUnion(workoutData),
  });

}

export default completeWorkout;
