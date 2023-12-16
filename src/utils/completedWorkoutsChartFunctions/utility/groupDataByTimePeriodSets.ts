import { format, getISOWeek} from "date-fns";
import Exercise from "../../interfaces/Exercise";

interface IExerciseStringKey{
    exercise: string;
    date: string;
    weight: number;
    reps: number;
    distance: number;
    distance_unit: string;
    time: number;
    group: string;
    comment?:string
    id:number
    is_pr?:boolean
    dropset:boolean
    stringKey:string
}

function groupDataByTimePeriodSets(
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
      sets:number
    }[] = [];


    function getExerciseArray(key: string) {
      const updatedMatchingDatesArr: IExerciseStringKey[] = [];

      function getStringDate(exerciseDate: string) {
        const date = new Date(exerciseDate);

        let newKey: string = "";

        if (timePeriod === "week") {
          const weekNumber = getISOWeek(date);
          newKey = `WK${weekNumber}-${format(date, "yyyy")}`;
        } else if (timePeriod === "month") {
          newKey = date.toLocaleString("en-us", {
            month: "short",
            year: "2-digit",
          });
        } else if (timePeriod === "quarter") {
          const quarter = Math.floor(date.getMonth() / 3) + 1;
          newKey = `Q${quarter}-${date.getFullYear().toString().slice(-2)}`;
        } else if (timePeriod === "year") {
          newKey = date.getFullYear().toString();
        } else if (timePeriod === "day") {
          const customDateNewKey = format(date, "yyyy-MM-dd");
          newKey = customDateNewKey;
        }

        return newKey;
      }

      flattenedData.forEach((exercise: Exercise, index: number) => {
        const extendedExercise: IExerciseStringKey = {
          ...exercise, // Copy all properties from the original Exercise
          stringKey: getStringDate(exercise.date), // Add the new property
        };
        updatedMatchingDatesArr.push(extendedExercise);
      });

      const matchingDates = updatedMatchingDatesArr.filter(
        (exercise) => exercise.stringKey === key
      );

      return matchingDates;
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

      const filteredArr = getExerciseArray(key)

      const uniqueItemCount = countUniqueItems(filteredArr, 'date');

      if (!groupedExercise) {
        groupedExercise = {
          date: key,
          summedWeight: 0,
          summedReps: 0,
          summedDistance: 0,
          summedTime: 0,
          count: 0,
          sets: 0,
        };

        groupedData.push(groupedExercise);
      }

      // Update maximum values for exercise properties
      if (exercise.weight > groupedExercise.summedWeight) {
        groupedExercise.summedWeight = exercise.weight;
      }
      if (exercise.reps > groupedExercise.summedReps) {
        groupedExercise.summedReps = exercise.reps;
      }
      if (exercise.distance > groupedExercise.summedDistance) {
        groupedExercise.summedDistance = exercise.distance;
      }
      if (exercise.time > groupedExercise.summedTime) {
        groupedExercise.summedTime = exercise.time;
      }
      const count = groupedExercise.count || 0;
      groupedExercise.count = count + 1;

      groupedExercise.sets = uniqueItemCount
    });

    return groupedData;
  }

  export default groupDataByTimePeriodSets

  function countUniqueItems(arr:any, property:string) {
    const uniqueValues = new Set();
  
    for (const item of arr) {
      const value = item[property];
      uniqueValues.add(value);
    }
  
    return uniqueValues.size;
  }
  