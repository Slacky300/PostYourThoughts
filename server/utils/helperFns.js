const User = require('../models/userModel');

const doesUserExist = async (email) => {

    const userExists = await User.findOne({email});

    if (userExists) return true;

    return false;
}

module.exports = {doesUserExist};
