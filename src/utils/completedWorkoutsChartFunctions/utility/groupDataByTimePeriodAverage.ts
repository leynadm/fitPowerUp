import { Exercise } from "../../interfaces/IUserTrainingData";
import { format, getISOWeek } from "date-fns";

function groupDataByTimePeriodAverage(
    flattenedData: Exercise [],
    timePeriod: string
  ) {
    const groupedData: {
      date: string;
      averageWeight: number;
      averageReps: number;
      averageDistance: number;
      averageTime: number;
      count: number;
    }[] = [];

    if(flattenedData===undefined){
      return
    }

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
          averageWeight: 0,
          averageReps: 0,
          averageDistance: 0,
          averageTime: 0,
          count: 0,
        };
        groupedData.push(groupedExercise);
      }

      // Increment counts and sum the exercise properties
      const count = groupedExercise.count || 0;
      groupedExercise.count = count + 1;
      groupedExercise.averageWeight =
        (groupedExercise.averageWeight * count + exercise.weight) / (count + 1);
      groupedExercise.averageReps =
        (groupedExercise.averageReps * count + exercise.reps) / (count + 1);
      groupedExercise.averageDistance =
        (groupedExercise.averageDistance * count + exercise.distance) /
        (count + 1);
      groupedExercise.averageTime =
        (groupedExercise.averageTime * count + exercise.time) / (count + 1);
    });

    return groupedData;
  }

  export default groupDataByTimePeriodAverage