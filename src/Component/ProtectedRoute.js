import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
//   const isAuthenticated = !!localStorage.getItem("userToken"); // Check if user is logged in

//   return isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
<Navigate to="/dashboard"/>
};

export default ProtectedRoute;
