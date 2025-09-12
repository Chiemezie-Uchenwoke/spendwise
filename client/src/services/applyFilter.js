const applyTransactionFilter = async (startDate, endDate, type, categoryId) => {
    const apiUrl = `http://localhost:3000/transactions/filter?startDate=${startDate}&endDate=${endDate}&type=${type}&categoryId=${categoryId}`;

    try {
        const response = await fetch(apiUrl, {credentials: "include"});
        const data = await response.json();

        return data;
    } catch (err){
        console.error(err);
        return null;
    }
} 

export default applyTransactionFilter;