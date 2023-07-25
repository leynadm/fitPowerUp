import { ChartData } from "chart.js";
import toast from "react-hot-toast";

interface DataItem {
  date: Date;
  name: string;
  score: number;
  strength: number;
}

function getPowerLevel(
  measurementScore: string,
  timeframe: string,
  setInitialRawData: (data: ChartData<"line">) => void
) {
  const request = indexedDB.open("fitScouterDb");

  request.onerror = (event) => {
    toast.error("Oops, getPowerLevel has an error!");
    console.error(request.error);
  };

  request.onsuccess = (event) => {
    const db = (event.target as IDBRequest).result;
    const transaction = db.transaction(["user-power-level"], "readonly");
    const objectStore = transaction.objectStore("user-power-level");
    const nameIndex = objectStore.index("powerlevel_date");


    const getDataRequest = nameIndex.getAll();

    getDataRequest.onsuccess = () => {
      const data = getDataRequest.result as DataItem[];

      // Create a map to store unique dates and corresponding measurement values
      const dateValueMap = new Map<string, number>();

      data.forEach((item) => {
        const currentDate = new Date(item.date).toDateString();

        // Determine the measurement value based on the measurement score or strength field
        const measurementValue = measurementScore === "Power Level" ? item.score : item.strength;

        // Check if the current date is within the selected timeframe
        const currentDateObj = new Date(item.date);
        const startDate = getStartDate(timeframe);
        const endDate = new Date();
        if (currentDateObj < startDate || currentDateObj > endDate) {
          return; // Skip data outside the timeframe
        }

        // Update the measurement value for the current date if it exists
        dateValueMap.set(currentDate, measurementValue);
      });

      const sortedDates = Array.from(dateValueMap.keys())
        .map((date) => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime());

      const measurementValues = sortedDates.map((date) => {
        const value = dateValueMap.get(date.toDateString());
        return value !== undefined ? value : null;
      });

      const chartData: ChartData<"line"> = {
        labels: sortedDates.map((date) => date.toLocaleDateString()),
        datasets: [
          {
            label: measurementScore,
            data: measurementValues,
            fill: false,
            borderColor: "rgba(63,81,181,1)",
            borderWidth: 2,
          },
        ],
      };

      setInitialRawData(chartData);
    };

    getDataRequest.onerror = () => {
      toast.error("Oops, getDataRequest in getPowerLevel has an error!");
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

export default getPowerLevel;
