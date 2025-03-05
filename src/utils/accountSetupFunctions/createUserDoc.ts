import { doc, getDoc, collection, writeBatch } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { getFormattedDate } from "../getFormattedDate";
async function createUserDoc(userID: string, fullname: string | null) {
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
  const currentDate = getFormattedDate();

  const featsRef = ref(storage, "assets/files/featsJSONString.json");
  const preselectedWorkoutsRef = ref(
    storage,
    "assets/files/presetWorkoutsData.json"
  );
  const preselectedExercisesRef = ref(
    storage,
    "assets/files/preselectedExercisesJSON.json"
  );

  try {
    const url = await getDownloadURL(featsRef);
    const response = await fetch(url);
    const featsParsedJSON = await response.json();

    const preselectedExercisesURL = await getDownloadURL(
      preselectedExercisesRef
    );
    const preselectedExercisesResponse = await fetch(preselectedExercisesURL);
    const preselectedExercisesParsedJSON =
      await preselectedExercisesResponse.json();

/*     const preselectedWorkoutsUrl = await getDownloadURL(preselectedWorkoutsRef);
    const preselectedWorkoutsResponse = await fetch(preselectedWorkoutsUrl);
    const preselectedWorkoutsParsedJSON =
      await preselectedWorkoutsResponse.json(); */

    const userDoc = await getDoc(doc(db, "users", userID));

    const todayTimestamp = new Date();
    const yesterdayTimestamp = new Date(
      todayTimestamp.getTime() - 24 * 60 * 60 * 1000
    );

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
        appVersion: 3.0,
        lastUpdateTimestamp: yesterdayTimestamp,
      });

      // Create a subcollection "workouts" within the "users" document
      const userCollectionRef = collection(usersDocRef, "userCollection");
      const userTrainingCollectionRef = collection(
        usersDocRef,
        "userTrainingCollection"
      );
      const userBodyTrackerCollectionRef = collection(
        usersDocRef,
        "userBodyTrackerCollection"
      );

      // Create a document within the "workouts" subcollection
      const userTrainingDoc = doc(
        userTrainingCollectionRef,
        "userTrainingData_1"
      );

      batch.set(userTrainingDoc, {
        workoutSessions: [],
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
            hoursOfSleep: 0,
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
      const userPresetWorkoutsDocRef = doc(
        userCollectionRef,
        "userPresetWorkouts"
      );

      batch.set(userPresetWorkoutsDocRef, {
        presetWorkouts: [],
      });

      // Create the body tracker document within the "user-training-data" subcollection
      const userChallengesDocRef = doc(userCollectionRef, "userChallenges");

      batch.set(userChallengesDocRef, {
        challenges: [],
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
