// src/context/AuthProvider.jsx
import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";

const API_BASE = "http://localhost:3000";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAuthUser = useCallback(async () => {
    try {
        const res = await fetch(`${API_BASE}/auth/me`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            setUser(null);
            return null;
        }

        const data = await res.json();

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
  }, [])

  const fetchProfileImage = useCallback(async () => {
    try {
        const res = await fetch(`${API_BASE}/profile/me`, {
            method: "GET",
            credentials: "include",
        });

      if (!res.ok) return null;

        const data = await res.json();
        return data.success ? data.imageUrl : null;
    } catch (err) {
        console.error("Error fetching profile image:", err);
        return null;
    }
  } ,[]);

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
