import { format, getISOWeek } from "date-fns";
import Exercise from "../../interfaces/Exercise";

function groupDataByTimePeriodSummed(
    flattenedData: Exercise[],
    timePeriod: string
  ) {
    const groupedData: {
      date: string;
      summedWeight: number;
      summedReps: number;
      summedDistance: number;
      summedTime: number;
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
          summedWeight: 0,
          summedReps: 0,
          summedDistance: 0,
          summedTime: 0,
          count: 0,
        };
        groupedData.push(groupedExercise);
      }

      // Increment counts and summed the exercise properties
      groupedExercise.count++;
      groupedExercise.summedWeight += exercise.weight;
      groupedExercise.summedReps += exercise.reps;
      groupedExercise.summedDistance += exercise.distance;
      groupedExercise.summedTime += exercise.time;
    });

    return groupedData;
  }

  export default groupDataByTimePeriodSummed