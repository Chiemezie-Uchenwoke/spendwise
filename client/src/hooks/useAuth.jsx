import { AuthContext } from "../context/AuthContext/AuthContext";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);