import { fetchWithAuth } from "../utils/fetchWithAuth";

const applyTransactionFilter = async (startDate, endDate, type, categoryId) => {
    const apiUrl = `https://spendwise-backend-48nv.onrender.com/transactions/filter?startDate=${startDate}&endDate=${endDate}&type=${type}&categoryId=${categoryId}`;

    try {
        const response = await fetchWithAuth(apiUrl, {
            method: "GET",
        });
        if (!response) return null;
        
        const data = await response.json();

        return data;
    } catch (err){
        console.error(err);
        return null;
    }
} 

export default applyTransactionFilter;