import toast from "react-hot-toast";

function getWorkoutEvaluationData(currentDate:Date): Promise<any> {
  
  // Open the database
  const request = window.indexedDB.open("fitScouterDb", 1);

  return new Promise((resolve, reject) => {
    request.onsuccess = function (event: any) {
      const db = event.target.result;

      // Open transaction to access the object store
      const transaction = db.transaction(["workout-evaluation"], "readonly");
      const objectStore = transaction.objectStore("workout-evaluation");

      const index = objectStore.index("workout_evaluation_date");
      const getRequest = index.get(currentDate);

      getRequest.onsuccess = function (event: any) {
        // Get the workout evaluation data
        const workoutEvaluationData = event.target.result;

        // Close the database
        db.close();

        // Resolve the promise with the workout evaluation data
        resolve(workoutEvaluationData);
      };

      getRequest.onerror = function () {
        // Reject the promise with an error
        reject("Oops, couldn't get the workout evaluation data!");
        toast.error("Oops, couldn't open the database in getWorkoutEvaluation!")
      };

      transaction.oncomplete = function () {
        // Close the database
        db.close();
      };
    };

    request.onerror = function () {
      // Reject the promise with an error
      reject("Oops, couldn't open the database in getWorkoutEvaluation!");
    };
  });
}

export default getWorkoutEvaluationData;