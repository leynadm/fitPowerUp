import { IWorkoutData,Exercise } from "../interfaces/IUserTrainingData";
function getCompletedExercisesHistory(
  userTrainingData: IWorkoutData[],
  exerciseName: string | undefined
) {
  if (!userTrainingData || !exerciseName) {
    return;
  }

  const groupedCompletedExercises: {
    date: string;
    exercises: Exercise[];
    stats: {
      totalSets: number;
      totalReps: number;
      totalWeight: number;
      totalDistance: number;
      totalTime: number;
      totalVolume:number
    };
  }[] = [];

  userTrainingData.forEach((workoutEntry: IWorkoutData) => {
    workoutEntry.wExercises.forEach(
      (exerciseEntry: { name: string; exercises: Exercise[] }) => {
        const completedExerciseName = exerciseEntry.name.toUpperCase();
        const exercises = exerciseEntry.exercises;
        if (completedExerciseName === exerciseName.toUpperCase()) {
          const totalSets = exerciseEntry.exercises.length;
          const totalDistance = exercises.reduce(
            (acc, exercise) => acc + (exercise.distance || 0),
            0
          );
          const totalReps = exercises.reduce(
            (acc, exercise) => acc + (exercise.reps || 0),
            0
          );
          const totalWeight = exercises.reduce(
            (acc, exercise) => acc + (exercise.weight || 0),
            0
          );
          const totalVolume = exercises.reduce(
            (acc, exercise) => acc + (exercise.weight*exercise.reps || 0),
            0
          );

          const totalTime = exercises.reduce(
            (acc, exercise) => acc + (exercise.time || 0),
            0
          );

          const date = workoutEntry.date; // Convert the date to a string for grouping
          groupedCompletedExercises.push({
            date,
            exercises: exercises,
            stats: {
              totalSets: totalSets,
              totalReps: totalReps,
              totalWeight: totalWeight,
              totalDistance: totalDistance,
              totalTime: totalTime,
              totalVolume:totalVolume
            },
          });
        }
      }
    );
  });

  groupedCompletedExercises.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return groupedCompletedExercises;
}

export default getCompletedExercisesHistory;
