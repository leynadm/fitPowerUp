import { doc, collection, writeBatch,getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";
import preselectedExercises from "../preselectedExercises";
import { storage } from "../../config/firebase";
async function updateAppVersionWithNewDocs(
  userID: string
) {
  const batch = writeBatch(db);

  try {

    const userDocRef = doc(db, "users", userID);
    const userCollectionRef = collection(userDocRef, "userCollection");

    const userDocDataSnap = await getDoc(userDocRef)
  
    const featsRef = ref(storage, 'assets/files/featsJSONString.json');
    const url = await getDownloadURL(featsRef);
    const response = await fetch(url);
    const featsParsedJSON = await response.json();


    if (userDocDataSnap.exists()) {
      const userData = userDocDataSnap.data();

      if (userData.appVersion === 2) {
        return;
      }
    }

    batch.update(userDocRef,{
      appVersion:2.0
    })

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
    const userFeatsDocRef = doc(userCollectionRef, "userFeats");

    batch.set(userFeatsDocRef, {
      userFeatsData: featsParsedJSON,
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
