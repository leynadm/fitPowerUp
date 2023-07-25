import { ChartData } from "chart.js";
import toast from "react-hot-toast";

interface DataItem {
  date: Date;
  distance: number;
  time: number;
}

function getMaxSpeed(setInitialRawData: any, selectedExercise: any, timeframe: string) {
  const request = indexedDB.open("fitScouterDb");

  request.onerror = (event) => {
    toast.error("Oops, getMaxSpeed has an error!");
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

      // Create a map to store unique dates and corresponding maximum speed
      const dateSpeedMap = new Map<string, number>();

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

        const speed = distance / time; // Calculate speed (distance divided by time)
        const roundedSpeed = Number(speed.toFixed(2)); // Round the speed to 2 decimal places

        // Check if the current date is already present in the map
        if (dateSpeedMap.has(currentDate)) {
          const existingSpeed = dateSpeedMap.get(currentDate);

          // Update the speed if the current speed is higher
          if (existingSpeed !== undefined && roundedSpeed > existingSpeed) {
            dateSpeedMap.set(currentDate, roundedSpeed);
          }
        } else {
          // Add the date to the map if it doesn't exist
          dateSpeedMap.set(currentDate, roundedSpeed);
        }
      });

      const sortedDates = Array.from(dateSpeedMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());

      const speedValues = sortedDates.map((date) => {
        const speed = dateSpeedMap.get(date.toDateString());
        return speed !== undefined ? speed : null;
      });

      const chartData: ChartData = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: "Speed (unit/hour)",
            data: speedValues,
            fill: false,
            borderColor: "rgba(63, 81, 181, 1)",
            borderWidth: 2,
          },
        ],
      };

      setInitialRawData(chartData);
    };

    getDataRequest.onerror = () => {
      toast.error("Oops, getDataRequest in getMaxSpeed has an error!");
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

export default getMaxSpeed;
