// const express = require("express");
// const router = express.Router();
// const userController = require("./user.controller");
// const authMiddleware = require("../../middleware/auth.middleware");
// const roleMiddleware = require("../../middleware/role.middleware");


// router.use(authMiddleware);

// // CRUD users
// router.post("/", roleMiddleware(["admin"]), userController.createUser);
// router.get("/", roleMiddleware(["admin"]), userController.getAllUsers);
// router.get("/:id", roleMiddleware(["admin", "medical_rep", "doctor"]), userController.getUserById);

// module.exports = router;




const express = require("express")
const router = express.Router()

const userController = require("./user.controller")

const authMiddleware = require("../../middleware/auth.middleware")
const roleMiddleware = require("../../middleware/role.middleware")

router.use(authMiddleware)

router.post(
    "/",
    roleMiddleware(["admin"]),
    userController.createUser
)

router.get(
    "/",
    roleMiddleware(["admin"]),
    userController.getUsers
)

module.exports = router