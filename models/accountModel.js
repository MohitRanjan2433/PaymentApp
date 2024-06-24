const mongoose = require('mongoose');
// const emailValidator = require('mongoose');

const db_link = process.env.DB_LINK;

mongoose.connect(db_link)
    .then(function () {
        console.log('account db connected');
    })
    .catch(function (err) {
        console.log(err);
    })

const accountSchema = mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    transactions:{
        type:Number,
        default:0
    },
    balance:{
        type:Number,
        default:0
    },
    upi:{
        type:String,
        required:true,
    },
    acNumber:{
        type:String,
        required:true
    }
});



accountModel = mongoose.model('accountModel', accountSchema);
module.exports = accountModel;
