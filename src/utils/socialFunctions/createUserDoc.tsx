import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase"
async function createUserDoc(userID: string, fullname: string | null) {
    const userDoc = await getDoc(doc(db, "users", userID));
    
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", userID), {
        name: fullname,
        surname: fullname,
        sex: "male",
        verified: false,
        fullname: [fullname?.toLocaleLowerCase(), fullname?.toLocaleLowerCase(), fullname?.toLocaleLowerCase()], 
        profileImage:
          "",
        privateAccount:false,
        blocked:[],
        hideProfile:false,
        hidePowerLevel:false,
        hideFollowers:false,
        hideFollowing:false,
        powerLevel:0,
        strengthLevel:0,
        experienceLevel:0,
        firstPowerExercise:"No Exercise Selected Yet",
        secondPowerExercise:"No Exercise Selected Yet",
        thirdPowerExercise:"No Exercise Selected Yet",
        weight:0
      });
    }
  }

export default createUserDoc