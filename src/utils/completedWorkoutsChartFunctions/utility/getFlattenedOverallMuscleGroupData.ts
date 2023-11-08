import { IWorkoutData } from "../../firebaseDataFunctions/completeWorkout";
import Exercise from "../../interfaces/Exercise";

function getFlattenedOverallMuscleGroupData(userTrainingData: IWorkoutData[], timeframe: string, startDate: string, endDate: string) {

    const today = new Date();
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    let filteredAndFlattenedExerciseData: Exercise[] = userTrainingData
        .flatMap((workoutEntry: IWorkoutData) =>
            workoutEntry.workoutExercises
                .flatMap((exerciseEntry: { name: string; exercises: Exercise[] }) =>
                    exerciseEntry.exercises
                )
        )
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Filter data based on startDate and endDate if both are provided
    if (startDate !== "" && endDate !== "") {
        filteredAndFlattenedExerciseData = filteredAndFlattenedExerciseData.filter(exercise => {
            const exerciseDate = new Date(exercise.date);
            return exerciseDate >= startDateObj && exerciseDate <= endDateObj;
        });
    } else {
        // Apply the selected timeframe if either startDate or endDate is not provided
        const timeframeDate = new Date(today);

        if (timeframe === "1m") {
            timeframeDate.setMonth(today.getMonth() - 1);
        } else if (timeframe === "3m") {
            timeframeDate.setMonth(today.getMonth() - 3);
        } else if (timeframe === "6m") {
            timeframeDate.setMonth(today.getMonth() - 6);
        } else if (timeframe === "1y") {
            timeframeDate.setFullYear(today.getFullYear() - 1);
        } else if (timeframe === "all") {
            timeframeDate.setFullYear(today.getFullYear() - 100);
        }

        filteredAndFlattenedExerciseData = filteredAndFlattenedExerciseData.filter(exercise => {
            const exerciseDate = new Date(exercise.date);
            return exerciseDate > timeframeDate;
        });
    }

    return filteredAndFlattenedExerciseData;
}

export default getFlattenedOverallMuscleGroupData;
