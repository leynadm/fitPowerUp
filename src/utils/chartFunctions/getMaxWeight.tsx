import { ChartData } from "chart.js";
interface DataItem {
  date: Date;
  weight: number;
}

function getMaxWeight(setInitialRawData:any, selectedExercise:any, timeframe: string) {
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

      // Create a map to store unique dates and corresponding highest weights
      const dateWeightMap = new Map<string, number>();

      data.forEach((item) => {
        const currentDate = new Date(item.date).toLocaleDateString();
        const currentWeight = item.weight;

        // Check if the current date is within the selected timeframe
        const currentDateObj = new Date(item.date);
        const startDate = getStartDate(timeframe);
        const endDate = new Date();
        if (currentDateObj < startDate || currentDateObj > endDate) {
          return; // Skip data outside the timeframe
        }

        // Check if the current date is already present in the map
        if (dateWeightMap.has(currentDate)) {
          const existingWeight = dateWeightMap.get(currentDate);

          // Update the weight if the current weight is higher
          if (existingWeight && currentWeight > existingWeight) {
            dateWeightMap.set(currentDate, currentWeight);
          }
        } else {
          // Add the date to the map if it doesn't exist
          dateWeightMap.set(currentDate, currentWeight);
        }
      });

      const sortedDates = Array.from(dateWeightMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());
      /* 
      const weights = Array.from(dateWeightMap.values());
      */
      const weightValues = sortedDates.map((date) => {
        const weight = dateWeightMap.get(date.toLocaleDateString());
        return weight !== undefined ? weight : null;
      });

      const chartData: ChartData<"line"> = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: "Weight",
            data: weightValues,
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
      return new Date(today.getFullYear()-50, today.getMonth(), today.getDate());
  }
}

export default getMaxWeight;
