import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { Timestamp, } from "firebase/firestore";
import uuid from "react-uuid";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";
function addNotificationEntry(postUserId:string, action: string,currentUserUid:string,currentUserDataName:string,currentUserDataSurname:string,postId:string,userProfileImage:"string") {
  const notificationDocRef = doc(db, "notifications", postUserId);
  const notificationId = uuid(); // Generate a unique identifier for the comment
  const timestamp = Timestamp.fromMillis(Date.now());

  const notificationData = {
    action: action,
    userId: currentUserUid,
    timestamp: timestamp,
    name: currentUserDataName,
    surname: currentUserDataSurname,
    postId: postId,
    userProfileImage:userProfileImage
  };

  getDoc(notificationDocRef)
    .then((doc) => {
      if (doc.exists()) {
        // Comment document already exists, update the document
        return updateDoc(notificationDocRef, {
          [notificationId]: notificationData, // Use the comment ID as the field name within the document
        });
      } else {
        // Comment document doesn't exist, create a new document
        return setDoc(notificationDocRef, {
          [notificationId]: notificationData, // Use the comment ID as the field name within the document
        });
      }
    })
    .then(() => {
      // Comment added successfully
    })
    .catch((error) => {
      // Error occurred while adding comment
      toast.error("Oops, addNotificationEntry has an error!")
      console.error("Error adding comment:", error);
      
    });
}

export default addNotificationEntry;
