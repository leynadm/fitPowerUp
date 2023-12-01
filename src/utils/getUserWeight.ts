import { IUserBodyTrackerDataEntry } from "../context/TrainingData";
function getUserWeight(userBodyTrackerData: IUserBodyTrackerDataEntry[]) {
  userBodyTrackerData.sort(
    (a: IUserBodyTrackerDataEntry, b: IUserBodyTrackerDataEntry) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    }
  );

  const lastItem = userBodyTrackerData.length;
  return userBodyTrackerData[lastItem - 1].weight;
}

export default getUserWeight