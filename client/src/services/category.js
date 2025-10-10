import { fetchWithAuth } from "../utils/fetchWithAuth";

const getTransactionCategory = async () => {
    try {
        const url = "https://spendwise-backend-48nv.onrender.com/categories/";
        const response = await fetchWithAuth(url, {method: "GET"});

        if (!response || !response.ok) return null;

        const data = await response.json();
        return data;

    } catch(err){
        console.error(err);
        return null;
    }
}

export default getTransactionCategory;