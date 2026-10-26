const express = require("express");

const {
    registerUser,
    loginUser,
    registerAdmin,
    loginAdmin
} = require("../controllers/authController");

const router = express.Router();


// ==========================
// USER ROUTES
// ==========================

// User registration
router.post("/users", registerUser);

// User login
router.post("/users/login", loginUser);


// ==========================
// ADMIN ROUTES
// ==========================

// Admin registration
router.post("/admin/register", registerAdmin);

// Admin login
router.post("/admin/login", loginAdmin);


module.exports = router;