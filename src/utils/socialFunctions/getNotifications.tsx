import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import toast from "react-hot-toast";

async function getNotifications(currentUserUid: string, setNotifications: any) {

  const notificationDocRef = doc(db, "notifications", currentUserUid);

  getDoc(notificationDocRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const notificationsData = [];

        const notificationData = docSnapshot.data();
        for (const field in notificationData) {
          const fieldValue = notificationData[field];
          // Check if the timestamp field exists and is a valid timestamp
          if (fieldValue && fieldValue.timestamp && fieldValue.timestamp.toMillis) {
            notificationsData.push(fieldValue);
          }
        }

        // Sort the notifications based on the timestamp field
        notificationsData.sort(
          (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
        );
        setNotifications(notificationsData);
      } else {

        setNotifications([]);
      }
    })
    .catch((error) => {
      toast.error("Oops, getNotifications has an error!");
      console.error("Error getting notifications document:", error);
      setNotifications([]);
    });
}

export default getNotifications;
