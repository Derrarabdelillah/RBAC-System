const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/authController");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../schemas/userSchema")

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// This endpoint tells the frontend who the user is, and can be used to check if the user is authenticated
router.get('/me', (req, res) => {
    res.status(200).json({ message: 'Authenticated user', user: req.user });
});

module.exports = router;