
const bcrypt = require("bcrypt");

const Users = require("../Schemas/UserSchema");
const Admin = require("../Schemas/AdminSchema");
const generateToken = require("../utils/generateToken");

const saltRounds = 10;

// ==========================
// USER REGISTRATION
// ==========================
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, email and password are required"
            });
        }

        const existingUsername = await Users.findOne({ username });
        const existingEmail = await Users.findOne({ email });

        if (existingUsername || existingEmail) {
            return res.status(400).json({
                success: false,
                message: existingUsername
                    ? "Username already taken"
                    : "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await Users.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (err) {
        console.error("User registration error:", err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ==========================
// USER LOGIN
// ==========================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await Users.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id, "user");

        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error("User login error:", err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ==========================
// ADMIN REGISTRATION
// ==========================
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const existingEmail = await Admin.findOne({ email });
        const existingName = await Admin.findOne({ name });

        if (existingEmail || existingName) {
            return res.status(400).json({
                success: false,
                message: existingEmail
                    ? "Email already registered"
                    : "Name already taken"
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email
            }
        });
    } catch (err) {
        console.error("Admin registration error:", err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ==========================
// ADMIN LOGIN
// ==========================
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const admin = await Admin.findOne({ email });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials"
            });
        }

        const token = generateToken(admin._id, "admin");

        return res.status(200).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (err) {
        console.error("Admin login error:", err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    registerAdmin,
    loginAdmin
};
