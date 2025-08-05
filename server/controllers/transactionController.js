import Transaction from "../models/transactionModel.js";

const addTransaction = async (req, res, next) => {
    const {amount, type, categoryId, description, date} = req.body;

    try {
        const userId = req.user.userId;

        await Transaction.create({
            userId,
            amount: Number(amount),
            type,
            categoryId,
            description: description || "",
            date
        });

        return res.status(200).json({
            success: true, 
            message: "Transaction added successfully."
        })
    } catch(err) {
        next(err);
    }
}

const fetchAllTransactions = async (req, res, next) => {
    try {

        const userId = req.user.userId;
        const userTransactions = await Transaction.find({userId});

        return res.status(200).json({
            success: true,
            userTransactions
        });

    } catch(err) {
        next(err);
    }

}

export {addTransaction, fetchAllTransactions};