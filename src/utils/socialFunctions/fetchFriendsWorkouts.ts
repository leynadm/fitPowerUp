import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

async function fetchAdditionalDataForUsers(userIds: string[]) {
  const usersLatestTrainingData = [];

  for (const userId of userIds) {
    const userDocRef = doc(db, "users", userId);
    const userTrainingCollectionRef = collection(
      userDocRef,
      "userTrainingCollection"
    );

    try {
      const userTrainingsQuerySnapshot = await getDocs(
        userTrainingCollectionRef
      );
      let latestTrainingDoc = null;
      let maxNumber = -1;

      userTrainingsQuerySnapshot.forEach((docSnapshot) => {
        const docName = docSnapshot.id;
        const docNumber = parseInt(docName.split("_")[1], 10); // Extracting number from "userTrainingData_X"

        if (docNumber > maxNumber) {
          maxNumber = docNumber;
          latestTrainingDoc = docSnapshot.data();
        }
      });

      if (latestTrainingDoc) {
        usersLatestTrainingData.push({
          userId: userId,
          trainingData: latestTrainingDoc,
        });
      }
    } catch (error) {
      console.error(`Error fetching training data for user ${userId}:`, error);
    }
  }

  return usersLatestTrainingData;
}

export default fetchAdditionalDataForUsers;
