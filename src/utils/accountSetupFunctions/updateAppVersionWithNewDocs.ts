import {
  doc,
  collection,
  writeBatch,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db } from "../../config/firebase";
import { storage } from "../../config/firebase";
import toast from "react-hot-toast";
import { getFormattedDate } from "../getFormattedDate";

async function updateAppVersionWithNewDocs(userID: string) {
  const batch = writeBatch(db);

  const currentDate = getFormattedDate();

  try {
    const userDocRef = doc(db, "users", userID);

    const userCollectionRef = collection(userDocRef, "userCollection");
    const userTrainingCollectionRef = collection(
      userDocRef,
      "userTrainingCollection"
    );
    const userBodyTrackerCollectionRef = collection(
      userDocRef,
      "userBodyTrackerCollection"
    );
    const userDocDataSnap = await getDoc(userDocRef);

    const featsRef = ref(storage, "assets/files/featsJSONString.json");
    const url = await getDownloadURL(featsRef);
    const response = await fetch(url);
    const featsParsedJSON = await response.json();

    const preselectedWorkoutsRef = ref(
      storage,
      "assets/files/presetWorkoutsData.json"
    );
    const preselectedWorkoutsUrl = await getDownloadURL(preselectedWorkoutsRef);
    const preselectedWorkoutsResponse = await fetch(preselectedWorkoutsUrl);
    const preselectedWorkoutsParsedJSON =
      await preselectedWorkoutsResponse.json();

    const preselectedExercisesRef = ref(
      storage,
      "assets/files/preselectedExercisesJSON.json"
    );
    const preselectedExercisesURL = await getDownloadURL(
      preselectedExercisesRef
    );
    const preselectedExercisesResponse = await fetch(preselectedExercisesURL);
    const preselectedExercisesParsedJSON =
      await preselectedExercisesResponse.json();

    if (userDocDataSnap.exists()) {
      const userData = userDocDataSnap.data();

      if (userData.appVersion === 2) {
        return;
      }
    }

    batch.update(userDocRef, {
      appVersion: 2.0,
      unitsSystem: "metric",
      defaultWeightIncrement: 1.25,
      lastUpdateTimestamp: serverTimestamp(),
      firstPowerExercise: "barbell deadlift",
      secondPowerExercise: "flat barbell bench press",
      thirdPowerExercise: "barbell squat",
    });

    // Create a document within the "userTrainingCollection" subcollection
    const userTrainingDoc = doc(
      userTrainingCollectionRef,
      "userTrainingData_1"
    );

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
      exercises: preselectedExercisesParsedJSON,
    });

    // Create the body tracker document within the "user-training-data" subcollection
    const userBodyTrackerDocRef = doc(
      userBodyTrackerCollectionRef,
      "userBodyTrackerData_1"
    );

    batch.set(userBodyTrackerDocRef, {
      bodyTrackerData: [
        {
          date: currentDate,
          weight: 70,
          bodyFat: 0,
          caloricIntake: 0,
          hoursOfSleep:0,
          neck: 0,
          shoulders: 0,
          chest: 0,
          leftBicep: 0,
          rightBicep: 0,
          leftForearm: 0,
          rightForearm: 0,
          waist: 0,
          hips: 0,
          leftThigh: 0,
          rightThigh: 0,
          leftCalf: 0,
          rightCalf: 0,
        },
      ],
      weight: 70,
    });

    // Create the body tracker document within the "user-training-data" subcollection
    const userFeatsDocRef = doc(userCollectionRef, "userFeats");
    batch.set(userFeatsDocRef, {
      userFeatsData: featsParsedJSON,
    });

    // Create the body tracker document within the "user-training-data" subcollection
    const userPresetWorkoutsDocRef = doc(
      userCollectionRef,
      "userPresetWorkouts"
    );

    batch.set(userPresetWorkoutsDocRef, {
      presetWorkouts: preselectedWorkoutsParsedJSON,
    });

    // Commit the batch to create all the documents simultaneously
    await batch.commit();
  } catch (error) {
    // Handle the error here
    toast.error("Oops, updateAppVersionWithNewDocs has an error!");
    console.error("Error creating documents:", error);
    console.log(error);
    // You can also throw the error again to propagate it to the caller of this function
    throw error;
  }
}

export default updateAppVersionWithNewDocs;
