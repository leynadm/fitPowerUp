function calculateOneRepMax(weight:number, reps:number) {
    // Epley formula
    const oneRepMax = weight * (1 + (reps / 30));
  
    return oneRepMax;
  }

  export default calculateOneRepMax