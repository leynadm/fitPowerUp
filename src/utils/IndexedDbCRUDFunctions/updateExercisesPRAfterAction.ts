import getIndexedDbExercises from "./getIndexedDbExercises";

import { IWorkoutData, Exercise } from "../interfaces/IUserTrainingData";
import getFlattenedExerciseData from "../completedWorkoutsChartFunctions/utility/getFlattenedExerciseData";
import { IIndexedDbUpdatedEntry } from "./checkExerciseIsPR";
import { MaxExerciseData } from "./checkExerciseIsPR";
import { getMaxObject } from "./checkExerciseIsPR";

async function updateExercisesPRAfterAction(
  userTrainingData: IWorkoutData[],
  exerciseName: string,
  updatedEntryToSave: IIndexedDbUpdatedEntry
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

  await iterateRecordsAndUpdate(
    exerciseName,
    combinedArray,
    updatedEntryToSave
  );
}

export default updateExercisesPRAfterAction;

export async function iterateRecordsAndUpdate(
  exerciseName: string,
  combinedArray: Exercise[],
  updatedEntryToSave: IIndexedDbUpdatedEntry
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

        const maxEntryWithCurrent = getMaxObject(combinedArray);

        const maxIDsWithPRsObj = findMaxIDsWithPRs(
          combinedArray,
          maxEntryWithCurrent,
          updatedEntryToSave
        );

        if (cursor) {
          if (cursor.value.exercise === exerciseName) {
            const currentIndexedDbExercise = cursor.value;

            if (
              updatedEntryToSave.reps !== 0 &&
              updatedEntryToSave.weight !== 0
            ) {
              if (
                maxIDsWithPRsObj &&
                (currentIndexedDbExercise.id ===
                  (maxIDsWithPRsObj.idWithRandW_MaxReps?.id || 0) ||
                  currentIndexedDbExercise.id ===
                    (maxIDsWithPRsObj.idWithRandW_MaxWeight?.id || 0))
              ) {
                updateExerciseInStore(cursor, true);
              } else {
                updateExerciseInStore(cursor, false);
              }
            } else if (
              updatedEntryToSave.distance !== 0 &&
              updatedEntryToSave.time !== 0
            ) {
              if (
                maxIDsWithPRsObj &&
                (currentIndexedDbExercise.id ===
                  (maxIDsWithPRsObj.idWithDandT_MaxDistance?.id || 0) ||
                  currentIndexedDbExercise.id ===
                    (maxIDsWithPRsObj.idWithDandT_MaxTime?.id || 0))
              ) {
                updateExerciseInStore(cursor, true);
              } else {
                updateExerciseInStore(cursor, false);
              }
            } else if (
              updatedEntryToSave.distance !== 0 &&
              updatedEntryToSave.weight !== 0
            ) {
              if (
                maxIDsWithPRsObj &&
                (currentIndexedDbExercise.id ===
                  (maxIDsWithPRsObj.idWithDandW_MaxDistance?.id || 0) ||
                  currentIndexedDbExercise.id ===
                    (maxIDsWithPRsObj.idWithDandW_MaxWeight?.id || 0))
              ) {
                updateExerciseInStore(cursor, true);
              } else {
                updateExerciseInStore(cursor, false);
              }
            } else if (
              updatedEntryToSave.weight !== 0 &&
              updatedEntryToSave.time !== 0
            ) {
              if (
                maxIDsWithPRsObj &&
                (currentIndexedDbExercise.id ===
                  (maxIDsWithPRsObj.idWithWandT_MaxWeight?.id || 0) ||
                  currentIndexedDbExercise.id ===
                    (maxIDsWithPRsObj.idWithWandT_MaxTime?.id || 0))
              ) {
                updateExerciseInStore(cursor, true);
              } else {
                updateExerciseInStore(cursor, false);
              }
            } else if (
              updatedEntryToSave.reps !== 0 &&
              updatedEntryToSave.distance !== 0
            ) {
              if (
                maxIDsWithPRsObj &&
                (currentIndexedDbExercise.id ===
                  (maxIDsWithPRsObj.idWithRandD_MaxReps?.id || 0) ||
                  currentIndexedDbExercise.id ===
                    (maxIDsWithPRsObj.idWithRandD_MaxDistance?.id || 0))
              ) {
                updateExerciseInStore(cursor, true);
              } else {
                updateExerciseInStore(cursor, false);
              }
            } else if (
              updatedEntryToSave.reps !== 0 &&
              updatedEntryToSave.time !== 0
            ) {
              if (
                maxIDsWithPRsObj &&
                (currentIndexedDbExercise.id ===
                  (maxIDsWithPRsObj.idWithRandT_MaxReps?.id || 0) ||
                  currentIndexedDbExercise.id ===
                    (maxIDsWithPRsObj.idWithRandT_MaxTime?.id || 0))
              ) {
                updateExerciseInStore(cursor, true);
              } else {
                updateExerciseInStore(cursor, false);
              }
            } else if (
              updatedEntryToSave.weight !== 0 &&
              updatedEntryToSave.reps === 0 &&
              updatedEntryToSave.distance === 0 &&
              updatedEntryToSave.time === 0
            ) {
              if (
                maxIDsWithPRsObj &&
                currentIndexedDbExercise.id ===
                  (maxIDsWithPRsObj.idWithSoloW_MaxWeight?.id || 0)
              ) {
                updateExerciseInStore(cursor, true);
              } else {
                updateExerciseInStore(cursor, false);
              }
            } else if (
              updatedEntryToSave.reps !== 0 &&
              updatedEntryToSave.weight === 0 &&
              updatedEntryToSave.distance === 0 &&
              updatedEntryToSave.time === 0
            ) {
              if (
                maxIDsWithPRsObj &&
                currentIndexedDbExercise.id ===
                  (maxIDsWithPRsObj.idWithSoloR_MaxReps?.id || 0)
              ) {
                updateExerciseInStore(cursor, true);
              } else {
                updateExerciseInStore(cursor, false);
              }
            } else if (
              updatedEntryToSave.distance !== 0 &&
              updatedEntryToSave.weight === 0 &&
              updatedEntryToSave.reps === 0 &&
              updatedEntryToSave.time === 0
            ) {
              if (
                maxIDsWithPRsObj &&
                currentIndexedDbExercise.id ===
                  (maxIDsWithPRsObj.idWithSoloD_MaxDistance?.id || 0)
              ) {
                updateExerciseInStore(cursor, true);
              } else {
                updateExerciseInStore(cursor, false);
              }
            } else if (
              updatedEntryToSave.time !== 0 &&
              updatedEntryToSave.weight === 0 &&
              updatedEntryToSave.reps === 0 &&
              updatedEntryToSave.distance === 0
            ) {
              if (
                maxIDsWithPRsObj &&
                currentIndexedDbExercise.id ===
                  (maxIDsWithPRsObj.idWithSoloT_MaxTime?.id || 0)
              ) {
                updateExerciseInStore(cursor, true);
              } else {
                updateExerciseInStore(cursor, false);
              }
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

function updateExerciseInStore(cursor: IDBCursorWithValue, isPR: boolean) {
  // Clone the cursor value before making modifications
  const updatedExercise = { ...cursor.value };

  // Update the record in the object store
  updatedExercise.is_pr = isPR;
  const updateRequest = cursor.update(updatedExercise);

  updateRequest.onsuccess = function () {
    console.log(`Record with ID ${cursor.primaryKey} updated successfully.`);
  };
}

function findMaxIDsWithPRs(
  combinedArray: Exercise[],
  maxEntry: MaxExerciseData,
  updatedEntryToSave: IIndexedDbUpdatedEntry
) {
  let idWithRandW_MaxReps = {
    maxReps: 0,
    maxWeight: 0,
    id: 0,
  };
  let idWithRandW_MaxWeight = {
    maxReps: 0,
    maxWeight: 0,
    id: 0,
  };

  let idWithDandT_MaxDistance = {
    maxDistance: 0,
    maxTime: 0,
    id: 0,
  };
  let idWithDandT_MaxTime = {
    maxDistance: 0,
    maxTime: 0,
    id: 0,
  };

  let idWithDandW_MaxDistance = {
    maxDistance: 0,
    maxWeight: 0,
    id: 0,
  };
  let idWithDandW_MaxWeight = {
    maxDistance: 0,
    maxWeight: 0,
    id: 0,
  };

  let idWithWandT_MaxWeight = {
    maxWeight: 0,
    maxTime: 0,
    id: 0,
  };
  let idWithWandT_MaxTime = {
    maxWeight: 0,
    maxTime: 0,
    id: 0,
  };

  let idWithRandD_MaxReps = {
    maxReps: 0,
    maxDistance: 0,
    id: 0,
  };
  let idWithRandD_MaxDistance = {
    maxReps: 0,
    maxDistance: 0,
    id: 0,
  };

  let idWithRandT_MaxReps = {
    maxReps: 0,
    maxTime: 0,
    id: 0,
  };
  let idWithRandT_MaxTime = {
    maxReps: 0,
    maxTime: 0,
    id: 0,
  };

  let idWithSoloW_MaxWeight = {
    maxWeight: 0,
    id: 0,
  };

  let idWithSoloR_MaxReps = {
    maxReps: 0,
    id: 0,
  };

  let idWithSoloD_MaxDistance = {
    maxDistance: 0,
    id: 0,
  };

  let idWithSoloT_MaxTime = {
    maxTime: 0,
    id: 0,
  };

  if (updatedEntryToSave.reps !== 0 && updatedEntryToSave.weight !== 0) {
    for (let index = 0; index < combinedArray.length; index++) {
      const combinedArrayEntry = combinedArray[index];

      if (combinedArrayEntry.reps >= maxEntry.maxReps) {
        if (
          combinedArrayEntry.reps >= idWithRandW_MaxReps.maxReps &&
          combinedArrayEntry.weight > idWithRandW_MaxReps.maxWeight
        ) {
          idWithRandW_MaxReps.maxReps = combinedArrayEntry.reps;
          idWithRandW_MaxReps.maxWeight = combinedArrayEntry.weight;
          idWithRandW_MaxReps.id = combinedArrayEntry.id;
        }
      }

      if (combinedArrayEntry.weight >= maxEntry.maxWeight) {
        if (
          combinedArrayEntry.reps > idWithRandW_MaxWeight.maxReps &&
          combinedArrayEntry.weight >= idWithRandW_MaxWeight.maxWeight
        ) {
          idWithRandW_MaxWeight.maxReps = combinedArrayEntry.reps;
          idWithRandW_MaxWeight.maxWeight = combinedArrayEntry.weight;
          idWithRandW_MaxWeight.id = combinedArrayEntry.id;
        }
      }
    }

    return {
      idWithRandW_MaxReps,
      idWithRandW_MaxWeight,
    };
  }

  // DISTANCE AND TIME
  if (updatedEntryToSave.distance !== 0 && updatedEntryToSave.time !== 0) {
    for (let index = 0; index < combinedArray.length; index++) {
      const combinedArrayEntry = combinedArray[index];

      if (combinedArrayEntry.distance >= maxEntry.maxDistance) {
        if (
          combinedArrayEntry.distance >= idWithDandT_MaxDistance.maxDistance &&
          combinedArrayEntry.time > idWithDandT_MaxDistance.maxTime
        ) {
          idWithDandT_MaxDistance.maxDistance = combinedArrayEntry.distance;
          idWithDandT_MaxDistance.maxTime = combinedArrayEntry.time;
          idWithDandT_MaxDistance.id = combinedArrayEntry.id;
        }
      }

      if (combinedArrayEntry.time >= maxEntry.maxTime) {
        if (
          combinedArrayEntry.distance > idWithDandT_MaxTime.maxDistance &&
          combinedArrayEntry.time >= idWithDandT_MaxTime.maxTime
        ) {
          idWithDandT_MaxTime.maxDistance = combinedArrayEntry.distance;
          idWithDandT_MaxTime.maxTime = combinedArrayEntry.time;
          idWithDandT_MaxTime.id = combinedArrayEntry.id;
        }
      }
    }

    return {
      idWithDandT_MaxDistance,
      idWithDandT_MaxTime,
    };
  }

  // DISTANCE AND WEIGHT
  if (updatedEntryToSave.distance !== 0 && updatedEntryToSave.weight !== 0) {
    for (let index = 0; index < combinedArray.length; index++) {
      const combinedArrayEntry = combinedArray[index];

      if (combinedArrayEntry.distance >= maxEntry.maxDistance) {
        if (
          combinedArrayEntry.distance >= idWithDandW_MaxDistance.maxDistance &&
          combinedArrayEntry.weight > idWithDandW_MaxDistance.maxWeight
        ) {
          idWithDandW_MaxDistance.maxDistance = combinedArrayEntry.distance;
          idWithDandW_MaxDistance.maxWeight = combinedArrayEntry.weight;
          idWithDandW_MaxDistance.id = combinedArrayEntry.id;
        }
      }

      if (combinedArrayEntry.time >= maxEntry.maxWeight) {
        if (
          combinedArrayEntry.distance > idWithDandW_MaxWeight.maxDistance &&
          combinedArrayEntry.weight >= idWithDandW_MaxWeight.maxWeight
        ) {
          idWithDandW_MaxWeight.maxDistance = combinedArrayEntry.distance;
          idWithDandW_MaxWeight.maxWeight = combinedArrayEntry.weight;
          idWithDandW_MaxWeight.id = combinedArrayEntry.id;
        }
      }
    }

    return {
      idWithDandW_MaxDistance,
      idWithDandW_MaxWeight,
    };
  }

  // WEIGHT AND TIME
  if (updatedEntryToSave.weight !== 0 && updatedEntryToSave.time !== 0) {
    for (let index = 0; index < combinedArray.length; index++) {
      const combinedArrayEntry = combinedArray[index];

      if (combinedArrayEntry.weight >= maxEntry.maxWeight) {
        if (
          combinedArrayEntry.weight >= idWithWandT_MaxWeight.maxWeight &&
          combinedArrayEntry.time > idWithWandT_MaxWeight.maxTime
        ) {
          idWithWandT_MaxWeight.maxWeight = combinedArrayEntry.weight;
          idWithWandT_MaxWeight.maxTime = combinedArrayEntry.time;
          idWithWandT_MaxWeight.id = combinedArrayEntry.id;
        }
      }

      if (combinedArrayEntry.time >= maxEntry.maxTime) {
        if (
          combinedArrayEntry.weight > idWithWandT_MaxTime.maxTime &&
          combinedArrayEntry.time >= idWithWandT_MaxTime.maxTime
        ) {
          idWithWandT_MaxTime.maxWeight = combinedArrayEntry.weight;
          idWithWandT_MaxTime.maxTime = combinedArrayEntry.time;
          idWithWandT_MaxTime.id = combinedArrayEntry.id;
        }
      }
    }

    return {
      idWithWandT_MaxWeight,
      idWithWandT_MaxTime,
    };
  }

  // REPS AND DISTANCE
  if (updatedEntryToSave.reps !== 0 && updatedEntryToSave.distance !== 0) {
    for (let index = 0; index < combinedArray.length; index++) {
      const combinedArrayEntry = combinedArray[index];

      if (combinedArrayEntry.reps >= maxEntry.maxReps) {
        if (
          combinedArrayEntry.reps >= idWithRandD_MaxReps.maxReps &&
          combinedArrayEntry.distance > idWithRandD_MaxReps.maxDistance
        ) {
          idWithRandD_MaxReps.maxReps = combinedArrayEntry.reps;
          idWithRandD_MaxReps.maxDistance = combinedArrayEntry.distance;
          idWithRandD_MaxReps.id = combinedArrayEntry.id;
        }
      }

      if (combinedArrayEntry.time >= maxEntry.maxTime) {
        if (
          combinedArrayEntry.reps > idWithRandD_MaxDistance.maxReps &&
          combinedArrayEntry.distance >= idWithRandD_MaxDistance.maxDistance
        ) {
          idWithRandD_MaxDistance.maxReps = combinedArrayEntry.reps;
          idWithRandD_MaxDistance.maxDistance = combinedArrayEntry.distance;
          idWithRandD_MaxDistance.id = combinedArrayEntry.id;
        }
      }
    }

    return {
      idWithRandD_MaxReps,
      idWithRandD_MaxDistance,
    };
  }

  // REPS AND TIME
  if (updatedEntryToSave.reps !== 0 && updatedEntryToSave.time !== 0) {
    for (let index = 0; index < combinedArray.length; index++) {
      const combinedArrayEntry = combinedArray[index];

      if (combinedArrayEntry.reps >= maxEntry.maxReps) {
        if (
          combinedArrayEntry.reps >= idWithRandT_MaxReps.maxReps &&
          combinedArrayEntry.time > idWithRandT_MaxReps.maxTime
        ) {
          idWithRandT_MaxReps.maxReps = combinedArrayEntry.reps;
          idWithRandT_MaxReps.maxTime = combinedArrayEntry.time;
          idWithRandT_MaxReps.id = combinedArrayEntry.id;
        }
      }

      if (combinedArrayEntry.time >= maxEntry.maxTime) {
        if (
          combinedArrayEntry.reps > idWithRandT_MaxTime.maxReps &&
          combinedArrayEntry.time >= idWithRandT_MaxTime.maxTime
        ) {
          idWithRandT_MaxTime.maxReps = combinedArrayEntry.reps;
          idWithRandT_MaxTime.maxTime = combinedArrayEntry.time;
          idWithRandT_MaxTime.id = combinedArrayEntry.id;
        }
      }
    }

    return {
      idWithRandT_MaxReps,
      idWithRandT_MaxTime,
    };
  }

  // SOLO WEIGHT
  if (
    updatedEntryToSave.weight !== 0 &&
    updatedEntryToSave.reps === 0 &&
    updatedEntryToSave.distance === 0 &&
    updatedEntryToSave.time === 0
  ) {
    for (let index = 0; index < combinedArray.length; index++) {
      const combinedArrayEntry = combinedArray[index];

      if (combinedArrayEntry.weight > maxEntry.maxWeight) {
        idWithSoloW_MaxWeight.maxWeight = combinedArrayEntry.weight;
        idWithSoloW_MaxWeight.id = combinedArrayEntry.id;
      }
    }

    return {
      idWithSoloW_MaxWeight,
    };
  }

  //SOLO REPS
  if (
    updatedEntryToSave.reps !== 0 &&
    updatedEntryToSave.weight === 0 &&
    updatedEntryToSave.distance === 0 &&
    updatedEntryToSave.time === 0
  ) {
    for (let index = 0; index < combinedArray.length; index++) {
      const combinedArrayEntry = combinedArray[index];
      if (combinedArrayEntry.reps > maxEntry.maxReps) {
        idWithSoloR_MaxReps.maxReps = combinedArrayEntry.reps;
        idWithSoloR_MaxReps.id = combinedArrayEntry.id;
      }
    }

    return {
      idWithSoloR_MaxReps,
    };
  }

  //SOLO DISTANCE
  if (
    updatedEntryToSave.distance !== 0 &&
    updatedEntryToSave.weight === 0 &&
    updatedEntryToSave.reps === 0 &&
    updatedEntryToSave.time === 0
  ) {
    for (let index = 0; index < combinedArray.length; index++) {
      const combinedArrayEntry = combinedArray[index];
      if (combinedArrayEntry.distance > maxEntry.maxDistance) {
        idWithSoloD_MaxDistance.maxDistance = combinedArrayEntry.distance;
        idWithSoloD_MaxDistance.id = combinedArrayEntry.id;
      }
    }

    return {
      idWithSoloD_MaxDistance,
    };
  }

  // SOLO TIME
  if (
    updatedEntryToSave.time !== 0 &&
    updatedEntryToSave.weight === 0 &&
    updatedEntryToSave.reps === 0 &&
    updatedEntryToSave.distance === 0
  ) {
    for (let index = 0; index < combinedArray.length; index++) {
      const combinedArrayEntry = combinedArray[index];
      if (combinedArrayEntry.time > maxEntry.maxTime) {
        idWithSoloT_MaxTime.maxTime = combinedArrayEntry.time;
        idWithSoloT_MaxTime.id = combinedArrayEntry.id;
      }
    }

    return {
      idWithSoloT_MaxTime,
    };
  }
}
