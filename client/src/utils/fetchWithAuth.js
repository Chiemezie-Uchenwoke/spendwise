import { refreshToken } from "./refreshUserToken";

export const fetchWithAuth = async (url, options = {}) => {
  let response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  // If access token expired
  if (response.status === 401 || response.status === 403) {
    const refreshed = await refreshToken();

    if (refreshed?.success) {
      // Retry original request
      response = await fetch(url, {
        ...options,
        credentials: "include",
      });
    } else {
      // Logout if refresh fails
      window.location.href = "/login";
      return null;
    }
  }

  return response;
};
