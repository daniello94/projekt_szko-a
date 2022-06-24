const User = require('../models/User');
const bcrypt = require('bcrypt');

function userAdd(data, cb) {
    let newUser = new User(data);

    newUser.save(function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user);


        }
    })
};

function userLogin(data, cb) {
    User.findOne({ email: data.email }).exec(function (err, user) {
        if (err) {
            cb(err);
            return
        }
        if (!user) {
            cb(null, user)
            return
        };
        bcrypt.compare(data.password, user.password, function (err, logged) {
            if (err) {
                cb(err)
            } if (logged) {
                const token = user.generateAuthToken();
                cb(null, user, token);
            } else {
                cb(null, null)
            }
        })
    })
};

function userList(cb) {
    User.find().lean().exec(function (err, users) {
        if (err) {
            cb(err)
        } else {
            cb(null, users)
        }
    })
};

function userGet(id, cb) {
    User.findById(id).exec(function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function userUpodate(id, data, cb) {
    User.updateOne({ _id: id }, data, function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
}

module.exports = {
    add: userAdd,
    login: userLogin,
    list: userList,
    get: userGet,
    upodate:userUpodate
};