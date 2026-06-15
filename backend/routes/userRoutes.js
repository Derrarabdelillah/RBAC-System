const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const verifyToken = require("../middleware/authMiddleware")
const authorizeRoles = require("../middleware/roleMiddleware");

// Only Admin can access this route
router.get('/admin', verifyToken, authorizeRoles("Admin"), async (req, res) => {
    res.send('Welcome Admin');
})

// Admin and manager can access this route
router.get('/editor', verifyToken, authorizeRoles( "Admin", "Editor"), async (req, res) => {
    res.send('Welcome Editor');
})

// Admin, manager and confirmater can access this route
router.get('/confirmater', verifyToken, authorizeRoles("Admin", "Editor", "Confirmater"), async (req, res) => {
    res.send('Welcome Confirmater');
})

// Admin, manager, confirmater and user can access this route
router.get('/user', verifyToken, authorizeRoles("Admin", "Editor", "Confirmater", "User"), async (req, res) => {
    res.send('Welcome User');
})


module.exports = router;