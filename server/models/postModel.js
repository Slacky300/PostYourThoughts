const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },

    content: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
    },

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
   
},{timestamps: true});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
