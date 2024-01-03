import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./Auth";
import Box from "@mui/material/Box";
import LoadingScreenDBZ from "../components/ui/LoadingScreenDBZ";
interface AuthRouteProps {
  type: "home" | "login" | "signup" | "/" | "launching";
}

const AuthRoute = ({ type }: AuthRouteProps) => {
  const { currentUser, currentUserData, loginFetchTrigger } =
    useContext(AuthContext);

  if (!loginFetchTrigger) {
    // Render a loading state or a spinner while authentication is resolving
    return (
      <Box
        height="100svh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <LoadingScreenDBZ />
      </Box>
    );
  }

  // Additional check for currentUserData loading
  if (currentUser && !currentUserData) {
    // currentUser is logged in but currentUserData is not loaded yet
    return (
      <Box
        height="100svh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <LoadingScreenDBZ />
      </Box>
    );
  }

  if (type === "login") {
    return currentUser === null ? (
      <Outlet />
    ) : (
      <Navigate to={"/home/workout"} />
    );
  } else if (type === "home") {
    return currentUser !== null ? <Outlet /> : <Navigate to="/login" />;
  } else if (type === "signup") {
    return currentUser === null ? (
      <Outlet />
    ) : (
      <Navigate to={"/home/workout"} />
    );
  } else if (type === "/") {
    return currentUser === null ? (
      <Outlet />
    ) : (
      <Navigate to={"/home/workout"} />
    );
  } else {
    throw new Error("Invalid AuthRoute type");
  }
};

export default AuthRoute;
