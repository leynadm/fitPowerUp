import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";

async function updateDefaultWeightIncrement(
  userId: string,
  updatedDefaultWeightIncrement: number
) {
  try {
    const userDocRef = doc(db, "users", userId);
    updateDoc(userDocRef, {
      defaultWeightIncrement: updatedDefaultWeightIncrement,
    });
    toast.success(`Default Weight Increment updated to ${updatedDefaultWeightIncrement}.`)
} catch (error) {
    toast.error("Oops, updateUnitSystemPreference has an error!");
    console.error("Error creating documents:", error);
    // You can also throw the error again to propagate it to the caller of this function
    throw error;
  }
}

export default updateDefaultWeightIncrement;
