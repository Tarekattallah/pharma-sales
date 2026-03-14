//1
// Basic version of role-based access control middleware

// const roleMiddleware = (roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
//     }
//     next();
//   };
// };
// module.exports = roleMiddleware;


//2
// Updated version with better error handling and role validation

//check if roles is a non-empty array, if not throw an error, this will help to catch configuration errors early and prevent the middleware from being used with invalid role definitions. By validating the input at the time of middleware creation, we can ensure that the middleware is set up correctly and avoid potential issues during runtime when handling requests.
const roleMiddleware = (roles) => {
// Validate that roles is a non-empty array
  if (!Array.isArray(roles) || roles.length === 0) {
    throw new Error("roles must be a non-empty array");
  }

  return (req, res, next) => {
// Check if req.user is defined and has a role property, this will help to catch cases where the authentication middleware might not have set the user object correctly or where the token did not contain the expected role information. By validating the presence of req.user and its role property, we can provide more informative error messages and prevent unauthorized access due to misconfigurations or issues in the authentication process.
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }
// Check if the user has a role assigned, this will help to catch cases where the user might be authenticated but does not have a role defined, which is necessary for role-based access control. By validating the presence of req.user.role, we can ensure that only users with defined roles are allowed to access protected routes and provide clear feedback when a user is missing role information.
    if (!req.user.role) {
      return res.status(403).json({ message: "Forbidden: No role assigned" });
    }
// Check if the user's role is included in the allowed roles, this will ensure that only users with the appropriate permissions can access the protected route. By checking if req.user.role is included in the roles array, we can enforce role-based access control and provide a clear response when a user does not have sufficient permissions to access the resource.
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }
// If all checks pass, proceed to the next middleware or route handler
    next();
  };
};

module.exports = roleMiddleware;