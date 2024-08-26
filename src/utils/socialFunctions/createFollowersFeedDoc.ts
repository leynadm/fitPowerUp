import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";

async function createFollowersFeedDoc(userID: string) {
  try {
    const userDoc = await getDoc(doc(db, "followers-feed", userID));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "followers-feed", userID), {
        following: [],
        lastPost: null,
        recentPosts: [],
        users: [],
      });
    }
  } catch (error) {
    // Handle the error here
    toast.error("Oops, createFollowersFeedDoc has an error!");
    console.error("Error creating followers feed document:", error);
    // You can also throw the error again to propagate it to the caller of this function
    throw error;
  }
}

export default createFollowersFeedDoc;
