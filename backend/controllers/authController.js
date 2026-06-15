const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// env file
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        console.log("Incoming request body:", req.body);

        // Check if there is no username and password
        if ( !username || !password ) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = await User.create({ username, password, role });
        return res.status(201).json({ message: 'User registered successfully', user: newUser.username, role: newUser.role, id: newUser._id });
        
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {

        const { username, password } = req.body;
        console.log("Incoming request body:", req.body);

        // Check if there is no username and password
        if ( !username || !password ) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username: username });

        // Check if the user exists
        if ( !user ) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if ( !isPasswordValid ) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { 
    register,
    login
};