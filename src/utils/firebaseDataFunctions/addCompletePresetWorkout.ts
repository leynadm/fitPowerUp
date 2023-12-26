import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";
import IPresetWorkoutData from "../interfaces/IPresetWorkoutsData";
async function addPresetCompleteWorkout(
  userId: string,
  presetWorkoutData: IPresetWorkoutData,
) {
  try {
    const userDocRef = doc(db, "users", userId);

    const userTrainingDataDocRef = doc(
      userDocRef,
      `userCollection/userPresetWorkouts`
    );

    await updateDoc(userTrainingDataDocRef, {
      presetWorkouts: arrayUnion(presetWorkoutData),
    });

  } catch (error) {
    console.log(error);
    console.error(error);
    toast.error("addPresetCompleteWorkout had an error!");
  }
}

export default addPresetCompleteWorkout;
