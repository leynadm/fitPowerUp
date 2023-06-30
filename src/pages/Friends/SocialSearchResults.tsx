import React from "react";
import { useLocation } from "react-router";
import UsersListItem from "./UsersListItem";
function SocialSearchResults() {
  const location = useLocation();
  const usersFound = location.state?.usersFound || [];


  return <UsersListItem usersFound={usersFound} />;
}

export default SocialSearchResults;
