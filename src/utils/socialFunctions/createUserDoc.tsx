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
        fullname: [fullname, fullname, fullname], 
        profileImage:
          "",
        coverImage:
          "",
      });
    }
  }

export default createUserDoc