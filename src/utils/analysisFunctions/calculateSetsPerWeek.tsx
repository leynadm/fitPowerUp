function calculateSetsPerWeek(selectedGraph:string, selectedExercise:string, timeframe:string, setInitialRawData:any) {
    const request = indexedDB.open("fitScouterDb");
  
    request.onerror = (event) => {
      console.error(request.error);
    };
  
    request.onsuccess = (event) => {
      console.log('Fetching data inside indexedDb...');
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(["user-exercises-entries"], "readonly");
      const objectStore = transaction.objectStore("user-exercises-entries");
      const exerciseCategoryIndex = objectStore.index("exercise_category");
      const range = IDBKeyRange.only(selectedExercise); // Filter by exercise category
  
      const getDataRequest = exerciseCategoryIndex.getAll(range);
  
      getDataRequest.onsuccess = () => {
        const data = getDataRequest.result;
  
        // Create a map to store unique weeks and corresponding sets count
        const weekSetsMap = new Map();
  
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
  
          // Increment the sets count for the current week
          if (!weekSetsMap.has(weekKey)) {
            weekSetsMap.set(weekKey, 1);
          } else {
            weekSetsMap.set(weekKey, weekSetsMap.get(weekKey) + 1);
          }
        });
  
        const sortedWeeks = Array.from(weekSetsMap.keys())
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
  
        const setsValues = sortedWeeks.map((week) => weekSetsMap.get(week.start.toISOString()));
  
        const chartData = {
          labels: sortedWeeks.map((week) => `${week.start.toLocaleDateString()} - ${week.end.toLocaleDateString()}`),
          datasets: [
            {
              label: "Sets",
              data: setsValues,
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
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1); // Adjust for Sunday (day 0)
    const startDate = new Date(date);
    startDate.setDate(diff);
    startDate.setHours(0, 0, 0, 0); // Set time to midnight
    return startDate;
  }
  
  export default calculateSetsPerWeek;
  