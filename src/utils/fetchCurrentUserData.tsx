import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";

async function fetchCurrentUserData(currentUser:any, setCurrentUserData:any) {
  if (currentUser === null) {
    return;
  }

  if (!currentUser.isAnonymous) {
    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setCurrentUserData(userData);
        return userData;
      }
    } catch (error) {
      toast.error("We couldn't fetch the data...");
      console.error("Error while fetching user data:", error);
    }
  }
}

export default fetchCurrentUserData;
