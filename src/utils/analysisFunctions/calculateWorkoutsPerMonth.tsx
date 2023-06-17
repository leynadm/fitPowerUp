function calculateWorkoutsPerMonth(selectedGraph:string, selectedExercise:string, timeframe:string, setInitialRawData:any,chartType:string) {
    const request = indexedDB.open("fitScouterDb");
  
    request.onerror = (event) => {
      console.error(request.error);
    };
  
    request.onsuccess = (event) => {
      console.log('Fetching data inside indexedDb...');
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(["user-exercises-entries"], "readonly");
      const objectStore = transaction.objectStore("user-exercises-entries");
     
      let exerciseIndex:any;

      if(chartType==="category"){
        exerciseIndex = objectStore.index("exercise_category");
      } else {
        exerciseIndex = objectStore.index("exercise_name");
      }
  
      const range = IDBKeyRange.only(selectedExercise); // Filter by exercise category
  

      let getDataRequest: any;
      if (selectedExercise === "") {
        getDataRequest = exerciseIndex.getAll();
      } else {
        getDataRequest = exerciseIndex.getAll(range);
      }
      
      getDataRequest.onsuccess = () => {
        const data = getDataRequest.result;
  
        // Create a map to store unique months and corresponding workout count
        const monthWorkoutsMap = new Map();
  
        data.forEach((item:any) => {
          const currentDate = new Date(item.date);
          const monthStart = getMonthStartDate(currentDate);
  
          // Check if the current date is within the selected timeframe
          const startDate = getStartDate(timeframe);
          const endDate = new Date();
          if (currentDate < startDate || currentDate > endDate) {
            return; // Skip data outside the timeframe
          }
  
          // Generate a key for the current month
          const monthKey = monthStart.toISOString();
  
          // Add the workout date to the map for the current month
          if (!monthWorkoutsMap.has(monthKey)) {
            monthWorkoutsMap.set(monthKey, new Set());
          }
          monthWorkoutsMap.get(monthKey).add(currentDate.toDateString());
        });
  
        const sortedMonths = Array.from(monthWorkoutsMap.keys())
          .map((monthKey) => {
            const start = new Date(monthKey);
            const end = new Date(start.getFullYear(), start.getMonth() + 1, 0); // Set end date as the last day of the month
            return {
              start,
              end,
            };
          })
          .sort((a, b) => a.start.getTime() - b.start.getTime());
  
        const workoutCountValues = sortedMonths.map((month) => monthWorkoutsMap.get(month.start.toISOString()).size);
  
        const chartData = {
          labels: sortedMonths.map((month) => `${month.start.toLocaleDateString()} - ${month.end.toLocaleDateString()}`),
          datasets: [
            {
              label: "Workouts",
              data: workoutCountValues,
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
  
  function getMonthStartDate(date:any) {
    return new Date(date.getFullYear(), date.getMonth(), 1); // Set the date to the first day of the month
  }
  
  export default calculateWorkoutsPerMonth;
  