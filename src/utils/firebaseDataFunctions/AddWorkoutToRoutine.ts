import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";
import IPresetWorkoutDataForRoutine from "../interfaces/IPresetWorkoutDataForRoutine";

async function addWorkoutToRoutine(
  userId: string,
  presetWorkoutData: IPresetWorkoutDataForRoutine,
  rName: string
) {
  try {
    // Correctly reference the document path
    const userTrainingDataDocRef = doc(
      db,
      "users",
      userId,
      "userCollection",
      "userPresetRoutines"
    );

    // Define the correct field path for nested array updates
    const fieldPath = `${rName}.rWorkouts`;

    console.log({fieldPath})
     // Update the document, directly targeting the correct field path
    await updateDoc(userTrainingDataDocRef, {
      [fieldPath]: arrayUnion(presetWorkoutData)
    });

    toast.success("Workout added to routine successfully!");
  } catch (error) {
    console.log(error);
    
    toast.error("An error occurred while adding the workout to the routine!");
  }
}

export default addWorkoutToRoutine;
