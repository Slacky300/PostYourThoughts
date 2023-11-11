const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {doesUserExist} = require('../utils/helperFns');

const registerUser = async (req, res) => {

    try {

        const {username, email, password} = req.body;

        if(await doesUserExist(email)) return res.status(400).json({message: 'User already exists'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({message: 'User created successfully'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        if (await bcrypt.compare(password, existingUser.password)) {
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
            return res.status(200).json({ token: token, user: existingUser });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {registerUser, loginUser};