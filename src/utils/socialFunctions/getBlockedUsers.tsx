import { db } from "../../config/firebase";
import toast from "react-hot-toast";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
  doc,
  getDoc
} from "firebase/firestore";

function getBlockedUsers(currentUserUid: string, setBlockedUsers: any) {
  const userDocRef = doc(db, "users", currentUserUid);

  getDoc(userDocRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const blockedUsersData: any = [];
        const currentUserData = docSnapshot.data();
        const listOfBlockedUsers = currentUserData.blocked;

        console.log(listOfBlockedUsers);

        if (Array.isArray(listOfBlockedUsers) && listOfBlockedUsers.length > 0) {
          // Now query the "users" collection to get all blocked users
          const usersCollectionRef = collection(db, "users");

          // Create the query using "where" method to filter by the blocked users
          const blockedUsersQuery = query(
            usersCollectionRef,
            where(documentId(), "in", listOfBlockedUsers)
          );

          // Execute the query and get the documents
          getDocs(blockedUsersQuery)
            .then((querySnapshot) => {
              // Add the blocked users' data to the blockedUsersData array
              querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const userId = doc.id; // Get the document ID
                const userWithId = { ...userData, userId }; // Add the userId property
                blockedUsersData.push(userWithId);
              });

              // Now you can use the blockedUsersData array as needed
              setBlockedUsers(blockedUsersData);

              console.log('logging blockedUsersData:')
              console.log(blockedUsersData)
            })
            .catch((error) => {
              toast.error("Oops, getBlockedUsers has an error!");
              console.error("Error getting blocked users documents:", error);
            });
        } else {
            setBlockedUsers([]);
            console.log("List of blocked users is empty or not an array.");
          // Handle the case when the list of blocked users is empty or not an array.
        }
      } else {
        console.log("User document not found!");
      }
    })
    .catch((error) => {
      toast.error("Oops, getBlockedUsers has an error!");
      console.error("Error getting user document:", error);
    });
}

export default getBlockedUsers;
