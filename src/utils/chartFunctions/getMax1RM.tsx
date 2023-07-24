import { ChartData } from "chart.js";
import { DateTime } from "luxon";

interface DataItem {
  date: Date;
  weight: number;
  reps: number;
}

function getMax1RM(setInitialRawData: any, selectedExercise: any, timeframe: string) {
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
      const data = getDataRequest.result as DataItem[];

      // Create a map to store unique dates and corresponding 1 Rep Max sum and count
      const dateSumMap = new Map<string, number | undefined>();
      const dateCountMap = new Map<string, number>();

      data.forEach((item) => {
        const currentDate = new Date(item.date).toDateString();
        const currentWeight = item.weight;
        const currentReps = item.reps;
        const currentMax = Math.round((currentWeight * (1 + currentReps / 30)) * 10) / 10; // Calculate 1 Rep Max

        // Check if the current date is within the selected timeframe
        const currentDateObj = new Date(item.date);
        const startDate = getStartDate(timeframe);
        const endDate = new Date();

        if (currentDateObj < startDate || currentDateObj > endDate) {
          return; // Skip data outside the timeframe
        }

        if (dateSumMap.has(currentDate)) {
          const existingSum = dateSumMap.get(currentDate);
          const existingCount = dateCountMap.get(currentDate);

          if (existingSum !== undefined && existingCount !== undefined) {
            const newSum = existingSum + currentMax;
            dateSumMap.set(currentDate, newSum);
            dateCountMap.set(currentDate, existingCount + 1);
          }
        } else {
          dateSumMap.set(currentDate, currentMax);
          dateCountMap.set(currentDate, 1);
        }
      });

      // Calculate the average for each date
      const dateAvgMap = new Map<string, number>();
      dateSumMap.forEach((sum, date) => {
        const count = dateCountMap.get(date);
        if (sum !== undefined && count !== undefined) {
          const average = sum / count;
          dateAvgMap.set(date, average);
        }
      });

      const sortedDates = Array.from(dateAvgMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());

      // Create the array of maxValues rounded to the nearest integer
      const maxValues = sortedDates.map((date) => {
        const avg = dateAvgMap.get(date.toDateString());
        return avg !== undefined ? Math.round(avg) : null;
      });

      const chartData: ChartData<"line"> = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: "1 Rep Max",
            data: maxValues,
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

export default getMax1RM;
