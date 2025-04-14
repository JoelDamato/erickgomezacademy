// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user"); // o usá contexto, Redux, etc.
  
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
