import { ChartData } from "chart.js";
import toast from "react-hot-toast";

interface DataItem {
  date: Date;
  distance: number;
}

function getMaxDistance(
  setInitialRawData: any,
  selectedExercise: any,
  timeframe: string
) {
  const request = indexedDB.open("fitScouterDb");

  request.onerror = (event) => {
    toast.error("Oops, getMaxDistance has an error!");
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

      // Create a map to store unique dates and corresponding maximum distance
      const dateDistanceMap = new Map<string, number>();

      data.forEach((item: DataItem) => {
        const currentDate = new Date(item.date).toDateString();
        const currentDistance = item.distance;

        // Check if the current date is within the selected timeframe
        const currentDateObj = new Date(item.date);
        const startDate = getStartDate(timeframe);
        const endDate = new Date();
        if (currentDateObj < startDate || currentDateObj > endDate) {
          return; // Skip data outside the timeframe
        }

        // Check if the current date is already present in the map
        if (dateDistanceMap.has(currentDate)) {
          const existingDistance = dateDistanceMap.get(currentDate);

          // Update the distance if the current distance is higher
          if (
            existingDistance !== undefined &&
            currentDistance > existingDistance
          ) {
            dateDistanceMap.set(currentDate, currentDistance);
          }
        } else {
          // Add the date to the map if it doesn't exist
          dateDistanceMap.set(currentDate, currentDistance);
        }
      });

      const sortedDates = Array.from(dateDistanceMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());

      const distanceValues = sortedDates.map((date) => {
        const distance = dateDistanceMap.get(date.toDateString());
        return distance !== undefined ? distance : null;
      });

      const chartData: ChartData = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: "Distance",
            data: distanceValues,
            fill: false,
            borderColor: "rgba(63, 81, 181, 1)",
            borderWidth: 2,
          },
        ],
      };

      setInitialRawData(chartData);
    };

    getDataRequest.onerror = () => {
      toast.error("Oops, getDataRequest in getMaxDistance has an error!");
      console.error(getDataRequest.error);
    };
  };
}

function getStartDate(timeframe: string): Date {
  const today = new Date();
  switch (timeframe) {
    case "1m":
      return new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
      );
    case "3m":
      return new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDate()
      );
    case "6m":
      return new Date(
        today.getFullYear(),
        today.getMonth() - 6,
        today.getDate()
      );
    case "1y":
      return new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate()
      );
    default:
      return new Date(
        today.getFullYear() - 50,
        today.getMonth(),
        today.getDate()
      );
  }
}

export default getMaxDistance;
