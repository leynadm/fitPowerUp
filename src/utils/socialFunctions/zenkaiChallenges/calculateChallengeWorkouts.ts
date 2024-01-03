import IChallengeObj from "../../interfaces/IChallengeObj"
import { IWorkoutData } from "../../interfaces/IUserTrainingData"
function calculateChallengeWorkouts(challengeObj:IChallengeObj,userTrainingData:IWorkoutData[]){

    const startDate = new Date(challengeObj.startDate) 
    const endDate = new Date(challengeObj.endDate)
    
     
    const filteredArray = userTrainingData.filter((item:IWorkoutData) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
      
    
    return filteredArray.length

}

export default calculateChallengeWorkouts