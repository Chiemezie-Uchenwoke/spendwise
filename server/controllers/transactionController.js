import Transaction from "../models/transactionModel.js";

const addTransaction = async (req, res) => {
    const {amount, type, categoryId, description, date} = req.body;

    const userId = req.user.userId;

    await Transaction.create({
        userId,
        amount,
        type,
        categoryId,
        description,
        date
    });
}

export {addTransaction};