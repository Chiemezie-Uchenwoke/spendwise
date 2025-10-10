import { fetchWithAuth } from "../utils/fetchWithAuth";

const deleteTransaction = async (id) => {
    const url = `https://spendwise-backend-48nv.onrender.com/transactions/${id}`;

    try {
        const response = await fetchWithAuth(url, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response || !response.ok) return null;

        const data = await response.json();

        return data;
    } catch (err){
        console.error(err);
        return null;
    }
}

export default deleteTransaction;