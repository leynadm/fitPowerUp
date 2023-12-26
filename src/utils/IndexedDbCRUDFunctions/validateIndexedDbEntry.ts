export function validateIndexedDbEntry(exerciseSelectedMeasurement:string[],repsValue:number,weightValue:number,distanceValue:number,timeValue:number) {
    if (
      exerciseSelectedMeasurement.includes("weight") &&
      exerciseSelectedMeasurement.includes("reps") &&
      exerciseSelectedMeasurement.length > 0
    ) {
      if (
        repsValue === 0 && weightValue===0
      ) {
        return "invalid";
      }
    }

    if (
      exerciseSelectedMeasurement.includes("weight") &&
      exerciseSelectedMeasurement.includes("distance") &&
      exerciseSelectedMeasurement.length > 0
    ) {
      if (
        (weightValue === 0 && distanceValue===0)
      ) {
        return "invalid";
      }
    }

    if (
      exerciseSelectedMeasurement.includes("weight") &&
      exerciseSelectedMeasurement.includes("time") &&
      exerciseSelectedMeasurement.length > 0
    ) {
      if (
        (weightValue === 0 && timeValue === 0)
      ) {
        return "invalid";
      }
    }

    if (
      exerciseSelectedMeasurement.includes("reps") &&
      exerciseSelectedMeasurement.includes("distance") &&
      exerciseSelectedMeasurement.length > 0
    ) {
      if (repsValue === 0 && distanceValue === 0) {
        return "invalid";
      }
    }

    if (
      exerciseSelectedMeasurement.includes("reps") &&
      exerciseSelectedMeasurement.includes("time") &&
      exerciseSelectedMeasurement.length > 0
    ) {
      if (repsValue === 0 && timeValue === 0) {
        return "invalid";
      }
    }

    if (
      exerciseSelectedMeasurement.includes("distance") &&
      exerciseSelectedMeasurement.includes("time") &&
      exerciseSelectedMeasurement.length > 0
    ) {
      if (distanceValue === 0 && timeValue === 0) {
        return "invalid";
      }
    }

    if (
      exerciseSelectedMeasurement.includes("weight") &&
      exerciseSelectedMeasurement.length === 1
    ) {
      if (
        weightValue === 0
      ) {
        return "invalid";
      }
    }

    if (
      exerciseSelectedMeasurement.includes("reps") &&
      exerciseSelectedMeasurement.length === 1
    ) {
      if (repsValue === 0) {
        return "invalid";
      }
    }

    if (
      exerciseSelectedMeasurement.includes("distance") &&
      exerciseSelectedMeasurement.length === 1
    ) {
      if (distanceValue === 0) {
        return "invalid";
      }
    }

    if (
      exerciseSelectedMeasurement.includes("time") &&
      exerciseSelectedMeasurement.length === 1
    ) {
      if (timeValue === 0) {
        return "invalid";
      }
    }
  }