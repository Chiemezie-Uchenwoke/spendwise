import { fetchWithAuth } from "../utils/fetchWithAuth";

const handleEditTransaction = async (id, formData) => {
    const url = `https://spendwise-backend-48nv.onrender.com/transactions/${id}`;
    try {
        const response = await fetchWithAuth(url, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        return data;
        
    } catch (err){
        console.error(err);
        return null;
    }
} 

export default handleEditTransaction;