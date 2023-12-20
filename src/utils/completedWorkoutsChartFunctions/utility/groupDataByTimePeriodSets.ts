import { format, getISOWeek} from "date-fns";
import { Exercise } from "../../interfaces/IUserTrainingData";
function groupDataByTimePeriodSets(flattenedData: Exercise[], timePeriod: string) {
  const groupedData = new Map<string, {
    date: string;
    summedWeight: number;
    summedReps: number;
    summedDistance: number;
    summedTime: number;
    count: number;
    sets: number;
  }>();

  const getStringDate = (exerciseDate: string) => {
    const date = new Date(exerciseDate);
    switch (timePeriod) {
      case "week":
        return `WK${getISOWeek(date)}-${format(date, "yyyy")}`;
      case "month":
        return date.toLocaleString("en-us", { month: "short", year: "2-digit" });
      case "quarter":
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        return `Q${quarter}-${date.getFullYear().toString().slice(-2)}`;
      case "year":
        return date.getFullYear().toString();
      case "day":
      default:
        return format(date, "yyyy-MM-dd");
    }
  };

  // Enhanced data with stringKey
  const enhancedData = flattenedData.map(exercise => ({
    ...exercise,
    stringKey: getStringDate(exercise.date)
  }));

  enhancedData.forEach(exercise => {
    const key = exercise.stringKey;
    let groupedExercise = groupedData.get(key);

    if (!groupedExercise) {
      groupedExercise = {
        date: key,
        summedWeight: 0,
        summedReps: 0,
        summedDistance: 0,
        summedTime: 0,
        count: 0,
        sets: 0
      };
      groupedData.set(key, groupedExercise);
    }

    // Update properties
    groupedExercise.summedWeight = Math.max(groupedExercise.summedWeight, exercise.weight);
    groupedExercise.summedReps = Math.max(groupedExercise.summedReps, exercise.reps);
    groupedExercise.summedDistance = Math.max(groupedExercise.summedDistance, exercise.distance);
    groupedExercise.summedTime = Math.max(groupedExercise.summedTime, exercise.time);
    groupedExercise.count++;

    // Update sets count
    const uniqueDates = new Set(enhancedData.filter(e => e.stringKey === key).map(e => e.date));
    groupedExercise.sets = uniqueDates.size;
  });

  return Array.from(groupedData.values());
}

export default groupDataByTimePeriodSets;