// src/pages/Protected.jsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthed, isAdmin } from "../Services/auth.js";

export default function Protected({ adminOnly = false }) {
  if (!isAuthed()) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin()) return <Navigate to="/" replace />;
  return <Outlet />;
}
