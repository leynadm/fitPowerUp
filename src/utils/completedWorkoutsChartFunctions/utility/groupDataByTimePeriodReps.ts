import { format, getISOWeek } from "date-fns";

import Exercise from "../../interfaces/Exercise";

function groupDataByTimePeriodForReps(
  flattenedData: Exercise[],
  timePeriod: string
) {
  const groupedData: {
    date: string;
    repsData: {
      reps: number;
      weight: number;
    }[];
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
        repsData: [],
      };
      groupedData.push(groupedExercise);
    }

    // Store data for each rep range (e.g., 6 reps, 8 reps, 12 reps)
    const repsData = groupedExercise.repsData;
    const existingData = repsData.find((data) => data.reps === exercise.reps);

    if (existingData) {
      existingData.weight += exercise.weight;
    } else {
      repsData.push({
        reps: exercise.reps,
        weight: exercise.weight,
      });
    }
  });

  return groupedData;
}

export default groupDataByTimePeriodForReps;
