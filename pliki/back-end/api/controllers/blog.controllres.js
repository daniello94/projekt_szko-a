const Blog = require('../models/Blog')

function chatBlog(cb){
    Blog.find().lean().sort({ updatedAt: -1 }).exec(function(err, messages) {
        if(err) {
            cb(err)
        } else {
            cb(null, messages)
        }
    });
};

function messageAdd(data, cb) {
    let newBlog = new Blog(data);

    newBlog.save(function(err, message) {

        if(err) {
            cb(err);
        } else {
            cb(null, message);
        }

    });
};
function chatGet(id, cb) {
    Blog.findById(id).exec(function (err, message) {
        if (err) {
            cb(err)
        } else {
            cb(null, message)
        }
    })
};

function responseAdd(data, cb) {
    console.log( { response: data[1] });
    Blog.updateOne(
        { _id: data[0] },
        { $push: { responses: data[1] } },
        function (err, messages) {
            if (err) {
                cb(err)
            } else {
                cb(null, messages)
            }
        }
    )
};
module.exports={
    list:chatBlog,
    addBlogs:messageAdd,
    response:responseAdd,
    oneBlog:chatGet
}