import { fetchWithAuth } from "../utils/fetchWithAuth";

const fetchAllTransactions = async () => {
    const url = "https://spendwise-backend-48nv.onrender.com/transactions/";

    try {
        const response = await fetchWithAuth(url, {
            method: "GET"
        });

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const addTransaction = async (formData) => {
    const url = "https://spendwise-backend-48nv.onrender.com/transactions/";
    try {
        const response = await fetchWithAuth(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        return data;
    } catch (err){
        console.error(err);
        return null
    }
}

export {addTransaction, fetchAllTransactions};