import Exercise from "../../../interfaces/Exercise";

function groupDataOverall(flattenedData: Exercise[]) {
  const groupedData: {
    summedWeight: number;
    summedReps: number;
    summedDistance: number;
    summedTime: number;
    count: number;
    exerciseName: string;
    summedWorkouts:number;
    summedVolume:number;
  } = {
    summedWeight: 0,
    summedReps: 0,
    summedDistance: 0,
    summedTime: 0,
    count: 0,
    exerciseName: "Total", // You can change this as needed
    summedWorkouts:0,
    summedVolume:0
    
};

  flattenedData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  let trackedDate = ""
  flattenedData.forEach((exercise: Exercise, index: number) => {
    
    groupedData.summedVolume+=(exercise.weight*exercise.reps)
    if(trackedDate!==exercise.date){
        groupedData.summedWorkouts += 1;        
    }
    // Accumulate the values for each property
    groupedData.summedWeight += exercise.weight || 0;
    groupedData.summedReps += exercise.reps || 0;
    groupedData.summedDistance += exercise.distance || 0;
    groupedData.summedTime += exercise.time || 0;
    groupedData.count++;
    trackedDate = exercise.date
  });

  return groupedData;
}

export default groupDataOverall;
