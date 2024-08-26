import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";

async function createTrainingDoc(userID: string, fullname: string | null) {

  try {
    const userDoc = await getDoc(doc(db, "users", userID));





    if (!userDoc.exists()) {
      await setDoc(doc(db, "workouts", userID), {
      });
    }
  } catch (error) {
    // Handle the error here
    toast.error("Oops, createTrainingDocs has an error!");
    console.error("Error creating followers feed document:", error);
    // You can also throw the error again to propagate it to the caller of this function
    throw error;
  }
}

export default createTrainingDoc;
