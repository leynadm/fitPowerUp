import { setDoc, doc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";

async function updateAppVersionToV3(userID: string) {
  const userDocRef = doc(db, "users", userID);

  const userCollectionRef = collection(userDocRef, "userCollection");
  // Create the body tracker document within the "user-training-data" subcollection
  const userChallengesDocRef = doc(userCollectionRef, "userChallenges");
  try {
    await setDoc(userChallengesDocRef, { challenges: [] });
    await updateDoc(userDocRef, {
      appVersion: 3.0,
    });
  } catch (error) {
    // Handle the error here
    toast.error("Oops, createTrainingDocs has an error!");
    console.error("Error creating followers feed document:", error);
    // You can also throw the error again to propagate it to the caller of this function
    throw error;
  }
}

export default updateAppVersionToV3;
