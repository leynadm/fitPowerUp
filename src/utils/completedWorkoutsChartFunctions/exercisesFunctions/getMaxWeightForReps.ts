function getMaxWeightForReps(groupedData: { date: string; repsData: { reps: number; weight: number }[] }[]) {
    const maxWeightData: { date: string; reps6: number; reps8: number; reps12: number }[] = [];
  
    groupedData.forEach((group) => {
      const date = group.date;
      const maxWeightForReps = {
        reps6: 0,
        reps8: 0,
        reps12: 0,
      };
  
      group.repsData.forEach((data) => {
        if (data.reps === 6 && data.weight > maxWeightForReps.reps6) {
          maxWeightForReps.reps6 = data.weight;
        } else if (data.reps === 8 && data.weight > maxWeightForReps.reps8) {
          maxWeightForReps.reps8 = data.weight;
        } else if (data.reps === 12 && data.weight > maxWeightForReps.reps12) {
          maxWeightForReps.reps12 = data.weight;
        }
      });
  
      maxWeightData.push({
        date: date,
        ...maxWeightForReps,
      });
    });
  
    return maxWeightData;
  }

  export default getMaxWeightForReps