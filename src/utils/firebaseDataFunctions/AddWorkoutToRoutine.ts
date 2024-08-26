import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";
import IPresetWorkoutDataForRoutine from "../interfaces/IPresetWorkoutDataForRoutine";

async function addWorkoutToRoutine(
  userId: string,
  presetWorkoutData: IPresetWorkoutDataForRoutine,
  routineName:string
) {
  try {
    const userDocRef = doc(db, "users", userId);

    const userTrainingDataDocRef = doc(
      userDocRef,
      `userCollection/userPresetWorkouts`
    );
    const fieldPath = `${routineName}.routineWorkouts`;

    await updateDoc(userTrainingDataDocRef, {
        [fieldPath]:arrayUnion(presetWorkoutData)
    });

  } catch (error) {
    console.log(error);
    console.error(error);
    toast.error("addWorkoutToRoutine had an error!");
  }
}

export default addWorkoutToRoutine;
