const mongoose = require('mongoose');

const db_link = process.env.DB_LINK;

mongoose.connect(db_link)
    .then(function (){
        console.log('Search Database Connected Successfully');
    })
    .catch(function (err){
        console.log(err);
    })

const searchSchema = mongoose.Schema({
    upi:{
        type:String,
        required:true,
    },
    acNumber:{
        type:String,
        required:true
    },
})

searchModel = mongoose.model('searchModel', searchSchema);
module.exports = searchModel;
