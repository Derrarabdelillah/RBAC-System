const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// define the Schema 

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
        enum: ["Admin", "Editor", "Confirmateur"]
    }
}, { timestamps: true });

// Hash the password before saving the user

UserSchema.pre('save', async function () {
    
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, SALT_ROUNDS); 
        } catch (err) {
            throw new Error("Password hashing failed");
        }
        
    }

})

const User = mongoose.model('User', UserSchema);

module.exports = User;