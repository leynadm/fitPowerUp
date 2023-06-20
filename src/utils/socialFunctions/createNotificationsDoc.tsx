import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase"
async function createNotificationsDoc(userID:string) {
    const userDoc = await getDoc(doc(db, "notifications", userID));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "notifications", userID), {
        newUpdates:false
      });
    }
  }

export default createNotificationsDoc