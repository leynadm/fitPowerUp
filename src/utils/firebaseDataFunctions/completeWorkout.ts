import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";
import { IWorkoutData } from "../interfaces/IUserTrainingData";

async function completeWorkout(
  userId: string,
  workoutData: IWorkoutData,
  userTrainingDataSize: number
) {
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

    await updateDoc(userTrainingDataDocRef, {
      workoutSessions: arrayUnion(workoutData),
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    toast.error("completeWorkout had an error!");
  }
}

export default completeWorkout;
