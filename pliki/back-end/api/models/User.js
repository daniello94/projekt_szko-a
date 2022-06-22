const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });

const schema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        trim: true,
        default: 'student',
        enum: ['student', 'teacher', 'director']
    },
    name: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true
    },
    classNr: {
        type: String,
        default: ''
    },
    pesel: {
        type: String,
        default: ''
    },
    nameFather: {
        type: String,
        default: ''
    },

    nameMather: {
        type: String,
        default: ''
    },
    adress: {
        city: {
            type: String,
            default: ''
        },
        streaat: {
            type: String,
            default: ""
        },
        nr: {
            type: String,
            default: ''
        },
        zipcode: {
            type: String,
            default: ''
        }
    }
});

schema.plugin(uniqueValidator);

schema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(Number(process.env.SALT), function (err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next()
        })
    })
});

schema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
    return token
};


module.exports = mongoose.model('User', schema);