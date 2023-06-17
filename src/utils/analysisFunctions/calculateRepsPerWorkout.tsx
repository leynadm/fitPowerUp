function calculateRepsPerWorkout(selectedGraph:string, selectedExercise:string, timeframe:string, setInitialRawData:any) {
    const request = indexedDB.open("fitScouterDb");
  
    request.onerror = (event) => {
      console.error(request.error);
    };
  
    request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(["user-exercises-entries"], "readonly");
      const objectStore = transaction.objectStore("user-exercises-entries");
      const exerciseCategoryIndex = objectStore.index("exercise_category");
      const range = IDBKeyRange.only(selectedExercise); // Filter by exercise category
  
      const getDataRequest = exerciseCategoryIndex.getAll(range);
  
      getDataRequest.onsuccess = () => {
        const data = getDataRequest.result;
  
        // Create a map to store unique dates and corresponding reps
        const dateRepsMap = new Map();
  
        data.forEach((item:any) => {
          const currentDate = new Date(item.date).toDateString();
          const currentReps = item.reps;
  
          // Check if the current date is within the selected timeframe
          const currentDateObj = new Date(item.date);
          const startDate = getStartDate(timeframe);
          const endDate = new Date();
          if (currentDateObj < startDate || currentDateObj > endDate) {
            return; // Skip data outside the timeframe
          }
  
          // Update or add the number of reps for the current date
          if (dateRepsMap.has(currentDate)) {
            const existingReps = dateRepsMap.get(currentDate);
            dateRepsMap.set(currentDate, existingReps + currentReps);
          } else {
            dateRepsMap.set(currentDate, currentReps);
          }
        });
  
        const sortedDates = Array.from(dateRepsMap.keys())
          .map((date) => new Date(date))
          .sort((a, b) => a.getTime() - b.getTime());
  
        const repsValues = sortedDates.map((date) => {
          const reps = dateRepsMap.get(date.toDateString());
          return reps !== undefined ? reps : null;
        });
  
        const chartData = {
          labels: sortedDates.map((date) => date.toLocaleDateString()),
          datasets: [
            {
              label: "Reps",
              data: repsValues,
              fill: false,
              borderColor: "rgba(63,81,181,1)",
              borderWidth: 2,
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
  
  function getStartDate(timeframe:string) {
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
  
  export default calculateRepsPerWorkout;
  