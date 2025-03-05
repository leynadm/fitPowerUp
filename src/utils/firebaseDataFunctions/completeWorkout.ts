import { updateDoc, doc, writeBatch, arrayUnion, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";
import { IWorkoutData } from "../interfaces/IUserTrainingData";

async function completeWorkout(
  userId: string,
  workoutData: IWorkoutData,
  userTrainingDataSize: number
) {
  const batch = writeBatch(db);

  try {
    const userDocRef = doc(db, "users", userId);

    // Calculate the document suffix based on userTrainingDataSize
    const docSuffix =
      Math.ceil(userTrainingDataSize / 350) === 0
        ? 1
        : Math.ceil(userTrainingDataSize / 350);

    const userTrainingDataDocRef = doc(
      userDocRef,
      `userTrainingCollection/userTrainingData_${docSuffix}`
    );

    // Reference the "userWorkouts" subcollection and create a new document reference
    const userWorkoutsCollectionRef = collection(userDocRef, "userWorkouts");
    const newWorkoutDocRef = doc(userWorkoutsCollectionRef); // Auto-generated ID

    batch.set(userTrainingDataDocRef, {
      workoutSessions: arrayUnion(workoutData),
    });

    batch.set(newWorkoutDocRef, workoutData);
    
    await batch.commit();

  } catch (error) {
    console.error(error);
    toast.error("completeWorkout had an error!");
  }
}

export default completeWorkout;
