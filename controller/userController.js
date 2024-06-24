const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const bcrypt = require('bcrypt');

module.exports.createUser = async function createUser(req, res) {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(data.password, salt);
        data.password = secPass;
        const userData = await userModel.create(data);
        if (userData) {
            let uid = userData['_id'];
            let token = jwt.sign({ payload: uid }, JWT_KEY);
            res.cookie('login', token,);
            return res.json({
                message: "signUp successfull",
                data: userData
            })
        }
        else {
            res.json({
                message: "user not created"
            })
        }
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}

module.exports.loginUser = async function loginUser(req, res) {
    try {
        const data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                const t = await bcrypt.compare(data.password, user.password);
                if (t) {
                    let uid = user['_id'];//uid
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token);
                    return res.json({
                        message: "user loggedin successfully",
                        data: data,
                        cookie:token
                    })
                }
                else {
                    res.status(401).json({
                        message: "incorrect credentials"
                    })
                }
            }
            else {
                res.status(404).json({
                    message: "user not found"
                })
            }
        }
        else {
            res.json({
                message: "send an email"
            })
        }
    } catch (error) {
        return res.json({ msg: error });
    }
}



module.exports.getLogin = async function getLogin(req, res) {
    try {
        if (req.cookies.login) {
            let token = req.cookies.login;
            console.log(token);
            let payload = jwt.verify(token, process.env.JWT_KEY);
            if (payload) {
                res.json({ cookie: token, status: true });
            }
            else {
                res.status(404).json({ msg: 'user not veryfied', status: false });
            }
        }
        else {
            res.status(404).json({ msg: 'please login', status: false });
        }
    }
    catch (err) {
        return res.status(404).json(err);
    }
}

module.exports.userDetails = async function userDetails(req, res) {
    try {
        let token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        let payload = jwt.verify(token, process.env.JWT_KEY);
        const uid = payload.payload;
        const user = await userModel.findById(uid);
        if (user) {
            res.json(user)
        }
        else {
            res.status(404).json({ msg: "user not found" })
        }

    } catch (error) {
        res.json(error);
    }
}