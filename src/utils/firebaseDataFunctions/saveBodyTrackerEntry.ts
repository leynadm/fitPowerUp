import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
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

async function saveBodyTrackerEntry(
  userId: string,
  bodyTrackerData: IBodyTrackerObj,
  saveButtonText: string
) {
  const userDocRef = doc(db, "users", userId);

  const userBodyTrackerDocRef = doc(
    userDocRef,
    "userCollection/userBodyTracker/"
  );

  // CONVERT THE "" entries to a 0
  for (const [key, value] of Object.entries(bodyTrackerData)) {
    if((typeof value==='string' && key!=="date")){
      bodyTrackerData[key]=0
    }
  }

  if (saveButtonText === "save") {
    await updateDoc(userBodyTrackerDocRef, {
      bodyTrackerData: arrayUnion(bodyTrackerData),
    });
    toast.success("Your data was added!");
  } else {
    const userBodyTrackerDocSnap = await getDoc(userBodyTrackerDocRef);

    if (userBodyTrackerDocSnap.exists()) {
      const queriedUserBodyTrackerData = userBodyTrackerDocSnap.data();

      if (queriedUserBodyTrackerData) {
        const filteredData = queriedUserBodyTrackerData.bodyTrackerData.filter(
          (entry: IBodyTrackerObj) => entry.date !== bodyTrackerData.date
        );

        // Add the new data to the filtered array
        filteredData.push(bodyTrackerData);

        await setDoc(userBodyTrackerDocRef, {
          bodyTrackerData: filteredData
        });
        toast.success("Your data was added!");
      }
    }
  }

  console.log("complete");
}

export default saveBodyTrackerEntry;
