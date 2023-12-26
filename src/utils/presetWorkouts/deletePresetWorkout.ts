import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import IPresetWorkoutData from "../interfaces/IPresetWorkoutsData";

async function deletePresetWorkout(
  userId: string,
  presetWorkoutData: IPresetWorkoutData[],
  workoutId: string | undefined
) {
  const userDocRef = doc(db, "users", userId);

  const userPresetWorkoutsDataDocRef = doc(
    userDocRef,
    `userCollection/userPresetWorkouts`
  );

  const filteredData = presetWorkoutData.filter(
    (presetWorkout: IPresetWorkoutData) =>
      presetWorkout.id !== workoutId
  );

  try {
    await updateDoc(userPresetWorkoutsDataDocRef, {
      presetWorkouts: filteredData,
    });
  } catch (error) {
    console.log(error);
  }
}

export default deletePresetWorkout;
