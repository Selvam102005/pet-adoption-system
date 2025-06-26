# 🐾 Pet Adoption System

A full-stack Pet Adoption System built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, browse pets, and send adoption requests, while admins manage pet listings and approve/decline requests.

---

## 🚀 Features

- 👤 User Registration and Login
- 🐶 Browse Available Pets
- 📬 Send and Track Adoption Requests
- 🛠️ Admin Panel to Manage Pets and Requests
- 📧 Email Notifications (Optional)
- 🔐 Secure Authentication with JWT

---

## 🧰 Tech Stack

**Frontend**: React, Bootstrap, React Router  
**Backend**: Node.js, Express  
**Database**: MongoDB (MongoDB Atlas)  
**Other Tools**: Axios, Nodemailer

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Selvam102005/pet-adoption-system.git
cd pet-adoption-system



Install Backend Dependencies
cd Backend
npm install

Install Frontend Dependencies
cd ../Frontend/my-app
npm install

Set up .env in Backend
Create a .env file in the Backend/ folder with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the Project
# In Backend
npm start

# In Frontend
npm start