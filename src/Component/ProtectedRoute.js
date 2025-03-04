import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = user?.token || "";

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
