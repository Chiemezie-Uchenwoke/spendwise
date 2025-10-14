import { useNavigate } from "react-router";
import { refreshToken } from "../utils/refreshUserToken";
import { useCallback } from "react";

const useRefreshUserToken = () => {
    const navigate = useNavigate();
    
    const refreshUserToken = useCallback(async () => {
        const result = await refreshToken();

        if (result.status === 401 || result.status === 403) {
            navigate("/login", {replace: true});
            return { success: false, error: 'Authentication failed' };
        }

        return result;

    }, [navigate])

    return refreshUserToken;
}

export default useRefreshUserToken;