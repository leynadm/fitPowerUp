import { IWorkoutData } from "./completeWorkout";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IUserTrainingData } from "../../context/TrainingData";
import getFlattenedExerciseData from "../completedWorkoutsChartFunctions/utility/getFlattenedExerciseData";
import getFlattenedAllExerciseData from "../completedWorkoutsChartFunctions/utility/getFlattenedAllExerciseData";
import { IUserFeatsDataEntry } from "../../context/TrainingData";
import Exercise from "../interfaces/Exercise";
import getOverallStats from "../completedWorkoutsChartFunctions/breakdownFunctions/exercises/getOverallStats";

async function updateUserFeats(
  userId: string,
  userFeatsData: IUserFeatsDataEntry[],
  userBodyWeight: number
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

    if (userFeatEntry.type === "Workout Streak") {
      const streakObject = calculateWorkoutsStreak(
        flattenedAllExerciseData,
        userFeatEntry
      );

      const featValueCheck = streakObject[userFeatEntry.featValue];
      
      userFeatEntry.state = featValueCheck >= 1;
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
      const flattenedExerciseDataDeadlift = getFlattenedExerciseData(
        userTrainingDataResult,
        "Deadlift",
        "all"
      );

      userFeatEntry.state = calculateDeadLift(
        flattenedExerciseDataDeadlift,
        userFeatEntry,
        userBodyWeight
      );
    }

    if (userFeatEntry.type === "Exercises - Bench Press") {
      const flattenedExerciseDataBenchPress = getFlattenedExerciseData(
        userTrainingDataResult,
        "Bench Press",
        "all"
      );

      const benchPress = calculateBenchPress(
        flattenedExerciseDataBenchPress,
        userFeatEntry,
        userBodyWeight
      );

      const flattenedExerciseDataBarbellFloorPress = getFlattenedExerciseData(
        userTrainingDataResult,
        "Barbell Floor Press",
        "all"
      );

      const barbellFloorPress = calculateBenchPress(
        flattenedExerciseDataBarbellFloorPress,
        userFeatEntry,
        userBodyWeight
      );

      if (benchPress || barbellFloorPress) {
        userFeatEntry.state = true;
      }
    }

    if (userFeatEntry.type === "Exercises - Shoulder Press") {
      const flattenedExerciseDataMilitaryPress = getFlattenedExerciseData(
        userTrainingDataResult,
        "Military Press",
        "all"
      );

      const militaryPress = calculateShoulderPress(
        flattenedExerciseDataMilitaryPress,
        userFeatEntry,
        userBodyWeight
      );

      const flattenedExerciseDataBarbellSeatedShoulderPress =
        getFlattenedExerciseData(
          userTrainingDataResult,
          "Seated Shoulder Press",
          "all"
        );

      const seatedShoulderPress = calculateShoulderPress(
        flattenedExerciseDataBarbellSeatedShoulderPress,
        userFeatEntry,
        userBodyWeight
      );

      if (militaryPress || seatedShoulderPress) {
        userFeatEntry.state = true;
      }
    }

    if (userFeatEntry.type === "Exercises - Squat") {
      const flattenedExerciseDataSquat = getFlattenedExerciseData(
        userTrainingDataResult,
        "Squat",
        "all"
      );

      userFeatEntry.state = calculateSquat(
        flattenedExerciseDataSquat,
        userFeatEntry,
        userBodyWeight
      );
    }

    if (userFeatEntry.type === "Exercises - Pull Up") {
      const flattenedExerciseDataPullUp = getFlattenedExerciseData(
        userTrainingDataResult,
        "Pull Ups",
        "all"
      );

      userFeatEntry.state = calculatePullUps(
        flattenedExerciseDataPullUp,
        userFeatEntry
      );
    }

    if (userFeatEntry.type === "Exercises - Push Up") {
      const flattenedExerciseDataPushUps = getFlattenedExerciseData(
        userTrainingDataResult,
        "Push Ups",
        "all"
      );

      userFeatEntry.state = calculatePushUps(
        flattenedExerciseDataPushUps,
        userFeatEntry
      );
    }

    if (userFeatEntry.type === "Exercises - Plank") {
      const flattenedExerciseDataChinUp = getFlattenedExerciseData(
        userTrainingDataResult,
        "Plank",
        "all"
      );

      userFeatEntry.state = calculatePlank(
        flattenedExerciseDataChinUp,
        userFeatEntry
      );
    }

    if (userFeatEntry.type === "Exercises") {
      userFeatEntry.state = calculateUniqueExercises(
        flattenedAllExerciseData,
        userFeatEntry
      );
    }

    if (userFeatEntry.type === "Exercises - Sit-Ups/Crunches") {
      const flattenedExerciseDataSitUps = getFlattenedExerciseData(
        userTrainingDataResult,
        "Sit Ups",
        "all"
      );

      const flattenedExerciseDataCrunches = getFlattenedExerciseData(
        userTrainingDataResult,
        "Crunches",
        "all"
      );

      const sitUps = calculateSitUpsOrCrunches(
        flattenedExerciseDataSitUps,
        userFeatEntry
      );

      const crunches = calculateSitUpsOrCrunches(
        flattenedExerciseDataCrunches,
        userFeatEntry
      );

      if (sitUps || crunches) {
        userFeatEntry.state = true;
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
      const flattenedExerciseDataHangingLegRaises = getFlattenedExerciseData(
        userTrainingDataResult,
        "Hanging Leg Raise",
        "all"
      );

      userFeatEntry.state = calculateHangingLegRaise(
        flattenedExerciseDataHangingLegRaises,
        userFeatEntry
      );
    }

    if (userFeatEntry.type === "Exercises - Chin Up") {
      const flattenedExerciseDataChinUp = getFlattenedExerciseData(
        userTrainingDataResult,
        "Chin Ups",
        "all"
      );

      userFeatEntry.state = calculateChinUps(
        flattenedExerciseDataChinUp,
        userFeatEntry
      );
    }
  }

  const userFeatsDocRef = doc(userDocRef, "userCollection/userFeats/");

  await setDoc(userFeatsDocRef, { userFeatsData: userFeatsDataArr });
}

export default updateUserFeats;

function calculateWorkoutsStreak(
  flattenedAllExerciseData: Exercise[],
  featEntry: IUserFeatsDataEntry
) {

  const entriesPerWeek = calculateEntriesPerWeek(flattenedAllExerciseData);
  const weekCounts = countWeeksWithCertainEntries(
    entriesPerWeek,
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
  } else if (featEntry.featValue === 1 && uniqueDateCount >= 1) {
    console.log("it should be here.");
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
  console.log("logging userBodyWeight");
  console.log(userBodyWeight);

  if (flattenedExerciseData.length === 0) {
    return false;
  }

  let maxWeight = flattenedExerciseData.reduce(
    (max: number, obj: Exercise) => (obj.weight > max ? obj.weight : max),
    flattenedExerciseData[0].weight
  );
  console.log("logging full flattened exercise data");
  console.log(flattenedExerciseData);
  console.log("logging only the first entry:");
  console.log(flattenedExerciseData[0].weight);

  console.log("logging maxWeight in Bench Press");
  console.log(maxWeight);

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
): Record<number, number[]> {
  const entriesPerWeek: Record<number, number[]> = {};

  exercises.forEach((exercise) => {
    const date = new Date(exercise.date);
    const year = date.getFullYear();
    const week = getWeekNumber(date);

    if (!entriesPerWeek[year]) {
      entriesPerWeek[year] = [];
    }

    if (!entriesPerWeek[year][week]) {
      entriesPerWeek[year][week] = 0;
    }

    entriesPerWeek[year][week]++;
  });

  return entriesPerWeek;
}

function countWeeksWithCertainEntries(
  entriesPerWeek: Record<number, number[]>,
  ...entryCounts: number[]
): Record<number, number> {
  const counts: Record<number, number> = {};

  for (const year in entriesPerWeek) {
    entryCounts.forEach((count) => {
      counts[count] = entriesPerWeek[year].filter(
        (weekEntries) => weekEntries >= count
      ).length;
    });
  }

  return counts;
}
