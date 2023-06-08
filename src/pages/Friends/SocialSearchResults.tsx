import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";
import UsersListItem from "./UsersListItem";
function SocialSearchResults() {
  const location = useLocation();
  const usersFound = location.state?.usersFound || [];


  return <UsersListItem usersFound={usersFound} />;
}

export default SocialSearchResults;
