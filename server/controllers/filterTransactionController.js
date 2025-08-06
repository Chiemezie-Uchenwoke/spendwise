import Transaction from "../models/transactionModel.js";

const filterTransactions = async (req, res, next) => {
    const {startDate, endDate, transactionType, categoryId} = req.query;
    
    try {

        const userId = req.user.userId;
        const query = {userId};

        if (startDate && endDate){
            query.date = {$gte: new Date(startDate), $lte: new Date(endDate)};
        }

        if (transactionType && transactionType !== "all"){
            query.type = transactionType;
        }

        if (categoryId) {
            query.categoryId = categoryId;
        }

        const filteredTransactions = await Transaction.find(query);

        return res.status(200).json({
            success: true,
            result: filteredTransactions
        });

    } catch(err) {
        next(err);
    }
}

export {filterTransactions};