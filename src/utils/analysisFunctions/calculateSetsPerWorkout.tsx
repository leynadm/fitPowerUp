function calculateSetsPerWorkout(selectedGraph:string, selectedExercise:string, timeframe:string, setInitialRawData:any,chartType:string) {
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
  
        // Create a map to store unique dates and corresponding sets
        const dateSetsMap = new Map();
  
        data.forEach((item:any) => {
            const currentDate = new Date(item.date).toDateString();
            const currentSets = item.sets;
          
            // Check if the current date is within the selected timeframe
            const currentDateObj = new Date(item.date);
            const startDate = getStartDate(timeframe);
            const endDate = new Date();
            if (currentDateObj < startDate || currentDateObj > endDate) {
              return; // Skip data outside the timeframe
            }
          
            // Update or add the number of sets for the current date
            if (dateSetsMap.has(currentDate)) {
              const existingSets = dateSetsMap.get(currentDate);
              dateSetsMap.set(currentDate, existingSets + 1);
            } else {
              dateSetsMap.set(currentDate, 1);
            }
          });
  
        const sortedDates = Array.from(dateSetsMap.keys())
          .map((date) => new Date(date))
          .sort((a, b) => a.getTime() - b.getTime());
  
        const setsValues = sortedDates.map((date) => {
          const sets = dateSetsMap.get(date.toDateString());
          return sets !== undefined ? sets : null;
        });
  
        const chartData = {
          labels: sortedDates.map((date) => date.toLocaleDateString()),
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
  
  export default calculateSetsPerWorkout;
  