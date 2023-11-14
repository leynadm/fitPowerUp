import getIndexedDbExercises from "./getIndexedDbExercises";
import { IWorkoutData } from "../firebaseDataFunctions/completeWorkout";
import getFlattenedExerciseData from "../completedWorkoutsChartFunctions/utility/getFlattenedExerciseData";

import { MaxExerciseData } from "./checkExerciseIsPR";
import Exercise from "../interfaces/Exercise";
import { getMaxObjectWithoutCurrent } from "./updateExercisesPRAfterDeletion";
async function updateExercisesPRAfterSaving(
  userTrainingData: IWorkoutData[],
  exerciseName: string
) {
    
    const exerciseDataArr = getFlattenedExerciseData(
    userTrainingData,
    exerciseName,
    "all"
  );

  const entries = await getIndexedDbExercises(exerciseName);

  if (!exerciseDataArr || !entries) {
    return;
  }

  const combinedArray = exerciseDataArr.concat(entries);
  console.log({ combinedArray });
  await iterateRecordsAndUpdate(exerciseName, combinedArray);
}

export default updateExercisesPRAfterSaving;

export async function iterateRecordsAndUpdate(
  exerciseName: string,
  combinedArray: Exercise[]
) {
  try {
    const request = indexedDB.open("fitScouterDb", 2);

    request.onsuccess = function (event: Event) {
      const db = (event.target as IDBRequest).result;

      const userEntryTransaction = db.transaction(
        "user-exercises-entries",
        "readwrite" // Change to readwrite for modification
      );

      const userEntryTransactionStore = userEntryTransaction.objectStore(
        "user-exercises-entries"
      );

      const cursorRequest = userEntryTransactionStore.openCursor();

      cursorRequest.onsuccess = async function (event: Event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          console.log("INSIDE THE LOOP:");
          console.log("logging cursor.value.exercise");
          console.log(cursor.value.exercise);
          console.log({ exerciseName });

          if (cursor.value.exercise === exerciseName) {
            console.log("CHECKING IF WE EVER ENTER THE LOOP:");
            const currentIndexedDbExercise = cursor.value;

            const maxEntryWithoutCurrent = getMaxObjectWithoutCurrent(
              combinedArray,
              currentIndexedDbExercise.id
            );

            console.log({ currentIndexedDbExercise });
            console.log({ maxEntryWithoutCurrent });

            const currentIndexedDbExerciseIsPr = checkExerciseEntryVsMax(
              currentIndexedDbExercise,
              maxEntryWithoutCurrent
            );

            if (currentIndexedDbExerciseIsPr) {
              // Clone the cursor value before making modifications
              const updatedExercise = { ...currentIndexedDbExercise };

              // Update the record in the object store
              updatedExercise.is_pr = true;
              const updateRequest = cursor.update(updatedExercise);

              updateRequest.onsuccess = function () {
                console.log(
                  `Record with ID ${cursor.primaryKey} updated successfully.`
                );
              };

              updateRequest.onerror = function (event: Event) {
                console.error(
                  "Error updating record:",
                  (event.target as IDBRequest).error
                );
              };
            } else {
              // Clone the cursor value before making modifications
              const updatedExercise = { ...currentIndexedDbExercise };

              // Update the record in the object store
              updatedExercise.is_pr = false;
              const updateRequest = cursor.update(updatedExercise);

              updateRequest.onsuccess = function () {
                console.log(
                  `Record with ID ${cursor.primaryKey} updated successfully.`
                );
              };

              updateRequest.onerror = function (event: Event) {
                console.error(
                  "Error updating record:",
                  (event.target as IDBRequest).error
                );
              };
            }
          }
          cursor.continue();
        } else {
          // No more records
          console.log("All records processed.");
          db.close();
        }
      };

      cursorRequest.onerror = function (event: Event) {
        console.error(
          "Error opening cursor:",
          (event.target as IDBRequest).error
        );
      };
    };
  } catch (error) {
    console.error("Error opening database:", error);
  }
}

function checkExerciseEntryVsMax(
  currentIndexedDbEntry: Exercise,
  maxEntryWithoutCurrent: MaxExerciseData
) {
  let isPR = false;

  if (currentIndexedDbEntry.reps !== 0 && currentIndexedDbEntry.weight !== 0) {
    if (
      (currentIndexedDbEntry.reps >= maxEntryWithoutCurrent.maxReps &&
        currentIndexedDbEntry.weight > maxEntryWithoutCurrent.maxWeight) ||
      (currentIndexedDbEntry.reps > maxEntryWithoutCurrent.maxReps &&
        currentIndexedDbEntry.weight >= maxEntryWithoutCurrent.maxWeight) ||
      currentIndexedDbEntry.reps > maxEntryWithoutCurrent.maxReps ||
      currentIndexedDbEntry.weight > maxEntryWithoutCurrent.maxWeight
    ) {
      isPR = true;
      return isPR;
    }
  }

  if (
    currentIndexedDbEntry.distance !== 0 &&
    currentIndexedDbEntry.time !== 0
  ) {
    if (
      (currentIndexedDbEntry.distance >= maxEntryWithoutCurrent.maxDistance &&
        currentIndexedDbEntry.time > maxEntryWithoutCurrent.maxTime) ||
      (currentIndexedDbEntry.distance > maxEntryWithoutCurrent.maxDistance &&
        currentIndexedDbEntry.time >= maxEntryWithoutCurrent.maxTime) ||
      currentIndexedDbEntry.time > maxEntryWithoutCurrent.maxTime ||
      currentIndexedDbEntry.distance > maxEntryWithoutCurrent.maxDistance
    ) {
      isPR = true;
      return isPR;
    }
  }

  if (
    currentIndexedDbEntry.distance !== 0 &&
    currentIndexedDbEntry.weight !== 0
  ) {
    if (
      (currentIndexedDbEntry.distance >= maxEntryWithoutCurrent.maxDistance &&
        currentIndexedDbEntry.weight > maxEntryWithoutCurrent.maxWeight) ||
      (currentIndexedDbEntry.distance > maxEntryWithoutCurrent.maxDistance &&
        currentIndexedDbEntry.weight >= maxEntryWithoutCurrent.maxWeight) ||
      currentIndexedDbEntry.weight > maxEntryWithoutCurrent.maxWeight ||
      currentIndexedDbEntry.distance > maxEntryWithoutCurrent.maxDistance
    ) {
      isPR = true;
      return isPR;
    }
  }

  if (currentIndexedDbEntry.weight !== 0 && currentIndexedDbEntry.time !== 0) {
    if (
      (currentIndexedDbEntry.weight >= maxEntryWithoutCurrent.maxWeight &&
        currentIndexedDbEntry.time > maxEntryWithoutCurrent.maxTime) ||
      (currentIndexedDbEntry.weight > maxEntryWithoutCurrent.maxWeight &&
        currentIndexedDbEntry.time >= maxEntryWithoutCurrent.maxTime) ||
      currentIndexedDbEntry.time > maxEntryWithoutCurrent.maxTime ||
      currentIndexedDbEntry.weight > maxEntryWithoutCurrent.maxWeight
    ) {
      isPR = true;
      return isPR;
    }
  }

  if (
    currentIndexedDbEntry.reps !== 0 &&
    currentIndexedDbEntry.distance !== 0
  ) {
    if (
      (currentIndexedDbEntry.reps >= maxEntryWithoutCurrent.maxReps &&
        currentIndexedDbEntry.distance > maxEntryWithoutCurrent.maxDistance) ||
      (currentIndexedDbEntry.reps > maxEntryWithoutCurrent.maxReps &&
        currentIndexedDbEntry.distance >= maxEntryWithoutCurrent.maxDistance) ||
      currentIndexedDbEntry.reps > maxEntryWithoutCurrent.maxReps ||
      currentIndexedDbEntry.distance > maxEntryWithoutCurrent.maxDistance
    ) {
      isPR = true;
      return isPR;
    }
  }

  if (currentIndexedDbEntry.reps !== 0 && currentIndexedDbEntry.time !== 0) {
    if (
      (currentIndexedDbEntry.reps >= maxEntryWithoutCurrent.maxReps &&
        currentIndexedDbEntry.time > maxEntryWithoutCurrent.maxTime) ||
      (currentIndexedDbEntry.reps > maxEntryWithoutCurrent.maxReps &&
        currentIndexedDbEntry.time >= maxEntryWithoutCurrent.maxTime) ||
      currentIndexedDbEntry.reps > maxEntryWithoutCurrent.maxReps ||
      currentIndexedDbEntry.time > maxEntryWithoutCurrent.maxTime
    ) {
      isPR = true;
      return isPR;
    }
  }

  if (currentIndexedDbEntry.weight !== 0) {
    if (currentIndexedDbEntry.weight > maxEntryWithoutCurrent.maxWeight) {
      isPR = true;
      return isPR;
    }
  }

  if (currentIndexedDbEntry.reps !== 0) {
    if (currentIndexedDbEntry.reps > maxEntryWithoutCurrent.maxReps) {
      isPR = true;
      return isPR;
    }
  }

  if (currentIndexedDbEntry.distance !== 0) {
    if (currentIndexedDbEntry.distance > maxEntryWithoutCurrent.maxDistance) {
      isPR = true;
      return isPR;
    }
  }

  if (currentIndexedDbEntry.time !== 0) {
    if (currentIndexedDbEntry.time > maxEntryWithoutCurrent.maxTime) {
      isPR = true;
      return isPR;
    }
  }

  return isPR;
}
