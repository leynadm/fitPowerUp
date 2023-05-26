import { ChartData } from "chart.js";

interface DataItem {
  date: Date;
  weight: number;
  reps: number;
}

function getMaxVolume(setInitialRawData: any, selectedExercise: any) {
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

      // Create a map to store unique dates and corresponding maximum volume (reps * weight)
      const dateVolumeMap = new Map<string, number>();

      data.forEach((item) => {
        const currentDate = new Date(item.date).toLocaleDateString();
        const currentReps = item.reps;
        const currentWeight = item.weight;
        const currentVolume = currentReps * currentWeight;

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
      const volumes = Array.from(dateVolumeMap.values());

      const chartData: ChartData<"line"> = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: "Volume",
            data: volumes,
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
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

export default getMaxVolume;
