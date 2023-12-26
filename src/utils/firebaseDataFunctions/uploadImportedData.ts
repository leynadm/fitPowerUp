import { Exercise,IWorkoutEvaluationData } from "../interfaces/IUserTrainingData";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";

interface IWorkoutDataWorkoutStats {
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

async function uploadImportedData(
  userId: string,
  workoutDataArr: IWorkoutData[],
  userTrainingData: IWorkoutData[]
) {
  const combinedWorkoutDataArr = workoutDataArr.concat(userTrainingData);
  const chunkSize = 300;
  const numChunks = Math.ceil(combinedWorkoutDataArr.length / chunkSize);

  try {
    const userDocRef = doc(db, "users", userId);

    for (let i = 0; i < numChunks; i++) {
      // Create a chunk
      const chunk = combinedWorkoutDataArr.slice(
        i * chunkSize,
        (i + 1) * chunkSize
      );
      const userTrainingDataDocRef = doc(
        userDocRef,
        `userTrainingCollection/userTrainingData_${i + 1}`
      );

      await setDoc(userTrainingDataDocRef, {
        workoutSessions: chunk,
      });
    }
  } catch (error) {
    console.log(error);
    console.error("uploadImportedData had an error: ", error);
    console.error(error);
    toast.error("uploadImportedData had an error!");
  }
}

export default uploadImportedData;
