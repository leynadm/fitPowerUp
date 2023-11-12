import Exercise from "../interfaces/Exercise";
import toast from "react-hot-toast";

async function getNewWorkoutExercises(setExistingExercises: any) {
  const request = indexedDB.open("fitScouterDb", 2);

  request.onsuccess = function () {
    const db = request.result;

    const userEntryTransaction = db.transaction(
      "user-exercises-entries",
      "readonly"
    );

    const userEntryTransactionStore = userEntryTransaction.objectStore(
      "user-exercises-entries"
    );

    const exercisesRequest = userEntryTransactionStore.openCursor();
    const groupedExercisesByName: { [name: string]: Exercise[] } = {};

    exercisesRequest.onsuccess = function (event) {
      const cursor = (event.target as IDBRequest).result;

      if (cursor) {
        const exercise = cursor.value;
        // Find the group for the current exercise name, or create a new group if it doesn't exist
        const group = groupedExercisesByName[exercise.exercise];
        if (group) {
          group.push(exercise);
        } else {
          groupedExercisesByName[exercise.exercise] = [exercise];
        }

        cursor.continue();
      } else {
        const groupedExercises: { name: string; exercises: Exercise[] }[] = [];

        // Create a group for each name and add exercises grouped by name
        Object.keys(groupedExercisesByName).forEach((name) => {
          groupedExercises.push({
            name,
            exercises: groupedExercisesByName[name],
          });
        });
        setExistingExercises(groupedExercises);
      }
    };

    exercisesRequest.onerror = function () {
      toast.error("Oops, getNewWorkoutExercises has an error!");
      console.error("Error retrieving existing exercises");
    };

    userEntryTransaction.oncomplete = function () {
      db.close();
    };
  };

  request.onerror = function () {
    toast.error("Oops, couldn't open the database in getNewWorkoutExercises!");
    console.error("Error opening database");
  };
}

export default getNewWorkoutExercises;
