const mongoose = require('mongoose');


const userScehma = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },

    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
    },

    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],

},{timestamps: true});
   
const User = mongoose.model('User', userScehma);

module.exports = User;