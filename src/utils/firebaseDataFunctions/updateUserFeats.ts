import { IWorkoutData } from "./completeWorkout";
import { updateDoc, doc, collection, getDoc,setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import { IUserTrainingData } from "../../context/TrainingData";
import getFlattenedExerciseData from "../completedWorkoutsChartFunctions/utility/getFlattenedExerciseData";
import getFlattenedAllExerciseData from "../completedWorkoutsChartFunctions/utility/getFlattenedAllExerciseData";
import getFlattenedOverallExerciseData from "../completedWorkoutsChartFunctions/breakdownFunctions/utility/getFlattenedOverallExerciseData";
import { IUserFeatsDataEntry } from "../../context/TrainingData";
import Exercise from "../interfaces/Exercise";
import getOverallStats from "../completedWorkoutsChartFunctions/breakdownFunctions/exercises/getOverallStats";

async function updateUserFeats(
  userId: string,
  userFeatsData: IUserFeatsDataEntry[]
) {
    
    const userFeatsDataArr = userFeatsData;

  const userDocRef = doc(db, "users", userId);

  const userCollectionRef = collection(userDocRef, "userCollection");

  const userTrainingDataDocRef = doc(userCollectionRef, "userTrainingData");

  const userTraingDataDocSnap = await getDoc(userTrainingDataDocRef);

  
  const userTrainingExercisesData =
    userTraingDataDocSnap.data() as IUserTrainingData;

  if (!userTraingDataDocSnap.exists()) {
    return;
  }

  const userTrainingDataResult = userTrainingExercisesData.workoutSessions;

  const flattenedExerciseData = getFlattenedExerciseData(
    userTrainingDataResult,
    "Bench Press",
    "all"
  );

  const flattenedAllExerciseData = getFlattenedAllExerciseData(
    userTrainingDataResult,
    "all"
  );

  const flattenedOverallExerciseData = getFlattenedOverallExerciseData(
    userTrainingDataResult,
    "all",
    "",
    ""
  );

  for (let index = 0; index < userFeatsDataArr.length; index++) {
    const userFeatEntry = userFeatsDataArr[index];

    console.log('logging entry:')
    console.log(userFeatEntry)
    if (userFeatEntry.type === "Workouts Consistency") {
        console.log('inside workout consistency')
        userFeatEntry.state = calculateWorkoutConsistency(
        flattenedAllExerciseData,
        userFeatEntry
      );

    }

    if (userFeatEntry.type === "Workout Streak") {
    }

    if (userFeatEntry.type === "Sets") {
      userFeatEntry.state = calculateSets(
        userTrainingDataResult,
        userFeatEntry
      );
    }

    if (userFeatEntry.type === "Reps") {
      userFeatEntry.state = calculateReps(
        userTrainingDataResult,
        userFeatEntry
      );
    }

    if (userFeatEntry.type === "Volume") {
      userFeatEntry.state = calculateVolume(
        userTrainingDataResult,
        userFeatEntry
      );
    }

    if (userFeatEntry.type === "Exercises - Deadlift") {
    }

    if (userFeatEntry.type === "Exercises - Bench Press") {
    }

    if (userFeatEntry.type === "Exercises - Squat") {
    }

    if (userFeatEntry.type === "Exercises - Pull Up") {
    }

    if (userFeatEntry.type === "Push Up") {
    }

    if (userFeatEntry.type === "Exercises - Plank") {
    }

    if (userFeatEntry.type === "Exercises") {
      userFeatEntry.state = calculateUniqueExercises(
        flattenedAllExerciseData,
        userFeatEntry
      );
    }

    if (userFeatEntry.type === "Exercises - Sit-Ups/Crunches") {
    }

    if (userFeatEntry.type === "Exercises - Burpees") {
    }

    if (userFeatEntry.type === "Exercises - Hanging Leg Raises") {
    }

    if (userFeatEntry.type === "Exercises - Chin Up") {
    }
  }
  
  const userFeatsDocRef = doc(userDocRef, "userCollection/userFeats/");
/* 
  const myDoc = {
    userFeatsData:userFeatsDataArr
  }
  await setDoc(doc(db, "data", "one"), myDoc);
   */
  console.log('logging my array')
  console.log(userFeatsDataArr)
  await setDoc(userFeatsDocRef, {userFeatsData:userFeatsDataArr});
 
}

export default updateUserFeats;

function calculateWorkoutConsistency(
  flattenedAllExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry
) {
  const uniqueDates = new Set(flattenedAllExerciseData.map((obj) => obj.date));
  const uniqueDateCount = uniqueDates.size;

  if (featEntry.featValue === 1000 && uniqueDateCount >= 1000) {
    return true;
  } else if (featEntry.featValue === 750 && uniqueDateCount >= 750) {
    return true;
  } else if (featEntry.featValue === 500 && uniqueDateCount >= 500) {
    return true;
  } else if (featEntry.featValue === 250 && uniqueDateCount >= 250) {
    return true;
  } else if (featEntry.featValue === 100 && uniqueDateCount >= 100) {
    return true;
  } else if (featEntry.featValue === 75 && uniqueDateCount >= 75) {
    return true;
  } else if (featEntry.featValue === 50 && uniqueDateCount >= 50) {
    return true;
  } else if (featEntry.featValue === 25 && uniqueDateCount >= 25) {
    return true;
  } else if (featEntry.featValue === 1 && uniqueDateCount >= 1) {
    console.log('it should be here.')
    return true;
  } else {
    return false;
  }
}

function calculateSets(
  flattenedAllExerciseData: IWorkoutData[],
  featEntry: IUserFeatsDataEntry
) {
  const overallStatsObj = getOverallStats(flattenedAllExerciseData);

  if (featEntry.featValue === 10000 && overallStatsObj.count >= 10000) {
    return true;
  } else if (featEntry.featValue === 7500 && overallStatsObj.count >= 7500) {
    return true;
  } else if (featEntry.featValue === 5000 && overallStatsObj.count >= 5000) {
    return true;
  } else if (featEntry.featValue === 2500 && overallStatsObj.count >= 2500) {
    return true;
  } else if (featEntry.featValue === 1000 && overallStatsObj.count >= 1000) {
    return true;
  } else if (featEntry.featValue === 500 && overallStatsObj.count >= 500) {
    return true;
  } else if (featEntry.featValue === 250 && overallStatsObj.count >= 250) {
    return true;
  } else if (featEntry.featValue === 100 && overallStatsObj.count >= 100) {
    return true;
  } else {
    return false;
  }
}

function calculateReps(
  flattenedAllExerciseData: IWorkoutData[],
  featEntry: IUserFeatsDataEntry
) {
  const overallStatsObj = getOverallStats(flattenedAllExerciseData);

  if (featEntry.featValue === 100000 && overallStatsObj.summedReps >= 100000) {
    return true;
  } else if (
    featEntry.featValue === 75000 &&
    overallStatsObj.summedReps >= 75000
  ) {
    return true;
  } else if (
    featEntry.featValue === 50000 &&
    overallStatsObj.summedReps >= 50000
  ) {
    return true;
  } else if (
    featEntry.featValue === 25000 &&
    overallStatsObj.summedReps >= 25000
  ) {
    return true;
  } else if (
    featEntry.featValue === 10000 &&
    overallStatsObj.summedReps >= 10000
  ) {
    return true;
  } else if (
    featEntry.featValue === 1000 &&
    overallStatsObj.summedReps >= 1000
  ) {
    return true;
  } else {
    return false;
  }
}

function calculateVolume(
  flattenedAllExerciseData: IWorkoutData[],
  featEntry: IUserFeatsDataEntry
) {
  const overallStatsObj = getOverallStats(flattenedAllExerciseData);

  if (
    featEntry.featValue === 3000000 &&
    overallStatsObj.summedVolume >= 3000000
  ) {
    return true;
  } else if (
    featEntry.featValue === 2750000 &&
    overallStatsObj.summedVolume >= 2750000
  ) {
    return true;
  } else if (
    featEntry.featValue === 2500000 &&
    overallStatsObj.summedVolume >= 2500000
  ) {
    return true;
  } else if (
    featEntry.featValue === 2250000 &&
    overallStatsObj.summedVolume >= 2250000
  ) {
    return true;
  } else if (
    featEntry.featValue === 2000000 &&
    overallStatsObj.summedVolume >= 2000000
  ) {
    return true;
  } else if (
    featEntry.featValue === 1750000 &&
    overallStatsObj.summedVolume >= 1750000
  ) {
    return true;
  } else if (
    featEntry.featValue === 1500000 &&
    overallStatsObj.summedVolume >= 1500000
  ) {
    return true;
  } else if (
    featEntry.featValue === 1250000 &&
    overallStatsObj.summedVolume >= 1250000
  ) {
    return true;
  } else if (
    featEntry.featValue === 1000000 &&
    overallStatsObj.summedVolume >= 1000000
  ) {
    return true;
  } else if (
    featEntry.featValue === 750000 &&
    overallStatsObj.summedVolume >= 750000
  ) {
    return true;
  } else if (
    featEntry.featValue === 500000 &&
    overallStatsObj.summedVolume >= 500000
  ) {
    return true;
  } else if (
    featEntry.featValue === 250000 &&
    overallStatsObj.summedVolume >= 250000
  ) {
    return true;
  } else if (
    featEntry.featValue === 100000 &&
    overallStatsObj.summedVolume >= 100000
  ) {
    return true;
  } else {
    return false;
  }
}

function calculateUniqueExercises(
    flattenedAllExerciseData: Exercise[],
    featEntry: IUserFeatsDataEntry
  ) {
    const uniqueExercises = new Set(flattenedAllExerciseData.map((obj) => obj.exercise));
    const uniqueExercisesCount = uniqueExercises.size;
  
    if (featEntry.featValue === 50 && uniqueExercisesCount >= 50) {
      return true;
    } else if (featEntry.featValue === 25 && uniqueExercisesCount >= 25) {
      return true;
    } else if (featEntry.featValue === 10 && uniqueExercisesCount >= 10) {
      return true;
    }  else {
      return false;
    }
  }
