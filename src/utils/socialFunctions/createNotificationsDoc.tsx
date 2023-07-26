import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";
async function createNotificationsDoc(userID: string) {
  try {
    const userDoc = await getDoc(doc(db, "notifications", userID));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "notifications", userID), {
        newUpdates: false,
      });
    }
  } catch (error) {
    // Handle the error here
    toast.error("Oops, createNotificationsDoc has an error!");
    console.error("Error creating followers feed document:", error);
    // You can also throw the error again to propagate it to the caller of this function
    throw error;
  }
}

export default createNotificationsDoc;
