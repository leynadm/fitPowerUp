import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";
import IPresetStandaloneWorkout from "../interfaces/IPresetStandaloneWorkout";
async function addPresetCompleteWorkout(
  userId: string,
  presetWorkoutData: IPresetStandaloneWorkout,
  workoutId:string
) {
  try {
    const userDocRef = doc(db, "users", userId);

    const userTrainingDataDocRef = doc(
      userDocRef,
      `userCollection/userPresetStandaloneWorkouts`
    );

    await updateDoc(userTrainingDataDocRef, {
      [workoutId]:presetWorkoutData,
    });

  } catch (error) {
    console.log(error);
    console.error(error);
    toast.error("addPresetCompleteWorkout had an error!");
  }
}

export default addPresetCompleteWorkout;
