const mongoose = require('mongoose');
// const emailValidator = require('mongoose');

const db_link = process.env.DB_LINK;

mongoose.connect(db_link)
    .then(function () {
        console.log('user db connected');
    })
    .catch(function (err) {
        console.log(err);
    })

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'nameReq']
        // minLength: [5, "nameLenNotSat"]
    },
    lastName: {
        type: String,
        required: [true, 'nameReq']
        // minLength: [5, "nameLenNotSat"]
    },
    email: {
        type: String,
        required: [true, 'MailReq'],
        unique: [true,'!uniqueMail']
        // validate: {
        //     validator: function () {
        //         return emailValidator.validate(this.email);
        //     },
        //     message: props => "notValidMail"
        // }
    },
    phone:{
        type:Number,
        required:[true,'!phone'],
        unique:[true,"!uniquePhone"]
    },
    password: {
        type: String,
        required: [true, 'passReq'],
        minLength: [8, 'passLenNotSat']
    },
    // confirmPassword: {
    //     type: String,
    //     required: [true, 'passReq'],
    //     minLength: [8, 'passLenNotSat'],
    //     validate: {
    //         validator: function () {
    //             return this.confirmPassword == this.password;
    //         },
    //         message: props => "passShouldSame"
    //     }
    // },
    type: {
        type: String,
        enum: ['personal', 'business'],
        default: 'personal'
    }
});

// userSchema.pre('save', function () {
//     this.confirmPassword == undefined;
// })

userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;
