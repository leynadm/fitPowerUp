function calculateWorkoutsPerWeek(selectedGraph:string, selectedExercise:string, timeframe:string, setInitialRawData:any,chartType:string) {
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
  
        // Create a map to store unique weeks and corresponding workout count
        const weekWorkoutsMap = new Map();
  
        data.forEach((item:any) => {
          const currentDate = new Date(item.date);
          const weekStart = getWeekStartDate(currentDate);
  
          // Check if the current date is within the selected timeframe
          const startDate = getStartDate(timeframe);
          const endDate = new Date();
          if (currentDate < startDate || currentDate > endDate) {
            return; // Skip data outside the timeframe
          }
  
          // Generate a key for the current week
          const weekKey = weekStart.toISOString();
  
          // Add the workout date to the map for the current week
          if (!weekWorkoutsMap.has(weekKey)) {
            weekWorkoutsMap.set(weekKey, new Set());
          }
          weekWorkoutsMap.get(weekKey).add(currentDate.toDateString());
        });
  
        const sortedWeeks = Array.from(weekWorkoutsMap.keys())
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
  
        const workoutCountValues = sortedWeeks.map((week) => weekWorkoutsMap.get(week.start.toISOString()).size);
  
        const chartData = {
          labels: sortedWeeks.map((week) => {
            const weekNumber = getWeekNumber(week.start);
            const year = week.start.getFullYear();
            return `WK${weekNumber}-${year}`;
          }),
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
  
  function getWeekStartDate(date:any) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday (day 0)
    const startDate = new Date(date);
    startDate.setDate(diff);
    startDate.setHours(0, 0, 0, 0); // Set time to midnight
    return startDate;
  }

  function getWeekNumber(date:any) {
    const target:any = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 ms per week
  }

  
  export default calculateWorkoutsPerWeek;
  