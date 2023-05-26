import { ChartData } from "chart.js";

interface DataItem {
  date: Date;
  weight: number;
  reps: number;
}

function getMax1RM(setInitialRawData: any, selectedExercise: any) {
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

      // Create a map to store unique dates and corresponding 1 Rep Max
      const dateMaxMap = new Map<string, number>();

      data.forEach((item) => {
        const currentDate = new Date(item.date).toLocaleDateString();
        const currentWeight = item.weight;
        const currentReps = item.reps;
        const currentMax = Math.round((currentWeight * (1 + currentReps / 30)) * 10) / 10; // Calculate 1 Rep Max

        // Check if the current date is already present in the map
        if (dateMaxMap.has(currentDate)) {
          const existingMax = dateMaxMap.get(currentDate);

          // Update the 1 Rep Max if the current Max is higher
          if (existingMax && currentMax > existingMax) {
            dateMaxMap.set(currentDate, currentMax);
          }
        } else {
          // Add the date to the map if it doesn't exist
          dateMaxMap.set(currentDate, currentMax);
        }
      });

      const sortedDates = Array.from(dateMaxMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());
      const maxValues = Array.from(dateMaxMap.values());

      const chartData: ChartData<"line"> = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: "1 Rep Max",
            data: maxValues,
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

export default getMax1RM;
