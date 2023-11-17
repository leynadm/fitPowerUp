import { doc, collection, writeBatch,getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";
import preselectedExercises from "../preselectedExercises";

async function updateAppVersionWithNewDocs(
  userID: string
) {
  const batch = writeBatch(db);

  try {

    const usersDocRef = doc(db, "users", userID);
    const userCollectionRef = collection(usersDocRef, "userCollection");

    const userTrainingDataDocRef = doc(userCollectionRef, "userTrainingData");

    const userTrainingDataDocSnap = await getDoc(userTrainingDataDocRef);

    if (userTrainingDataDocSnap.exists()) {
      return
    }

    // Create a document within the "workouts" subcollection
    const userTrainingDoc = doc(userCollectionRef, "userTrainingData");

    batch.set(userTrainingDoc, {
      workoutSessions: [],
      // Add data for the workout document
    });

    // Create the userSelectedExercises document within the "user-training-data" subcollection
    const preselectedExercisesDocRef = doc(
      userCollectionRef,
      "userSelectedExercises"
    );

    batch.set(preselectedExercisesDocRef, {
      exercises: preselectedExercises,
    });

    // Create the body tracker document within the "user-training-data" subcollection
    const userBodyTrackerDocRef = doc(userCollectionRef, "userBodyTracker");

    batch.set(userBodyTrackerDocRef, {
      bodyTrackerData: [],
    });

    // Create the body tracker document within the "user-training-data" subcollection
    const userPowerLevelDocRef = doc(userCollectionRef, "userPowerLevel");

    batch.set(userPowerLevelDocRef, {
      powerLevelData: [],
    });

    // Create the body tracker document within the "user-training-data" subcollection
    const userRecordsDocRef = doc(userCollectionRef, "userRecords");

    batch.set(userRecordsDocRef, {
      userRecordsData: [],
    });


    // Commit the batch to create all the documents simultaneously
    await batch.commit();
  } catch (error) {
    // Handle the error here
    toast.error("Oops, updateAppVersionWithNewDocs has an error!");
    console.error("Error creating documents:", error);
    // You can also throw the error again to propagate it to the caller of this function
    throw error;
  }
}

export default updateAppVersionWithNewDocs;
