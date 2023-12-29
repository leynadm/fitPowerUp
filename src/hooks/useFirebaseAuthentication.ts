import { useEffect, useState } from "react";
import { auth } from "../config/firebase"; // Make sure this is the correct path to your firebase config
import enablePersistentData from "../utils/enablePersistentData";
import createInitialDbTables from "../utils/IndexedDbCRUDFunctions/createInitialDbTables";

export const useFirebaseAuth = () => {
  const [currentUser, setCurrentUser] = useState(() => auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        await enablePersistentData();

        await createInitialDbTables(user.uid)
          .then(() => {
            //console.log("Tables are inside the database.");
          })
          .catch((error) => {
            console.error("Error creating tables:", error);
          })
          .finally(() => {
            //console.log("IndexedDb tables creation completed.");
          });
      }
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, setCurrentUser };
};
