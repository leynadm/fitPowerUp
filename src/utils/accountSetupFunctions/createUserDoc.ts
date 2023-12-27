import {
  doc,
  getDoc,
  collection,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

async function createUserDoc(userID: string, fullname: string | null) {
  console.log("logging userID:");
  console.log(userID);
  let firstName = "";
  let lastName = "";

  if (fullname) {
    if (fullname.includes(" ")) {
      const nameParts = fullname.split(" ");
      const numNameParts = nameParts.length;

      if (numNameParts === 1) {
        firstName = nameParts[0];
      } else if (numNameParts >= 2) {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(" ");
      }
    } else {
      firstName = fullname;
    }
  }

  const batch = writeBatch(db);

  const featsRef = ref(storage, "assets/files/featsJSONString.json");
  const url = await getDownloadURL(featsRef);
  const response = await fetch(url);
  const featsParsedJSON = await response.json();

  const preselectedExercisesRef = ref(
    storage,
    "assets/files/preselectedExercisesJSON.json"
  );
  const preselectedExercisesURL = await getDownloadURL(preselectedExercisesRef);
  const preselectedExercisesResponse = await fetch(preselectedExercisesURL);
  const preselectedExercisesParsedJSON =
    await preselectedExercisesResponse.json();

  const preselectedWorkoutsRef = ref(
    storage,
    "assets/files/presetWorkoutsData.json"
  );
  const preselectedWorkoutsUrl = await getDownloadURL(preselectedWorkoutsRef);
  const preselectedWorkoutsResponse = await fetch(preselectedWorkoutsUrl);
  const preselectedWorkoutsParsedJSON =
    await preselectedWorkoutsResponse.json();

  try {
    const userDoc = await getDoc(doc(db, "users", userID));

    if (!userDoc.exists()) {
      // Create the user document in users

      const usersDocRef = doc(db, "users", userID);

      batch.set(usersDocRef, {
        name: firstName,
        surname: lastName,
        sex: "male",
        verified: false,
        fullname: [
          firstName.toLocaleLowerCase(),
          lastName.toLocaleLowerCase(),
          fullname?.toLocaleLowerCase(),
        ],
        profileImage: "",
        privateAccount: false,
        blocked: [],
        hideProfile: false,
        hidePowerLevel: false,
        hideFollowers: false,
        hideFollowing: false,
        powerLevel: 0,
        strengthLevel: 0,
        experienceLevel: 0,
        firstPowerExercise: "barbell deadlift",
        secondPowerExercise: "flat barbell bench press",
        thirdPowerExercise: "barbell squat",
        unitsSystem: "metric",
        defaultWeightIncrement: 2.5,
        appVersion: 2.0,
      });

      // Create a subcollection "workouts" within the "users" document
      const userCollectionRef = collection(usersDocRef, "userCollection");

      // Create a document within the "workouts" subcollection
      const userTrainingDoc = doc(userCollectionRef, "userTrainingData");

      batch.set(userTrainingDoc, {
        workoutSessions: [],
        // Add data for the workout document
      });

      const userFeatsDocRef = doc(userCollectionRef, "userFeats");

      batch.set(userFeatsDocRef, {
        userFeatsData: featsParsedJSON,
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
      const userBodyTrackerDocRef = doc(userCollectionRef, "userBodyTracker");

      batch.set(userBodyTrackerDocRef, {
        bodyTrackerData: [],
        weight: 70,
      });

      // Create the body tracker document within the "user-training-data" subcollection
      const userPowerLevelDocRef = doc(userCollectionRef, "userPowerLevel");

      batch.set(userPowerLevelDocRef, {
        powerLevelData: [],
      });

      // Create the body tracker document within the "user-training-data" subcollection
      const userPresetWorkoutsDocRef = doc(
        userCollectionRef,
        "userPresetWorkouts"
      );

      batch.set(userPresetWorkoutsDocRef, {
        presetWorkouts: preselectedWorkoutsParsedJSON,
      });

      const followersFeedDocRef = doc(db, "followers-feed", userID);

      batch.set(followersFeedDocRef, {
        following: [],
        lastPost: null,
        recentPosts: [],
        users: [],
      });

      const notificationsDocRef = doc(db, "notifications", userID);

      batch.set(notificationsDocRef, {});

      // Commit the batch to create all the documents simultaneously
      await batch.commit();
    }
  } catch (error) {
    // Handle the error here
    toast.error("Oops, createUserDoc has an error!");
    console.error("Error creating documents:", error);
    // You can also throw the error again to propagate it to the caller of this function
    throw error;
  }
}

export default createUserDoc;
