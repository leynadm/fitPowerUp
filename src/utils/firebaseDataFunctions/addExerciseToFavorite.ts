import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";
import { IUserExercisesLibrary } from "../interfaces/IUserExercisesLibrary";
interface UserExerciseLibraryObj {
  exercises: IUserExercisesLibrary[];
}
async function addExerciseToFavorite(
  userId: string,
  userExercisesLibrary: UserExerciseLibraryObj[],
  exerciseName: string | undefined
) {
  try {
    const userDocRef = doc(db, "users", userId);

    const userTrainingDataDocRef = doc(
      userDocRef,
      `userCollection/userSelectedExercises`
    );

    if (!exerciseName) {
      return;
    }

    const updatedExercises = userExercisesLibrary[0].exercises.map(
      (exercise) => {
        if (exercise.name === exerciseName) {
          return { ...exercise, favorite: !exercise.favorite };
        }
        return exercise;
      }
    );

    await updateDoc(userTrainingDataDocRef, {
      exercises: updatedExercises,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    toast.error("addExerciseToFavorite had an error!");
  }
}

export default addExerciseToFavorite;
