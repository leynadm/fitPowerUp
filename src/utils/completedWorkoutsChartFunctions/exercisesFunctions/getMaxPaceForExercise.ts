function getMaxPaceForExercise(
    groupedData: {
      date: string;
      maxDistance: number;
      maxTime: number;
      count: number;
    }[]
  ) {
    const exerciseData: { exerciseDate: string; value: number }[] = [];
  
    groupedData.forEach(
      (exercise: {
        date: string;
        maxDistance: number;
        maxTime: number;
        count: number;
      }) => {
        const maximumDistance = exercise.maxDistance;
        const maximumTime = exercise.maxTime;
        const exerciseDate = exercise.date;
  
        if (maximumDistance > 0 && maximumTime > 0) {
          // Calculate pace as time / distance (minutes per unit of distance)
          const pace = maximumTime / maximumDistance;
          // Round to 2 decimal places to represent pace as minutes per unit of distance
          const value = parseFloat(pace.toFixed(2));
          exerciseData.push({ exerciseDate, value });
        }
      }
    );
  
    return exerciseData;
  }
  
  export default getMaxPaceForExercise;
  