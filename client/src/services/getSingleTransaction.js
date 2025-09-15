const getSingleTransaction = async (id) => {
    const url = `http://localhost:3000/transactions/${id}`;
    try {
        const response = await fetch(url, {
            credentials: "include",
        });
        const data = await response.json();
        return data;
    } catch (err){
        console.error(err);
        return null;
    }
} 

export default getSingleTransaction;