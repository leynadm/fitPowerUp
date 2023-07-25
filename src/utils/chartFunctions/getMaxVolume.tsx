import { ChartData } from "chart.js";
import toast from "react-hot-toast";

interface DataItem {
  date: Date;
  weight: number;
  reps: number;
}

function getMaxVolume(setInitialRawData: any, selectedExercise: any, timeframe: string) {
  const request = indexedDB.open("fitScouterDb");

  request.onerror = (event) => {
    toast.error("Oops, getMaxVolume has an error!");
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

      // Create a map to store unique dates and corresponding maximum volume (reps * weight)
      const dateVolumeMap = new Map<string, number>();

      data.forEach((item) => {
        const currentDate = new Date(item.date).toDateString();
        const currentReps = item.reps;
        const currentWeight = item.weight;
        const currentVolume = currentReps * currentWeight;

        // Check if the current date is within the selected timeframe
        const currentDateObj = new Date(item.date);
        const startDate = getStartDate(timeframe);
        const endDate = new Date();
        if (currentDateObj < startDate || currentDateObj > endDate) {
          return; // Skip data outside the timeframe
        }

        // Check if the current date is already present in the map
        if (dateVolumeMap.has(currentDate)) {
          const existingVolume = dateVolumeMap.get(currentDate);

          // Update the volume if the current volume is higher
          if (existingVolume && currentVolume > existingVolume) {
            dateVolumeMap.set(currentDate, currentVolume);
          }
        } else {
          // Add the date to the map if it doesn't exist
          dateVolumeMap.set(currentDate, currentVolume);
        }
      });

      const sortedDates = Array.from(dateVolumeMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());
        /*  
      const volumes = Array.from(dateVolumeMap.values());
*/
      const volumeValues = sortedDates.map((date) => {
        const volume = dateVolumeMap.get(date.toDateString());
        return volume !== undefined ? volume : null;
      });

      const chartData: ChartData<"line"> = {
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
      toast.error("Oops, getDataRequest in getMaxVolume has an error!");
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
      return new Date(today.getFullYear()-50, today.getMonth(), today.getDate());
  }
}

export default getMaxVolume;
