import Exercise from "../interfaces/Exercise";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import IWorkoutEvaluationData from "../interfaces/WorkoutEvaluationData";
import toast from "react-hot-toast";

interface IWorkoutDataWorkoutStats{
  weight: number;
  reps: number;
  vol: number;
}

export interface IWorkoutData {
  date: string;
  wEval: IWorkoutEvaluationData;
  wExercises: { name: string; exercises: Exercise[] }[];
  id: string;
  power:number;
  stats:IWorkoutDataWorkoutStats;
}
 
async function completeWorkout(userId: string, workoutData: IWorkoutData, userTrainingDataSize:number) {
  try {
    const userDocRef = doc(db, "users", userId);

    // Calculate the document suffix based on userTrainingDataSize
    const docSuffix = Math.ceil(userTrainingDataSize+1 / 500);
    const userTrainingDataDocRef = doc(userDocRef, `userTrainingCollection/userTrainingData_${docSuffix}/`);

    await updateDoc(userTrainingDataDocRef, {
      workoutSessions: arrayUnion(workoutData),
    });

  } catch (error) {
    toast.error("completeWorkout had an error!")
  }
}

export default completeWorkout;
