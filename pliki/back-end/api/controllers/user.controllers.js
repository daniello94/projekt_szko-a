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

function userList(group,cb) {
    let payload = {}

    if (group) {
        payload = { "role": "student", "classNr": group }
    } else {
        payload = { "role": "student" }
    }

    User.find(payload).lean().exec(function (err, users) {
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

function userUpdate(id, data, cb) {
    User.updateOne({ _id: id }, data, function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function userDelate(id, cb) {
    User.deleteOne({ _id: id }, function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function gradesAdd(data, cb) {
    User.updateOne(
        { _id: data[0] },
        { $push: { grades: data[1] } },
        function (err, grades) {
            if (err) {
                cb(err)
            } else {
                cb(null, grades)
            }
        }
    )
}

module.exports = {
    add: userAdd,
    login: userLogin,
    list: userList,
    get: userGet,
    update: userUpdate,
    delete: userDelate,
    grades: gradesAdd
};