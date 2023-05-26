import { ChartData } from "chart.js";
interface DataItem {
    date: Date;
    reps: number;
  }

  function getMaxReps(setInitialRawData:any, selectedExercise:any) {
    const request = indexedDB.open("fitScouterDb");
  
    request.onerror = (event) => {
      console.error(request.error);
    };
  
    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(["user-exercises-entries"], "readonly");
      const objectStore = transaction.objectStore("user-exercises-entries");
      const exerciseNameIndex = objectStore.index("exercise_name");
  
      const range = IDBKeyRange.only(selectedExercise.name); // Filter by exercise name
  
      const getDataRequest = exerciseNameIndex.getAll(range);
  
      getDataRequest.onsuccess = () => {
        const data = getDataRequest.result;
  
        // Create a map to store unique dates and corresponding maximum reps
        const dateRepsMap = new Map<string, number>();
  
        data.forEach((item:any) => {
          const currentDate = new Date(item.date).toLocaleDateString();
          const currentReps = item.reps;
          console.log('logging current reps:')
          console.log(currentReps)
          // Check if the current date is already present in the map
          if (dateRepsMap.has(currentDate)) {
            const existingReps = dateRepsMap.get(currentDate);
  
            // Update the reps if the current reps is higher
            if (existingReps && currentReps > existingReps) {
              dateRepsMap.set(currentDate, currentReps);
            }
          } else {
            // Add the date to the map if it doesn't exist
            dateRepsMap.set(currentDate, currentReps);
          }
        });
  
        const sortedDates = Array.from(dateRepsMap.keys())
          .map((date) => new Date(date))
          .sort((a, b) => a.getTime() - b.getTime());
        const reps = Array.from(dateRepsMap.values());
  
        const chartData = {
          labels: sortedDates.map((date) => date.toLocaleDateString()),
          datasets: [
            {
              label: "Reps",
              data: reps,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        };
  
        setInitialRawData(chartData);
      };
  
      getDataRequest.onerror = () => {
        console.error(getDataRequest.error);
      };
    };
  }
  

  export default getMaxReps