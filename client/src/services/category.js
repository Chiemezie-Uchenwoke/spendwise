const getTransactionCategory = async () => {
    try {
        const url = "http://localhost:3000/categories/";
        const response = await fetch(url, {
            credentials: "include"
        });

        const data = response.json();
        return data;

    } catch(err){
        console.error(err);
        return null;
    }
}

export default getTransactionCategory;