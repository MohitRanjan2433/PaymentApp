const accountModel = require('../models/accountModel');
// const searchModel = require('../models/searchModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

module.exports.updateAccount = async function updateAccount(req, res) {
    try {

        let payload = jwt.verify(req.headers.authorization && req.headers.authorization.split(' ')[1], JWT_KEY);
        let uid = payload.payload;
        let account = await accountModel.findOne({user:uid});
        let updateData = req.body;
        console.log({msg:"yes",account});
        if (account) {
            for (let key in updateData) {
                account[key] = updateData[key];
            }
            account.save();
            res.json({ msg: "account updated", account })
        }
        else {
            account = await accountModel.create({ user: uid, upi: updateData.upi, acNumber: updateData.acNumber });
            res.json({ msg: "account created", account: account });

        }
    } catch (error) {
        res.json(error)
    }
}


module.exports.getAccount = async function getAccount(req,res){
    try {
        let uid = jwt.verify((req.headers.authorization && req.headers.authorization.split(' ')[1]),JWT_KEY).payload;
        let account = await accountModel.findOne({user:uid});
        if(account){
            res.json(account);
        }
        else{
            res.status(404).json({msg:"user not found"});
        }
    } catch (error) {
        res.json(error);
    }   
}

module.exports.searchAccount = async function searchAccount(req,res){
    try{
        const { searchTerm } = req.query;

        if(!searchTerm){
            return res.status(400).json({ error: 'Search term is required' });
        }

        const searchResults = await accountModel.find({
            $or: [
                {upi: {$regex:searchTerm, $options: 'i'}}, 
                {acNumber: {$regex: searchTerm, $options: 'i'}},
            ],
        });

        res.json({ msg: 'Search successful', searchResults });
    }
    catch (error){
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}