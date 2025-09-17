import Transaction from "../models/transactionModel.js";

const addTransaction = async (req, res, next) => {
    const {amount, type, categoryId, description, date} = req.body;

    if (!amount || !type || !categoryId || !date) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields."
        });
    }

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
            message: "Transaction was added successfully."
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

const editTransaction = async (req, res, next) => {
    const {transactionId} = req.params;
    const {amount, type, categoryId, description, date} = req.body;

    try {
        const userId = req.user.userId;
        const transaction = await Transaction.findOne({_id: transactionId, userId});

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found or unauthorized." });
        }

        await Transaction.findOneAndUpdate(
            {_id: transactionId, userId}, 
            {amount: Number(amount), type, categoryId, description, date}
        );

        return res.status(200).json({
            success: true,
            message: "Transaction updated successfully"
        });

    } catch(err){
        next(err);
    }
}

const deleteTransaction = async (req, res, next) => {
    const {transactionId} = req.params;

    try {
        const userId = req.user.userId;
        const transaction = await Transaction.findOne({_id: transactionId, userId});

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found or unauthorized." });
        }

        await Transaction.deleteOne({_id: transactionId});

        return res.status(200).json({
            success: true,
            message: "Transaction deleted successfully"
        });

    } catch(err) {
        next(err);
    }
}

const getSingleTransaction = async (req, res, next) => {
    const {transactionId} = req.params;

    try {
        const userId = req.user.userId;
        const transaction = await Transaction.findOne({_id: transactionId, userId});

        if (!transaction) {
            return res.status(404).json({ 
                success: false,
                message: "Transaction not found or unauthorized." 
            });
        }

        return res.status(200).json({
            success: true,
            transaction
        });
    } catch(err){
        console.error(err);
        next(err);
    }
}

export {addTransaction, fetchAllTransactions, editTransaction, deleteTransaction, getSingleTransaction};