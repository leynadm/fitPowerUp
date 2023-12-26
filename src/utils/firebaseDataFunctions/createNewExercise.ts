import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";
import { IUserExercisesLibrary } from "../interfaces/IUserExercisesLibrary";
async function createNewExercise(
  userId: string,
  newlyCreatedExercise: IUserExercisesLibrary,
) {
  try {
    const userDocRef = doc(db, "users", userId);

    const userTrainingDataDocRef = doc(
      userDocRef,
      `userCollection/userSelectedExercises`
    );

    await updateDoc(userTrainingDataDocRef, {
      exercises: arrayUnion(newlyCreatedExercise),
    });

  } catch (error) {
    console.log(error);
    console.error(error);
    toast.error("createNewExercise had an error!");
  }
}

export default createNewExercise;
