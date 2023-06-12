import { Timestamp } from "firebase/firestore";
export interface UserRelations {
  following: [];
  users: [];
  lastPost?:Timestamp|null
  recentPosts?:[]
}

export default UserRelations;
