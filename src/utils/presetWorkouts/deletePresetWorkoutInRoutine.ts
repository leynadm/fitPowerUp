import { updateDoc, doc,arrayRemove } from "firebase/firestore";
import { db } from "../../config/firebase";
import IPresetWorkoutDataForRoutine from "../interfaces/IPresetWorkoutDataForRoutine";
async function deletePresetWorkoutInRoutine(
  userId: string,
  workoutData: IPresetWorkoutDataForRoutine,
  routineId: string | undefined
) {

    // Reference to the user's document
    const userPresetWorkoutsDataDocRef = doc(
        db,
        "users",
        userId,
        "userCollection",
        "userPresetRoutines"
      );

      console.log({routineId})
      console.log(workoutData)
/*   const filteredData = presetWorkoutData.filter(
    (presetWorkout: IPresetWorkoutData) =>
      presetWorkout.wName !== workoutId
  );

  if(filteredData.length===0){
    return
  } */
  try {
   // Use arrayRemove to remove the exact object from the array within the map
   await updateDoc(userPresetWorkoutsDataDocRef, {
    [`${routineId}.rWorkouts`]: arrayRemove(workoutData), // Dynamically access the array based on routineId
  });
  } catch (error) {
    console.log(error);
  }
}

export default deletePresetWorkoutInRoutine;
