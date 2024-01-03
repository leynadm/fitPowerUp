import { db } from "../../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import IChallengeObj from "../../interfaces/IChallengeObj";
async function saveChallenge(userId: string, challengeObject: IChallengeObj) {
  const userDocRef = doc(db, "users", userId);

  const userTrainingDataDocRef = doc(
    userDocRef,
    `userCollection/userChallenges/`
  );

  await updateDoc(userTrainingDataDocRef, {
    challenges: arrayUnion(challengeObject),
  });
}

export default saveChallenge;
