const refreshToken = async () => {

    const api_base = "https://spendwise-backend-48nv.onrender.com";

    try {
        const response = await fetch(`${api_base}/auth/refresh`, {
            method: "GET",
            credentials: "include"
        });

        const data = await response.json();

        return {
            status: response.status,
            ...data
        }

    } catch (err){
        console.error(err);
        return { status: 500, success: false, error: "Network error" };
    }

}

export {refreshToken};