import toast from "react-hot-toast";

function calculateTotalTrainingReps(
    setInitialRawData: any,
    timeframe: string,
    selectedStartDate: any,
    selectedEndDate: any
  ) {
    const request = indexedDB.open("fitScouterDb");
  
    request.onerror = (event) => {
      toast.error("Oops, calculateTotalTrainingReps has an error!")
      console.error(request.error);
    };
  
    let regularStartDate: any;
    let regularEndDate: any;
  
    console.log("Logging modified start date and end date:");
  
    if (selectedStartDate !== null && selectedEndDate !== null) {
      regularStartDate = selectedStartDate.toDate();
      regularEndDate = selectedEndDate.toDate();
    }
  
    console.log({ regularStartDate }, { regularEndDate });
  
    request.onsuccess = (event) => {
      console.log("Fetching data inside indexedDb...");
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction("user-exercises-entries", "readonly");
      const objectStore = transaction.objectStore("user-exercises-entries");
  
      const getDataRequest = objectStore.getAll();
  
      getDataRequest.onsuccess = () => {
        const data = getDataRequest.result;
        const totalReps = calculateTotalReps(data, timeframe, selectedStartDate, selectedEndDate);
  
        console.log("Total Training Reps:", totalReps);
  
        setInitialRawData(totalReps);
      };
  
      getDataRequest.onerror = () => {
        toast.error("Oops, getDataRequest in calculateTotalTrainingReps has an error!")
        console.error(getDataRequest.error);
      };
    };
  }
  
  function calculateTotalReps(data: any[], timeframe: string, selectedStartDate: any, selectedEndDate: any) {
    let totalReps = 0;
    const startDate = getStartDate(timeframe, selectedStartDate);
  
    data.forEach((item: any) => {
      const currentDate = new Date(item.date);
  
      if (selectedStartDate !== null && selectedEndDate !== null) {
        if (currentDate < startDate || currentDate > selectedEndDate) {
          return; // Skip data outside the timeframe
        }
      } else {
        if (currentDate < startDate || currentDate > new Date()) {
          return; // Skip data outside the timeframe
        }
      }
  
      const reps = item.reps;
  
      // Add the reps to the total
      totalReps += reps;
    });
  
    return totalReps;
  }
  
  function getStartDate(timeframe: string, selectedStartDate: any) {
    const today = new Date();
  
    switch (timeframe) {
      case "1m":
        return selectedStartDate !== null ? selectedStartDate.toDate() : new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      case "3m":
        return selectedStartDate !== null ? selectedStartDate.toDate() : new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
      case "6m":
        return selectedStartDate !== null ? selectedStartDate.toDate() : new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
      case "1y":
        return selectedStartDate !== null ? selectedStartDate.toDate() : new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      default:
        return selectedStartDate !== null ? selectedStartDate.toDate() : new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());
    }
  }
  
  export default calculateTotalTrainingReps;
  