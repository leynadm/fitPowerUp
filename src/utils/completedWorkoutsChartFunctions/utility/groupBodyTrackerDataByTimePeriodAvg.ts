import { format, getISOWeek } from "date-fns";
import { IUserBodyTrackerDataEntry } from "../../interfaces/IBodyTracker";
export interface IBodyTrackerGroupedData {
  date: string;
  averageWeight: number;
  averageBodyFat: number;
  averageCaloricIntake: number;
  averageNeck: number;
  averageChest: number;
  averageShoulders: number;
  averageWaist: number;
  averageLeftBicep: number;
  averageRightBicep: number;
  averageLeftForearm: number;
  averageRightForearm: number;
  averageLeftThigh: number;
  averageRightThigh: number;
  averageLeftCalf: number;
  averageRightCalf: number;
  countAverageWeight: number;
  countAverageBodyFat: number;
  countAverageCaloricIntake: number;
  countAverageNeck: number;
  countAverageChest: number;
  countAverageShoulders: number;
  countAverageWaist: number;
  countAverageLeftBicep: number;
  countAverageRightBicep: number;
  countAverageLeftForearm: number;
  countAverageRightForearm: number;
  countAverageLeftThigh: number;
  countAverageRightThigh: number;
  countAverageLeftCalf: number;
  countAverageRightCalf: number;
  count: number;
}

function groupBodyTrackerDataByTimePeriodAvg(
  flattenedData: IUserBodyTrackerDataEntry[],
  timePeriod: string
) {
  const groupedData: {
    date: string;
    averageWeight: number;
    averageBodyFat: number;
    averageCaloricIntake: number;
    averageNeck: number;
    averageChest: number;
    averageShoulders: number;
    averageWaist: number;
    averageLeftBicep: number;
    averageRightBicep: number;
    averageLeftForearm: number;
    averageRightForearm: number;
    averageLeftThigh: number;
    averageRightThigh: number;
    averageLeftCalf: number;
    averageRightCalf: number;
    countAverageWeight: number;
    countAverageBodyFat: number;
    countAverageCaloricIntake: number;
    countAverageNeck: number;
    countAverageChest: number;
    countAverageShoulders: number;
    countAverageWaist: number;
    countAverageLeftBicep: number;
    countAverageRightBicep: number;
    countAverageLeftForearm: number;
    countAverageRightForearm: number;
    countAverageLeftThigh: number;
    countAverageRightThigh: number;
    countAverageLeftCalf: number;
    countAverageRightCalf: number;
    count: number;
  }[] = [];

  if (flattenedData === undefined) {
    return;
  }

  flattenedData.forEach(
    (bodyTrackerEntry: IUserBodyTrackerDataEntry, index: number) => {
      const date = new Date(bodyTrackerEntry.date);
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
          averageBodyFat: 0,
          averageCaloricIntake: 0,
          averageNeck: 0,
          averageChest: 0,
          averageShoulders: 0,
          averageWaist: 0,
          averageLeftBicep: 0,
          averageRightBicep: 0,
          averageLeftForearm: 0,
          averageRightForearm: 0,
          averageLeftThigh: 0,
          averageRightThigh: 0,
          averageLeftCalf: 0,
          averageRightCalf: 0,
          countAverageWeight: 0,
          countAverageBodyFat: 0,
          countAverageCaloricIntake: 0,
          countAverageNeck: 0,
          countAverageChest: 0,
          countAverageShoulders: 0,
          countAverageWaist: 0,
          countAverageLeftBicep: 0,
          countAverageRightBicep: 0,
          countAverageLeftForearm: 0,
          countAverageRightForearm: 0,
          countAverageLeftThigh: 0,
          countAverageRightThigh: 0,
          countAverageLeftCalf: 0,
          countAverageRightCalf: 0,
          count: 0,
        };
        groupedData.push(groupedExercise);
      }

      const count = groupedExercise.count || 0;
      groupedExercise.count = count + 1;

      if (bodyTrackerEntry.weight !== 0) {
        groupedExercise.countAverageWeight += 1;
      }
      if (bodyTrackerEntry.bodyFat !== 0) {
        groupedExercise.countAverageBodyFat += 1;
      }
      if (bodyTrackerEntry.caloricIntake !== 0) {
        groupedExercise.countAverageCaloricIntake += 1;
      }
      if (bodyTrackerEntry.neck !== 0) {
        groupedExercise.countAverageNeck += 1;
      }
      if (bodyTrackerEntry.chest !== 0) {
        groupedExercise.countAverageChest += 1;
      }
      if (bodyTrackerEntry.shoulders !== 0) {
        groupedExercise.countAverageShoulders += 1;
      }
      if (bodyTrackerEntry.waist !== 0) {
        groupedExercise.countAverageWaist += 1;
      }
      if (bodyTrackerEntry.leftBicep !== 0) {
        groupedExercise.countAverageLeftBicep += 1;
      }
      if (bodyTrackerEntry.rightBicep !== 0) {
        groupedExercise.countAverageRightBicep += 1;
      }
      if (bodyTrackerEntry.leftForearm !== 0) {
        groupedExercise.countAverageLeftForearm += 1;
      }
      if (bodyTrackerEntry.rightForearm !== 0) {
        groupedExercise.countAverageRightForearm += 1;
      }

      if (bodyTrackerEntry.leftThigh !== 0) {
        groupedExercise.countAverageLeftThigh += 1;
      }
      if (bodyTrackerEntry.rightThigh !== 0) {
        groupedExercise.countAverageRightThigh += 1;
      }

      if (bodyTrackerEntry.leftCalf !== 0) {
        groupedExercise.countAverageLeftCalf += 1;
      }
      if (bodyTrackerEntry.rightCalf !== 0) {
        groupedExercise.countAverageRightCalf += 1;
      }

      if (groupedExercise.countAverageWeight !== 0) {
        groupedExercise.averageWeight = parseFloat(
          (
            (groupedExercise.averageWeight *
              (groupedExercise.countAverageWeight - 1) +
              bodyTrackerEntry.weight) /
            groupedExercise.countAverageWeight
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageBodyFat !== 0) {
        groupedExercise.averageBodyFat = parseFloat(
          (
            (groupedExercise.averageBodyFat *
              (groupedExercise.countAverageBodyFat - 1) +
              bodyTrackerEntry.bodyFat) /
            groupedExercise.countAverageWeight
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageCaloricIntake !== 0) {
        groupedExercise.averageCaloricIntake = parseFloat(
          (
            (groupedExercise.averageCaloricIntake *
              (groupedExercise.countAverageCaloricIntake - 1) +
              bodyTrackerEntry.caloricIntake) /
            groupedExercise.countAverageWeight
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageNeck !== 0) {
        groupedExercise.averageNeck = parseFloat(
          (
            (groupedExercise.averageNeck *
              (groupedExercise.countAverageNeck - 1) +
              bodyTrackerEntry.neck) /
            groupedExercise.countAverageNeck
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageChest !== 0) {
        groupedExercise.averageChest = parseFloat(
          (
            (groupedExercise.averageChest *
              (groupedExercise.countAverageChest - 1) +
              bodyTrackerEntry.chest) /
            groupedExercise.countAverageChest
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageShoulders !== 0) {
        groupedExercise.averageShoulders = parseFloat(
          (
            (groupedExercise.averageShoulders *
              (groupedExercise.countAverageShoulders - 1) +
              bodyTrackerEntry.shoulders) /
            groupedExercise.countAverageShoulders
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageWaist !== 0) {
        groupedExercise.averageWaist = parseFloat(
          (
            (groupedExercise.averageWaist *
              (groupedExercise.countAverageWaist - 1) +
              bodyTrackerEntry.waist) /
            groupedExercise.countAverageShoulders
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageLeftBicep !== 0) {
        groupedExercise.averageLeftBicep = parseFloat(
          (
            (groupedExercise.averageLeftBicep *
              (groupedExercise.countAverageLeftBicep - 1) +
              bodyTrackerEntry.leftBicep) /
            groupedExercise.countAverageLeftBicep
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageRightBicep !== 0) {
        groupedExercise.averageRightBicep = parseFloat(
          (
            (groupedExercise.averageRightBicep *
              (groupedExercise.countAverageRightBicep - 1) +
              bodyTrackerEntry.rightBicep) /
            groupedExercise.countAverageRightBicep
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageLeftForearm !== 0) {
        groupedExercise.averageLeftForearm = parseFloat(
          (
            (groupedExercise.averageLeftForearm *
              (groupedExercise.countAverageLeftForearm - 1) +
              bodyTrackerEntry.leftForearm) /
            groupedExercise.countAverageLeftForearm
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageLeftForearm !== 0) {
        groupedExercise.averageRightForearm = parseFloat(
          (
            (groupedExercise.averageRightForearm *
              (groupedExercise.countAverageRightForearm - 1) +
              bodyTrackerEntry.rightForearm) /
            groupedExercise.countAverageRightForearm
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageRightForearm !== 0) {
        groupedExercise.averageLeftThigh = parseFloat(
          (
            (groupedExercise.averageLeftThigh *
              (groupedExercise.countAverageLeftThigh - 1) +
              bodyTrackerEntry.leftThigh) /
            groupedExercise.countAverageLeftThigh
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageRightThigh !== 0) {
        groupedExercise.averageRightThigh = parseFloat(
          (
            (groupedExercise.averageRightThigh *
              (groupedExercise.countAverageRightThigh - 1) +
              bodyTrackerEntry.rightThigh) /
            groupedExercise.countAverageRightThigh
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageLeftCalf !== 0) {
        groupedExercise.averageLeftCalf = parseFloat(
          (
            (groupedExercise.averageLeftCalf *
              (groupedExercise.countAverageLeftCalf - 1) +
              bodyTrackerEntry.leftCalf) /
            groupedExercise.countAverageLeftCalf
          ).toFixed(2)
        );
      }

      if (groupedExercise.countAverageRightCalf !== 0) {
        groupedExercise.averageRightCalf = parseFloat(
          (
            (groupedExercise.averageRightCalf *
              (groupedExercise.countAverageRightCalf - 1) +
              bodyTrackerEntry.rightCalf) /
            groupedExercise.countAverageRightCalf
          ).toFixed(2)
        );
      }
    }
  );
  return groupedData;
}

export default groupBodyTrackerDataByTimePeriodAvg;
