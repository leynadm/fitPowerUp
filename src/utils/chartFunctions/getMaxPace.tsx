import { ChartData } from "chart.js";
import toast from "react-hot-toast";

interface DataItem {
  date: Date;
  distance: number;
  time: number;
}

function getMaxPace(setInitialRawData: any, selectedExercise: any, timeframe: string) {
  const request = indexedDB.open("fitScouterDb");

  request.onerror = (event) => {
    toast.error("Oops, getMaxPace has an error!");
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

      // Create a map to store unique dates and corresponding maximum pace
      const datePaceMap = new Map<string, number>();

      data.forEach((item: DataItem) => {
        const currentDate = new Date(item.date).toDateString();
        const distance = item.distance;
        const time = item.time / 3600; // Convert seconds to hours

        // Check if the current date is within the selected timeframe
        const currentDateObj = new Date(item.date);
        const startDate = getStartDate(timeframe);
        const endDate = new Date();
        if (currentDateObj < startDate || currentDateObj > endDate) {
          return; // Skip data outside the timeframe
        }

        const pace = distance !== 0 ? time / distance : 0; // Calculate pace (time per unit)
        const roundedPace = Number(pace.toFixed(2))

        // Check if the current date is already present in the map
        if (datePaceMap.has(currentDate)) {
          const existingPace = datePaceMap.get(currentDate);

          // Update the pace if the current pace is lower (faster)
          if (existingPace !== undefined && roundedPace < existingPace) {
            datePaceMap.set(currentDate, roundedPace);
          }
        } else {
          // Add the date to the map if it doesn't exist
          datePaceMap.set(currentDate, roundedPace);
        }
      });

      const sortedDates = Array.from(datePaceMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());

      const paceValues = sortedDates.map((date) => {
        const pace = datePaceMap.get(date.toDateString());
        return pace !== undefined ? pace : null;
      });

      const chartData: ChartData = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: "Pace (unit per hour)",
            data: paceValues,
            fill: false,
            borderColor: "rgba(63, 81, 181, 1)",
            borderWidth: 2,
          },
        ],
      };

      setInitialRawData(chartData);
    };

    getDataRequest.onerror = () => {
      toast.error("Oops, getDataRequest in getMaxPace has an error!");
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

export default getMaxPace;
