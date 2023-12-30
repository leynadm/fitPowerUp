import { doc, collection, writeBatch, deleteDoc,getDocs, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db } from "../../config/firebase";
import { storage } from "../../config/firebase";
import toast from "react-hot-toast";
import { getFormattedDate } from "../getFormattedDate";


async function resetTrainingData(userId:string){

    const batch = writeBatch(db);

    const currentDate = getFormattedDate();
  
    try {
      const userDocRef = doc(db, "users", userId);
  
      const userCollectionRef = collection(userDocRef, "userCollection");
      
      const userTrainingCollectionRef = collection(
        userDocRef,
        "userTrainingCollection"
      );
      
      const userTrainingsQuerySnapshot = await getDocs(userTrainingCollectionRef);

      for (const docSnapshot of userTrainingsQuerySnapshot.docs) {
        const docRef = doc(db, `${userDocRef.path}/userTrainingCollection`, docSnapshot.id);
        batch.update(docRef, { workoutSessions: [] });
    }

      const userBodyTrackerCollectionRef = collection(
        userDocRef,
        "userBodyTrackerCollection"
      );
  
      const userBodytrackerQuerySnapshot = await getDocs(userBodyTrackerCollectionRef);

      for (const docSnapshot of userBodytrackerQuerySnapshot.docs) {
        
        const docRef = doc(db, `${userDocRef.path}/userBodyTrackerCollection`, docSnapshot.id);
        batch.update(docRef, { bodyTrackerData: [
          {
            date: currentDate,
            weight: 70,
            bodyFat: 0,
            caloricIntake: 0,
            neck: 0,
            shoulders: 0,
            chest: 0,
            leftBicep: 0,
            rightBicep: 0,
            leftForearm: 0,
            rightForearm: 0,
            waist: 0,
            hips: 0,
            leftThigh: 0,
            rightThigh: 0,
            leftCalf: 0,
            rightCalf: 0,
          },
        ],
        weight: 70 });
      }

      const featsRef = ref(storage, "assets/files/featsJSONString.json");
      const url = await getDownloadURL(featsRef);
      const response = await fetch(url);
      const featsParsedJSON = await response.json();
  
      const preselectedExercisesRef = ref(
        storage,
        "assets/files/preselectedExercisesJSON.json"
      );
      const preselectedExercisesURL = await getDownloadURL(
        preselectedExercisesRef
      );
      const preselectedExercisesResponse = await fetch(preselectedExercisesURL);
      const preselectedExercisesParsedJSON =
        await preselectedExercisesResponse.json();
  
      batch.update(userDocRef, {
        unitsSystem:"metric",
        experienceLevel:0,
        strengthLevel:2695,
        powerLevel:0,
        defaultWeightIncrement:1.25,
        firstPowerExercise:"barbell deadlift",
        secondPowerExercise:"flat barbell bench press",
        thirdPowerExercise:"barbell squat"      
      });
  
  
      // Create the userSelectedExercises document within the "user-training-data" subcollection
      const preselectedExercisesDocRef = doc(
        userCollectionRef,
        "userSelectedExercises"
      );
  
      batch.set(preselectedExercisesDocRef, {
        exercises: preselectedExercisesParsedJSON,
      });
  
      // Create the body tracker document within the "user-training-data" subcollection
      const userFeatsDocRef = doc(userCollectionRef, "userFeats");
  
      batch.set(userFeatsDocRef, {
        userFeatsData: featsParsedJSON,
      });
  
      // Commit the batch to create all the documents simultaneously
      await batch.commit();
      toast.success('Training data was successfully reset!')
    } catch (error) {
      // Handle the error here
      toast.error("Oops, updateAppVersionWithNewDocs has an error!");
      console.error("Error creating documents:", error);
      console.log(error);
      // You can also throw the error again to propagate it to the caller of this function
      throw error;
    }    


}

export default resetTrainingData