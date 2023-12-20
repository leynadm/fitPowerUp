import {
    statisticsOptionsWeightAndReps,
    statisticsOptionsReps,
    statisticsOptionsWeight,
    statisticsOptionsDistance,
    statisticsOptionsTime,
    statisticsOptionsWeightAndDistance,
    statisticsOptionsWeightAndTime,
    statisticsOptionsRepsAndDistance,
    statisticsOptionsRepsAndTime,
    statisticsOptionsDistanceAndTime,
  } from "../../statisticsOptions";

function getStatisticOptions(exerciseSelected: any) {
    let statisticsOptions;

    if (!exerciseSelected) {
      return [];
    }

    if (
      exerciseSelected.measurement.includes("weight") &&
      exerciseSelected.measurement.includes("reps")
    ) {
      statisticsOptions = statisticsOptionsWeightAndReps;
    } else if (
      exerciseSelected.measurement.includes("weight") &&
      exerciseSelected.measurement.includes("distance")
    ) {
      statisticsOptions = statisticsOptionsWeightAndDistance;
    } else if (
      exerciseSelected.measurement.includes("weight") &&
      exerciseSelected.measurement.includes("time")
    ) {
      statisticsOptions = statisticsOptionsWeightAndTime;
    } else if (
      exerciseSelected.measurement.includes("reps") &&
      exerciseSelected.measurement.includes("distance")
    ) {
      statisticsOptions = statisticsOptionsRepsAndDistance;
    } else if (
      exerciseSelected.measurement.includes("reps") &&
      exerciseSelected.measurement.includes("time")
    ) {
      statisticsOptions = statisticsOptionsRepsAndTime;
    } else if (
      exerciseSelected.measurement.includes("distance") &&
      exerciseSelected.measurement.includes("time")
    ) {
      statisticsOptions = statisticsOptionsDistanceAndTime;
    } else if (exerciseSelected.measurement.includes("weight")) {
      statisticsOptions = statisticsOptionsWeight;
    } else if (exerciseSelected.measurement.includes("reps")) {
      statisticsOptions = statisticsOptionsReps;
    } else if (exerciseSelected.measurement.includes("distance")) {
      statisticsOptions = statisticsOptionsDistance;
    } else if (exerciseSelected.measurement.includes("time")) {
      statisticsOptions = statisticsOptionsTime;
    }

    return statisticsOptions || [];
  }

  export default getStatisticOptions