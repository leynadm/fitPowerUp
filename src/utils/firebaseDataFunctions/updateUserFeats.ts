import {
  IWorkoutData,
  IUserTrainingData,
  Exercise,
} from "../interfaces/IUserTrainingData";
import { doc, collection, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IUserFeatsDataEntry } from "../interfaces/IUserFeats";
import getFlattenedExerciseData from "../completedWorkoutsChartFunctions/utility/getFlattenedExerciseData";
import getFlattenedAllExerciseData from "../completedWorkoutsChartFunctions/utility/getFlattenedAllExerciseData";

import getOverallStats from "../completedWorkoutsChartFunctions/breakdownFunctions/exercises/getOverallStats";
import toast from "react-hot-toast";

async function updateUserFeats(
  userId: string,
  userFeatsData: IUserFeatsDataEntry[],
  userBodyWeight: number
) {
  try {
    const userFeatsDataArr = userFeatsData;

    const userDocRef = doc(db, "users", userId);

    const userTrainingCollectionRef = collection(
      userDocRef,
      "userTrainingCollection"
    );

    const querySnapshot = await getDocs(userTrainingCollectionRef);

    const sessions: IUserTrainingData[] = [];

    querySnapshot.forEach((doc) => {
      // Assuming each document in the collection represents a training session
      // You might want to adjust this line depending on your data structure
      sessions.push(doc.data() as IUserTrainingData);
    });

    let onlyData: IWorkoutData[][] = [];

    for (const element of sessions) {
      if (Array.isArray(element.workoutSessions)) {
        onlyData.push(element.workoutSessions);
      }
    }

    const combinedSessions = onlyData.flat();

    const userTrainingDataResult = combinedSessions;

    const flattenedAllExerciseData = getFlattenedAllExerciseData(
      userTrainingDataResult,
      "all"
    );

    for (let index = 0; index < userFeatsDataArr.length; index++) {
      const userFeatEntry = userFeatsDataArr[index];

      if (userFeatEntry.type === "Workouts Consistency") {
        userFeatEntry.state = calculateWorkoutConsistency(
          flattenedAllExerciseData,
          userFeatEntry
        );
      }

      if (userFeatEntry.type === "Workouts Streak") {
        const streakObject = calculateWorkoutsStreak(flattenedAllExerciseData);

        const featValueCheck = streakObject[userFeatEntry.featValue];

        if (featValueCheck >= 1) {
          userFeatEntry.state = true;
        }
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
        const exercisesToCheck = [
          "Barbell Deadlift",
          "Barbell Romanian Deadlift",
          "Barbell Stiff Leg Deadlift",
          "Barbell Sumo Deadlift",
          "Barbell Sumo Romanian Deadlift",
          "Deficit Deadlift",
        ];

        for (const exercise of exercisesToCheck) {
          const flattenedExerciseData = getFlattenedExerciseData(
            userTrainingDataResult,
            exercise,
            "all"
          );

          const result = calculateDeadLift(
            flattenedExerciseData,
            userFeatEntry,
            userBodyWeight
          );

          if (result) {
            userFeatEntry.state = true;
            break;
          }
        }
      }

      if (userFeatEntry.type === "Exercises - Bench Press") {
        const exercisesToCheck = [
          "Flat Barbell Bench Press",
          "Flat Barbell Wide Grip Bench Press",
          "Paused Bench Press",
          "Barbell Floor Press",
        ];

        for (const exercise of exercisesToCheck) {
          const flattenedExerciseData = getFlattenedExerciseData(
            userTrainingDataResult,
            exercise,
            "all"
          );

          const result = calculateBenchPress(
            flattenedExerciseData,
            userFeatEntry,
            userBodyWeight
          );

          if (result) {
            userFeatEntry.state = true;
            break;
          }
        }
      }

      if (userFeatEntry.type === "Exercises - Shoulder Press") {
        const exercisesToCheck = [
          "Barbell Close Grip Overhead Press",
          "Barbell Overhead Press",
          "Barbell Seated Overhead Press",
          "Seated Behind The Neck Overhead Press",
          "Wide Grip Overhead Press",
        ];

        for (const exercise of exercisesToCheck) {
          const flattenedExerciseData = getFlattenedExerciseData(
            userTrainingDataResult,
            exercise,
            "all"
          );

          const result = calculateShoulderPress(
            flattenedExerciseData,
            userFeatEntry,
            userBodyWeight
          );

          if (result) {
            userFeatEntry.state = true;
            break;
          }
        }
      }

      if (userFeatEntry.type === "Exercises - Squat") {
        const exercisesToCheck = [
          "Barbell Squat",
          "Pause Squat",
          "Barbell Bulgarian Split Squat",
          "Barbell Front Squat",
          "Barbell Sumo Squat",
          "Crossed Arm Barbell Front Squat",
          "Zercher Squat",
        ];

        for (const exercise of exercisesToCheck) {
          const flattenedExerciseData = getFlattenedExerciseData(
            userTrainingDataResult,
            exercise,
            "all"
          );

          const result = calculateSquat(
            flattenedExerciseData,
            userFeatEntry,
            userBodyWeight
          );

          if (result) {
            userFeatEntry.state = true;
            break;
          }
        }
      }

      if (userFeatEntry.type === "Exercises - Pull Up") {
        const exercisesToCheck = [
          "Pull Up",
          "One Arm Pull Up",
          "Neutral Grip Pull Up",
          "L Pull Up",
          "Neutral Grip Pull Up",
          "Commando Pull Up",
          "Close Grip Pull Up",
          "TRX Pull Up",
          "Wide Grip Pull Up",
        ];

        for (const exercise of exercisesToCheck) {
          const flattenedExerciseData = getFlattenedExerciseData(
            userTrainingDataResult,
            exercise,
            "all"
          );

          const result = calculatePullUps(flattenedExerciseData, userFeatEntry);

          if (result) {
            userFeatEntry.state = true;
            break;
          }
        }
      }

      if (userFeatEntry.type === "Exercises - Push Up") {
        const exercisesToCheck = [
          "Band Push Up",
          "Bosu Ball Push Up",
          "Chest Tap Push Up",
          "Clap Push Up",
          "Close Grip Push Up",
          "Decline Push Up",
          "Decline Push Up Against Wall",
          "Diamond Push Up",
          "Dumbbell Push Up",
          "Elevated Push Up",
          "Finger Push Up",
          "Knuckle Push Up",
          "Medicine Ball Close Grip Push Up",
          "Push Up",
          "Push Up Plus",
          "Reverse Push Up",
          "Ring Push Up",
          "Rotational Push Up",
          "Shoulder Tap Push Up",
          "Single Arm Push Up",
          "Spiderman Push Up",
          "Superman Push Up",
          "Wide Hand Push Up",
        ];

        for (const exercise of exercisesToCheck) {
          const flattenedExerciseData = getFlattenedExerciseData(
            userTrainingDataResult,
            exercise,
            "all"
          );

          const result = calculatePushUps(flattenedExerciseData, userFeatEntry);

          if (result) {
            userFeatEntry.state = true;
            break;
          }
        }
      }

      if (userFeatEntry.type === "Exercises - Plank") {
        const exercisesToCheck = [
          "Weighted Front Plank",
          "Side Plank",
          "Reverse Plank With Leg Lift",
          "Reverse Plank",
          "Plank With Leg Lift",
          "Plank Toe Taps",
          "Plank Jack",
          "Plank Arm Lifts",
          "Plank",
          "Elbow To Knee Side Plank",
          "Body Saw Plank",
          "Bench Adductors Side Plank",
        ];

        for (const exercise of exercisesToCheck) {
          const flattenedExerciseData = getFlattenedExerciseData(
            userTrainingDataResult,
            exercise,
            "all"
          );

          const result = calculatePlank(flattenedExerciseData, userFeatEntry);

          if (result) {
            userFeatEntry.state = true;
            break;
          }
        }
      }

      if (userFeatEntry.type === "Exercises") {
        userFeatEntry.state = calculateUniqueExercises(
          flattenedAllExerciseData,
          userFeatEntry
        );
      }

      if (userFeatEntry.type === "Exercises - Sit-Ups/Crunches") {
        const exercisesToCheck = [
          "Assisted Sit Up",
          "Assisted Sit Up With Chair",
          "Band Decline Sit Up",
          "Decline Sit Up",
          "Decline Twisting Sit Up",
          "Dumbbell Decline Overhead Sit Up",
          "Flexion Leg Sit Up",
          "Janda Sit Up",
          "Medicine Ball Sit Up",
          "Roman Chair Sit Up",
          "Sit Up",
          "Sit Up Twist",
          "V Sit Up",
          "Weighted Decline Sit Up",
          "Ab Bench Crunch",
          "Air Bike Crunch",
          "Band Standing Crunch",
          "Alternate Oblique Crunch",
          "Bench Oblique Crunch",
          "Bosu Ball Crunch",
          "Bicycle Crunch",
          "Stability Ball Crunch",
          "Seated Leg Raise Crunch Machine",
          "Seated Cable Crunch",
          "Seated Abdominal Crunch Machine",
          "Seated 8 Leg Crunch",
          "Decline Crunch",
          "Decline Reverse Crunch",
          "Dumbbell Straight Arm Crunch",
          "Floor Crunch",
          "Kneeling Band Crunch",
          "Kneeling Cable Crunch",
          "Lever Lying Crunch",
          "Long Arm Crunch",
          "Medicine Ball Crunch",
          "Raise Legs Crunch",
          "Twisting Crunch",
          "Weighted Crunch",
          "Weighted Twisting Crunch",
        ];

        for (const exercise of exercisesToCheck) {
          const flattenedExerciseData = getFlattenedExerciseData(
            userTrainingDataResult,
            exercise,
            "all"
          );

          const result = calculateSitUpsOrCrunches(
            flattenedExerciseData,
            userFeatEntry
          );

          if (result) {
            userFeatEntry.state = true;
            break;
          }
        }
      }

      if (userFeatEntry.type === "Exercises - Burpees") {
        const flattenedExerciseDataBurpees = getFlattenedExerciseData(
          userTrainingDataResult,
          "Burpees",
          "all"
        );

        userFeatEntry.state = calculateBurpees(
          flattenedExerciseDataBurpees,
          userFeatEntry
        );
      }

      if (userFeatEntry.type === "Exercises - Hanging Leg Raises") {
        const exercisesToCheck = [
          "Hanging Leg Raise",
          "Hanging Leg Raise With Arm Slings",
          "Weighted Hanging Leg Hip Raise",
        ];

        for (const exercise of exercisesToCheck) {
          const flattenedExerciseData = getFlattenedExerciseData(
            userTrainingDataResult,
            exercise,
            "all"
          );

          const result = calculateHangingLegRaise(
            flattenedExerciseData,
            userFeatEntry
          );

          if (result) {
            userFeatEntry.state = true;
            break;
          }
        }
      }

      if (userFeatEntry.type === "Exercises - Chin Up") {
        const exercisesToCheck = [
          "Chin Up",
          "Close Grip Chin Up",
          "Neutral Grip Chin Up",
        ];

        for (const exercise of exercisesToCheck) {
          const flattenedExerciseData = getFlattenedExerciseData(
            userTrainingDataResult,
            exercise,
            "all"
          );

          const result = calculateChinUps(flattenedExerciseData, userFeatEntry);

          if (result) {
            userFeatEntry.state = true;
            break;
          }
        }
      }
    }

    const userFeatsDocRef = doc(userDocRef, "userCollection/userFeats/");

    await setDoc(userFeatsDocRef, { userFeatsData: userFeatsDataArr });
  } catch (error) {
    toast.error("There was an error with updateUserFeats!");
    console.error(error);
    throw error;
  }
}

export default updateUserFeats;

function calculateWorkoutsStreak(flattenedAllExerciseData: Exercise[]) {
  const entriesPerWeek = calculateEntriesPerWeek(flattenedAllExerciseData);

  const weekCounts = countWeeksWithCertainEntries(
    entriesPerWeek,
    2,
    3,
    4,
    5,
    6,
    7
  );

  return weekCounts;
}

function calculateWorkoutConsistency(
  flattenedAllExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry
) {
  if (flattenedAllExerciseData.length === 0) {
    return false;
  }

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
  } else if (featEntry.featValue === 10 && uniqueDateCount >= 10) {
    return true;
  } else if (featEntry.featValue === 5 && uniqueDateCount >= 5) {
    return true;
  } else if (featEntry.featValue === 1 && uniqueDateCount >= 1) {
    return true;
  } else {
    return false;
  }
}

function calculateSets(
  flattenedAllExerciseData: IWorkoutData[],
  featEntry: IUserFeatsDataEntry
) {
  if (flattenedAllExerciseData.length === 0) {
    return false;
  }

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
  if (flattenedAllExerciseData.length === 0) {
    return false;
  }

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
  if (flattenedAllExerciseData.length === 0) {
    return false;
  }

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
  if (flattenedAllExerciseData.length === 0) {
    return false;
  }

  const uniqueExercises = new Set(
    flattenedAllExerciseData.map((obj) => obj.exercise)
  );
  const uniqueExercisesCount = uniqueExercises.size;

  if (featEntry.featValue === 50 && uniqueExercisesCount >= 50) {
    return true;
  } else if (featEntry.featValue === 25 && uniqueExercisesCount >= 25) {
    return true;
  } else if (featEntry.featValue === 10 && uniqueExercisesCount >= 10) {
    return true;
  } else {
    return false;
  }
}

function calculateChinUps(
  flattenedExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry
) {
  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxReps = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.reps > max ? obj.reps : max),
    flattenedExerciseData[0].reps
  );

  if (featEntry.featValue === 24 && maxReps >= 24) {
    return true;
  } else if (featEntry.featValue === 14 && maxReps >= 14) {
    return true;
  } else if (featEntry.featValue === 6 && maxReps >= 6) {
    return true;
  } else if (featEntry.featValue === 1 && maxReps >= 1) {
    return true;
  } else {
    return false;
  }
}

function calculateDeadLift(
  flattenedExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry,
  userBodyWeight: number
) {
  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxWeight = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.weight > max ? obj.weight : max),
    flattenedExerciseData[0].weight
  );

  if (featEntry.featValue === 2 && maxWeight >= userBodyWeight * 2) {
    return true;
  } else if (featEntry.featValue === 1.5 && maxWeight >= userBodyWeight * 1.5) {
    return true;
  } else if (featEntry.featValue === 1 && maxWeight >= userBodyWeight) {
    return true;
  } else {
    return false;
  }
}

function calculateSquat(
  flattenedExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry,
  userBodyWeight: number
) {
  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxWeight = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.weight > max ? obj.weight : max),
    flattenedExerciseData[0].weight
  );

  if (featEntry.featValue === 1.5 && maxWeight >= userBodyWeight * 1.5) {
    return true;
  } else if (
    featEntry.featValue === 1.25 &&
    maxWeight >= userBodyWeight * 1.25
  ) {
    return true;
  } else if (featEntry.featValue === 1 && maxWeight >= userBodyWeight) {
    return true;
  } else {
    return false;
  }
}

function calculateShoulderPress(
  flattenedExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry,
  userBodyWeight: number
) {
  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxWeight = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.weight > max ? obj.weight : max),
    flattenedExerciseData[0].weight
  );

  if (featEntry.featValue === 1 && maxWeight >= userBodyWeight * 1) {
    return true;
  } else if (
    featEntry.featValue === 0.75 &&
    maxWeight >= userBodyWeight * 0.75
  ) {
    return true;
  } else if (featEntry.featValue === 0.5 && maxWeight >= userBodyWeight * 0.5) {
    return true;
  } else {
    return false;
  }
}

function calculateBenchPress(
  flattenedExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry,
  userBodyWeight: number
) {
 
  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxWeight = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.weight > max ? obj.weight : max),
    flattenedExerciseData[0].weight
  );

  if (featEntry.featValue === 1.25 && maxWeight >= userBodyWeight * 1.25) {
    return true;
  } else if (featEntry.featValue === 1 && maxWeight >= userBodyWeight) {
    return true;
  } else if (
    featEntry.featValue === 0.75 &&
    maxWeight >= userBodyWeight * 0.75
  ) {
    return true;
  } else {
    return false;
  }
}

function calculatePullUps(
  flattenedExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry
) {
  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxReps = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.reps > max ? obj.reps : max),
    flattenedExerciseData[0].reps
  );

  if (featEntry.featValue === 24 && maxReps >= 24) {
    return true;
  } else if (featEntry.featValue === 18 && maxReps >= 18) {
    return true;
  } else if (featEntry.featValue === 12 && maxReps >= 12) {
    return true;
  } else if (featEntry.featValue === 8 && maxReps >= 8) {
    return true;
  } else if (featEntry.featValue === 1 && maxReps >= 1) {
    return true;
  } else {
    return false;
  }
}

function calculatePushUps(
  flattenedExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry
) {
  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxReps = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.reps > max ? obj.reps : max),
    flattenedExerciseData[0].reps
  );

  if (featEntry.featValue === 50 && maxReps >= 50) {
    return true;
  } else if (featEntry.featValue === 40 && maxReps >= 40) {
    return true;
  } else if (featEntry.featValue === 30 && maxReps >= 30) {
    return true;
  } else if (featEntry.featValue === 20 && maxReps >= 20) {
    return true;
  } else if (featEntry.featValue === 10 && maxReps >= 10) {
    return true;
  } else if (featEntry.featValue === 1 && maxReps >= 1) {
    return true;
  } else {
    return false;
  }
}

function calculateHangingLegRaise(
  flattenedExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry
) {
  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxReps = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.reps > max ? obj.reps : max),
    flattenedExerciseData[0].reps
  );

  if (featEntry.featValue === 50 && maxReps >= 50) {
    return true;
  } else if (featEntry.featValue === 25 && maxReps >= 25) {
    return true;
  } else if (featEntry.featValue === 10 && maxReps >= 10) {
    return true;
  } else {
    return false;
  }
}

function calculateBurpees(
  flattenedExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry
) {
  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxReps = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.reps > max ? obj.reps : max),
    flattenedExerciseData[0].reps
  );

  if (featEntry.featValue === 100 && maxReps >= 100) {
    return true;
  } else if (featEntry.featValue === 75 && maxReps >= 75) {
    return true;
  } else if (featEntry.featValue === 50 && maxReps >= 50) {
    return true;
  } else if (featEntry.featValue === 25 && maxReps >= 25) {
    return true;
  } else {
    return false;
  }
}

function calculatePlank(
  flattenedExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry
) {
  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxTime = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.time > max ? obj.time : max),
    flattenedExerciseData[0].time
  );

  if (featEntry.featValue === 600 && maxTime >= 600) {
    return true;
  } else if (featEntry.featValue === 300 && maxTime >= 300) {
    return true;
  } else if (featEntry.featValue === 120 && maxTime >= 120) {
    return true;
  } else if (featEntry.featValue === 60 && maxTime >= 60) {
    return true;
  } else if (featEntry.featValue === 10 && maxTime >= 10) {
    return true;
  } else if (featEntry.featValue === 1 && maxTime >= 1) {
    return true;
  } else {
    return false;
  }
}

function calculateSitUpsOrCrunches(
  flattenedExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry
) {
  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxReps = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.reps > max ? obj.reps : max),
    flattenedExerciseData[0].reps
  );

  if (featEntry.featValue === 100 && maxReps >= 100) {
    return true;
  } else if (featEntry.featValue === 75 && maxReps >= 75) {
    return true;
  } else if (featEntry.featValue === 50 && maxReps >= 50) {
    return true;
  } else if (featEntry.featValue === 25 && maxReps >= 25) {
    return true;
  } else if (featEntry.featValue === 10 && maxReps >= 10) {
    return true;
  } else {
    return false;
  }
}

function getWeekNumber(d: Date): number {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
  return weekNo;
}

function calculateEntriesPerWeek(
  exercises: Exercise[]
): Record<number, Set<string>[]> {
  const entriesPerWeek: Record<number, Set<string>[]> = {};

  exercises.forEach((exercise) => {
    const date = new Date(exercise.date);
    const year = date.getFullYear();
    const week = getWeekNumber(date);
    const dateString = date.toISOString().split("T")[0]; // format as 'YYYY-MM-DD'

    if (!entriesPerWeek[year]) {
      entriesPerWeek[year] = [];
    }

    if (!entriesPerWeek[year][week]) {
      entriesPerWeek[year][week] = new Set();
    }

    entriesPerWeek[year][week].add(dateString);
  });

  return entriesPerWeek;
}

function countWeeksWithCertainEntries(
  entriesPerWeek: Record<number, Set<string>[]>,
  ...entryCounts: number[]
): Record<number, number> {
  const counts: Record<number, number> = {};

  entryCounts.forEach((count) => {
    counts[count] = 0;
  });

  for (const year in entriesPerWeek) {
    entriesPerWeek[year].forEach((weekSet) => {
      entryCounts.forEach((count) => {
        if (weekSet.size === count) {
          counts[count]++;
        }
      });
    });
  }

  return counts;
}
