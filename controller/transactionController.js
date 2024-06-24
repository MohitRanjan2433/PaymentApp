const transactionModel = require('../models/transactionModel');
const accountModel = require("../models/accountModel");
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

module.exports.doTransaction = async function doTransaction(req, res) {
    try {
        const data = req.body;
        console.log(data);
        if (data && data.receiver.receiver_upi) {
            const receiverAccountData = await accountModel.findOne({ upi: data.receiver.receiver_upi });
            const senderAccountData = await accountModel.findOne({ upi: data.sender.sender_upi });

            if (receiverAccountData && senderAccountData) {
                if (senderAccountData.balance >= data.amount) {
                    const transaction = await transactionModel.create(data);

                    const updateBalanceReceiver = receiverAccountData.balance + parseFloat(data.amount);
                    const updateBalanceSender = senderAccountData.balance - data.amount;
                    await accountModel.updateOne({ _id: receiverAccountData._id }, { balance: updateBalanceReceiver });
                    await accountModel.updateOne({ _id: senderAccountData._id }, { balance: updateBalanceSender });

                    return res.status(200).json({
                        msg: "Transaction Successful",
                        data: transaction // Include transaction data in the response
                    });
                } else {
                    return res.status(402).json({
                        msg: "Insufficient Balance"
                    });
                }
            } else {
                return res.status(404).json({
                    msg: "Receiver account Not Found"
                });
            }
        } else {
            return res.status(400).json({
                msg: "Receiver UPI Not Provided"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
