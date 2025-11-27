import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function PrivateRoute({ children }) {
  const token = AuthService.getToken();
  
  return token ? children : <Navigate to="/login" />;
}
