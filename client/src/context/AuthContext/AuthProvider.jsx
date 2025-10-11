import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API_BASE = "https://spendwise-backend-48nv.onrender.com";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  // Handle refresh token expiration globally
  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
      navigate("/login", { replace: true });
    };

    window.addEventListener("auth-expired", handleAuthExpired);
    return () => window.removeEventListener("auth-expired", handleAuthExpired);
  }, [navigate]);

  // Fetch authenticated user
  const fetchAuthUser = useCallback(async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE}/auth/me`, {
        method: "GET",
      });

      if (!response || !response.ok) {
        setUser(null);
        return null;
      }

      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        return data.user;
      }

      setUser(null);
      return null;
    } catch (err) {
      console.error("Error fetching auth user:", err);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch profile image
  const fetchProfileImage = useCallback(async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE}/profile/me`, {
        method: "GET",
      });

      if (!response || !response.ok) {
        setProfileImage(null);
        return null;
      }

      const data = await response.json();
      if (data.success) {
        setProfileImage(data.imageUrl);
      } else {
        setProfileImage(null);
      }
    } catch (err) {
      console.error("Error fetching profile image:", err);
      setProfileImage(null);
    }
  }, []);

  // Load user on mount
  useEffect(() => {
    const loadData = async () => {
      const authUser = await fetchAuthUser();
      if (authUser) await fetchProfileImage();
    };
    loadData();
  }, [fetchAuthUser, fetchProfileImage]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        fetchAuthUser,
        fetchProfileImage,
        profileImage,
        setProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
