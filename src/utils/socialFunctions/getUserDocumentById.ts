import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

import toast from "react-hot-toast";
async function getUserDocumentById(documentId: any) {
  try {
    const documentRef = doc(db, "users", documentId); // Replace with your collection name

    const snapshot = await getDoc(documentRef);

    if (snapshot.exists()) {
      const documentData = snapshot.data();
      return { ...documentData, id: snapshot.id };
    }
  } catch (error) {
    toast.error("Oops, getUserDocumentById has an error!");
    // Handle the error here
    console.error("Error fetching user document by ID:", error);
    // You can also show a user-friendly error message to the user
    // For example: setErrorState("Failed to fetch user data. Please try again later.");
    throw error; // Re-throw the error to propagate it to the calling function if needed.
  }
}

export default getUserDocumentById;
