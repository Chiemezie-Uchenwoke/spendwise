import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner/Spinner";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
