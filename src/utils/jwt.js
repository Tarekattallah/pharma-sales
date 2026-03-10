const jwt = require("jsonwebtoken");
// Function to generate a JWT token
exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token expires in 7 days
    });
};

// Function to verify a JWT token
exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};


//* generateToken(payload): takes a payload (usually user information) 
// and generates a JWT token using a secret key defined in the environment variables. 
// The token is set to expire in 7 days.	

//* verifyToken(token): takes a JWT token and verifies it using the same secret key. 
// If the token is valid, it returns the decoded payload; otherwise, it returns null.