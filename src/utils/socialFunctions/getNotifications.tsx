import { doc, getDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";

function getNotifications(currentUserUid: string, setNotifications: any) {
  const notificationDocRef = doc(db, "notifications", currentUserUid);

  getDoc(notificationDocRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const notificationsData = [];

        const notificationData = docSnapshot.data();
        for (const field in notificationData) {
          const fieldValue = notificationData[field];
          notificationsData.push(fieldValue);
        }
        notificationsData.sort(
          (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
        );

        console.log("Comments document data:", notificationsData);
        setNotifications(notificationsData);
      } else {
        console.log("Comments document does not exist");
        setNotifications([]);
      }
    })
    .catch((error) => {
      console.error("Error getting comments document:", error);
      setNotifications([]);
    });
}

export default getNotifications;
