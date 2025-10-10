import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";
import useRefreshUserToken from "../../hooks/useRefreshUserToken";

const API_BASE = "https://spendwise-backend-48nv.onrender.com";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const refreshUserToken = useRefreshUserToken();

  const fetchAuthUser = useCallback(async () => {
    try {
        const response = await fetch(`${API_BASE}/auth/me`, {
            method: "GET",
            credentials: "include",
        });

        /* if (!response.ok) {
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
        } */

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
  }, []);

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
  } ,[refreshUserToken, navigate]);

    useEffect(() => {
        const loadData = async () => {
            const authUser = await fetchAuthUser();

            if (authUser) {
                await fetchProfileImage(); // this will repopulate profileImage
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
