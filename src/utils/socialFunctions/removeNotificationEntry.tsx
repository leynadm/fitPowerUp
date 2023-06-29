import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../config/firebase";

function removeNotificationEntry(notificationId:string, postUserId:string) {
  const notificationDocRef = doc(db, "notifications", postUserId);
    console.log('logging notification id:')
    console.log({notificationId})
  /*  
    return updateDoc(notificationDocRef, {
    [notificationId]: deleteField(), // Remove the field from the document
  });*/
  
}

export { removeNotificationEntry };
