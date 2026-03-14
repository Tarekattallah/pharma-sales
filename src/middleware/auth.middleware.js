// Original version with basic token verification
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.headers["authorization"];   
//   if (!token) {
//     return res.status(401).json({ message: "No token" });
//   }

//   try {
//     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//     req.user = decoded;
//     next(); 
//   } catch (err) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;



// Updated version with better error handling and token format checking

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
// Check if the Authorization header is present and starts with "Bearer "
  if (!authHeader?.startsWith("Bearer ")) {     //if authHeader is undefined or does not start with "Bearer ", return 401, but if it (!token) it will try to run the code and will throw an error because token is undefined, so we need to check if authHeader is defined and starts with "Bearer " before trying to split it.
    return res.status(401).json({ message: "No token provided" });
  }
// Extract the token from the Authorization header
// if replace("Bearer ", "") is used, it will remove the "Bearer " prefix from the token string, leaving only the actual token value. This is necessary because the Authorization header typically contains the token in the format "Bearer <token>", and we need to extract just the token part for verification.
  const token = authHeader.split(" ")[1];
// Check if JWT_SECRET is defined in environment variables
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {  // Handle specific JWT errors for better feedback
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }    // JsonWebTokenError is a general error for invalid tokens, including malformed tokens, invalid signatures, etc. By checking for this specific error, we can provide a more accurate response to the client when the token is not valid.
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Authentication error" });
  }
};

module.exports = authMiddleware;