import React, { useEffect, useState, createContext, ReactNode } from "react";
import { auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import User from "../utils/interfaces/User";
// Create the context to hold the data and share it among all components
interface AuthProviderProps {
  children: ReactNode;
}



export const AuthContext = createContext<any>({
  currentUser:null,
  userCredential:null
});

export const AuthProvider = ({ children}:AuthProviderProps ) => {
  // Set the current user in case the user is already logged in
  const [currentUser, setCurrentUser] = useState(() => auth.currentUser);
  const [currentUserData,setCurrentUserData] = useState<User|null>(null)

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      setCurrentUser(user);
      console.log('logging how many times this runs;')
     
      if (user?.isAnonymous===false) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          setCurrentUserData(userData);
        }

      } else { 
        setCurrentUserData({    
          fullname: ["Guest","User","Guest User"],
          name: "Guest",
          sex: "male",
          surname: "User",
          profileImage:"",
          verified:false,
          privateAccount:false
        
        });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser,currentUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
