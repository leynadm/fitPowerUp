import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase"
async function createFollowersFeedDoc(userID:string) {
    const userDoc = await getDoc(doc(db, "followers-feed", userID));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "followers-feed", userID), {
        following:[],
        lastPost:null,
        recentPosts:[],
        users:[]
      });
    }
  }

export default createFollowersFeedDoc