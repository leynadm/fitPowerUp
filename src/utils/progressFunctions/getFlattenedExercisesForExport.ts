import { IWorkoutData } from "../firebaseDataFunctions/completeWorkout";
import Exercise from "../interfaces/Exercise";

function getFlattenedExercisesForExport(userTrainingData: IWorkoutData[]) {

    let filteredAndFlattenedExerciseData: (Exercise & { workoutId: string,idOrder: string })[] = userTrainingData
        .flatMap((workoutEntry: IWorkoutData, workoutIndex: number) =>
            workoutEntry.wExercises
                .flatMap((exerciseEntry: { name: string; exercises: Exercise[] }, exerciseIndex: number) =>
                    exerciseEntry.exercises.map((exercise, index) => ({
                        ...exercise,
                        // Generate a unique ID for each exercise
                        idOrder: `workout-${workoutIndex}-exercise-${exerciseIndex}-${index}`,
                        workoutId:workoutEntry.id
                    }))
                )
        )
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return filteredAndFlattenedExerciseData;
}

export default getFlattenedExercisesForExport;
