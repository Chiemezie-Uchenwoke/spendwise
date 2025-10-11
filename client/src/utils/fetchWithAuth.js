import { refreshToken } from "./refreshUserToken";

export const fetchWithAuth = async (url, options = {}) => {
  try {
    let response = await fetch(url, {
      ...options,
      credentials: "include",
    });

    // Access token expired → try refresh
    if (response.status === 401 || response.status === 403) {
      const refreshed = await refreshToken();

      if (refreshed?.success) {
        // Retry original request
        response = await fetch(url, {
          ...options,
          credentials: "include",
        });
      } else {
        
        window.dispatchEvent(new Event("auth-expired"));
        return null;
      }
    }

    return response;
  } catch (err) {
    console.error("fetchWithAuth error:", err);
    return null;
  }
};
