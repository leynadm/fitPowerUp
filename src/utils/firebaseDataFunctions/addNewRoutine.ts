import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";
import IPresetRoutineData from "../interfaces/IPresetRoutineData";
async function addNewRoutine(
  userId: string,
  presetWorkoutData: IPresetRoutineData,
  routineId:string
) {
  try {
    
    const userDocRef = doc(db, "users", userId);  
    
    const userTrainingDataDocRef = doc(
      userDocRef,
      `userCollection/userPresetRoutines`
    );

    await updateDoc(userTrainingDataDocRef, {
      [routineId]: 
        presetWorkoutData      
    });

  } catch (error) {
    toast.error(`There was an error while trying to add the routine: ${error}`);
    console.log(error)
  }
}

export default addNewRoutine;
