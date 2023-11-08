import { format, getISOWeek } from "date-fns";
import Exercise from "../../interfaces/Exercise";

function groupDataByTimePeriodMax(
    flattenedData: Exercise[],
    timePeriod: string
  ) {
    const groupedData: {
      date: string;
      maxWeight: number;
      maxReps: number;
      maxDistance: number;
      maxTime: number;
      count: number;
    }[] = [];

    flattenedData.forEach((exercise: Exercise, index: number) => {
      const date = new Date(exercise.date);
      let key: string = "";

      if (timePeriod === "week") {
        const weekNumber = getISOWeek(date);
        key = `WK${weekNumber}-${format(date, "yyyy")}`;
      } else if (timePeriod === "month") {
        key = date.toLocaleString("en-us", { month: "short", year: "2-digit" });
      } else if (timePeriod === "quarter") {
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        key = `Q${quarter}-${date.getFullYear().toString().slice(-2)}`;
      } else if (timePeriod === "year") {
        key = date.getFullYear().toString();
      } else if (timePeriod === "day") {
        const customDateKey = format(date, "yyyy-MM-dd");
        key = customDateKey;
      }

      let groupedExercise = groupedData.find((group) => group.date === key);

      if (!groupedExercise) {
        groupedExercise = {
          date: key,
          maxWeight: 0,
          maxReps: 0,
          maxDistance: 0,
          maxTime: 0,
          count: 0,
        };
        groupedData.push(groupedExercise);
      }

      // Update maximum values for exercise properties
      if (exercise.weight > groupedExercise.maxWeight) {
        groupedExercise.maxWeight = exercise.weight;
      }
      if (exercise.reps > groupedExercise.maxReps) {
        groupedExercise.maxReps = exercise.reps;
      }
      if (exercise.distance > groupedExercise.maxDistance) {
        groupedExercise.maxDistance = exercise.distance;
      }
      if (exercise.time > groupedExercise.maxTime) {
        groupedExercise.maxTime = exercise.time;
      }
      const count = groupedExercise.count || 0;
      groupedExercise.count = count + 1;
    });

    return groupedData;
  }

  export default groupDataByTimePeriodMax