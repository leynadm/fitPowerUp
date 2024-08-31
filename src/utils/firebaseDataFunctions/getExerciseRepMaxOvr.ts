import { IWorkoutData } from "../interfaces/IUserTrainingData";
import { Exercise } from "../interfaces/IUserTrainingData";

export default function getExerciseRepMaxOvr(
  exerciseData: IWorkoutData[],
  exerciseName: string | undefined
) {
  if (!exerciseName) return;

  const todayDate = new Date();
  const lastMonthDate = new Date(new Date().setDate(todayDate.getDate() - 30));
  const lastSixMonthsDate = new Date(
    new Date().setDate(todayDate.getDate() - 180)
  );
  const lastYearDate = new Date(new Date().setDate(todayDate.getDate() - 365));

  const exerciseRepMaxOvr = {
    "1 month": {
      "1RM": 0,
      "3RM": 0,
      "5RM": 0,
      "8RM": 0,
      "10RM": 0,
    },
    "6 months": {
      "1RM": 0,
      "3RM": 0,
      "5RM": 0,
      "8RM": 0,
      "10RM": 0,
    },
    "1 year": {
      "1RM": 0,
      "3RM": 0,
      "5RM": 0,
      "8RM": 0,
      "10RM": 0,
    },
    "all time": {
      "1RM": 0,
      "3RM": 0,
      "5RM": 0,
      "8RM": 0,
      "10RM": 0,
    },
  };

  // Helper function to calculate rep max using the Epley formula
  const calculateRepMax = (weight: number, reps: number) => {
    // Applying the Brzycki formula
    return weight / (1.0278 - 0.0278 * reps);
  };

  exerciseData.forEach((workoutEntry: IWorkoutData) => {
    workoutEntry.wExercises.forEach(
      (exerciseEntry: { name: string; exercises: Exercise[] }) => {
        const completedExerciseName = exerciseEntry.name.toUpperCase();

        if (completedExerciseName === exerciseName.toUpperCase()) {
          const date = workoutEntry.date;
          const workoutDate = new Date(date);

          exerciseEntry.exercises.forEach((exerciseSet) => {
            if (exerciseSet.reps && exerciseSet.weight !== 0) {
              const estimated1RM = calculateRepMax(
                exerciseSet.weight,
                exerciseSet.reps
              );

              // Last Month Calculation
              if (workoutDate > lastMonthDate) {
                exerciseRepMaxOvr["1 month"]["1RM"] = Math.max(
                  exerciseRepMaxOvr["1 month"]["1RM"],
                  estimated1RM
                );
                exerciseRepMaxOvr["1 month"]["3RM"] = Math.max(
                  exerciseRepMaxOvr["1 month"]["3RM"],
                  estimated1RM * 0.93
                );
                exerciseRepMaxOvr["1 month"]["5RM"] = Math.max(
                  exerciseRepMaxOvr["1 month"]["5RM"],
                  estimated1RM * 0.87
                );
                exerciseRepMaxOvr["1 month"]["8RM"] = Math.max(
                  exerciseRepMaxOvr["1 month"]["8RM"],
                  estimated1RM * 0.8
                );
                exerciseRepMaxOvr["1 month"]["10RM"] = Math.max(
                  exerciseRepMaxOvr["1 month"]["10RM"],
                  estimated1RM * 0.75
                );
              }

              // Last Six Months Calculation
              if (workoutDate > lastSixMonthsDate) {
                exerciseRepMaxOvr["6 months"]["1RM"] = Math.max(
                  exerciseRepMaxOvr["6 months"]["1RM"],
                  estimated1RM
                );
                exerciseRepMaxOvr["6 months"]["3RM"] = Math.max(
                  exerciseRepMaxOvr["6 months"]["3RM"],
                  estimated1RM * 0.93
                );
                exerciseRepMaxOvr["6 months"]["5RM"] = Math.max(
                  exerciseRepMaxOvr["6 months"]["5RM"],
                  estimated1RM * 0.87
                );
                exerciseRepMaxOvr["6 months"]["8RM"] = Math.max(
                  exerciseRepMaxOvr["6 months"]["8RM"],
                  estimated1RM * 0.8
                );
                exerciseRepMaxOvr["6 months"]["10RM"] = Math.max(
                  exerciseRepMaxOvr["6 months"]["10RM"],
                  estimated1RM * 0.75
                );
              }

              // Last Year Calculation
              if (workoutDate > lastYearDate) {
                exerciseRepMaxOvr["1 year"]["1RM"] = Math.max(
                  exerciseRepMaxOvr["1 year"]["1RM"],
                  estimated1RM
                );
                exerciseRepMaxOvr["1 year"]["3RM"] = Math.max(
                  exerciseRepMaxOvr["1 year"]["3RM"],
                  estimated1RM * 0.93
                );
                exerciseRepMaxOvr["1 year"]["5RM"] = Math.max(
                  exerciseRepMaxOvr["1 year"]["5RM"],
                  estimated1RM * 0.87
                );
                exerciseRepMaxOvr["1 year"]["8RM"] = Math.max(
                  exerciseRepMaxOvr["1 year"]["8RM"],
                  estimated1RM * 0.8
                );
                exerciseRepMaxOvr["1 year"]["10RM"] = Math.max(
                  exerciseRepMaxOvr["1 year"]["10RM"],
                  estimated1RM * 0.75
                );
              }

              // All Time Calculation
              exerciseRepMaxOvr["all time"]["1RM"] = Math.max(
                exerciseRepMaxOvr["all time"]["1RM"],
                estimated1RM
              );
              exerciseRepMaxOvr["all time"]["3RM"] = Math.max(
                exerciseRepMaxOvr["all time"]["3RM"],
                estimated1RM * 0.93
              );
              exerciseRepMaxOvr["all time"]["5RM"] = Math.max(
                exerciseRepMaxOvr["all time"]["5RM"],
                estimated1RM * 0.87
              );
              exerciseRepMaxOvr["all time"]["8RM"] = Math.max(
                exerciseRepMaxOvr["all time"]["8RM"],
                estimated1RM * 0.8
              );
              exerciseRepMaxOvr["all time"]["10RM"] = Math.max(
                exerciseRepMaxOvr["all time"]["10RM"],
                estimated1RM * 0.75
              );
            }
          });
        }
      }
    );
  });

  console.log(exerciseRepMaxOvr);
  return exerciseRepMaxOvr;
}
