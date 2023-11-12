import Exercise from "../../../interfaces/Exercise";

function groupDataByMuscleG(flattenedData: Exercise[]) {
  const groupedData: {
    summedWeight: number;
    summedReps: number;
    summedDistance: number;
    summedTime: number;
    count: number;
    muscleGroup: string;
  }[] = [];

  flattenedData.forEach((exercise: Exercise, index: number) => {
    let groupedExercise = groupedData.find(
      (group) => group.muscleGroup === exercise.category
    );

    if (!groupedExercise) {
      groupedExercise = {
        summedWeight: 0,
        summedReps: 0,
        summedDistance: 0,
        summedTime: 0,
        count: 0,
        muscleGroup: exercise.category,
      };
      groupedData.push(groupedExercise);
    }

    // Increment counts and summed the exercise properties
    groupedExercise.count++;
    groupedExercise.summedWeight += exercise.weight;
    groupedExercise.summedReps += exercise.reps;
    groupedExercise.summedDistance += exercise.distance;
    groupedExercise.summedTime += exercise.time;
  });

  return groupedData;
}

export default groupDataByMuscleG;
