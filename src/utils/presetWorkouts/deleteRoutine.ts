import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import IPresetWorkoutData from "../interfaces/IPresetWorkoutsData";

async function deleteRoutine(
  userId: string,
  presetWorkoutData: IPresetWorkoutData[],
  routineName: string | undefined
) {
  const userDocRef = doc(db, "users", userId);

  const userPresetWorkoutsDataDocRef = doc(
    userDocRef,
    `userCollection/userPresetWorkouts`
  );

  const filteredData = presetWorkoutData.filter(
    (presetWorkout: IPresetWorkoutData) =>
      presetWorkout.routineName !== routineName
  );

  try {
    await updateDoc(userPresetWorkoutsDataDocRef, {
      presetWorkouts: filteredData,
    });
  } catch (error) {
    console.log(error);
  }
}

export default deleteRoutine;
