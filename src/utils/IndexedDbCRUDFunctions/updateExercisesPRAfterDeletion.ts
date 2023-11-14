import getIndexedDbExercises from "./getIndexedDbExercises";
import { IWorkoutData } from "../firebaseDataFunctions/completeWorkout";
import getFlattenedExerciseData from "../completedWorkoutsChartFunctions/utility/getFlattenedExerciseData";

import { MaxExerciseData } from "./checkExerciseIsPR";
import Exercise from "../interfaces/Exercise";
async function updateExercisesPRAfterDeletion(
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
    return 
  }

  console.log('succesfully passed the check:')
  const combinedArray = exerciseDataArr.concat(entries);

  await iterateRecordsAndUpdate(exerciseName, combinedArray);
}

export default updateExercisesPRAfterDeletion;

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
          if (cursor.value.exercise === exerciseName) {
            const currentIndexedDbExercise = cursor.value;

            const maxEntryWithoutCurrent = getMaxObjectWithoutCurrent(
              combinedArray,
              currentIndexedDbExercise.id
            );

            console.log({currentIndexedDbExercise})
            console.log({getMaxObjectWithoutCurrent})
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

export function getMaxObjectWithoutCurrent(
  newCombinedArr: Exercise[] | undefined,
  currentExerciseId: number
): MaxExerciseData {

  if (!newCombinedArr) {
    return { maxWeight: 0, maxReps: 0, maxDistance: 0, maxTime: 0 };
  }

  const maxObject: MaxExerciseData = newCombinedArr.reduce(
    (accumulator: MaxExerciseData, currentValue: Exercise) => {
      if (currentValue.id !== currentExerciseId) {
        if (currentValue.reps > accumulator.maxReps) {
          accumulator.maxReps = currentValue.reps;
        }
        if (currentValue.weight > accumulator.maxWeight) {
          accumulator.maxWeight = currentValue.weight;
        }
        if (currentValue.distance > accumulator.maxDistance) {
          accumulator.maxDistance = currentValue.distance;
        }
        if (currentValue.time > accumulator.maxTime) {
          accumulator.maxTime = currentValue.time;
        }
      }

      return accumulator;
    },
    { maxWeight: 0, maxReps: 0, maxDistance: 0, maxTime: 0 }
  );

  return maxObject;
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
