import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  return isLoggedIn === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default ProtectedRoute;
