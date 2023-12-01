import { updateDoc, doc, setDoc, getDoc,collection } from "firebase/firestore";
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
  bodyKPIDataObj: IBodyTrackerObj,
  saveButtonText: string,
  userBodyTrackerDataSize:number
  
) {
  const userDocRef = doc(db, "users", userId);

  const userBodyTrackerCollectionRef = collection(userDocRef, "userBodyTrackerCollection");
   

  let docSuffix = Math.ceil(userBodyTrackerDataSize / 650);
  let userBodyTrackerDocRef = doc(userBodyTrackerCollectionRef, `userBodyTrackerData_${docSuffix+1}`);
  console.log(docSuffix)
  
  for (const [key, value] of Object.entries(bodyKPIDataObj)) {
    if((typeof value==='string' && key!=="date")){
      bodyKPIDataObj[key]=0
    }
  }

  if (saveButtonText === "save") {
    await updateDoc(userBodyTrackerDocRef, {
      bodyTrackerData: arrayUnion(bodyKPIDataObj),
    });
    toast.success("Your data was added!");
  } else {
    const userBodyTrackerDocSnap = await getDoc(userBodyTrackerDocRef);

    if (userBodyTrackerDocSnap.exists()) {
      const queriedUserBodyTrackerData = userBodyTrackerDocSnap.data();

      if (queriedUserBodyTrackerData) {
        const filteredData = queriedUserBodyTrackerData.bodyTrackerData.filter(
          (entry: IBodyTrackerObj) => entry.date !== bodyKPIDataObj.date
        );

        filteredData.push(bodyKPIDataObj);

        await setDoc(userBodyTrackerDocRef, {
          bodyTrackerData: filteredData
        });
        toast.success("Your data was added!");
      }
    }
  }
}

export default saveBodyTrackerEntry;

