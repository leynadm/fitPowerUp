import toast from "react-hot-toast";
import { IUpdatedUserExercisesLibrary } from "../../../pages/Friends/CreateFitWorlGoal";
function zenkaiExerciseFieldValidation(exercise: IUpdatedUserExercisesLibrary) {
    if (
      exercise.measurement.includes("weight") &&
      exercise.measurement.includes("reps") &&
      exercise.measurement.length > 0
    ) {
      if (
        exercise.reps === 0 ||
        exercise.reps === undefined ||
        exercise.reps === null ||
        exercise.weight === null ||
        exercise.weight === undefined ||
        isNaN(exercise.weight)
      ) {
        if (exercise.reps === 0) {
          toast.error("Reps field cannot be empty or 0!");
        } else {
          toast.error("Please fill in all the required fields!");
        }
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("weight") &&
      exercise.measurement.includes("distance") &&
      exercise.measurement.length > 0
    ) {
      if (
        (exercise.weight === null || exercise.weight === undefined) &&
        exercise.distance === 0
      ) {
        if (exercise.distance === 0) {
          toast.error("Distance field cannot be empty or 0!");
        } else {
          toast.error("Please fill in all the required fields!");
        }
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("weight") &&
      exercise.measurement.includes("time") &&
      exercise.measurement.length > 0
    ) {
      if (
        (exercise.weight === null || exercise.weight === undefined) &&
        exercise.time === 0
      ) {
        if (exercise.time === 0) {
          toast.error("Time field cannot be empty or 0!");
        } else {
          toast.error("Please fill in all the required fields!");
        }
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("reps") &&
      exercise.measurement.includes("distance") &&
      exercise.measurement.length > 0
    ) {
      if (
        (exercise.reps === 0 ||
          exercise.reps === null ||
          exercise.reps === undefined) &&
        exercise.distance === 0
      ) {
        if (exercise.reps === 0 || exercise.distance === 0) {
          toast.error("The distance and reps cannot be 0!");
        } else {
          toast.error("Please fill in all the required fields!");
        }
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("reps") &&
      exercise.measurement.includes("time") &&
      exercise.measurement.length > 0
    ) {
      if (
        (exercise.reps === 0 || exercise.reps === null) &&
        exercise.time === 0
      ) {
        if (exercise.reps === 0) {
          toast.error("The reps and time cannot be 0!");
        } else {
          toast.error("Please fill in all the required fields!");
        }
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("distance") &&
      exercise.measurement.includes("time") &&
      exercise.measurement.length > 0
    ) {
      if (exercise.distance === 0 && exercise.time === 0) {
        if (exercise.distance === 0 && exercise.time === 0) {
          toast.error("Distance and time field cannot be 0!");
        } else {
          toast.error("Please fill in all the required fields!");
        }

        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("weight") &&
      exercise.measurement.length === 1
    ) {
      if (exercise.weight === null || exercise.weight === undefined) {
        if (exercise.weight === 0) {
          toast.error("Weight field cannot be 0!");
        } else {
          toast.error("Please fill in all the required fields!");
        }

        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("reps") &&
      exercise.measurement.length === 1
    ) {
      if (exercise.reps === 0 || exercise.reps === null) {
        if (exercise.reps === 0) {
          toast.error("Reps field cannot be empty or 0!");
        } else {
          toast.error("Please fill in all the required fields!");
        }

        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("distance") &&
      exercise.measurement.length === 1
    ) {
      if (exercise.distance === 0) {
        if (exercise.distance === 0) {
          toast.error("Distance field cannot be empty or 0!");
        } else {
          toast.error("Please fill in all the required fields!");
        }
        return "invalid";
      }
    }

    if (
      exercise.measurement.includes("time") &&
      exercise.measurement.length === 1
    ) {
      if (exercise.time === 0) {
        if (exercise.time === 0) {
          toast.error("Time field cannot be empty or 0!");
        } else {
          toast.error("Please fill in all the required fields!");
        }
        return "invalid";
      }
    }
  }

  export default zenkaiExerciseFieldValidation