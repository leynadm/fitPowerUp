import { IWorkoutData } from "../interfaces/IUserTrainingData";
import { doc, collection, writeBatch } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";

import { IUserBodyTrackerData } from "../interfaces/IBodyTracker";
async function updateUnitSystemPreference(
  userTrainingData: IWorkoutData[],
  userBodyTrackerData: IUserBodyTrackerData,
  updatedUnitsSystem: "metric" | "imperial",
  currentUnitsSystem: "metric" | "imperial",
  userId: string
) {
  const convertedUserTrainingData = convertUserTrainingData(
    userTrainingData,
    updatedUnitsSystem,
    currentUnitsSystem
  );

  const convertedUserBodyTrackerData = convertUserBodyTrackerData(
    userBodyTrackerData,
    updatedUnitsSystem,
    currentUnitsSystem
  ); 

  const batch = writeBatch(db);

  try {

    const userDocRef = doc(db, "users", userId);
    const userTrainingCollectionRef = collection(
      userDocRef,
      "userTrainingCollection"
    );

    // Splitting userTrainingData into different documents
    const dataSize = 350; // Define the size limit for each document
    const convertedUserTrainingDataLength = convertedUserTrainingData.length;
    let trainingDataDocCount = 0; // To keep track of the number of documents created

    for (let i = 0; i < convertedUserTrainingDataLength; i += dataSize) {
      trainingDataDocCount++; // Increment trainingDataDocCount for each new document

      const userTrainingDoc = doc(
        userTrainingCollectionRef,
        `userTrainingData_${trainingDataDocCount}`
      );

      // Get a slice of the training data array for this document
      const dataSlice = convertedUserTrainingData.slice(i, i + dataSize);

      batch.set(userTrainingDoc, {
        workoutSessions: dataSlice,
      });
    }

    const userBodyTrackerCollectionRef = collection(
      userDocRef,
      "userBodyTrackerCollection"
    );

    const convertedUserBodyTrackerDataLength =
      convertedUserBodyTrackerData.length;
      let bodyTrackerDataDocCount = 0; // To keep track of the number of documents created
    
      for (let i = 0; i < convertedUserBodyTrackerDataLength; i += dataSize) {
        bodyTrackerDataDocCount++; // Increment trainingDataDocCount for each new document

      const userBodyTrackerDoc = doc(
        userBodyTrackerCollectionRef,
        `userBodyTrackerData_${bodyTrackerDataDocCount}`
      );

      // Get a slice of the training data array for this document
      const dataSlice = convertedUserBodyTrackerData.slice(i, i + dataSize);

      batch.set(userBodyTrackerDoc, {
        bodyTrackerData: dataSlice,
      });
    }

    batch.update(userDocRef, {
      unitsSystem: updatedUnitsSystem,
    });

    batch.commit();
 
    toast.success(`Unit System updated to ${updatedUnitsSystem}!`);
  } catch (error) {
    toast.error("Oops, updateUnitSystemPreference has an error!");
    console.error("Error creating documents:", error);
    // You can also throw the error again to propagate it to the caller of this function
    throw error;
  }
}

export default updateUnitSystemPreference;

function convertUserTrainingData(
  userTrainingDataArr: IWorkoutData[],
  updatedUnitsSystem: "metric" | "imperial",
  currentUnitsSystem: "metric" | "imperial"
) {
  if (userTrainingDataArr.length === 0) {
    return [];
  }

  const convertedUserTrainingDataArr = JSON.parse(
    JSON.stringify(userTrainingDataArr)
  );

  for (let index = 0; index < convertedUserTrainingDataArr.length; index++) {
    const convertedUserTrainingDataEntry = convertedUserTrainingDataArr[index];

    for (
      let index = 0;
      index < convertedUserTrainingDataEntry.wExercises.length;
      index++
    ) {
      const workoutExerciseGroup =
        convertedUserTrainingDataEntry.wExercises[index].exercises;

      for (let index = 0; index < workoutExerciseGroup.length; index++) {
        const workoutExerciseGroupEntry = workoutExerciseGroup[index];

        if (
          workoutExerciseGroupEntry.weight !== 0 &&
          updatedUnitsSystem === "imperial" &&
          currentUnitsSystem === "metric"
        ) {
          const newConvertedValue = parseFloat(
            (workoutExerciseGroupEntry.weight * 2.20462).toFixed(1)
          );

          workoutExerciseGroupEntry.weight = newConvertedValue;
        } else if (
          workoutExerciseGroupEntry.weight !== 0 &&
          updatedUnitsSystem === "metric" &&
          currentUnitsSystem === "imperial"
        ) {
          const newConvertedValue = parseFloat(
            (workoutExerciseGroupEntry.weight * 0.453592).toFixed(1)
          );

          workoutExerciseGroupEntry.weight = newConvertedValue;
        }
      }
    }
  }

  return convertedUserTrainingDataArr;
}

function convertUserBodyTrackerData(
  userBodyTrackerDataArr: IUserBodyTrackerData,
  updatedUnitsSystem: "metric" | "imperial",
  currentUnitsSystem: "metric" | "imperial"
) {
  const convertedUserBodyTrackerDataArr = JSON.parse(
    JSON.stringify(userBodyTrackerDataArr)
  );

  for (let index = 0; index < convertedUserBodyTrackerDataArr.length; index++) {
    const convertedUserBodyTrackerEntry =
      convertedUserBodyTrackerDataArr[index];

    for (const kpiEntry in convertedUserBodyTrackerEntry) {
      const objValue = convertedUserBodyTrackerEntry[kpiEntry];
      if (
        objValue !== 0 &&
        kpiEntry !== "date" &&
        updatedUnitsSystem === "imperial" &&
        currentUnitsSystem === "metric"
      ) {
        convertedUserBodyTrackerEntry[kpiEntry] = parseFloat(
          (objValue * 2.20462).toFixed(1)
        );
      } else if (
        objValue !== 0 &&
        kpiEntry !== "date" &&
        updatedUnitsSystem === "metric" &&
        currentUnitsSystem === "imperial"
      ) {
        convertedUserBodyTrackerEntry[kpiEntry] = parseFloat(
          (objValue * 0.453592).toFixed(1)
        );
      }
    }
  }

  return convertedUserBodyTrackerDataArr;
}
