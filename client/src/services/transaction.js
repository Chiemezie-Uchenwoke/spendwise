const fetchAllTransactions = async () => {
    const url = "http://localhost:3000/transactions/";

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
            headers: {
                "Content-Type": "application/json",
                credentials: "include"
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