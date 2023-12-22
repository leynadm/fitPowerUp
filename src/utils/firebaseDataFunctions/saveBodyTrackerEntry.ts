import { updateDoc, doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";

export interface IBodyTrackerObj {
  date: string;
  weight: number | string;
  bodyFat: number | string;
  caloricIntake: number | string;
  neck: number | string;
  shoulders: number | string;
  chest: number | string;
  leftBicep: number | string;
  rightBicep: number | string;
  leftForearm: number | string;
  rightForearm: number | string;
  waist: number | string;
  hips: number | string;
  leftThigh: number | string;
  rightThigh: number | string;
  leftCalf: number | string;
  rightCalf: number | string;
  [key: string]: number | string;
}

type NumericOrStringObject = {
  [key: string]: number | string | null; // Include null in the type
};
async function saveBodyTrackerEntry(
  userId: string,
  bodyKPIDataObj: IBodyTrackerObj,
  saveButtonText: string,
  userBodyTrackerDataSize: number
) {
  const userDocRef = doc(db, "users", userId);

  const userBodyTrackerCollectionRef = collection(
    userDocRef,
    "userBodyTrackerCollection"
  );

  const docSuffix =
    Math.ceil(userBodyTrackerDataSize / 650) === 0
      ? 1
      : Math.ceil(userBodyTrackerDataSize / 650);

  let userBodyTrackerDocRef = doc(
    userBodyTrackerCollectionRef,
    `userBodyTrackerData_${docSuffix}`
  );

  // Convert the original object with strings as to have them as floats
  const numericBodyKPIDataObj = Object.entries(bodyKPIDataObj).reduce(
    (newObj: NumericOrStringObject, [key, value]) => {
      // Skip the conversion for the "date" key
      if (key === "date") {
        newObj[key] = value;
      } else {
        // Attempt to convert to a number, if it fails, set it to null
        newObj[key] = typeof value === 'string' ? parseFloat(value) : value;

      }
      return newObj;
    },
    {} as IBodyTrackerObj
  ); // Cast to IBodyTrackerObj since it's the expected output type

  if (saveButtonText === "save") {
    await updateDoc(userBodyTrackerDocRef, {
      bodyTrackerData: arrayUnion(numericBodyKPIDataObj),
    });
    toast.success("Your data was added!");
  } else {
    const userBodyTrackerDocSnap = await getDoc(userBodyTrackerDocRef);

    if (userBodyTrackerDocSnap.exists()) {
      const queriedUserBodyTrackerData = userBodyTrackerDocSnap.data();
      if (queriedUserBodyTrackerData) {
        const filteredData = queriedUserBodyTrackerData.bodyTrackerData.filter(
          (entry: IBodyTrackerObj) => entry.date !== numericBodyKPIDataObj.date
        );

        filteredData.push(numericBodyKPIDataObj);

        await setDoc(userBodyTrackerDocRef, {
          bodyTrackerData: filteredData,
        });
        toast.success("Your data was added!");
      }
    }
  }
}

export default saveBodyTrackerEntry;
