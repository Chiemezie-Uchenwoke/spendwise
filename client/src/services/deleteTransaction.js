const deleteTransaction = async (id) => {
    const url = `http://localhost:3000/transactions/${id}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    } catch (err){
        console.error(err);
        return null;
    }
}

export default deleteTransaction;