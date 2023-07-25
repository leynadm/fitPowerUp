import { ChartData } from "chart.js";
import toast from "react-hot-toast";

interface DataItem {
  date: Date;
  weight: number;
  reps: number;
}

function getMaxWeightForReps(
  setInitialRawData: any,
  selectedExercise: any,
  targetReps: number[],
  timeframe: string
) {
  const request = indexedDB.open("fitScouterDb");

  request.onerror = (event) => {
    toast.error("Oops, getMaxWeightForReps has an error!");
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

      // Create a map to store unique dates and corresponding max weight for each target reps
      const dateMaxWeightMap = new Map<string, { date: string, weight: number }[]>();
      const validDates: string[] = [];

      targetReps.forEach((targetRep) => {
        dateMaxWeightMap.set(targetRep.toString(), []);
      });

      const startDate = getStartDate(timeframe); // Get the start date based on the timeframe

      data.forEach((item) => {
        const currentDate = new Date(item.date).toLocaleDateString();
        const currentWeight = item.weight;
        const currentReps = item.reps;

        // Check if the current date is within the selected timeframe
        if (startDate && item.date < startDate) {
          return; // Skip data outside the timeframe
        }

        if (targetReps.includes(currentReps)) {
          const currentMaxWeights = dateMaxWeightMap.get(
            currentReps.toString()
          )!;
          currentMaxWeights.push({ date: currentDate, weight: currentWeight });
          dateMaxWeightMap.set(currentReps.toString(), currentMaxWeights);
          if (!validDates.includes(currentDate)) {
            validDates.push(currentDate);
          }
        }
      });

      validDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

      const sortedDatasets = targetReps.map((targetRep, index) => {
        const maxWeights = dateMaxWeightMap.get(targetRep.toString())!;
        const sortedData = maxWeights.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const colors = ["rgba(63,81,181,1)", "rgba(255,87,34,1)", "rgba(76,175,80,1)"]; // Example colors for each line
        return {
          label: `Max Weight for ${targetRep} Reps`,
          data: sortedData.map((entry) => entry.weight),
          fill: false,
          borderColor: colors[index % colors.length], // Assign different color for each line
          borderWidth: 2,
        };
      });
       

      const chartData: ChartData<"line"> = {
        labels: validDates,
        datasets: sortedDatasets,
      };

      setInitialRawData(chartData);
    };

    getDataRequest.onerror = () => {
      toast.error("Oops, getDataRequest in getMaxWeightForReps has an error!");
      console.error(getDataRequest.error);
    };
  };
}

function getStartDate(timeframe: string): Date | null {
  if (timeframe === "All") {
    return null; // Return null to indicate no start date filter
  }

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

export default getMaxWeightForReps;
