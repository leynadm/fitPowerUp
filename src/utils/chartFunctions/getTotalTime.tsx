import { ChartData } from "chart.js";

interface DataItem {
  date: Date;
  weight: number;
  reps: number;
  time:number
}

function getTotalTime(
    setInitialRawData: any,
    selectedExercise: any,
    timeframe: string
  ) {
    const request = indexedDB.open("fitScouterDb");
  
    request.onerror = (event) => {
      console.error(request.error);
    };
  
    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
      const transaction = db.transaction(
        ["user-exercises-entries"],
        "readonly"
      );
      const objectStore = transaction.objectStore("user-exercises-entries");
      const exerciseNameIndex = objectStore.index("exercise_name");
  
      const range = IDBKeyRange.only(selectedExercise.name); // Filter by exercise name
  
      const getDataRequest = exerciseNameIndex.getAll(range);
  
      getDataRequest.onsuccess = () => {
        const data = getDataRequest.result as DataItem[];
  
        // Create a map to store unique dates and corresponding total time in minutes
        const dateTotalTimeMap = new Map<string, number>();
  
        data.forEach((item) => {
          const currentDate = new Date(item.date).toLocaleDateString();
          const currentTimeInSeconds = item.time;
  
          // Check if the current date is within the selected timeframe
          const currentDateObj = new Date(item.date);
          const startDate = timeframe === "All" ? null : getStartDate(timeframe);
          const endDate = new Date();
          if (startDate && (currentDateObj < startDate || currentDateObj > endDate)) {
            return; // Skip data outside the timeframe
          }
  
          // Calculate the total time for the current date
          if (dateTotalTimeMap.has(currentDate)) {
            const existingTotalTime = dateTotalTimeMap.get(currentDate)!;
            dateTotalTimeMap.set(
              currentDate,
              existingTotalTime + (currentTimeInSeconds / 60) // Convert seconds to minutes
            );
          } else {
            dateTotalTimeMap.set(currentDate, currentTimeInSeconds / 60); // Convert seconds to minutes
          }
        });
  
        const sortedDates = Array.from(dateTotalTimeMap.keys())
          .map((date) => new Date(date))
          .sort((a, b) => a.getTime() - b.getTime());
        
        const totalTimeValues = sortedDates.map((date) => {
          const totalTime = dateTotalTimeMap.get(date.toLocaleDateString());
          return totalTime !== undefined ? totalTime : null;
        });
  
        const chartData: ChartData<"line"> = {
          labels: sortedDates.map((date) => date.toLocaleDateString()),
          datasets: [
            {
              label: "Total Time (minutes)",
              data: totalTimeValues,
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
function getStartDate(timeframe: string): Date | null {
  if (timeframe === "All") {
    return null;
  }

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
      return new Date(today.getFullYear()-50, today.getMonth(), today.getDate());
  }
}

export default getTotalTime;
