import { updateDoc, doc} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { serverTimestamp } from "firebase/firestore";
async function updatePowerLevelInFirestore(
  userId:string,
  firstExercise:string,
  secondExercise:string,
  thirdExercise:string,
  powerLevel:number,
  strengthLevel:number,
  experienceLevel:number
) {
  const userDocRef = doc(db, "users", userId);


  await updateDoc(userDocRef, {
    firstPowerExercise:firstExercise,
    secondPowerExercise:secondExercise,
    thirdPowerExercise:thirdExercise,
    powerLevel:powerLevel,
    strengthLevel:strengthLevel,
    experienceLevel:experienceLevel,
    lastUpdateTimestamp:serverTimestamp()
  });
}

  export default updatePowerLevelInFirestore