import toast from "react-hot-toast";

function calculateSetsPerYear(selectedGraph:string, selectedExercise:string, timeframe:string, setInitialRawData:any,chartType:string) {
    const request = indexedDB.open("fitScouterDb");
  
    request.onerror = (event) => {
      toast.error("Oops, calculateSetsPerYear has an error!")            
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
  
        // Create a map to store unique years and corresponding sets count
        const yearSetsMap = new Map();
  
        data.forEach((item:any) => {
          const currentDate = new Date(item.date);
          const yearStart = getYearStartDate(currentDate);
  
          // Check if the current date is within the selected timeframe
          const startDate = getStartDate(timeframe);
          const endDate = new Date();
          if (currentDate < startDate || currentDate > endDate) {
            return; // Skip data outside the timeframe
          }
  
          // Generate a key for the current year
          const yearKey = yearStart.toISOString();
  
          // Increment the sets count for the current year
          if (!yearSetsMap.has(yearKey)) {
            yearSetsMap.set(yearKey, 1);
          } else {
            yearSetsMap.set(yearKey, yearSetsMap.get(yearKey) + 1);
          }
        });
  
        const sortedYears = Array.from(yearSetsMap.keys())
          .map((yearKey) => {
            const start = new Date(yearKey);
            const end = new Date(start.getFullYear(), 11, 31); // Set end date as the last day of the year
            return {
              start,
              end,
            };
          })
          .sort((a, b) => a.start.getTime() - b.start.getTime());
  
        const setsValues = sortedYears.map((year) => yearSetsMap.get(year.start.toISOString()));
  
        const chartData = {
          labels: sortedYears.map((year) => `${year.start.getFullYear()}`),
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
        toast.error("Oops, getDataRequest in calculateSetsPerYear has an error!")
        console.error(getDataRequest.error);
      };
    };
  }
  
  function getStartDate(timeframe:string) {
    const today = new Date();
    switch (timeframe) {
      case "1y":
        return new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      case "2y":
        return new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
      case "3y":
        return new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
      case "5y":
        return new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
      default:
        return new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    }
  }
  
  function getYearStartDate(date:any) {
    return new Date(date.getFullYear(), 0, 1); // Set the date to the first day of the year
  }
  
  export default calculateSetsPerYear;
  