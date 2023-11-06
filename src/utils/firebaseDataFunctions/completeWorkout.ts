import Exercise from "../interfaces/Exercise";
import { updateDoc, doc, collection, setDoc } from "firebase/firestore";
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

  // Get a reference to the user's training data document.
  const userTrainingDataDocRef = doc(userDocRef, "userCollection/userTrainingData/");

  console.log(userTrainingDataDocRef)
  // Set the user's training data document, adding the workout data to the `exercises` array.
  await updateDoc(userTrainingDataDocRef, {
    workoutSessions: arrayUnion(workoutData),
  });

  console.log('complete')

}

export default completeWorkout;