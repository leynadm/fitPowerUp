import { updateDoc, doc,deleteField } from "firebase/firestore";
import { db } from "../../config/firebase";
async function deletePresetWorkout(
  userId: string,
  workoutId: string
) {
  const userDocRef = doc(db, "users", userId);

  const userPresetWorkoutsDataDocRef = doc(
    userDocRef,
    `userCollection/userPresetStandaloneWorkouts`
  );

  try {
    await updateDoc(userPresetWorkoutsDataDocRef, {
      [workoutId]: deleteField(),
    });
  } catch (error) {
    console.log(error);
  }
}

export default deletePresetWorkout;
