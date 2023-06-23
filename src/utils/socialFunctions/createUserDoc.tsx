import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase"


async function createUserDoc(userID: string, fullname: string | null) {


  let firstName = "";
  let lastName = "";

  if (fullname) {
    if (fullname.includes(" ")) {
      const nameParts = fullname.split(" ");
      const numNameParts = nameParts.length;
  
      if (numNameParts === 1) {
        firstName = nameParts[0];
      } else if (numNameParts >= 2) {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(" ");
      }
    } else {
      firstName = fullname;
    }
  }

    const userDoc = await getDoc(doc(db, "users", userID));
    
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", userID), {
        name: firstName,
        surname: lastName,
        sex: "male",
        verified: false,
        fullname: [firstName.toLocaleLowerCase(), lastName.toLocaleLowerCase(), fullname?.toLocaleLowerCase()], 
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

