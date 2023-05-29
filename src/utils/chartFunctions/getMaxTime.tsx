import { ChartData } from "chart.js";

interface DataItem {
  date: Date;
  time: number;
}

function getMaxTime(setInitialRawData: any, selectedExercise: any, timeframe: string) {
  const request = indexedDB.open("fitScouterDb");

  request.onerror = (event) => {
    console.error(request.error);
  };

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result;
    const transaction = db.transaction(["user-exercises-entries"], "readonly");
    const objectStore = transaction.objectStore("user-exercises-entries");
    const exerciseNameIndex = objectStore.index("exercise_name");
    const range = IDBKeyRange.only(selectedExercise.name); // Filter by exercise name

    const getDataRequest = exerciseNameIndex.getAll(range);

    getDataRequest.onsuccess = () => {
      const data = getDataRequest.result;

      // Create a map to store unique dates and corresponding maximum time
      const dateTimeMap = new Map<string, number>();

      data.forEach((item: DataItem) => {
        const currentDate = new Date(item.date).toLocaleDateString();
        const currentTime = item.time / 60; // Convert seconds to minutes

        // Check if the current date is within the selected timeframe
        const currentDateObj = new Date(item.date);
        const startDate = getStartDate(timeframe);
        const endDate = new Date();
        if (currentDateObj < startDate || currentDateObj > endDate) {
          return; // Skip data outside the timeframe
        }

        // Check if the current date is already present in the map
        if (dateTimeMap.has(currentDate)) {
          const existingTime = dateTimeMap.get(currentDate);

          // Update the time if the current time is higher
          if (existingTime !== undefined && currentTime > existingTime) {
            dateTimeMap.set(currentDate, currentTime);
          }
        } else {
          // Add the date to the map if it doesn't exist
          dateTimeMap.set(currentDate, currentTime);
        }
      });

      const sortedDates = Array.from(dateTimeMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());

      const timeValues = sortedDates.map((date) => {
        const time = dateTimeMap.get(date.toLocaleDateString());
        return time !== undefined ? time : null;
      });

      const chartData: ChartData = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: "Time (minutes)", // Update the label to indicate minutes
            data: timeValues,
            fill: false,
            borderColor: "rgba(63, 81, 181, 1)",
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

export default getMaxTime;
