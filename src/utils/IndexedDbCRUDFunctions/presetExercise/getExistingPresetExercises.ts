import toast from "react-hot-toast";
import { Exercise } from "../../interfaces/IUserTrainingData";
import { Dispatch,SetStateAction } from "react";
async function getExistingPresetExercises(exerciseSelectedName:string,setExistingExercises:Dispatch<SetStateAction<Exercise[]>>) {
    const request = indexedDB.open("fitPowerUpDb", 2);

    request.onsuccess = function () {
      const db = request.result;

      const userEntryTransaction = db.transaction(
        "user-preset-workouts",
        "readonly"
      );

      const userEntryTransactionStore = userEntryTransaction.objectStore(
        "user-preset-workouts"
      );

      const exerciseNameIndex =
        userEntryTransactionStore.index("exercise_name");

      const range = IDBKeyRange.only(exerciseSelectedName);

      const exercisesRequest = exerciseNameIndex.openCursor(range);

      const tempExistingExercises:
        | any[]
        | ((prevState: Exercise[]) => Exercise[]) = [];
      exercisesRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;

        if (cursor) {
          tempExistingExercises.push(cursor.value);
          cursor.continue();
        } else {
          setExistingExercises(tempExistingExercises);
        }
      };

      exercisesRequest.onerror = function () {
        toast.error("Oops, getExistingPresetExercises has an error!");
        console.error("Error retrieving existing exercises");
      };

      userEntryTransaction.oncomplete = function () {
        db.close();
      };
    };

    request.onerror = function () {
      toast.error("Oops, couldn't open the database!");
    };
  }

  export default getExistingPresetExercises