import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import getUserDocumentById from "./getUserDocumentById";
import toast from "react-hot-toast";
async function fetchUserAndTrainingData(spottingIdsArr: string[]) {
  try {
    // Step 1: Fetch User Data
    const usersData = await Promise.all(
      spottingIdsArr.map((userId) => getUserDocumentById(userId))
    );

    // Step 2: Fetch Training Data in Parallel
    const usersWithTrainingData = await Promise.all(
      usersData.map(async (user) => {
        if (!user) return null;

        const userTrainingCollectionRef = collection(doc(db, "users", user.id), "userTrainingCollection");
        const userTrainingsSnapshot = await getDocs(userTrainingCollectionRef);
        let latestTrainingDoc = null;
        let maxNumber = -1;

        userTrainingsSnapshot.forEach((docSnapshot) => {
          const docNumber = parseInt(docSnapshot.id.split("_")[1], 10);
          if (docNumber > maxNumber) {
            maxNumber = docNumber;
            latestTrainingDoc = docSnapshot.data();
          }
        });

        return latestTrainingDoc ? { ...user, trainingData: latestTrainingDoc } : user;
      })
    );

    return usersWithTrainingData.filter((user) => user !== null);
  } catch (error) {
    toast.error("Oops, there was an error fetching user data!");
    console.error("Error fetching user and training data:", error);
    throw error; // Propagate the error if needed.
  }
}

export default fetchUserAndTrainingData;
