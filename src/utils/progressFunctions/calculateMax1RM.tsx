interface DataItem {
  date: Date;
  weight: number;
  reps: number;
}
function calculateMax1RM(selectedExercise: any, timeframe: string): Promise<number> {

  return new Promise((resolve, reject) => {
    const request = indexedDB.open("fitScouterDb");

    request.onerror = (event) => {
      console.error(request.error);
    };
  
    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(["user-exercises-entries"], "readonly");
      const objectStore = transaction.objectStore("user-exercises-entries");
      const exerciseNameIndex = objectStore.index("exercise_name");

      const range = IDBKeyRange.only(selectedExercise); // Filter by exercise name

      const getDataRequest = exerciseNameIndex.getAll(range);

      getDataRequest.onsuccess = () => {
        const data = getDataRequest.result as DataItem[];

        let max1RM = 0; // Initialize the maximum 1 Rep Max to 0
 
        data.forEach((item) => {
          const currentDate = new Date(item.date).toDateString();
          const currentWeight = item.weight;
          const currentReps = item.reps;
          const currentMax = Math.round((currentWeight * (1 + currentReps / 30)) * 10) / 10; // Calculate 1 Rep Max

          // Check if the current date is within the selected timeframe
          const currentDateObj = new Date(item.date);
          const startDate = getStartDate(timeframe);
          const endDate = new Date();

          if (currentDateObj < startDate || currentDateObj > endDate) {
            return; // Skip data outside the timeframe
          }

          // Update the maximum 1 Rep Max if the current Max is higher
          if (currentMax > max1RM) {
            max1RM = currentMax;
          }
        });

        console.log('Logging max1RM inside calculate:');
        console.log(max1RM);
        resolve(max1RM);
      };

      getDataRequest.onerror = () => {
        console.error(getDataRequest.error);
        reject(getDataRequest.error);
      };
    };
  });
}

function getStartDate(timeframe: string): Date {
  const today = new Date();
  switch (timeframe) {
    case "1m":
      return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    case "3m":
      return new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
    case "6m":
      return new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
    case "1y":
      return new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    default:
      return new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());
  }
}

export default calculateMax1RM;
