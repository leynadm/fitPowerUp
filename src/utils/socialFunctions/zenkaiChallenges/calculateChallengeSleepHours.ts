import IChallengeObj from "../../interfaces/IChallengeObj";
import { IUserBodyTrackerDataEntry } from "../../interfaces/IBodyTracker";
function calculateChallengeSleepHours(
  challengeObj: IChallengeObj,
  userBodyTrackerData: IUserBodyTrackerDataEntry[]
) {
  const startDate = new Date(challengeObj.startDate);
  const endDate = new Date(challengeObj.endDate);

  let totalDaysMatched = 0;

  const filteredArray = userBodyTrackerData.filter(
    (item: IUserBodyTrackerDataEntry) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    }
  );

  for (let index = 0; index < filteredArray.length; index++) {
    const bodyTrackerElement = filteredArray[index];

    if (
      bodyTrackerElement.hoursOfSleep >=
      challengeObj.goals.namekianNightRest.targetHours
    ) {
      totalDaysMatched = totalDaysMatched + 1;
    }
  }
  return totalDaysMatched;
}

export default calculateChallengeSleepHours;
