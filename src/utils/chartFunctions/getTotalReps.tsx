import { ChartData } from "chart.js";

interface DataItem {
  date: Date;
  weight: number;
  reps: number;
}

function getTotalReps(setInitialRawData: any, selectedExercise: any) {
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

      // Create a map to store unique dates and corresponding total reps
      const dateTotalRepsMap = new Map<string, number>();

      data.forEach((item) => {
        const currentDate = new Date(item.date).toLocaleDateString();
        const currentReps = item.reps;

        // Calculate the total reps for the current date
        if (dateTotalRepsMap.has(currentDate)) {
          const existingTotalReps = dateTotalRepsMap.get(currentDate)!;
          dateTotalRepsMap.set(
            currentDate,
            existingTotalReps + currentReps
          );
        } else {
          dateTotalRepsMap.set(currentDate, currentReps);
        }
      });

      const sortedDates = Array.from(dateTotalRepsMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());
      const totalReps = Array.from(dateTotalRepsMap.values());

      const chartData: ChartData<"line"> = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: "Total Reps",
            data: totalReps,
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

export default getTotalReps;
