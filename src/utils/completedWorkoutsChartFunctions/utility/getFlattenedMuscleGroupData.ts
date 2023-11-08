import { IWorkoutData } from "../../firebaseDataFunctions/completeWorkout";
import Exercise from "../../interfaces/Exercise";

function getFlattenedMuscleGroupData(userTrainingData: IWorkoutData[], muscleGroup: string, timeframe: string) {
    if (!muscleGroup) {
        return [];
    }
    const today = new Date();
    const filteredAndFlattenedExerciseData: Exercise[] = userTrainingData
        .flatMap((workoutEntry: IWorkoutData) =>
            workoutEntry.workoutExercises
                .flatMap((exerciseEntry: { name: string; exercises: Exercise[] }) =>
                    exerciseEntry.exercises
                        .filter((exercise: Exercise) =>
                            exercise.category?.toUpperCase() === muscleGroup.toUpperCase()
                        )
                )
        )
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .filter(exercise => {
            const exerciseDate = new Date(exercise.date);
            const timeframeDate = new Date(today);

            if (timeframe === "1m") {
                timeframeDate.setMonth(today.getMonth() - 1);
            } else if (timeframe === "3m") {
                timeframeDate.setMonth(today.getMonth() - 3);
            } else if (timeframe === "6m") {
                timeframeDate.setMonth(today.getMonth() - 6);
            } else if (timeframe === "1y") {
                timeframeDate.setFullYear(today.getFullYear() - 1);
            }else if(timeframe==="all"){
                timeframeDate.setFullYear(today.getFullYear() - 100);
            }

            return exerciseDate > timeframeDate;
        });

    return filteredAndFlattenedExerciseData;
}

export default getFlattenedMuscleGroupData;
