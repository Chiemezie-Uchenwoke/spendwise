const fetchAllTransactions = async () => {
    const url = "https://spendwise-backend-48nv.onrender.com/transactions/";

    try {
        const response = await fetch(url, {
            credentials: "include"
        });

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

const addTransaction = async (formData) => {
    const url = "http://localhost:3000/transactions/";
    try {
        const response = await fetch(url, {
            method: "POST",
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
        return null
    }
}

export {addTransaction, fetchAllTransactions};