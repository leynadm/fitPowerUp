// Import the functions you need from the SDKs you need


import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

/*  
window.self.FIREBASE_APPCHECK_DEBUG_TOKEN=true;


if (process.env.NODE_ENV !== 'production') {
  window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
} 
*/ 
// Initialize Firebase
/*  */
const app = initializeApp(firebaseConfig);
/* 
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lc5XU0nAAAAAF57wPxnBD_JZoA4GayiJFB15Q6h'),
  isTokenAutoRefreshEnabled: true
}); */ 

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
