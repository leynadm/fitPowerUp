import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./Auth";

interface AuthRouteProps {
  type: "home" | "login" | "signup";
}


const AuthRoute = ({ type}:AuthRouteProps) => {
  const { currentUser } = useContext(AuthContext);

  if (type === "home") {
    return currentUser ? <Outlet /> : <Navigate to="/" />;
  } else if (type === "login") {
    return currentUser === null ? <Outlet /> : <Navigate to={"/home"} />;
  } else if (type === "signup") {
    return currentUser === null ? <Outlet /> : <Navigate to={"/home"} />;
  } else {
    throw new Error("Invalid AuthRoute type");
  }
};

export default AuthRoute;
