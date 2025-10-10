const getTransactionCategory = async () => {
    try {
        const url = "http://server:3000/categories/";
        const response = await fetch(url, {
            credentials: "include"
        });

        const data = await response.json();
        return data;

    } catch(err){
        console.error(err);
        return null;
    }
}

export default getTransactionCategory;