import Exercise from "../interfaces/Exercise";
import toast from "react-hot-toast";

function getExistingExercisesByName(setExistingExercises:any) {
    const request = indexedDB.open("fitScouterDb", 1);
  
    request.onsuccess = function () {
      const db = request.result;
  
      const userEntryTransaction = db.transaction(
        "user-exercises-entries",
        "readonly"
      );
  
      const userEntryTransactionStore = userEntryTransaction.objectStore(
        "user-exercises-entries"
      );
  
      const exerciseNameIndex = userEntryTransactionStore.index(
        "exercise_name"
      );
  
      const exercisesRequest = exerciseNameIndex.openCursor();
  
      const tempExistingExercises: Exercise[] = [];
      exercisesRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;
  
        if (cursor) {
          tempExistingExercises.push(cursor.value);
          cursor.continue();
        } else {
          console.log("Logging existing exercises:");
          console.log(tempExistingExercises);
  
          setExistingExercises(tempExistingExercises);
        }
      };
  
      exercisesRequest.onerror = function () {
        toast.error("Oops, getExistingExercisesByName has an error!");
        console.error("Error retrieving existing exercises");
      };
  
      userEntryTransaction.oncomplete = function () {
        db.close();
      };
    };
  
    request.onerror = function () {
      toast.error("Oops, couldn't open the database in getExistingExercisesByName!");
      console.log("Error opening database");
    };
  }

  export default getExistingExercisesByName