function calculateDOTS(
    bodyWeight: number,
    weightLifted: number,
    isFemale: boolean) {

    const maleCoeff = [
      -307.75076,
      24.0900756,
      -0.1918759221,
      0.0007391293,
      -0.000001093,
    ];
    const femaleCoeff = [
      -57.96288,
      13.6175032,
      -0.1126655495,
      0.0005158568,
      -0.0000010706,
    ];
  
    let denominator = isFemale ? femaleCoeff[0] : maleCoeff[0];
    let coeff = isFemale ? femaleCoeff : maleCoeff;
    let maxbw = isFemale ? 150 : 210;
    let bw = Math.min(Math.max(bodyWeight, 40), maxbw);
  
    for (let i = 1; i < coeff.length; i++) {
      denominator += coeff[i] * Math.pow(bw, i);
    }
  
    //Calculate the normal DOTS score and the multiply by the scale I want
    let score = ((500 / denominator) * weightLifted) * 10;
    return parseInt(score.toFixed(0), 10);
  }

  export default calculateDOTS