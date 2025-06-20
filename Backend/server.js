const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const connectDB = require("./connection");
const Pets = require("./Schemas/PetSchema");
const Adopt = require("./Schemas/AdoptSchema");
const Admin = require("./Schemas/AdminSchema");
const Users = require("./Schemas/UserSchema");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const saltRounds = 10;
connectDB();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'selvam.s11102005@gmail.com',
    pass: 'Mallikas@102005' 
  }
});
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const existingUsername = await Users.findOne({ username });
    const existingEmail = await Users.findOne({ email });

    let errorMessages = [];

    if (existingUsername) errorMessages.push("Username already taken");
    if (existingEmail) errorMessages.push("Email already registered");

    if (errorMessages.length > 0) {
      return res.status(400).json({ success: false, error: errorMessages.join(" and ") });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new Users({ username, email, password: hash });
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, user: savedUser });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    
    res.status(200).json({ 
      success: true, 
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      } 
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
app.post('/api/admin/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingAdminEmail = await Admin.findOne({ email });
    const existingAdminName = await Admin.findOne({ name });

    const errorMessages = [];
    if (existingAdminName) errorMessages.push("Name already taken");
    if (existingAdminEmail) errorMessages.push("Email already registered");

    if (errorMessages.length > 0) {
      return res.status(400).json({ success: false, message: errorMessages.join(" and ") });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    const savedAdmin = await newAdmin.save();
    const adminResponse = {
      id: savedAdmin._id,
      name: savedAdmin.name,
      email: savedAdmin.email,
    };
    res.status(201).json({ success: true, admin: adminResponse, message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Error during admin registration:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid admin credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid admin credentials" });
    }
    res.status(200).json({ 
      success: true, 
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      } 
    });
  } catch (err) {
    console.error('Error during admin login:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
app.get('/api/admin', async (req, res) => {
  try {
    const data = await Admin.find();
    res.status(200).json(data);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});
app.post('/api/admin', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      username,
      email,
      password: hash
    });
    const savedAdmin = await newAdmin.save();
    res.status(201).json({ success: true, admin: savedAdmin });
  } catch (err) {
    console.error('Error creating admin:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
app.post('/api/adopts', async (req, res) => {
  try {
    const data = req.body;

    // Save the adoption request to DB
    const newAdopt = new Adopt(data);
    const savedAdopt = await newAdopt.save();

    // Email setup
    const mailOptions = {
      from: 'selvam.s11102005@gmail.com',  // ✅ make sure this matches your transporter
      to: data.email,
      subject: 'Adoption Request Received',
      text: `Hi ${data.fullName},\n\nYour adoption request for ${data.petsname} has been received.\nWe will get back to you within 24 hours.\n\nThank you!\nPet Adoption Team`
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'Request submitted & email sent successfully',
      adoption: savedAdopt
    });
  } catch (error) {
    console.error('Submission or email failed:', error);
    res.status(500).json({
      success: false,
      message: 'Submission failed or email sending error'
    });
  }
});

app.post('/api/pets', async (req, res) => {
  try {
    const newPet = new Pets({
      ...req.body
    });
    const savedPet = await newPet.save();
    res.status(200).json({ success: true, pet: savedPet });
  } catch (err) {
    console.error('Error creating pet:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
app.get('/api/adopts', async (req, res) => {
  try {
    const adoptRequests = await Adopt.find();
    res.status(200).json({ success: true, adoptRequests });
  } catch (err) {
    console.error('Error fetching adoption requests:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
app.get('/api/petdata', async (req, res) => {
  try {
    const data = await Pets.find();
    res.status(200).json(data);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});
app.delete('/api/pets/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Pets.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Pet not found' });
    }
    res.status(200).json({ success: true, message: 'Pet deleted successfully' });
  } catch (err) {
    console.error('Error deleting pet:', err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});
app.put('/api/pets/update/:id', async (req, res) => {
  try {
    const updatedPet = await Pets.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPet) {
      return res.status(404).json({ success: false, message: 'Pet not found' });
    }
    res.json({ success: true, pet: updatedPet });
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});
app.get('/api/pets/count', async (req, res) => {
  try {
    const count = await Pets.countDocuments();
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});
app.get('/api/adopts/count', async (req, res) => {
  try {
    const count = await Adopt.countDocuments();
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});
app.delete('/api/adopts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Adopt.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Request not found' });
    }

    res.status(200).json({ success: true, message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting request' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});