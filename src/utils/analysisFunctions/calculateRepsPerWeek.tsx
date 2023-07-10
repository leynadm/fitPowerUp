function calculateRepsPerWeek(selectedGraph:string, selectedExercise:string, timeframe:string, setInitialRawData:any,chartType:string) {
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
  
        // Create a map to store unique weeks and corresponding reps
        const weekRepsMap = new Map();
  
        data.forEach((item:any) => {
          const currentDate = new Date(item.date);
          const weekStart = getWeekStartDate(currentDate);
          const currentReps = item.reps;
  
          // Check if the current date is within the selected timeframe
          const startDate = getStartDate(timeframe);
          const endDate = new Date();
          if (currentDate < startDate || currentDate > endDate) {
            return; // Skip data outside the timeframe
          }
  
          // Generate a key for the current week
          const weekKey = weekStart.toISOString();
  
          // Update or add the number of reps for the current week
          if (weekRepsMap.has(weekKey)) {
            const existingReps = weekRepsMap.get(weekKey);
            weekRepsMap.set(weekKey, existingReps + currentReps);
          } else {
            weekRepsMap.set(weekKey, currentReps);
          }
        });
  
        const sortedWeeks = Array.from(weekRepsMap.keys())
          .map((weekKey) => {
            const start = new Date(weekKey);
            const end = new Date(start);
            end.setDate(end.getDate() + 6); // Set end date as 6 days after the start date
            return {
              start,
              end,
            };
          })
          .sort((a, b) => a.start.getTime() - b.start.getTime());
  
        const repsValues = sortedWeeks.map((week) => {
          const reps = weekRepsMap.get(week.start.toISOString());
          return reps !== undefined ? reps : null;
        });
  
        const chartData = {
          labels: sortedWeeks.map((week) => `${week.start.getMonth() + 1}/${week.start.getDate()}/${week.start.getFullYear().toString().slice(-2)} - ${week.end.getMonth() + 1}/${week.end.getDate()}/${week.end.getFullYear().toString().slice(-2)}`),
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
  
  function getWeekStartDate(date:any) {
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Set to the first day (Monday) of the week
    startDate.setHours(0, 0, 0, 0); // Set time to midnight
    return startDate;
  }
  
  export default calculateRepsPerWeek;
  