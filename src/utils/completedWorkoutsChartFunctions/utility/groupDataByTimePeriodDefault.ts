import { format, getISOWeek } from "date-fns";
import { Exercise } from "../../interfaces/IUserTrainingData";

function groupDataByTimePeriodMax1RM(
  flattenedData: Exercise[],
  timePeriod: string
) {
  const groupedData: {
    date: string;
    weight: number;
    reps: number;
    distance: number;
    time: number;
    count: number;
  }[] = [];

  flattenedData.forEach((exercise: Exercise) => {
    const date = new Date(exercise.date);
    let key: string = "";

    // Determine the grouping key based on the time period
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

    // Calculate the 1RM using the Epley formula
    const calculated1RM = exercise.weight * (1 + exercise.reps / 30);

    let groupedExercise = groupedData.find((group) => group.date === key);

    if (!groupedExercise) {
      // Initialize a new group if it doesn't exist
      groupedExercise = {
        date: key,
        weight: exercise.weight,
        reps: exercise.reps,
        distance: exercise.distance,
        time: exercise.time,
        count: 1,
      };
      groupedData.push(groupedExercise);
    } else {
      // Update the group only if the new 1RM is higher
      const existing1RM = groupedExercise.weight * (1 + groupedExercise.reps / 30);
      if (calculated1RM > existing1RM) {
        groupedExercise.weight = exercise.weight;
        groupedExercise.reps = exercise.reps;
        groupedExercise.distance = exercise.distance;
        groupedExercise.time = exercise.time;
      }
      groupedExercise.count += 1; // Update count
    }
  });

  return groupedData;
}

export default groupDataByTimePeriodMax1RM;
