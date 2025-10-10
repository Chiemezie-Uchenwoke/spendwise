import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";
// import useRefreshUserToken from "../../hooks/useRefreshUserToken";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API_BASE = "https://spendwise-backend-48nv.onrender.com";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  // const refreshUserToken = useRefreshUserToken(); // still here in case needed

  // 🧠 Fetch authenticated user
  const fetchAuthUser = useCallback(async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE}/auth/me`, {
        method: "GET",
      });

      if (!response) {
        setUser(null);
        navigate("/login");
        return null;
      }

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        return data.user;
      } else {
        setUser(null);
        return null;
      }
    } catch (err) {
      console.error("Error fetching auth user:", err);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // 🧠 Fetch profile image
  const fetchProfileImage = useCallback(async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE}/profile/me`, {
        method: "GET",
      });

      if (!response) {
        navigate("/login");
        return null;
      }

      const data = await response.json();

      if (data.success) {
        setProfileImage(data.imageUrl);
        return data.imageUrl;
      } else {
        setProfileImage(null);
        return null;
      }
    } catch (err) {
      console.error("Error fetching profile image:", err);
      setProfileImage(null);
      return null;
    }
  }, [navigate]);

  // 🔁 Initial load
  useEffect(() => {
    const loadData = async () => {
      const authUser = await fetchAuthUser();
      if (authUser) {
        await fetchProfileImage();
      }
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
