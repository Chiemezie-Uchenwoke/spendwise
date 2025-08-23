import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";
import useRefreshUserToken from "../../hooks/useRefreshUserToken";

const API_BASE = "http://localhost:3000";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const refreshUserToken = useRefreshUserToken();

  const fetchAuthUser = useCallback(async () => {
    try {
        const response = await fetch(`${API_BASE}/auth/me`, {
            method: "GET",
            credentials: "include",
        });

        console.log(response);

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                const refreshed = await refreshUserToken();

                if (refreshed?.success) {
                    return await fetchAuthUser();
                } else {
                    setUser(null);
                    navigate("/login");
                    return null;
                }
            }

            setUser(null);
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
  }, [refreshUserToken, navigate]);

  const fetchProfileImage = useCallback(async () => {
    try {
        const response = await fetch(`${API_BASE}/profile/me`, {
            method: "GET",
            credentials: "include",
        });

      if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                const refreshed = await refreshUserToken();

                if (refreshed?.success) {
                    return await fetchProfileImage();
                } else {
                    navigate("/login");
                    return null;
                }
            }
      }

        const data = await response.json();
        return data.success ? data.imageUrl : null;
    } catch (err) {
        console.error("Error fetching profile image:", err);
        return null;
    }
  } ,[refreshUserToken, navigate]);

    useEffect(() => {
        fetchAuthUser();
    }, [fetchAuthUser]);

    return (
        <AuthContext.Provider
        value={{
            user,
            setUser,
            loading,
            fetchAuthUser,
            fetchProfileImage,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
