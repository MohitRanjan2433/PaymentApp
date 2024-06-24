const mongoose = require('mongoose');

const db_link = process.env.DB_LINK;

mongoose.connect(db_link)
    .then(function () {
        console.log('transaction db connected');
    })
    .catch(function (err) {
        console.log(err);
    });

const transactionSchema = mongoose.Schema({
    sender: {
        sender_upi: {
            type: String,
            required: true
        }
    },
    receiver: {
        receiver_upi: {
            type: String,
            required: true
        }
    },
    amount: {
        type: Number,
        min: [1, 'MinLimit']
    }
});

transactionModel = mongoose.model('transactionModel', transactionSchema);
module.exports = transactionModel;
