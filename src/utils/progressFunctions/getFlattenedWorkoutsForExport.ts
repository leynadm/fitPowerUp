import { IWorkoutData } from "../interfaces/IUserTrainingData";
interface IWorkoutExportData {
  date: string;
  id: string;
  power: number;
  reps: number;
  sets: number;
  vol: number;
  comment: string;
  feelPain: boolean;
  trainHarder: boolean;
  warmStretch: boolean;
  value: number;
}
function getFlattenedWorkoutsForExport(userTrainingData: IWorkoutData[]) {
  const workoutArr: IWorkoutExportData[] = [];

  for (let index = 0; index < userTrainingData.length; index++) {
    const workoutEntry = userTrainingData[index];

    const workoutExportEntry = {
      date: workoutEntry.date,
      id: workoutEntry.id,
      power: workoutEntry.power,
      reps: workoutEntry.stats.reps,
      sets: workoutEntry.stats.sets,
      vol: workoutEntry.stats.vol,
      comment: workoutEntry.wEval.comment,
      feelPain: workoutEntry.wEval.feelPain,
      trainHarder: workoutEntry.wEval.trainHarder,
      warmStretch: workoutEntry.wEval.warmStretch,
      value: workoutEntry.wEval.value,
    };

    workoutArr.push(workoutExportEntry);
  }

  workoutArr.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return workoutArr;
}

export default getFlattenedWorkoutsForExport;
