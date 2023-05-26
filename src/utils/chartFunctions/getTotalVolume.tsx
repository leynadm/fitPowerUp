import { ChartData } from "chart.js";

interface DataItem {
  date: Date;
  weight: number;
  reps: number;
}

function getTotalVolume(setInitialRawData: any, selectedExercise: any) {
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

      // Create a map to store unique dates and corresponding total volume
      const dateTotalVolumeMap = new Map<string, number>();

      data.forEach((item) => {
        const currentDate = new Date(item.date).toLocaleDateString();
        const currentWeight = item.weight;
        const currentReps = item.reps;

        // Calculate the total volume for the current date
        const currentVolume = currentWeight * currentReps;

        if (dateTotalVolumeMap.has(currentDate)) {
          const existingTotalVolume = dateTotalVolumeMap.get(currentDate)!;
          dateTotalVolumeMap.set(
            currentDate,
            existingTotalVolume + currentVolume
          );
        } else {
          dateTotalVolumeMap.set(currentDate, currentVolume);
        }
      });

      const sortedDates = Array.from(dateTotalVolumeMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());
      const totalVolume = Array.from(dateTotalVolumeMap.values());

      const chartData: ChartData<"line"> = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: "Total Volume",
            data: totalVolume,
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

export default getTotalVolume;
