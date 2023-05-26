import { ChartData } from "chart.js";

interface DataItem {
  date: Date;
  weight: number;
  reps: number;
}

function getMaxWeightForReps(
  setInitialRawData: any,
  selectedExercise: any,
  targetReps: number[]
) {
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

      // Create a map to store unique dates and corresponding max weight for each target reps
      const dateMaxWeightMap = new Map<string, number[]>();

      targetReps.forEach((targetRep) => {
        dateMaxWeightMap.set(targetRep.toString(), []);
      });

      data.forEach((item) => {
        const currentDate = new Date(item.date).toLocaleDateString();
        const currentWeight = item.weight;
        const currentReps = item.reps;

        if (targetReps.includes(currentReps)) {
          const currentMaxWeights = dateMaxWeightMap.get(
            currentReps.toString()
          )!;
          currentMaxWeights.push(currentWeight);
          dateMaxWeightMap.set(currentReps.toString(), currentMaxWeights);
        }
      });

      const sortedDates = Array.from(dateMaxWeightMap.values())
        .flat()
        .map((_, index) => index + 1);

      const datasets = targetReps.map((targetRep) => {
        const maxWeights = dateMaxWeightMap.get(targetRep.toString())!;
        return {
          label: `Max Weight for ${targetRep} Reps`,
          data: maxWeights,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        };
      });

      const chartData: ChartData<"line"> = {
        labels: sortedDates.map((date) => date.toString()),
        datasets: datasets,
      };

      setInitialRawData(chartData);
    };

    getDataRequest.onerror = () => {
      console.error(getDataRequest.error);
    };
  };
}

export default getMaxWeightForReps;
