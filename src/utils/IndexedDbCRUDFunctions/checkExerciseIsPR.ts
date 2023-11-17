import { IWorkoutData } from "../firebaseDataFunctions/completeWorkout";
import getFlattenedExerciseData from "../completedWorkoutsChartFunctions/utility/getFlattenedExerciseData";
import Exercise from "../interfaces/Exercise";
import getIndexedDbExercises from "./getIndexedDbExercises";

export interface IIndexedDbUpdatedEntry {
  date: Date;
  exercise: string;
  category: string;
  weight: number;
  reps: number;
  distance: number;
  distance_unit: string | number | object;
  time: number;
  is_pr: boolean;
  dropset: boolean;
}

export interface MaxExerciseData {
  maxWeight: number | 0;
  maxReps: number | 0;
  maxDistance: number | 0;
  maxTime: number | 0;
  maxVolume:number|0
}

async function checkExerciseIsPR(
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

  let isPR = false;

  if (!exerciseDataArr) {
    return isPR;
  }

  const combinedArray = exerciseDataArr.concat(entries);

  const maxEntry = getMaxObject(combinedArray);

  if (!maxEntry) {
    return;
  }
  const maxResultsArr = getMaxResultsArr(combinedArray)
  console.log('INSIDE SAVING THE FIRST EXERCISE')
  console.log({maxEntry})
  console.log(updatedEntryToSave)

  if (updatedEntryToSave.reps !== 0 && updatedEntryToSave.weight !== 0) {
    if (
      (updatedEntryToSave.reps >= maxEntry.maxReps &&
        updatedEntryToSave.weight > maxEntry.maxWeight)
         ||
        
         (updatedEntryToSave.reps > maxEntry.maxReps &&
        updatedEntryToSave.weight >= maxEntry.maxWeight) 
        ||
      
        updatedEntryToSave.reps > maxEntry.maxReps ||
      updatedEntryToSave.weight > maxEntry.maxWeight
    ) {
      isPR = true;
      return isPR;
    }

    //cHECK IF THE NEW ENTRY IS EQUAL TO THE HIGHEST MAXARRAY VALUES (REPS/WEIGHT)


  }

  if (updatedEntryToSave.distance !== 0 && updatedEntryToSave.time !== 0) {
    if (
      (updatedEntryToSave.distance >= maxEntry.maxDistance &&
        updatedEntryToSave.time > maxEntry.maxTime) ||
      (updatedEntryToSave.distance > maxEntry.maxDistance &&
        updatedEntryToSave.time >= maxEntry.maxTime) ||
      updatedEntryToSave.time > maxEntry.maxTime ||
      updatedEntryToSave.distance > maxEntry.maxDistance
    ) {
      isPR = true;
      return isPR;
    }
  }

  if (updatedEntryToSave.distance !== 0 && updatedEntryToSave.weight !== 0) {
    if (
      (updatedEntryToSave.distance >= maxEntry.maxDistance &&
        updatedEntryToSave.weight > maxEntry.maxWeight) ||
      (updatedEntryToSave.distance > maxEntry.maxDistance &&
        updatedEntryToSave.weight >= maxEntry.maxWeight) ||
      updatedEntryToSave.weight > maxEntry.maxWeight ||
      updatedEntryToSave.distance > maxEntry.maxDistance
    ) {
      isPR = true;
      return isPR;
    }
  }

  if (updatedEntryToSave.weight !== 0 && updatedEntryToSave.time !== 0) {
    if (
      (updatedEntryToSave.weight >= maxEntry.maxWeight &&
        updatedEntryToSave.time > maxEntry.maxTime) ||
      (updatedEntryToSave.weight > maxEntry.maxWeight &&
        updatedEntryToSave.time >= maxEntry.maxTime) ||
      updatedEntryToSave.time > maxEntry.maxTime ||
      updatedEntryToSave.weight > maxEntry.maxWeight
    ) {
      isPR = true;
      return isPR;
    }
  }

  if (updatedEntryToSave.reps !== 0 && updatedEntryToSave.distance !== 0) {
    if (
      (updatedEntryToSave.reps >= maxEntry.maxReps &&
        updatedEntryToSave.distance > maxEntry.maxDistance) ||
      (updatedEntryToSave.reps > maxEntry.maxReps &&
        updatedEntryToSave.distance >= maxEntry.maxDistance) ||
      updatedEntryToSave.reps > maxEntry.maxReps ||
      updatedEntryToSave.distance > maxEntry.maxDistance
    ) {
      isPR = true;
      return isPR;
    }
  }

  if (updatedEntryToSave.reps !== 0 && updatedEntryToSave.time !== 0) {
    if (
      (updatedEntryToSave.reps >= maxEntry.maxReps &&
        updatedEntryToSave.time > maxEntry.maxTime) ||
      (updatedEntryToSave.reps > maxEntry.maxReps &&
        updatedEntryToSave.time >= maxEntry.maxTime) ||
      updatedEntryToSave.reps > maxEntry.maxReps ||
      updatedEntryToSave.time > maxEntry.maxTime
    ) {
      isPR = true;
      return isPR;
    }
  }

  if (updatedEntryToSave.weight !== 0) {
    if (updatedEntryToSave.weight > maxEntry.maxWeight) {
      isPR = true;
      return isPR;
    }
  }

  if (updatedEntryToSave.reps !== 0) {
    if (updatedEntryToSave.reps > maxEntry.maxReps) {
      isPR = true;
      return isPR;
    }
  }

  if (updatedEntryToSave.distance !== 0) {
    if (updatedEntryToSave.distance > maxEntry.maxDistance) {
      isPR = true;
      return isPR;
    }
  }

  if (updatedEntryToSave.time !== 0) {
    if (updatedEntryToSave.time > maxEntry.maxTime) {
      isPR = true;
      return isPR;
    }
  }

  return isPR;
}


export function getMaxResultsArr(
  newCombinedArr:Exercise[]|undefined)
{
  if (!newCombinedArr) {
    return { maxWeight: [], maxReps: [], maxDistance: [], maxTime: [],maxVolume:[] };
  }  

  const maxResultsArrObj: {
    maxWeight: number[];
    maxReps: number[];
    maxTime: number[];
    maxDistance: number[];
    maxVolume: number[];
  } = {
    maxWeight: [],
    maxReps: [],
    maxTime: [],
    maxDistance: [],
    maxVolume: [],
  };

  for (let index = 0; index < newCombinedArr.length; index++) {
    const newCombinedArrElement = newCombinedArr[index];
    maxResultsArrObj.maxWeight.push(newCombinedArrElement.weight)
    maxResultsArrObj.maxReps.push(newCombinedArrElement.reps)
    maxResultsArrObj.maxTime.push(newCombinedArrElement.time)
    maxResultsArrObj.maxDistance.push(newCombinedArrElement.distance)
    maxResultsArrObj.maxVolume.push(newCombinedArrElement.reps*newCombinedArrElement.weight)
  }
/* 
    maxResultsArrObj.maxWeight.sort((a, b) => a - b);
    maxResultsArrObj.maxReps.sort((a, b) => a - b);
    maxResultsArrObj.maxTime.sort((a, b) => a - b);
    maxResultsArrObj.maxDistance.sort((a, b) => a - b);
    maxResultsArrObj.maxVolume.sort((a, b) => a - b);    
 */
  return maxResultsArrObj
}

export function getMaxObject(
  newCombinedArr: Exercise[] | undefined
) {
  if (!newCombinedArr) {
    return { maxWeight: 0, maxReps: 0, maxDistance: 0, maxTime: 0,maxVolume:0 };
  }

  const maxObject: MaxExerciseData = newCombinedArr.reduce(
    (accumulator: MaxExerciseData, currentValue: Exercise) => {
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
      return accumulator;
    },
    { maxWeight: 0, maxReps: 0, maxDistance: 0, maxTime: 0,maxVolume:0 }
  );

  maxObject.maxVolume=maxObject.maxReps*maxObject.maxWeight

  return maxObject;
}

export default checkExerciseIsPR;
