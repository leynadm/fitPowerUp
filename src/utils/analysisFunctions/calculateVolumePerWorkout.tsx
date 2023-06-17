function calculateVolumePerWorkout(selectedGraph:string,selectedExercise: any, timeframe: string,setInitialRawData: any,chartType:string) {
  const request = indexedDB.open("fitScouterDb");

  request.onerror = (event) => {
    console.error(request.error);
  };

  request.onsuccess = (event) => {
    
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

      // Create a map to store unique dates and corresponding volume
      const dateVolumeMap = new Map<string, number>();

      data.forEach((item: any) => {
        const currentDate = new Date(item.date).toDateString();
        const currentReps = item.reps;
        const currentWeight = item.weight;

        // Check if the current date is within the selected timeframe
        const currentDateObj = new Date(item.date);
        const startDate = getStartDate(timeframe);
        const endDate = new Date();
        if (currentDateObj < startDate || currentDateObj > endDate) {
          return; // Skip data outside the timeframe
        }

        // Calculate the volume for the current set
        const volume = currentReps * currentWeight;

        // Update or add the volume for the current date
        if (dateVolumeMap.has(currentDate)) {
          const existingVolume = dateVolumeMap.get(currentDate)!; // Use the "!" operator to assert that existingVolume is defined
          dateVolumeMap.set(currentDate, existingVolume + volume);
        } else {
          dateVolumeMap.set(currentDate, volume);
        }
      });

      const sortedDates = Array.from(dateVolumeMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());

      const volumeValues = sortedDates.map((date) => {
        const volume = dateVolumeMap.get(date.toDateString());
        return volume !== undefined ? volume : null;
      });

      const chartData = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: "Volume",
            data: volumeValues,
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

function getStartDate(timeframe: string): Date {
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

export default calculateVolumePerWorkout;
