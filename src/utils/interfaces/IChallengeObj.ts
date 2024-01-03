import { IUpdatedUserExercisesLibrary } from "../../pages/Friends/CreateFitWorlGoal";
interface IChallengeObj {
  id: string;
  status: string;
  name: string;
  startDate: string;
  endDate: string;
  goals: {
    saiyanTrainingSchedule: {
      isActive: boolean;
      resultStatus: string;
      targetNumberOfWorkouts: number;
      daysTargetReached: number;
    };
    gravityChamberGains: {
      isActive: boolean;
      resultStatus: string;
      exercises: IUpdatedUserExercisesLibrary[];
    };
    majinMetabolism: {
      isActive: boolean;
      resultStatus: string;
      dailyCalorieGoal: number;
      daysGoalReached: number;
    };
    namekianNightRest: {
      isActive: boolean;
      resultStatus: string;
      targetHours: number;
      daysGoalReached: number;
    };
  };
  challengeComment: string;
  finalResult: number;
  totalChallenges: number;
}

export default IChallengeObj;
