import { updateDoc, doc, deleteField } from "firebase/firestore";
import { db } from "../../config/firebase";
import IPresetWorkoutData from "../interfaces/IPresetWorkoutsData";

async function deleteRoutine(
  userId: string,
  routineId: string | undefined
) {
  if (!routineId) {
    console.log("Routine ID is undefined");
    return;
  }

  // Reference to the user's document
  const userPresetWorkoutsDataDocRef = doc(
    db,
    "users",
    userId,
    "userCollection",
    "userPresetRoutines"
  );

  try {
    // Deleting the specific map entry using the key (routineId)
    await updateDoc(userPresetWorkoutsDataDocRef, {
      [routineId]: deleteField(),
    });

    console.log(`Routine with ID ${routineId} deleted successfully.`);
  } catch (error) {
    console.log("Error deleting routine:", error);
  }
}

export default deleteRoutine;
