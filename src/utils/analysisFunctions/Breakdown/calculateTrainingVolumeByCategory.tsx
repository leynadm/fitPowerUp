function calculateTrainingVolumeByCategory(
    setInitialRawData: any,
    timeframe: string,
    selectedStartDate: any,
    selectedEndDate: any
  ) {
    const request = indexedDB.open("fitScouterDb");
  
    request.onerror = (event) => {
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
        const categoryVolumeMap = createCategoryVolumeMap(data, timeframe, selectedStartDate, selectedEndDate);
        const chartData = createChartData(categoryVolumeMap);
  
        console.log("Logging chart data:");
        console.log(chartData);
  
        setInitialRawData(chartData);
      };
  
      getDataRequest.onerror = () => {
        console.error(getDataRequest.error);
      };
    };
  }
  
  function createCategoryVolumeMap(data: any[], timeframe: string, selectedStartDate: any, selectedEndDate: any) {
    const categoryVolumeMap = new Map();
    const startDate = getStartDate(timeframe, selectedStartDate);
  
    data.forEach((item: any) => {
      const category = item.category;
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
      const weight = item.weight;
  
      // Calculate the training volume for the current entry
      const volume = reps * weight;
  
      // Increment the training volume for the current category
      if (!categoryVolumeMap.has(category)) {
        categoryVolumeMap.set(category, volume);
      } else {
        categoryVolumeMap.set(category, categoryVolumeMap.get(category) + volume);
      }
    });
  
    return categoryVolumeMap;
  }
  
  function createChartData(categoryVolumeMap: Map<any, any>) {
    const categories = Array.from(categoryVolumeMap.keys());
    const volumes = Array.from(categoryVolumeMap.values());
  
    return {
      labels: categories,
      datasets: [
        {
          label: "Training Volume",
          data: volumes,
          backgroundColor: [
            "rgba(63,81,181,0.7)",
            "rgba(244,67,54,0.7)",
            "rgba(255,152,0,0.7)",
            "rgba(76,175,80,0.7)",
            "rgba(33,150,243,0.7)",
          ],
          borderWidth: 1,
        },
      ],
    };
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
  
  export default calculateTrainingVolumeByCategory;
  