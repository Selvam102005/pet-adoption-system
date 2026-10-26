
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const nodemailer = require("nodemailer");

dotenv.config();

const connectDB = require("./connection");

const Pets = require("./Schemas/PetSchema");
const Adopt = require("./Schemas/AdoptSchema");
const Admin = require("./Schemas/AdminSchema");
const Users = require("./Schemas/UserSchema");

const protect = require("./middleware/authMiddleware");
const adminOnly = require("./middleware/authorizationMiddleware");
const authRoutes = require("./Routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================
// MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================
// AUTHENTICATION ROUTES
// ==========================
app.use("/api", authRoutes);

// ==========================
// EMAIL CONFIGURATION
// ==========================
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// ==========================
// GET ALL ADMINS (ADMIN ONLY)
// ==========================
app.get("/api/admin", protect, adminOnly, async (req, res) => {
    try {
        const admins = await Admin.find().select("-password");
        return res.status(200).json(admins);
    } catch (err) {
        console.error("Error fetching admins:", err);
        return res.status(500).json({
            success: false,
            message: "Database error"
        });
    }
});

// ==========================
// CREATE ADOPTION REQUEST
// ==========================


app.post("/api/adopts", protect, async (req, res) => {
  try {
    const {
      petName,
      fullName,
      age,
      gender,
      address,
      occupation,
      phone
    } = req.body;

    // Validate the form fields
    if (
      !petName ||
      !fullName ||
      age === undefined ||
      age === null ||
      age === "" ||
      !gender ||
      !address ||
      !occupation ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all adoption form fields"
      });
    }

    // Get the authenticated user from the verified JWT
    const user = await Users.findById(req.user.id).select("email");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please log in again."
      });
    }

    // Save identity from the database, not from the request body
    const adoption = await Adopt.create({
      userId: user._id,
      petName,
      fullName,
      age,
      gender,
      address,
      occupation,
      phone,
      email: user.email
    });

    // Send confirmation to the email stored in the account
    let emailSent = false;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Pet Adoption Application Received",
          text: `Hello ${fullName},

We have received your adoption application for ${petName}.

Our team will review your application and contact you with further updates.

Thank you for using our Pet Adoption System!`
        });

        emailSent = true;
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Adoption application submitted successfully",
      adoption,
      emailSent
    });

  } catch (error) {
    console.error("Adoption submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit adoption application"
    });
  }
});


// ==========================
// CREATE PET (ADMIN ONLY)
// ==========================
app.post("/api/pets", protect, adminOnly, async (req, res) => {
    try {
        const newPet = await Pets.create(req.body);

        return res.status(201).json({
            success: true,
            pet: newPet
        });
    } catch (err) {
        console.error("Error creating pet:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to create pet"
        });
    }
});

// ==========================
// GET ALL ADOPTION REQUESTS
// (ADMIN ONLY)
// ==========================
app.get("/api/adopts", protect, adminOnly, async (req, res) => {
    try {
        const adoptRequests = await Adopt.find();

        return res.status(200).json({
            success: true,
            adoptRequests
        });
    } catch (err) {
        console.error("Error fetching adoption requests:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch adoption requests"
        });
    }
});

// ==========================
// GET ALL PETS (PUBLIC)
// ==========================
app.get("/api/petdata", async (req, res) => {
    try {
        const pets = await Pets.find();
        return res.status(200).json(pets);
    } catch (err) {
        console.error("Error fetching pets:", err);
        return res.status(500).json({
            success: false,
            message: "Database error"
        });
    }
});

// ==========================
// DELETE PET (ADMIN ONLY)
// ==========================
app.delete("/api/pets/delete/:id", protect, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid pet ID"
            });
        }

        const result = await Pets.deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Pet not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Pet deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting pet:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete pet"
        });
    }
});

// ==========================
// UPDATE PET (ADMIN ONLY)
// ==========================
app.put("/api/pets/update/:id", protect, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid pet ID"
            });
        }

        const updatedPet = await Pets.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPet) {
            return res.status(404).json({
                success: false,
                message: "Pet not found"
            });
        }

        return res.status(200).json({
            success: true,
            pet: updatedPet
        });
    } catch (err) {
        console.error("Error updating pet:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to update pet"
        });
    }
});

// ==========================
// PET COUNT (ADMIN ONLY)
// ==========================
app.get("/api/pets/count", protect, adminOnly, async (req, res) => {
    try {
        const count = await Pets.countDocuments();

        return res.status(200).json({
            success: true,
            count
        });
    } catch (err) {
        console.error("Error getting pet count:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to get pet count"
        });
    }
});

// ==========================
// ADOPTION COUNT (ADMIN ONLY)
// ==========================
app.get("/api/adopts/count", protect, adminOnly, async (req, res) => {
    try {
        const count = await Adopt.countDocuments();

        return res.status(200).json({
            success: true,
            count
        });
    } catch (err) {
        console.error("Error getting adoption count:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to get adoption count"
        });
    }
});

// ==========================
// DELETE ADOPTION REQUEST
// (ADMIN ONLY)
// ==========================
app.delete("/api/adopts/:id", protect, adminOnly, async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid adoption request ID"
            });
        }

        const result = await Adopt.deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Adoption request not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Adoption request deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting adoption request:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to delete adoption request"
        });
    }
});

// ==========================
// START SERVER AFTER DB CONNECTS
// ==========================
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
};

startServer();
