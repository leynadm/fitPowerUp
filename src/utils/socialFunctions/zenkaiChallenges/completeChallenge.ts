import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import IChallengeObj from "../../interfaces/IChallengeObj";
async function completeChallenge(
  userId: string,
  userChallengesData: IChallengeObj[],
  userUpdatedChallenge: IChallengeObj
) {
  const userDocRef = doc(db, "users", userId);

  const userChallengesDocRef = doc(userDocRef, `userCollection/userChallenges`);

  const filteredData = userChallengesData.filter(
    (challengeObj: IChallengeObj) => challengeObj.id !== userUpdatedChallenge.id
  );

  filteredData.push(userUpdatedChallenge);

  try {
    await updateDoc(userChallengesDocRef, {
      challenges: filteredData,
    });
  } catch (error) {
    console.log(error);
  }
}

export default completeChallenge;
