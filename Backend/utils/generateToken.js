const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign(
    {
      id: id,
      role: role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    }
  );
};

module.exports = generateToken;