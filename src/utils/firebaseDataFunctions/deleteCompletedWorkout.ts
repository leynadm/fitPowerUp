import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IWorkoutData } from "./uploadImportedData";
import toast from "react-hot-toast";
async function deleteCompletedWorkout(
  userId: string,
  userTrainingData: IWorkoutData[],
  workoutId: string | null
) {

    const userDocRef = doc(db, "users", userId);

  const filteredData = userTrainingData.filter(
    (workout: IWorkoutData) =>
    workout.id !== workoutId
  );

  const chunkSize = 300;
  const numChunks = Math.ceil(filteredData.length / chunkSize);
  
  const defaultUserTrainingDataDocRef = doc(
    userDocRef,
    `userTrainingCollection/userTrainingData_1`
  );

  try {

    if (numChunks === 0) {
      await setDoc(defaultUserTrainingDataDocRef, {
        workoutSessions: [],
      });
      return
    }

    for (let i = 0; i < numChunks; i++) {
      // Create a chunk
      const chunk = filteredData.slice(
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
    toast.error("An error appeared while deleting the data!")
    console.log(error);
  }
}

export default deleteCompletedWorkout;
