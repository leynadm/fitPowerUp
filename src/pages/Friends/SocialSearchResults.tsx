import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";
import UsersListItem from "./UsersListItem";
function SocialSearchResults() {
  const location = useLocation();
  const usersFound = location.state?.usersFound || [];

  useEffect(() => {
    console.log(usersFound);
  }, []);

  async function getUsers() {
    let q = query(collection(db, "users"));
    console.log(q);
    if (usersFound !== "") {
      q = query(
        collection(db, "users"),
        where("fullname", "array-contains", usersFound),
        where("privateAccount", "==", false)
      );
    }

    const querySnapshot = await getDocs(q);

    const userResults: any = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const user = doc.data();
      user.id = doc.id;
      userResults.push(user);
      console.log(doc.id, " => ", doc.data());
    });

    console.log("logging in user results");
    console.log(userResults);
  }

  return <UsersListItem usersFound={usersFound} />;
}

export default SocialSearchResults;
